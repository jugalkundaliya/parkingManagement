using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Model
{
    public class BillList
    {
        public long Count { get; set; }
        public List<Bill> Bills { get; set; }
    }
}
