using Domain.Model;
using Domain.RepositoryInterface;
using Service.ServiceInterfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Services
{
    public class VehicleService : IVehicleService
    {
        private readonly IVehicleRepository _vehicleRepository;
        public VehicleService(IVehicleRepository vehicleRepository)
        {
            _vehicleRepository = vehicleRepository;
        }

        public CheckInReceipt AllotParkingSpot(Vehicle vehicle)
        {
            return _vehicleRepository.AllotParkingSpot(vehicle);
        }

        public Bill CheckoutAndGenerateBill(string vehicleNumber)
        {
            var bill = _vehicleRepository.CheckoutAndGenerateBill(vehicleNumber);
            return bill;
        }
        public BillList GetBills(string vehicleNumber, BillQuery billQuery)
        {
            var billList = _vehicleRepository.GetBills(vehicleNumber, billQuery);
            return billList;
        }
        public string GetVehicleType(string vehicleNumber)
        {
            return _vehicleRepository.GetVehicleType(vehicleNumber);
        }
    }
}
