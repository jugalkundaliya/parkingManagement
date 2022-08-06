using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Model
{
    public class BillCharges
    {
        public int Hours { get; set; }
        public Charge Charge{ get; set; }
        public double ChargedAmount { get; set; }
    }
}
