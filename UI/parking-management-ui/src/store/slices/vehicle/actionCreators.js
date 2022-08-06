import vehicleService from "../../../services/vehicleService";
import { apiCallBegan } from "../../apiActionCreator";
import { vehicleBillsReceived, vehicleErrorReceived } from "./slice";

export const loadVehicleBills = (vehicle) =>
  apiCallBegan({
    method: (vehicle) => vehicleService.getVehicleBills(vehicle),
    data: vehicle,
    onSuccess: vehicleBillsReceived.type,
    onError: vehicleErrorReceived.type,
  });
