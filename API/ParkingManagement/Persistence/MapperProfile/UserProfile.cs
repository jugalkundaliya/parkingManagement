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
    public class UserProfile : Profile
    {
        public UserProfile()
        {
            CreateMap<User, UserCredentials>();
            CreateMap<UserCredentials, User>();
        }
    }
}
