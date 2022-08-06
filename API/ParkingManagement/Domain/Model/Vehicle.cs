using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Model
{
    public class Vehicle
    {
        public string VehicleNumber { get; set; }
        public List<Bill> Bills { get; set; }
        public VehicleType VehicleType { get; set; }
    }
}
