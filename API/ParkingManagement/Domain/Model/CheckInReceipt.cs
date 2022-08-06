using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Model
{
    public class CheckInReceipt
    {
        public string VehicleNumber { get; set; }
        public string SpotNumber { get; set; }
        public DateTime AllotedTime { get; set; }
    }
}
