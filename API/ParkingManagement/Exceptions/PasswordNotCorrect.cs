using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Exceptions
{
    public class PasswordNotCorrect : Exception
    {
        public string ErrorCode = "419";
        public PasswordNotCorrect(string message)
            : base(message)
        {

        }
    }
}
