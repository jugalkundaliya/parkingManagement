import React, { useEffect, useState } from "react";
import { Card, Col, Form, Modal, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import VehicleType from "../../../components/VehicleType";
import { loadCharges } from "../../../store/slices/parking/actionCreators";
import { getChargesToRender } from "../helper";
import PropTypes from "prop-types";
import authService from "../../../services/authService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { vehicleType } from "./../../../constants";
function VehicleCharges({ charges: parkingCharges }) {
  const dispatch = useDispatch();
  const user = authService.getCurrentUser().role;
  const [modalShow, setModalShow] = useState(false);
  const [updateModalShow, setUpdateModalShow] = useState(false);
  const [charges, setCharges] = useState([]);
  const [updatableCharge, setUpdatableCharge] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    dispatch(loadCharges());
  }, []);
  const handleChange = (data) => {
    setCharges(
      getChargesToRender(
        parkingCharges.filter(
          (charge) => charge.vehicleType === data.target.value
        )
      )
    );
    setUpdatableCharge({
      ...updatableCharge,
      vehicleType:
        data.target.value === vehicleType.fourWheeler
          ? "4 Wheeler"
          : "2 Wheeler",
    });
  };
  const toggleModel = () => setModalShow(!modalShow);
  const hideModel = () => setModalShow(false);
  return (
    <div>
      <Modal
        centered
        show={updateModalShow}
        onHide={() => {
          setUpdateModalShow(false);
          setModalShow(true);
        }}
      >
        <Modal.Header closeButton>Update Charge</Modal.Header>
        <Modal.Body>
          <Form className="d-flex flex-column gap-3">
            <Form.Group className=" d-flex justify-content-between align-items-center">
              <Form.Label>Charge Name: </Form.Label>
              <Form.Label>{updatableCharge?.chargeName}</Form.Label>
            </Form.Group>
            <Form.Group className=" d-flex justify-content-between align-items-center">
              <Form.Label>Vehicle Type: </Form.Label>
              <Form.Label>{updatableCharge?.vehicleType}</Form.Label>
            </Form.Group>
            <Form.Group className=" d-flex justify-content-between align-items-center">
              <Form.Label>Update Charge Value:</Form.Label>
              <Form.Label>{updatableCharge?.chargeValue}</Form.Label>
              <Col xl="2">
                <Form.Control type="number" />
              </Col>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
      <Modal show={modalShow} centered onHide={hideModel}>
        <Modal.Header closeButton>
          <Modal.Title>Vehicle Charges</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <VehicleType
            onChange={handleChange}
            register={register}
            errors={errors}
          />
          <Row className="d-flex mt-3 justify-content-between gap-1">
            {charges.map((charge, index) => {
              return (
                <Col key={`${index}-${charge.heading}`}>
                  <Card className="bg-light charge-card">
                    <Card.Body className="flex-column justify-content-between">
                      <Card.Title className=" text-center d-flex justify-content-between">
                        {charge.value}
                        {user === "Admin" && (
                          <FontAwesomeIcon
                            onClick={() => {
                              setUpdateModalShow(true);
                              setModalShow(false);
                              setUpdatableCharge({
                                ...updatableCharge,
                                chargeName: charge.heading,
                                chargeValue: charge.value,
                              });
                            }}
                            size="sm"
                            className="cursor-pointer"
                            icon={faPen}
                          />
                        )}
                      </Card.Title>
                      <Card.Text className="text-center">
                        {charge.heading}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
          {charges.length !== 0 && (
            <small>
              *This charge is only for all ten hours when the vehicle is parked
              for more than ten billable hours
            </small>
          )}
          {charges.length === 0 && <div>Select Charge Type</div>}
        </Modal.Body>
      </Modal>
      <Card>
        <Card.Body onClick={toggleModel}>VEHICLE CHARGES</Card.Body>
      </Card>
    </div>
  );
}
VehicleCharges.propTypes = {
  parkingCharges: PropTypes.array,
};
export default VehicleCharges;
