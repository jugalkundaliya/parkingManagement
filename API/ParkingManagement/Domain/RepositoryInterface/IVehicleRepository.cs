using Domain.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.RepositoryInterface
{
    public interface IVehicleRepository
    {
        CheckInReceipt AllotParkingSpot(Vehicle vehicle);
        Bill CheckoutAndGenerateBill(string vehicleNumber);
        BillList GetBills(string vehicleNumber, BillQuery billQuery);
        string GetVehicleType(string vehicleNumber);
        List<Charge> GetChargesAccordingToVehicleType(string vehicleType);
    }
}
