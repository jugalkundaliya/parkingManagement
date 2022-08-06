import formattingService from "../../services/formattingService";
import { chargeType } from "../../constants";

export const getChargeHeadingBasedOnApiData = (name) => {
  switch (name) {
    case chargeType.init:
      return "For first two hours";
    case chargeType.remaining:
      return "For remaining hours";
    case chargeType.extra:
      return "Extra Charges*";
  }
};
export const getChargesToRender = (chargesToRender) => {
  return chargesToRender.map((charge) => {
    return {
      heading: getChargeHeadingBasedOnApiData(charge.chargeName),
      value: `${charge.chargeValue}₹ / ${
        charge.chargeDuration === "PerTenHour" ? "Ten Hours" : "Hour"
      }`,
    };
  });
};

export const parkingReceiptColumns = [
  {
    key: "spotNumber",
    label: "Parking Spot Number",
  },
  {
    key: "vehicleNumber",
    label: "Vehicle Number",
  },
  {
    key: "allotedTime",
    label: "Allotted Time",
  },
];
export const getChargeNote = (name) => {
  switch (name) {
    case "InitialParkingCharge":
      return "This charge is only for initial two hours of parking";
    case "RemainingParkingCharge":
      return "This charge is for all the remaining hours excluding first two hours";
    case "ExtraParkingCharge":
      return "This charge is only for all ten hours when the vehicle is parked for more than ten billable hours";
  }
};

export const billDataInit = [
  {
    label: "Spot Number",
    key: "spotNumber",
  },
  {
    label: "Check In Time",
    content: (bill) => (
      <span>{formattingService.formatDateTime(bill.allottingTime)}</span>
    ),
  },
  {
    label: "Check Out Time",
    content: (bill) => (
      <span>{formattingService.formatDateTime(bill.checkoutTime)}</span>
    ),
  },
  {
    key: "totalHours",
    label: "Total Hours",
  },
  {
    key: "totalBillableHours",
    label: "Billable Hours",
  },
  {
    label: "Charges",
    content: (bill) => (
      <div className="d-flex flex-column text-start mt-4">
        {Object.values(chargeType).map((charge, index) => {
          const billCharge = bill.billCharges.find(
            (c) => c.charge.chargeName === charge
          );
          if (billCharge !== undefined) {
            return (
              <div
                className="d-flex justify-content-between"
                key={billCharge.charge.chargeName + index}
              >
                <span>
                  {index + 1}.
                  {getChargeNameBasedOnApiData(billCharge.charge.chargeName)}:
                </span>
                <span className="ms-4"> ₹ {billCharge.chargedAmount} /-</span>
              </div>
            );
          }
        })}
      </div>
    ),
  },
  {
    label: "Total Charges",
    content: (bill) => <span>₹ {bill.totalCharges} /-</span>,
  },
];

export const getChargeNameBasedOnApiData = (charge) => {
  switch (charge) {
    case "InitialParkingCharge":
      return " Initial Charges";
    case "RemainingParkingCharge":
      return " Remaining Charges";
    case "ExtraParkingCharge":
      return " Extra Charges";
  }
};

export const billChargeColumn = [
  {
    label: "Charge Name:",
    content: (billCharge) =>
      getChargeNameBasedOnApiData(billCharge.charge.chargeName),
  },
  {
    label: "Chargeable Amount:",
    content: (billCharge) =>
      `₹ ${billCharge.charge.chargeValue} /-
    ${
      billCharge.charge.chargeDuration === "PerTenHour"
        ? " Per Ten Hours"
        : " Per Hour"
    }`,
  },
  {
    key: "hours",
    label: "Billable Hours",
  },
  {
    label: "Calculation:",
    content: (billCharge) =>
      `${billCharge.charge.chargeValue} *
    ${
      billCharge.charge.chargeDuration === "PerTenHour"
        ? billCharge.hours / 10
        : billCharge.hours
    }`,
  },
  {
    key: "chargedAmount",
    label: "Charged Amount",
  },
];
