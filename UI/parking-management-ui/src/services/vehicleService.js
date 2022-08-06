import httpService from "./httpService";
import $ from "jquery";

const url = "Vehicle/";
const getVehicleType = (vehicleNumber) => {
  return httpService.get(`${url}${vehicleNumber}/vehicleType`);
};
const allotParking = (vehicle) => {
  return httpService.post(`${url}allot`, vehicle);
};
const checkoutVehicle = (vehicleNumber) => {
  return httpService.post(`${url}${vehicleNumber}/checkout`);
};
const getVehicleBills = (vehicle) => {
  return httpService.get(
    `${url}${vehicle.vehicleNumber}/bills?${$.param(vehicle.filter)}`
  );
};
export default {
  allotParking,
  checkoutVehicle,
  getVehicleType,
  getVehicleBills,
};
