namespace API.Dto
{
    public class BillListDto
    {
        public long Count { get; set; }
        public List<BillDto> Bills { get; set; }
    }
}
