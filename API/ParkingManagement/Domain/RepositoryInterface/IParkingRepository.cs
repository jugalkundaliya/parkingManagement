using Domain.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.RepositoryInterface
{
    public interface IParkingRepository
    {
        List<ParkingSpot> UploadParkingSpot(List<ParkingSpot> parkingSpots);
        List<ParkingSpot> GetParkingSpots(ParkingQuery? parkingQuery);
        List<Charge> GetCharges();
        List<Charge> UploadCharges(List<Charge> charges);
        ProfitLoss GetMonthlyProfitLoss(MonthYear monthYear);
        ProfitLoss GetTotalYearlyProfitLoss(int year);
        BillList GetBillsAccordingToParkingSpot(string spotNumber, BillQuery billQuery);
        Charge UpdateChargeAmount(Charge charge);
    }
}
