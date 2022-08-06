using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Model
{
    public class Parking
    {
        public List<ParkingSpot> ParkingSpots { get; set; }
        public int TotalNumberOfSpots { get; set; }
        public int TotalNumberOfOccupiedSpots { get; set; }
        public int TotalNumberOfVacantSpots { get; set; }
        public int NumberOfVacantTwoWheelerSpot { get; set; }
        public int NumberOfVacantFourWheelerSpot { get; set; }
        public Parking(List<ParkingSpot> parkingSpots)
        {
            ParkingSpots = parkingSpots;
            NumberOfVacantFourWheelerSpot = parkingSpots
                 .Where(spot => spot.Status == SpotStatus.Available && spot.VehicleType == VehicleType.FourWheeler).Count();
            NumberOfVacantTwoWheelerSpot = parkingSpots
                .Where(spot => spot.Status == SpotStatus.Available && spot.VehicleType == VehicleType.TwoWheeler).Count();
            TotalNumberOfVacantSpots = parkingSpots
                .Where(spot => spot.Status == SpotStatus.Available).Count();
            TotalNumberOfOccupiedSpots = parkingSpots
                .Where(spot => spot.Status == SpotStatus.Occupied).Count();
            TotalNumberOfSpots = parkingSpots.Count;
        }
    }
}
