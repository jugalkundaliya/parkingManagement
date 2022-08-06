using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using API.Dto;
using Domain.Model;
using Service.ServiceInterfaces;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Admin, Manager")]
    public class ParkingController : ControllerBase
    {
        private readonly IParkingService _parkingService;
        private readonly IMapper _mapper;
        public ParkingController(IParkingService parkingService, IMapper mapper)
        {
            _parkingService = parkingService;
            _mapper = mapper;
        }
        [AllowAnonymous]
        [HttpGet("spots", Name = "GetParkingSpots")]
        public ActionResult<ParkingSpot> GetParkingSpots([FromQuery] ParkingQuery? parkingQuery)
        {
            return Ok(_parkingService.GetParkingSpots(parkingQuery));
        }

        [HttpGet]
        public ActionResult<Parking> GetParking()
        {
            return Ok(_parkingService.GetParking());
        }
        [HttpPatch("charges")]
        public ActionResult<Charge> UpdateChargeAmount(Charge charge)
        {
            Charge updatedCharge = _parkingService.UpdateChargeAmount(charge);
            return Ok(updatedCharge);
        }
        [HttpGet("spot/{spotNumber}/bills")]
        public ActionResult<BillListDto> GetBillsAccordingToParkingSpot(string spotNumber, [FromQuery] BillQuery billQuery)
        {
            BillList list = _parkingService.GetBillsAccordingToParkingSpot(spotNumber, billQuery);
            return Ok(_mapper.Map<BillListDto>(list));
        }

        [HttpPost("spots")]
        public ActionResult UploadParkingSpot(IFormFile? formFile)
        {
            Stream? file = formFile?.OpenReadStream();
            List<ParkingSpot> parkingSpots = _parkingService.UploadParkingSpot(file);
            return CreatedAtRoute("GetParkingSpots", parkingSpots);
        }
        [AllowAnonymous]
        [HttpGet("charges", Name = "GetCharges")]
        public ActionResult<List<Charge>> GetCharges()
        {
            return Ok(_parkingService.GetCharges());
        }
        [Authorize(Roles = "Admin")]
        [HttpPost("charges")]
        public ActionResult UploadCharges(IFormFile? formFile)
        {
            Stream? file = formFile?.OpenReadStream();
            List<Charge> charges = _parkingService.UploadCharges(file);
            return CreatedAtRoute("GetCharges", charges);
        }
        [Authorize(Roles = "Admin")]
        [HttpGet("profit-loss/monthly-statement")]
        public ActionResult<ProfitLoss> GetMonthlyProfitLoss([FromQuery] MonthYear monthYear)
        {
            ProfitLoss profitLoss = _parkingService.GetMonthlyProfitLoss(monthYear);
            return Ok(profitLoss);
        }
        [Authorize(Roles = "Admin")]
        [HttpGet("profit-loss/yearly-statement")]
        public ActionResult<YearlyProfitLoss> GetYearlyProfitLoss([FromQuery] int year)
        {
            YearlyProfitLoss profitLoss = _parkingService.GetYearlyProfitLoss(year);
            return Ok(profitLoss);
        }
    }
}
