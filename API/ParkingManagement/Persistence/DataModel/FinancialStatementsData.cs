using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Persistence.DataModel
{
    [Table("FinancialStatements")]
    public class FinancialStatementsData
    {
        [Key]
        public Guid Id { get; set; }
        public int Month { get; set; }
        public int Year { get; set; }
        public double AmountSpent { get; set; }
        public double AmountGained { get; set; }
    }
}
