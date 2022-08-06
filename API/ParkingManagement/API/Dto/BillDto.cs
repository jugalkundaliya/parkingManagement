using Domain.Model;

namespace API.Dto
{
    public class BillDto
    {
        public double TotalCharges { get; set; }
        public string AllottingTime { get; set; }
        public string CheckoutTime { get; set; }
        public string TotalHours { get; set; }
        public int TotalBillableHours { get; set; }
        public List<BillCharges> BillCharges { get; set; }
        public string SpotNumber { get; set; }
    }
}
