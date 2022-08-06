using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Model
{
    public class YearlyProfitLoss
    {
        public int Year { get; set; }
        public double Spendings { get; set; }
        public double Earnings { get; set; }
        public double Amount { get; set; }
        public double Percentage { get; set; }
        public List<ProfitLoss> ProfitLosses { get; set; }
        public YearlyProfitLoss(int year, List<ProfitLoss> profitLosses)
        {
            Year = year;
            ProfitLosses = profitLosses;
            Spendings = profitLosses.Sum(profitLoss => profitLoss.Spendings);
            Earnings = profitLosses.Sum(profitLoss => profitLoss.Earnings);
            Amount = profitLosses.Sum(profitLoss => profitLoss.Amount);
            if (Spendings != 0)
                Percentage = Math.Round((Earnings - Spendings) / Spendings * 100, 2);
        }
    }
}
