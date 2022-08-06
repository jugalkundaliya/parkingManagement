using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
namespace Exceptions
{
    public class NoParkingSpotFound : Exception
    {
        public string ErrorCode = "415";
        public NoParkingSpotFound(string message) 
            : base(message)
        {
                
        }
    }
}