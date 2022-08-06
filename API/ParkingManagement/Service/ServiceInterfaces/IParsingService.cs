using Service.ParsingModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.ServiceInterfaces
{
    public interface IParsingService
    {
        List<ParsedParkingSpot> GetParsedParkingSpots(Stream stream);
        List<ParsedCharges> GetCharges(Stream stream);
    }
}
