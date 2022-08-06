import { createSlice } from "@reduxjs/toolkit";

const parkingSlice = createSlice({
  name: "parking",
  initialState: {
    numberOfVacantFourWheelerSpot: 0,
    numberOfVacantTwoWheelerSpot: 0,
    parkingSpots: [],
    totalNumberOfOccupiedSpots: 0,
    totalNumberOfSpots: 0,
    totalNumberOfVacantSpots: 0,
    vehicleCharges: { loading: false, charges: [] },
    report: {
      isLoading: false,
      monthlyStat: { data: null, isLoading: true },
      yearlyStat: { data: null, isLoading: true },
    },
    error: null,
    isLoading: false,
  },
  reducers: {
    parkingRequested: (parking, action) => {
      parking.isLoading = true;
    },
    parkingReportRequested: (parking, action) => {
      parking.report.isLoading = true;
    },
    parkingReceived: (parking, action) => {
      parking.numberOfVacantFourWheelerSpot =
        action.payload.numberOfVacantFourWheelerSpot;
      parking.numberOfVacantTwoWheelerSpot =
        action.payload.numberOfVacantTwoWheelerSpot;
      parking.parkingSpots = action.payload.parkingSpots;
      parking.totalNumberOfOccupiedSpots =
        action.payload.totalNumberOfOccupiedSpots;
      parking.totalNumberOfSpots = action.payload.totalNumberOfSpots;
      parking.totalNumberOfVacantSpots =
        action.payload.totalNumberOfVacantSpots;
      parking.isLoading = false;
    },
    parkingSpotsReceived: (parking, action) => {
      parking.parkingSpots = action.payload;
      parking.isLoading = false;
    },
    parkingChargesRequested: (parking, action) => {
      parking.vehicleCharges.loading = true;
    },
    parkingChargesReceived: (parking, action) => {
      parking.vehicleCharges.charges = action.payload;
      parking.vehicleCharges.loading = false;
    },
    monthlyStatReceived: (parking, action) => {
      parking.report.monthlyStat.data = action.payload;
      parking.report.monthlyStat.isLoading = false;
    },
    yearlyStatRequested: (parking, action) => {
      parking.report.yearlyStat.isLoading = true;
    },
    monthlyStatRequested: (parking, action) => {
      parking.report.monthlyStat.isLoading = true;
    },
    yearlyStatReceived: (parking, action) => {
      parking.report.yearlyStat.data = action.payload;
      parking.report.yearlyStat.isLoading = false;
      parking.report.isLoading = false;
    },
    parkingErrorReceived: (parking, action) => {
      parking.error = action.payload;
    },
  },
});
export default parkingSlice.reducer;
export const {
  parkingReceived,
  parkingChargesReceived,
  monthlyStatReceived,
  yearlyStatReceived,
  parkingSpotsReceived,
  parkingErrorReceived,
  parkingRequested,
  parkingReportRequested,
  parkingChargesRequested,
  yearlyStatRequested,
  monthlyStatRequested,
} = parkingSlice.actions;
