using Domain.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.ServiceInterfaces
{
    public interface IUserService 
    {
        string Authenticate(UserCredentials credentials);
        string InitialUpdatePassword(UserCredentials userCredentials);
    }
}
