namespace API.Dto
{
    public class BillChargesDto
    {
        public int Hours { get; set; }
        public ChargesDto Charge { get; set; }
        public double ChargedAmount { get; set; }
    }
}
