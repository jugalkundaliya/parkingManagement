using Domain.Model;
using Domain.RepositoryInterface;
using Service.ServiceInterfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public string Authenticate(UserCredentials credentials)
        {
            return _userRepository.Authenticate(credentials);
        }

        public string InitialUpdatePassword(UserCredentials userCredentials)
        {
            return _userRepository.InitialPasswordUpdate(userCredentials);
        }
    }
}
