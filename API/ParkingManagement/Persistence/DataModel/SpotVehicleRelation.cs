using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Persistence.DataModel
{
    [Table("SpotVehicleRelations")]
    public class SpotVehicleRelation
    {
        [Key]
        public Guid Id { get; set; }
        [Required]
        public VehiclesData Vehicle { get; set; }
        [Required]
        public ParkingSpotData ParkingSpot { get; set; }
        public ICollection<BillsData> Bills { get; set; } = new List<BillsData>();

    }
}
