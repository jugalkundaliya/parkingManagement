import { faMotorcycle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import PropTypes from "prop-types";

function TwoWheelerParking({ slotNumber, available, active, vehicleNumber }) {
  return (
    <OverlayTrigger
      overlay={
        <Tooltip>{`${
          available && vehicleNumber !== null
            ? "Vacant"
            : `Occupied ${
                vehicleNumber !== undefined
                  ? `Vehicle Number: ${vehicleNumber}`
                  : ""
              }`
        }`}</Tooltip>
      }
    >
      <div
        className={`d-flex ${active && "active-parking"} align-items-center`}
      >
        <div className="slot-number">{slotNumber}</div>

        <div
          className={`${
            available ? "bg-success" : "bg-danger"
          } bike-vehicle-icon vehicle-icon text-light `}
        >
          <FontAwesomeIcon icon={faMotorcycle} size={"2x"} />
        </div>
      </div>
    </OverlayTrigger>
  );
}
TwoWheelerParking.defaultProps = {
  active: false,
};
TwoWheelerParking.propTypes = {
  active: PropTypes.bool,
  slotNumber: PropTypes.string,
  available: PropTypes.bool,
};
export default TwoWheelerParking;
