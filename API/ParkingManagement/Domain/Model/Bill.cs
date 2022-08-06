using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Model
{
    public class Bill
    {
        public DateTime AllottingTime { get; set; }
        public DateTime CheckoutTime { get; set; }
        public List<BillCharges> BillCharges { get; set; }
        public TimeSpan TotalHours { get; set; }
        public int TotalBillableHours { get; set; }
        public double TotalCharges { get; set; }
        public string SpotNumber { get; set; }
    }
}
