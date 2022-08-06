using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Exceptions
{
    public class UserNotFound : Exception
    {
        public string ErrorCode = "418";
        public UserNotFound(string message)
            : base(message)
        {

        }
    }
}
