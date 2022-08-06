import { faCar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import PropTypes from "prop-types";

function FourWheelerParking({ slotNumber, available, active, vehicleNumber }) {
  return (
    <OverlayTrigger
      overlay={
        <Tooltip>
          {`${
            available
              ? "Vacant"
              : `Occupied ${
                  vehicleNumber !== undefined
                    ? `Vehicle Number: ${vehicleNumber}`
                    : ""
                }`
          }`}
        </Tooltip>
      }
      s
    >
      <div
        className={`d-flex ${active && "active-parking"} align-items-center`}
      >
        <div className="slot-number">{slotNumber}</div>
        <div
          className={`${
            available ? "bg-success" : "bg-danger"
          } car-vehicle-icon vehicle-icon text-light `}
        >
          <FontAwesomeIcon icon={faCar} size={"2x"} />
        </div>
      </div>
    </OverlayTrigger>
  );
}
FourWheelerParking.defaultProps = {
  active: false,
};
FourWheelerParking.propTypes = {
  active: PropTypes.bool,
  slotNumber: PropTypes.string,
  available: PropTypes.bool,
};

export default FourWheelerParking;
