using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Exceptions
{
    public class NoMonthlyStatementFound : Exception
    {
        public string ErrorCode = "417";
        public NoMonthlyStatementFound(string message)
            : base(message)
        {

        }
    }
}
