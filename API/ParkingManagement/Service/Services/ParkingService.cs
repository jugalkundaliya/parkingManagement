using AutoMapper;
using Domain.Model;
using Domain.RepositoryInterface;
using Service.ParsingModel;
using Service.ServiceInterfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Services
{
    public class ParkingService : IParkingService
    {
        private readonly IParkingRepository _parkingRepository;
        private readonly IParsingService _parsingService;
        private readonly IMapper _mapper;
        public ParkingService(IParkingRepository repository, IParsingService parsingService, IMapper mapper)
        {
            _parkingRepository = repository;
            _parsingService = parsingService;
            _mapper = mapper;
        }

        public List<ParkingSpot> GetParkingSpots(ParkingQuery? parkingQuery)
        {
            var spots = _parkingRepository.GetParkingSpots(parkingQuery);
            spots.ForEach(_ => _.VehicleNumber = null);
            return spots;
        }
        public Parking GetParking()
        {
            var parkingSpots = _parkingRepository.GetParkingSpots(null);
            return new Parking(parkingSpots);
        }
        public List<ParkingSpot> UploadParkingSpot(Stream? stream)
        {
            if (stream == null) stream = File.OpenRead(".\\DefaultCSV\\ParkingSpots.csv");
            List<ParsedParkingSpot>? parsedParkingSpots = _parsingService.GetParsedParkingSpots(stream);
            List<ParkingSpot> parkingSpots = _mapper.Map<List<ParkingSpot>>(parsedParkingSpots);
            return _parkingRepository.UploadParkingSpot(parkingSpots);
        }

        public List<Charge> GetCharges()
        {
            return _parkingRepository.GetCharges();
        }

        public List<Charge> UploadCharges(Stream? stream)
        {
            if (stream == null) stream = File.OpenRead(".\\DefaultCSV\\Charges.csv");
            List<ParsedCharges> parsedCharges = _parsingService.GetCharges(stream);
            List<Charge> charges = _mapper.Map<List<Charge>>(parsedCharges);
            return _parkingRepository.UploadCharges(charges);
        }

        public ProfitLoss GetMonthlyProfitLoss(MonthYear monthYear)
        {
            var profitLoss = _parkingRepository.GetMonthlyProfitLoss(monthYear);
            if (profitLoss == null) return new() { MonthYear = monthYear };
            return profitLoss;
        }

        public YearlyProfitLoss GetYearlyProfitLoss(int year)
        {
            List<ProfitLoss> profitLosses = new();
            if (year == 0) year = DateTime.Now.Year;
            for (int month = 1; month <= 12; month++)
                profitLosses.Add(GetMonthlyProfitLoss(new MonthYear { Month = month, Year = year }));
            return new YearlyProfitLoss(year, profitLosses);
        }

        public BillList GetBillsAccordingToParkingSpot(string spotNumber, BillQuery billQuery)
        {
            return _parkingRepository.GetBillsAccordingToParkingSpot(spotNumber, billQuery);
        }

        public Charge UpdateChargeAmount(Charge charge)
        {
            return _parkingRepository.UpdateChargeAmount(charge);
            throw new NotImplementedException();
        }
    }
}
