import parkingService from "../../../services/parkingService";
import { apiCallBegan } from "../../apiActionCreator";
import {
  monthlyStatReceived,
  monthlyStatRequested,
  parkingChargesReceived,
  parkingChargesRequested,
  parkingErrorReceived,
  parkingReceived,
  parkingRequested,
  parkingSpotsReceived,
  yearlyStatReceived,
  yearlyStatRequested,
} from "./slice";

export const loadParking = () =>
  apiCallBegan({
    method: () => parkingService.getParking(),
    data: null,
    onStart: parkingRequested.type,
    onSuccess: parkingReceived.type,
    onError: parkingErrorReceived.type,
  });
export const loadParkingSpots = () =>
  apiCallBegan({
    method: () => parkingService.getParkingSpots(),
    data: null,
    onStart: parkingRequested.type,
    onSuccess: parkingSpotsReceived.type,
    onError: parkingErrorReceived.type,
  });
export const loadCharges = () =>
  apiCallBegan({
    method: () => parkingService.getParkingCharges(),
    data: null,
    onStart: parkingChargesRequested.type,
    onSuccess: parkingChargesReceived.type,
    onError: parkingErrorReceived.type,
  });
export const loadMonthlyStat = (monthYear) =>
  apiCallBegan({
    method: (monthYear) => parkingService.getMonthlyStatements(monthYear),
    data: monthYear,
    onStart: monthlyStatRequested.type,
    onSuccess: monthlyStatReceived.type,
    onError: parkingErrorReceived.type,
  });
export const loadYearlyStat = (year) =>
  apiCallBegan({
    method: (year) => parkingService.getYearlyStatements(year),
    data: year,
    onStart: yearlyStatRequested.type,
    onSuccess: yearlyStatReceived.type,
    onError: parkingErrorReceived.type,
  });
