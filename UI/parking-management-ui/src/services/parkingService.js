import httpService from "./httpService";
import $ from "jquery";
const url = "Parking";
export const getParking = () => {
  return httpService.get(url);
};
export const getParkingSpots = () => {
  return httpService.get(`${url}/spots`);
};
export const getParkingCharges = () => {
  return httpService.get(`${url}/charges`);
};
export const getMonthlyStatements = (monthYear) => {
  return httpService.get(
    `${url}/profit-loss/monthly-statement?${$.param(monthYear)}`
  );
};
export const getYearlyStatements = (year) => {
  return httpService.get(`${url}/profit-loss/yearly-statement?year=${year}`);
};
export default {
  getParking,
  getParkingCharges,
  getMonthlyStatements,
  getYearlyStatements,
  getParkingSpots,
};
