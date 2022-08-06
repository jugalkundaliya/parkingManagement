using AutoMapper;
using Domain.Model;
using Domain.RepositoryInterface;
using Exceptions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Persistence.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly ParkingManagementContext _context;
        private readonly IMapper _mapper;
        public UserRepository(IMapper mapper)
        {
            _context = new();
            _mapper = mapper;
        }
        public string Authenticate(UserCredentials credentials)
        {
            var user = _context.User.SingleOrDefault(user => user.UserName == credentials.UserName);
            if (user == null) throw new UserNotFound("Unable to find user please check user name");
            bool verified = BCrypt.Net.BCrypt.Verify(credentials.Password, user.Password);
            if (!verified) throw new PasswordNotCorrect("Incorrect Password");
            return user.Role;
        }

        public string InitialPasswordUpdate(UserCredentials userCredentials)
        {
            var user = _context.User.SingleOrDefault(user => user.UserName == userCredentials.UserName && userCredentials.Password == user.Password);
            if (user == null) throw new UserNotFound("Unable to find user please check user name");
            user.Password = BCrypt.Net.BCrypt.HashPassword(userCredentials.Password);
            _context.User.Update(user);
            _context.SaveChanges();
            return user.Role;
        }
    }
}
