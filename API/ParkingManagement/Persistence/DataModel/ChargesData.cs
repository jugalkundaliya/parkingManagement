using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace Persistence.DataModel
{
    [Table("Charges")]
    public class ChargesData
    {
        [Key]
        public Guid Id { get; set; }
        [Required]
        public string VehicleType { get; set; }
        [Required]
        public string ChargeName { get; set; }
        [Required]
        public double ChargeValue { get; set; }
        [Required]
        public string ChargeDuration { get; set; }

    }
}
