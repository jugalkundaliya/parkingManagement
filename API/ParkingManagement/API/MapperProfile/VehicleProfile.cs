using API.Dto;
using AutoMapper;
using Domain.Model;

namespace API.MapperProfile
{
    public class VehicleProfile : Profile
    {
        public VehicleProfile()
        {
            CreateMap<VehicleDto, Vehicle>();
        }

    }
}
