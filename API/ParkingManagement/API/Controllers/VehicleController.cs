using API.Dto;
using AutoMapper;
using Domain.Model;
using Exceptions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Service.ServiceInterfaces;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VehicleController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IVehicleService _vehicleService;
        public VehicleController(IMapper mapper, IVehicleService vehicleService)
        {
            _mapper = mapper;
            _vehicleService = vehicleService;
        }
        [HttpPost("allot")]
        public ActionResult<CheckInReceipt> AllotParking([FromBody] VehicleDto vehicle)
        {
            try
            {
                CheckInReceipt receipt = _vehicleService.AllotParkingSpot(_mapper.Map<Vehicle>(vehicle));
                return Ok(receipt);
            }
            catch (NoParkingSpotFound ex)
            {
                return NotFound(ex.Message);
            }
            catch (VehicleAlreadyExist ex)
            {
                return Conflict(ex.Message);
            }
        }
        [HttpPost("{vehicleNumber}/checkout")]
        public ActionResult<BillDto> CheckoutParking([FromRoute] string vehicleNumber)
        {
            try
            {
                Bill bill = _vehicleService.CheckoutAndGenerateBill(vehicleNumber);
                return Ok(_mapper.Map<BillDto>(bill));
            }
            catch (NoVehicleFound ex)
            {
                return NotFound(ex.Message);
            }
        }
        [HttpGet("{vehicleNumber}/bills")]
        public ActionResult<BillListDto> GetBills([FromRoute] string vehicleNumber, [FromQuery] BillQuery billQuery)
        {
            try
            {
                return Ok(_mapper.Map<BillListDto>(_vehicleService.GetBills(vehicleNumber, billQuery)));
            }
            catch (NoVehicleFound ex)
            {
                return NotFound(ex.Message);
            }
        }
        [HttpGet("{vehicleNumber}/vehicleType")]
        public ActionResult<string> GetVehicleType([FromRoute] string vehicleNumber)
        {
            try
            {
                string vehicleType = _vehicleService.GetVehicleType(vehicleNumber);
                return Ok(vehicleType);
            }
            catch (NoVehicleFound ex)
            {
                return NotFound(ex.Message);
            }
        }
    }
}
