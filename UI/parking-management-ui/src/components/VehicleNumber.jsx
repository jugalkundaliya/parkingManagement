import React from "react";
import { Form } from "react-bootstrap";
import PropTypes from "prop-types";

function VehicleNumber({ register, errors, defaultValue }) {
  return (
    <Form.Group className="mb-3">
      <Form.Label>Vehicle Number: </Form.Label>
      <Form.Control
        type="text"
        placeholder="Enter Vehicle Number"
        defaultValue={defaultValue}
        disabled={defaultValue !== null}
        {...register("vehicleNumber", {
          required: true,
          minLength: 5,
          pattern: /^[A-Z0-9]+$/,
        })}
      />
      {errors?.vehicleNumber?.type === "required" && (
        <div className="alert alert-danger">This field is required</div>
      )}
      {errors?.vehicleNumber?.type === "minLength" && (
        <div className="alert alert-danger">Minimum characters 5</div>
      )}
      {errors?.vehicleNumber?.type === "pattern" && (
        <div className="alert alert-danger">
          Please Enter Proper Vehicle Number i.e. (Only Upper Cased
          Alphanumeric)
        </div>
      )}
    </Form.Group>
  );
}
VehicleNumber.defaultProps = {
  defaultValue: null,
};
VehicleNumber.propTypes = {
  defaultValue: PropTypes.string,
  errors: PropTypes.object,
  register: PropTypes.func,
};

export default VehicleNumber;
