import formattingService from "../../../services/formattingService";

export const statementsInit = [
  {
    key: "spendings",
    label: "Spendings",
    textClass: "warning amount-numerical",
    isAmount: true,
  },
  {
    key: "earnings",
    label: "Earnings",
    textClass: "success amount-numerical",
    isAmount: true,
  },
  {
    labelContent: (statement) =>
      statement.amount < 0 ? "Loss Amount" : "Profit Amount",
    content: (statement) =>
      formattingService.formatCurrency(Math.abs(statement.amount)),
    isAmount: true,
  },
  {
    labelContent: (statement) => {
      return statement.amount < 0 ? "Loss" : "Profit";
    },
    content: (statement) => Math.abs(statement.percentage),
    textClass: " percentage-numerical",
  },
];

export const optionsForYearSelector = () => {
  const options = [];
  const currentYear = new Date().getFullYear();
  for (let index = currentYear; index > 1989; index--) options.push(index);
  return options;
};

export const getDataForChart = (data) => {
  return data?.map((d) => {
    return {
      name: ` ${months[d.monthYear.month - 1]}`,
      percentage: getNumberDataForChart(d.percentage),
      amount: getNumberDataForChart(d.amount),
      earnings: getNumberDataForChart(d.earnings),
    };
  });
};
export const months = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
];
const getNumberDataForChart = (number) => {
  return number === 0 ? null : number;
};
