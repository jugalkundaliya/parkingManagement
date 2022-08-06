using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.ParsingModel
{
    public class ParsedCharges
    {
        public string VehicleType { get; set; }
        public string ChargeName { get; set; }
        public double ChargeValue { get; set; }
        public string ChargeDuration { get; set; }
    }
}
