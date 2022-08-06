import React from "react";
import { Form } from "react-bootstrap";
import { vehicleType } from "./../constants";
import PropTypes from "prop-types";
function VehicleType({ onChange, register, errors, defaultValue }) {
  return (
    <Form.Group className="mb-3">
      <Form.Label className="me-2">Vehicle Type:</Form.Label>
      <Form.Check
        type="radio"
        label="4 Wheeler"
        name="vehicleType"
        value={vehicleType.fourWheeler}
        checked={defaultValue === vehicleType.fourWheeler ? true : null}
        disabled={defaultValue !== null}
        inline
        {...register("vehicleType", {
          required: defaultValue === null && true,
        })}
        onChange={onChange}
      />
      <Form.Check
        inline
        type="radio"
        label="2 Wheeler"
        name="vehicleType"
        value={vehicleType.twoWheeler}
        checked={defaultValue === vehicleType.twoWheeler ? true : null}
        disabled={defaultValue !== null}
        {...register("vehicleType", {
          required: defaultValue === null && true,
        })}
        onChange={onChange}
      />
      {errors?.vehicleType?.type === "required" && (
        <div className="alert alert-danger">This field is required</div>
      )}
    </Form.Group>
  );
}
VehicleType.defaultProps = {
  onChange: () => null,
  defaultValue: null,
};
VehicleType.propTypes = {
  defaultValue: PropTypes.string,
  errors: PropTypes.object,
  register: PropTypes.func,
  onChange: PropTypes.func,
};

export default VehicleType;
