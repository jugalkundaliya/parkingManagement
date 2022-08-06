using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Model
{
    public class Charge
    {
        public VehicleType VehicleType { get; set; }
        public ChargeName ChargeName { get; set; }
        public double ChargeValue { get; set; }
        public string ChargeDuration { get; set; }
    }
}
