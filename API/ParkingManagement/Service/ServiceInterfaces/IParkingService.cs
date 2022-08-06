using Domain.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.ServiceInterfaces
{
    public interface IParkingService
    {
        List<ParkingSpot> UploadParkingSpot(Stream? stream);
        List<ParkingSpot> GetParkingSpots(ParkingQuery? parkingQuery);
        Parking GetParking();
        List<Charge> GetCharges();
        List<Charge> UploadCharges(Stream? file);
        ProfitLoss GetMonthlyProfitLoss(MonthYear monthYear);
        YearlyProfitLoss GetYearlyProfitLoss(int year);
        BillList GetBillsAccordingToParkingSpot(string spotNumber, BillQuery billQuery);
        Charge UpdateChargeAmount(Charge charge);
    }
}
