using Service.ParsingModel;
using Service.ServiceInterfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Services
{
    public class ParsingService : IParsingService
    {
        public List<ParsedCharges> GetCharges(Stream stream)
        {
            List<ParsedCharges> charges = new List<ParsedCharges>();
            using StreamReader cSVParser = new(stream);
            string[] fields = cSVParser.ReadLine().Split(",");
            int vehicleTypeIndex = GetIndex(fields, "Vehicle Type"),
                chargeNameIndex = GetIndex(fields, "Charge Name"),
                chargeValueIndex = GetIndex(fields, "Charge Value"),
                chargeDurationIndex = GetIndex(fields, "Charge Duration");
            while (!cSVParser.EndOfStream && fields.Length >= 0)
            {
                // Read current line fields, pointer moves to the next line.
                string[] values = cSVParser.ReadLine().Split(",");
                if (values.Length == 4)
                    charges.Add(new ParsedCharges
                    {
                        VehicleType = values[vehicleTypeIndex],
                        ChargeDuration = values[chargeDurationIndex],
                        ChargeName = values[chargeNameIndex],
                        ChargeValue = Convert.ToDouble(values[chargeValueIndex]),
                    });
            }
            return charges;
        }

        public List<ParsedParkingSpot> GetParsedParkingSpots(Stream stream)
        {
            List<ParsedParkingSpot> parsedParkingSpots = new ();
            using StreamReader cSVParser = new(stream);
            string[] fields = cSVParser.ReadLine().Split(",");
            int spotNumberIndex = GetIndex(fields, "Spot Number"),
                vehicleTypeIndex = GetIndex(fields, "Vehicle Type");
            while (!cSVParser.EndOfStream && fields.Length >= 0)
            {
                // Read current line fields, pointer moves to the next line.
                string[] values = cSVParser.ReadLine().Split(",");
                if(values.Length == 2)   
                    parsedParkingSpots.Add(new ParsedParkingSpot
                    {
                        SpotNumber = values[spotNumberIndex],
                        VehicleType= values[vehicleTypeIndex]
                    });
            }
            return parsedParkingSpots;
        }
        private static int GetIndex(string[] arr, string value)
        {
            return Array.FindIndex(arr, val => val.Equals(value));
        }
    }
}
