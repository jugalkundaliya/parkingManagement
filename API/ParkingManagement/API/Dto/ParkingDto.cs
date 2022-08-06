namespace API.Dto
{
    public class ParkingDto
    {
        public List<ParkingSpotDto> ParkingSpots { get; set; }
        public int TotalNumberOfSpots { get; set; }
        public int TotalNumberOfOccupiedSpots { get; set; }
        public int TotalNumberOfVacantSpots { get; set; }
        public int NumberOfVacantTwoWheelerSpot { get; set; }
        public int NumberOfVacantFourWheelerSpot { get; set; }
    }
}
    