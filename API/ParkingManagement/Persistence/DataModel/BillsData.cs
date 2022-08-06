using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Persistence.DataModel
{
    [Table("Bills")]
    public class BillsData
    {
        [Key]
        public Guid Id { get; set; }
        [Required]
        public DateTime AllottingTime { get; set; }
        public DateTime? CheckOutTime { get; set; }
        public int? TotalBillableHours { get; set; }
        public double? TotalCharges { get; set; }
        [Required]
        public SpotVehicleRelation SpotVehicleRelation { get; set; }
        public List<BillChargesData> BillCharges { get; set; }
    }
}
