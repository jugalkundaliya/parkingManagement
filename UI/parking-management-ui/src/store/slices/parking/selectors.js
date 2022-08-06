export const getParkingSelector = (state) => state.parking;
export const getParkingChargesSelector = (state) =>
  state.parking.vehicleCharges;
export const getReport = (state) => state.parking.report;
export const getMonthlyReport = (state) => state.parking.report.monthlyStat;
export const getYearlyReport = (state) => state.parking.report.yearlyStat;
