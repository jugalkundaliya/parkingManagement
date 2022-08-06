import { createSlice } from "@reduxjs/toolkit";
const vehicleSlice = createSlice({
  name: "vehicle",
  initialState: {
    loading: true,
    vehicleBills: [],
    vehicleNumber: "",
    error: null,
    billCount: 0,
  },
  reducers: {
    vehicleBillsReceived: (vehicle, action) => {
      vehicle.billCount = action.payload.count;
      vehicle.vehicleBills = [...action.payload.bills];
      vehicle.loading = false;
    },
    vehicleReceived: (vehicle, action) => {
      vehicle.vehicleNumber = action.payload.vehicleNumber;
    },
    vehicleErrorReceived: (vehicle, action) => {
      vehicle.error = action.payload;
    },
    vehicleRemoved: (vehicle, action) => {
      vehicle.billCount = 0;
      vehicle.vehicleNumber = "";
      vehicle.error = null;
      vehicle.vehicleBills = [];
      vehicle.loading = true;
    },
  },
});
export default vehicleSlice.reducer;
export const {
  vehicleBillsReceived,
  vehicleReceived,
  vehicleErrorReceived,
  vehicleRemoved,
} = vehicleSlice.actions;
