using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace Persistence.DataModel
{
    [Table("BillCharges")]
    public class BillChargesData
    {
        [Key]
        public Guid Id { get; set; }
        [Required]
        public int Hours { get; set; }
        [Required]
        public double ChargedAmount { get; set; }
        public BillsData Bill { get; set; }
        public ChargesData Charge { get; set; }
    }
}
