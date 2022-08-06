using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Model
{
    public class ProfitLoss
    {
        public MonthYear MonthYear { get; set; }
        public double Spendings { get; set; }
        public double Earnings { get; set; }
        public double Amount { get; set; }
        public double Percentage { get; set; }
        public ProfitLoss(double gained, double spent)
        {
            Spendings = spent;
            Earnings = gained;
            Amount = gained - spent;
            if (spent != 0)
                Percentage = Math.Round((gained - spent) / spent * 100, 2);
        }
        public ProfitLoss()
        {

        }
    }
}
