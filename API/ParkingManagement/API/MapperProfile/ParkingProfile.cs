using AutoMapper;
using API.Dto;
using Domain.Model;

namespace API.MapperProfile
{
    public class ParkingProfile : Profile
    {
        public ParkingProfile()
        {
            CreateMap<ParkingSpot, ParkingSpotDto>();
            CreateMap<ParkingSpotDto, ParkingSpot>();
            CreateMap<Parking, ParkingDto>();
            CreateMap<ChargesDto, Charge>();
            CreateMap<Charge, ChargesDto>();
            CreateMap<Bill, BillDto>()
                .ForMember(dest => dest.TotalHours, opt => opt.MapFrom(src => $"{Math.Floor(src.TotalHours.TotalHours):00}:{src.TotalHours:mm\\:ss}"))
                .ForMember(dest => dest.AllottingTime, opt => opt.MapFrom(src => src.AllottingTime.ToString("MMMM dd yyyy, HH:mm:ss")))
                .ForMember(dest => dest.CheckoutTime, opt => opt.MapFrom(src => src.CheckoutTime.ToString("MMMM dd yyyy, HH:mm:ss")));
            CreateMap<BillList, BillListDto>();
            CreateMap<BillCharges, BillChargesDto>();
        }
    }
}
