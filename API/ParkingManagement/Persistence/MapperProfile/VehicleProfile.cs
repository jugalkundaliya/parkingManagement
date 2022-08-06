using AutoMapper;
using Domain.Model;
using Persistence.DataModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Persistence.MapperProfile
{
    public class VehicleProfile : Profile
    {
        public VehicleProfile()
        {
            CreateMap<Vehicle, VehiclesData>();
            CreateMap<BillsData, Bill>()
                .ForMember(dest => dest.TotalHours, opt => opt.MapFrom(a => a.CheckOutTime-a.AllottingTime))
                .ForMember(dest => dest.SpotNumber, opt => opt.MapFrom(a => a.SpotVehicleRelation.ParkingSpot.SpotNumber));
            CreateMap<BillChargesData, BillCharges>();
        }
    }
}
