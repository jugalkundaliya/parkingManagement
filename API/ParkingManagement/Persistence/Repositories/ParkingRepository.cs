using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Domain.Model;
using Domain.RepositoryInterface;
using Persistence.DataModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Exceptions;

namespace Persistence.Repositories
{
    public class ParkingRepository : IParkingRepository
    {
        private readonly ParkingManagementContext _context;
        private readonly IMapper _mapper;
        private readonly VehicleRepository _vehicleRepository;
        public ParkingRepository(IMapper mapper)
        {
            _context = new();
            _mapper = mapper;
            _vehicleRepository = new(mapper);
        }

        public BillList GetBillsAccordingToParkingSpot(string spotNumber, BillQuery billQuery)
        {
            var vehicleBillQuery = _context.SpotVehicleRelations.Where(relation => relation.ParkingSpot.SpotNumber==spotNumber)
                .SelectMany(relation => relation.Bills);
            _vehicleRepository.ExtractBills(billQuery, vehicleBillQuery, out int count, out List<Bill> bills);
            return new BillList
            {
                Count = count,
                Bills = bills
            };
        }

        public List<Charge> GetCharges()
        {
            return _mapper.Map<List<Charge>>(_context.Charges
                .Where(charge => charge.ChargeName != ChargeName.Rent.ToString()));
        }

        public ProfitLoss GetMonthlyProfitLoss(MonthYear monthYear)
        {
            return _mapper.Map<ProfitLoss>(_context.FinancialStatements
                .SingleOrDefault(statement => statement.Month == monthYear.Month && statement.Year == monthYear.Year));
        }

        public List<ParkingSpot> GetParkingSpots(ParkingQuery? parkingQuery)
        {
            var parkingSpots = _context.ParkingSpots.AsQueryable();
            if (parkingQuery?.SpotStatus != null)
                parkingSpots = parkingSpots.Where(spot => spot.Status == parkingQuery.SpotStatus);
            if (parkingQuery?.VehicleType != null)
                parkingSpots = parkingSpots.Where(spot => spot.VehicleType == parkingQuery.VehicleType);
            return _mapper.Map<List<ParkingSpot>>(parkingSpots
                .Include(spot => spot.SpotVehicleRelations)
                .ThenInclude(relation => relation.Vehicle)
                .Include(spot => spot.SpotVehicleRelations)
                .ThenInclude(relation => relation.Bills));
        }
        public ProfitLoss GetTotalYearlyProfitLoss(int year)
        {
            var monthYear = new MonthYear { Year = year, Month= 0 };
            var financialData = _context.FinancialStatements.Where(statement => statement.Year == year);
            if (financialData.Any())
            {

                var spent = financialData.Sum(statement => statement.AmountSpent);
                var gained = financialData.Sum(statement => statement.AmountGained);
                return new ProfitLoss(gained, spent)
                {
                    MonthYear = monthYear,
                };
            }
            return new ProfitLoss { MonthYear = monthYear };
        }

        public Charge UpdateChargeAmount(Charge charge)
        {
            var chargesData = _context.Charges
                .SingleOrDefault(_ => _.ChargeName == charge.ChargeName.ToString() && _.VehicleType == charge.VehicleType.ToString());
            if (chargesData == null) return null;
            chargesData.ChargeValue = charge.ChargeValue;
            _context.Update(chargesData);
            _context.SaveChanges();
            return _mapper.Map<Charge>(chargesData);
        }

        public List<Charge> UploadCharges(List<Charge> charges)
        {
            var chargesDatas = _context.Charges;
            charges.ForEach(charge =>
            {
                if (chargesDatas.FirstOrDefault(chrg => chrg.ChargeName == charge.ChargeName.ToString()
                    && chrg.VehicleType == charge.VehicleType.ToString()) == null)
                {
                    chargesDatas.Add(_mapper.Map<ChargesData>(charge));
                }
            });
            _context.SaveChanges();
            return _mapper.Map<List<Charge>>(chargesDatas);
        }

        public List<ParkingSpot> UploadParkingSpot(List<ParkingSpot> parkingSpots)
        {
            var parkingSpotDatas = _context.ParkingSpots;
            parkingSpots.ForEach(parkingSpot =>
            {
                if (parkingSpotDatas.FirstOrDefault(spot => spot.SpotNumber == parkingSpot.SpotNumber) == null)
                    parkingSpotDatas.Add(_mapper.Map<ParkingSpotData>(parkingSpot));
            });
            _context.SaveChanges();
            return _mapper.Map<List<ParkingSpot>>(parkingSpotDatas.ToList());
        }

    }
}
