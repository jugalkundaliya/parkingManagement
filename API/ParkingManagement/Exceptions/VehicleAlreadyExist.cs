using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Exceptions
{
    public class VehicleAlreadyExist : Exception
    {
        public string ErrorCode = "418";
        public VehicleAlreadyExist(string message)
            : base(message)
        {

        }
    }
}
