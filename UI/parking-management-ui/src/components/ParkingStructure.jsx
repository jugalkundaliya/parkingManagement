import PropTypes from "prop-types";
import React from "react";
import { vehicleType } from "../constants";
import FourWheelerParking from "./FourWheelerParking";
import TwoWheelerParking from "./TwoWheelerParking";

function ParkingStructure({ parkingSpots, activeParkingNumber }) {
  const twoWheelerParking = parkingSpots?.filter(
    (spot) => spot.vehicleType === vehicleType.twoWheeler
  );
  const fourWheelerParking = parkingSpots?.filter(
    (spot) => spot.vehicleType === vehicleType.fourWheeler
  );
  const getParkingColumn = (parkingSpots) => {
    return (
      <div className="parking-col ">
        {parkingSpots?.map((spot) => {
          return (
            <div
              className={`mt-3 ${
                activeParkingNumber === spot.spotNumber && "active-parking"
              }`}
              key={spot.spotNumber}
            >
              <span className=" d-flex justify-content-center">
                {activeParkingNumber == spot.spotNumber && spot?.vehicleNumber}
              </span>
              {spot.vehicleType === vehicleType.fourWheeler ? (
                <FourWheelerParking
                  slotNumber={spot.spotNumber}
                  available={spot.status === "Available"}
                  vehicleNumber={spot?.vehicleNumber}
                />
              ) : (
                <TwoWheelerParking
                  vehicleNumber={spot?.vehicleNumber}
                  slotNumber={spot.spotNumber}
                  available={spot.status === "Available"}
                />
              )}
            </div>
          );
        })}
      </div>
    );
  };
  return (
    <div className="d-flex justify-content-between align-items-center flex-wrap">
      {getParkingColumn(twoWheelerParking?.slice(0, 13))}
      {getParkingColumn(twoWheelerParking?.slice(13, 26))}
      {getParkingColumn(fourWheelerParking?.slice(0, 9))}
      {getParkingColumn(fourWheelerParking?.slice(9, 26))}
      {getParkingColumn(twoWheelerParking?.slice(26, 39))}
      {getParkingColumn(twoWheelerParking?.slice(39, 52))}
    </div>
  );
}
ParkingStructure.propTypes = {
  activeParkingNumber: PropTypes.string,
  parkingSpots: PropTypes.array,
};
export default ParkingStructure;
