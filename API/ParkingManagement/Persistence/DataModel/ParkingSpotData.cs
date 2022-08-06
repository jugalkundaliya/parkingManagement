using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Persistence.DataModel
{
    [Table("ParkingSpots")]
    public class ParkingSpotData
    {
        [Key]
        public Guid Id { get; set; }
        [Required]
        public string SpotNumber { get; set; }
        [Required]
        public string Status { get; set; }
        [Required]
        public string VehicleType { get; set; }
        public ICollection<SpotVehicleRelation> SpotVehicleRelations { get; set; } =  new List<SpotVehicleRelation>();
    }
}
