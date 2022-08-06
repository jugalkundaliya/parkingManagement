using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Exceptions
{
    public class NoVehicleFound:Exception
    {
        public string ErrorCode = "416";
        public NoVehicleFound(string message)
           : base(message)
        {

        }
    }
}
