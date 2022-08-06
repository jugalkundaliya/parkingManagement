import { combineReducers } from "@reduxjs/toolkit";
import parking from "./slices/parking/slice";
import vehicle from "./slices/vehicle/slice";

export const reducer = combineReducers({
  parking,
  vehicle,
});
