using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Model
{
    public class BillQuery
    {
        public int PageNo { get; set; } = 1;
        public int PageSize { get; set; } = 5;
        public string SortColumn { get; set; } = "allottingTime";
        public string SortOrder { get; set; } = "desc";
        public long Max { get; set; } = long.MaxValue;
        public long Min { get; set; } = 0;
        public DateTime StartDate { get; set; } = DateTime.MinValue;
        public DateTime EndDate { get; set; } = DateTime.Now;

    }
}
