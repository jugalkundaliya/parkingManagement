using API.Dto;
using AutoMapper;
using Domain.Model;

namespace API.MapperProfile
{
    public class UserProfile : Profile
    {
        public UserProfile()
        {
            CreateMap<LoginDto, UserCredentials>();
        }
    }
}
