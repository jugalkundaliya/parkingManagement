using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Model
{
    public class ParkingSpot
    {
        public string SpotNumber { get; set; }
        public SpotStatus Status { get; set; }
        public VehicleType VehicleType { get; set; }
        public string VehicleNumber { get; set; }
    }
}
