using Domain.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.RepositoryInterface
{
    public interface IUserRepository
    {
        string Authenticate(UserCredentials credentials);
        string InitialPasswordUpdate(UserCredentials userCredentials);
    }
}
