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
    public class ParkingProfile : Profile
    {
        public ParkingProfile()
        {
            CreateMap<ParkingSpot, ParkingSpotData>();
            CreateMap<ParkingSpotData, ParkingSpot>()
                .ForMember(dest => dest.VehicleNumber,
                    opt => opt.MapFrom(src => src.SpotVehicleRelations
                    .SingleOrDefault(relation => relation.Bills.Any(bill => bill.CheckOutTime == null))
                    .Vehicle.VehicleNumber));
            CreateMap<ChargesData, Charge>();
            CreateMap<Charge, ChargesData>();
            CreateMap<FinancialStatementsData, ProfitLoss>()
                .ForMember(dest => dest.MonthYear, opt => opt.MapFrom(src =>new MonthYear { Month = src.Month, Year = src.Year }))
                .ConstructUsing(dest => new ProfitLoss(dest.AmountGained, dest.AmountSpent));
        }
    }
}
