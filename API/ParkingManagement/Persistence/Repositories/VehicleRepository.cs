using AutoMapper;
using Domain.Model;
using Domain.RepositoryInterface;
using Exceptions;
using Microsoft.EntityFrameworkCore;
using Persistence.DataModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Linq.Dynamic.Core;

namespace Persistence.Repositories
{
    public class VehicleRepository : IVehicleRepository
    {
        private readonly ParkingManagementContext _context;
        private readonly IMapper _mapper;
        public VehicleRepository(IMapper mapper)
        {
            _context = new();
            _mapper = mapper;
        }
        public CheckInReceipt AllotParkingSpot(Vehicle vehicle)
        {
            if (CheckWheterVehicleIsAlloted(vehicle))
                throw new VehicleAlreadyExist("Vehicle already in the parking");
            var receipt = GenerateReceipt(vehicle);
            _context.SaveChanges();
            return receipt;
        }
        public Bill CheckoutAndGenerateBill(string vehicleNumber)
        {
            var vehicle = GetVehicle(new Vehicle { VehicleNumber = vehicleNumber });
            GetBillDataReadyForVehicleCheckout(vehicleNumber, out BillsData? billData, out int totalHours);
            IQueryable<ChargesData> charges = _context.Charges
                .Where(charge => charge.ChargeName != ChargeName.Rent.ToString() && charge.VehicleType == vehicle.VehicleType);
            billData.BillCharges = new List<BillChargesData>();
            billData.BillCharges.Add(PrepareBillCharges(Math.Min(totalHours, 2), ChargeName.InitialParkingCharge, charges));
            if (totalHours > 2)
            {
                billData.BillCharges.Add(PrepareBillCharges(totalHours - 2, ChargeName.RemainingParkingCharge, charges));
            }
            if (totalHours > 10)
            {
                int extraHours = Convert.ToInt32(Math.Floor(Convert.ToDouble(totalHours / 10)));
                billData.BillCharges.Add(PrepareBillCharges(extraHours, ChargeName.ExtraParkingCharge, charges, extraHours * 10));
            }

            //charge += (Math.Min(2, totalHours)) * getChargeValue(ChargeName.InitialParkingCharge.ToString(), charges);
            billData.TotalCharges = billData.BillCharges.Sum(bCharge => bCharge.ChargedAmount);
            billData.TotalBillableHours = totalHours;
            //billData.TotalCharges = GetChargeableAmountBasedOnTotalChargeableHours(totalHours, charges);
            _context.Bills.Update(billData);
            FinancialStatementsData finiancialRecord = PrepareFinancialRecord(billData);
            _context.FinancialStatements.Update(finiancialRecord);
            _context.SaveChanges();
            return _mapper.Map<Bill>(billData);
        }
        private static BillChargesData PrepareBillCharges(int hours, ChargeName chargeName, IQueryable<ChargesData> charges)
        {
            return PrepareBillCharges(hours, chargeName, charges, null);
        }

        private static BillChargesData PrepareBillCharges(int hours, ChargeName chargeName, IQueryable<ChargesData> charges, int? chargableHours)
        {
            ChargesData? charge = charges.SingleOrDefault(chrg => chrg.ChargeName == chargeName.ToString());
            return new BillChargesData
            {
                ChargedAmount = charge.ChargeValue * hours,
                Charge = charge,
                Hours = (int)(chargableHours != null ? chargableHours : hours),
            };
        }

        public BillList GetBills(string vehicleNumber, BillQuery billQuery)
        {
            var vehicleData = _context.Vehicles.SingleOrDefault(vhcl => vhcl.VehicleNumber == vehicleNumber);
            if (vehicleData == null) throw new NoVehicleFound($"No Vehicle Found of {vehicleNumber}");
            var vehicleBillQuery = _context.Bills.Where(bill => bill.SpotVehicleRelation.Vehicle == vehicleData);
            ExtractBills(billQuery, vehicleBillQuery, out int count, out List<Bill> bills);
            return new BillList
            {
                Count = count,
                Bills = bills
            };
        }

        public void ExtractBills(BillQuery billQuery, IQueryable<BillsData> vehicleBillQuery, out int count, out List<Bill> bills)
        {
            count = FilterTheBillsAndGetCount(billQuery, ref vehicleBillQuery);
            vehicleBillQuery = vehicleBillQuery.Include(bill => bill.BillCharges).ThenInclude(billCharge => billCharge.Charge);
            bills = _mapper.Map<List<Bill>>(vehicleBillQuery.ToList());
        }

        public string GetVehicleType(string vehicleNumber)
        {
            var vehicle = _context.Vehicles.SingleOrDefault(vehicle => vehicle.VehicleNumber == vehicleNumber);
            return vehicle != null ?
                vehicle.VehicleType :
                throw new NoVehicleFound("No Vehicle Found");
        }
        public List<Charge> GetChargesAccordingToVehicleType(string vehicleType)
        {
            return _mapper.Map<List<Charge>>
                (_context.Charges
                    .Where(charge => charge.ChargeName != ChargeName.Rent.ToString()
                    && charge.VehicleType == vehicleType));
        }
        private bool CheckWheterVehicleIsAlloted(Vehicle vehicle)
        {
            return _context.ParkingSpots.Where(spot => spot.Status == SpotStatus.Occupied.ToString())
                .SelectMany(spot => spot.SpotVehicleRelations)
                .Include(relation => relation.Vehicle)
                .Where(relation => relation.Vehicle.VehicleNumber == vehicle.VehicleNumber)
                .SelectMany(relation => relation.Bills)
                .Any(bill => bill.CheckOutTime == null);
        }
        private CheckInReceipt GenerateReceipt(Vehicle vehicle)
        {
            var currentDateTime = DateTime.Now;
            ParkingSpotData? parkingSpotData = GetParkingSpotBasedOnVehicle(vehicle);
            VehiclesData vehicleData = GetVehicle(vehicle);
            PrepareSpotVehicleRelation(vehicleData, parkingSpotData, currentDateTime, out SpotVehicleRelation? relation);
            SetParkingSpotStatusOccupied(parkingSpotData);
            return new CheckInReceipt
            {
                SpotNumber = relation.ParkingSpot.SpotNumber,
                AllotedTime = relation.Bills.FirstOrDefault().AllottingTime,
                VehicleNumber = vehicle.VehicleNumber
            };
        }
        private void PrepareSpotVehicleRelation(
            VehiclesData vehicleData, 
            ParkingSpotData parkingSpotData, 
            DateTime currentDateTime, 
            out SpotVehicleRelation? relation
        )
        {
            relation = _context.SpotVehicleRelations
                            .Where(relation => relation.ParkingSpot.SpotNumber == parkingSpotData.SpotNumber 
                            && relation.Vehicle.VehicleNumber == vehicleData.VehicleNumber)
                            .SingleOrDefault();
            if (relation == null)
            {
                relation = new SpotVehicleRelation
                {
                    Vehicle = vehicleData,
                    ParkingSpot = parkingSpotData,
                    Bills = new List<BillsData>() { new BillsData { AllottingTime = currentDateTime } }
                };
                parkingSpotData.SpotVehicleRelations.Add(relation);
            }
            else
            {
                relation.Bills.Add(new BillsData
                {
                    AllottingTime = currentDateTime,
                });
                _context.Update(relation);
            }
        }
        private VehiclesData GetVehicle(Vehicle vehicle)
        {
            var vehicleData = _context.Vehicles.SingleOrDefault(vhcl => vhcl.VehicleNumber == vehicle.VehicleNumber);
            if (vehicleData == null) vehicleData = _mapper.Map<VehiclesData>(vehicle);
            return vehicleData;
        }
        private ParkingSpotData GetParkingSpotBasedOnVehicle(Vehicle vehicle)
        {
            var parkingSpotData = _context.ParkingSpots
                            .Where(parkingSpot => parkingSpot.VehicleType == vehicle.VehicleType.ToString()
                            && parkingSpot.Status == SpotStatus.Available.ToString()).Include(spot => spot.SpotVehicleRelations).FirstOrDefault();
            if (parkingSpotData == null) throw new NoParkingSpotFound("No Parking Spot Found, Parking is full");
            return parkingSpotData;
        }
        private void SetParkingSpotStatusOccupied(ParkingSpotData? parkingSpotData)
        {
            parkingSpotData.Status = SpotStatus.Occupied.ToString();
            _context.Update(parkingSpotData);
        }
        private double GetChargeableAmountBasedOnTotalChargeableHours(int totalHours, IQueryable<ChargesData> charges)
        {

            double chargeableAmount = 0;
            if (totalHours > 2)
            {
                chargeableAmount += (totalHours - 2) * getChargeValue(ChargeName.RemainingParkingCharge.ToString(), charges);
                if (totalHours > 10)
                    chargeableAmount += Convert.ToInt32(Math.Floor(Convert.ToDouble(totalHours / 10))) * getChargeValue(ChargeName.ExtraParkingCharge.ToString(), charges);
            }
            chargeableAmount += (Math.Min(2, totalHours)) * getChargeValue(ChargeName.InitialParkingCharge.ToString(), charges);
            return chargeableAmount;
        }
        private void GetBillDataReadyForVehicleCheckout(string vehicleNumber, out BillsData? billData, out int totalHours)
        {
            billData = _context.Bills
                            .Include(_ => _.SpotVehicleRelation.Vehicle)
                            .Where(bill => bill.SpotVehicleRelation.Vehicle.VehicleNumber == vehicleNumber
                            && bill.CheckOutTime == null)
                            .Include(bill => bill.SpotVehicleRelation.ParkingSpot)
                            .SingleOrDefault();
            if (billData == null) throw new NoVehicleFound($"No vehicle found in parking of vehicle number {vehicleNumber}");
            billData.CheckOutTime = DateTime.Now;
            billData.SpotVehicleRelation.ParkingSpot.Status = SpotStatus.Available.ToString();
            totalHours = Convert.ToInt32(Math.Ceiling((billData.CheckOutTime - billData.AllottingTime).Value.TotalHours));
            billData.TotalBillableHours = totalHours;
        }
        private double getChargeValue(string chargeName, IQueryable<ChargesData> charges)
        {
            return charges.SingleOrDefault(charge => charge.ChargeName == chargeName).ChargeValue;
        }
        private FinancialStatementsData PrepareFinancialRecord(BillsData? billData)
        {
            var finiancialRecord = _context.FinancialStatements
                            .SingleOrDefault(statement => statement.Month == billData.CheckOutTime.Value.Month
                                && statement.Year == billData.CheckOutTime.Value.Year);
            if (finiancialRecord != null)
                finiancialRecord.AmountGained += (double)billData.TotalCharges;
            else
            {
                double spentAmount = GetSpentAmountOfMonth();
                finiancialRecord = new FinancialStatementsData
                {
                    AmountGained = (double)billData.TotalCharges,
                    AmountSpent = spentAmount,
                    Month = billData.CheckOutTime.Value.Month,
                    Year = billData.CheckOutTime.Value.Year
                };
            }
            return finiancialRecord;
        }
        private double GetSpentAmountOfMonth()
        {
            GetChargesOfRent(out double chargeOfTwoWheeler, out double chargeOfFourWheeler);
            double spentAmount = _context.ParkingSpots.Where(parkingSpot => parkingSpot.VehicleType == VehicleType.TwoWheeler.ToString()).Count() * chargeOfTwoWheeler +
                _context.ParkingSpots.Where(parkingSpot => parkingSpot.VehicleType == VehicleType.FourWheeler.ToString()).Count() * chargeOfFourWheeler;
            return spentAmount;
        }
        private void GetChargesOfRent(out double chargeOfTwoWheeler, out double chargeOfFourWheeler)
        {
            chargeOfTwoWheeler = _context.Charges.SingleOrDefault(charge => charge.ChargeName == ChargeName.Rent.ToString()
                                && charge.VehicleType == VehicleType.TwoWheeler.ToString()).ChargeValue;
            chargeOfFourWheeler = _context.Charges.SingleOrDefault(charge => charge.ChargeName == ChargeName.Rent.ToString()
                && charge.VehicleType == VehicleType.FourWheeler.ToString()).ChargeValue;
        }
        private static int FilterTheBillsAndGetCount(BillQuery billQuery, ref IQueryable<BillsData> vehicleBillQuery)
        {
            vehicleBillQuery = vehicleBillQuery.Where(bill => bill.AllottingTime.Date >= billQuery.StartDate.Date && bill.CheckOutTime.Value.Date <= billQuery.EndDate.Date);
            vehicleBillQuery = vehicleBillQuery.Where(bill => bill.TotalCharges >= billQuery.Min && bill.TotalCharges <= billQuery.Max);
            var count = vehicleBillQuery.Count();
            vehicleBillQuery = vehicleBillQuery.OrderBy(billQuery.SortColumn);
            if (billQuery.SortOrder == "desc") vehicleBillQuery = vehicleBillQuery.Reverse();
            vehicleBillQuery = vehicleBillQuery
                            .Skip(billQuery.PageSize * (billQuery.PageNo - 1))
                            .Take(billQuery.PageSize);
            vehicleBillQuery =
                vehicleBillQuery.Include(bill => bill.SpotVehicleRelation.ParkingSpot);
            return count;
        }
    }
}
