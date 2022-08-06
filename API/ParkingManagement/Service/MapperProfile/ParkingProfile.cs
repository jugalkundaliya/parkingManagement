using AutoMapper;
using Domain.Model;
using Service.ParsingModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.MapperProfile
{
    public class ParkingProfile : Profile
    {
        public ParkingProfile()
        {
            CreateMap<ParsedParkingSpot, ParkingSpot>();
            CreateMap<ParsedCharges, Charge>();
            CreateMap<Charge, ParsedCharges>();
        }
    }
}
