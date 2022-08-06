import React, { useState } from "react";
import { Button, Card, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import VehicleNumber from "../../../components/VehicleNumber";
import VehicleType from "../../../components/VehicleType";
import vehicleService from "../../../services/vehicleService";
import CheckInReceipt from "./CheckInReceipt";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import PropTypes from "prop-types";

function VehicleCheckIn({ loading }) {
  const [modalOneShow, setModalOneShow] = useState(false);
  const [modalTwoShow, setModalTwoShow] = useState(false);
  const [receiptShow, setReceiptShow] = useState(false);
  const [receipt, setReceipt] = useState({});
  const [defaultVehicle, setDefaultVehicle] = useState(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const closeModalOne = () => {
    setModalOneShow(false);
    setDefaultVehicle(null);
    reset();
  };
  const onSubmitFormOne = async (data) => {
    loading.startPageLoading();
    try {
      const { data: vehicleType } = await vehicleService.getVehicleType(
        data.vehicleNumber
      );
      setDefaultVehicle({
        vehicleNumber: data.vehicleNumber,
        vehicleType: vehicleType,
      });
    } catch (error) {
      setDefaultVehicle({
        vehicleNumber: data.vehicleNumber,
        vehicleType: null,
      });
    } finally {
      setModalOneShow(false);
      setModalTwoShow(true);
      loading.stopPageLoading();
    }
  };
  const onSubmitFormTwo = async (data) => {
    console.log(data);
    if (data.vehicleType === undefined)
      data.vehicleType = defaultVehicle.vehicleType;
    if (data.vehicleNumber === undefined)
      data.vehicleNumber = defaultVehicle.vehicleNumber;

    try {
      loading.startPageLoading();
      const { data: receipt } = await vehicleService.allotParking(data);
      console.log(receipt);
      setModalTwoShow(false);
      setReceipt(receipt);
      setReceiptShow(true);
      reset();
    } catch (error) {
      Swal.fire({
        title: "Bad Request",
        text: error.response.data,
        icon: "error",
        confirmButtonColor: "var(--bs-primary)",
      });
    } finally {
      loading.stopPageLoading();
      setDefaultVehicle(null);
    }
  };
  const handleReceiptModelClose = () =>
    navigate("/parking", {
      state: {
        activeParkingNumber: receipt.spotNumber,
      },
    });
  const closeModelTwo = () => {
    setModalTwoShow(false);
    setDefaultVehicle(null);
  };
  const toggleModelOne = () => setModalOneShow(!modalOneShow);
  return (
    <div>
      <CheckInReceipt
        receipt={receipt}
        show={receiptShow}
        close={handleReceiptModelClose}
      />
      <Modal
        className="mt-2"
        show={modalOneShow}
        centered
        onHide={closeModalOne}
      >
        <Modal.Header closeButton>
          <Modal.Title>Check In Your Vehicle</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmitFormOne)}>
            <VehicleNumber register={register} errors={errors} />
            <div className="d-flex mt-3">
              <Button
                variant="secondary"
                type="reset"
                className="me-auto"
                onClick={() => reset()}
              >
                CLEAR
              </Button>
              <Button variant="primary" type="submit" className="ms-auto">
                NEXT
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
      <Modal
        className="mt-2"
        show={modalTwoShow}
        centered
        onHide={closeModelTwo}
      >
        <Modal.Header closeButton>
          <Modal.Title>Check In Your Vehicle</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmitFormTwo)}>
            <VehicleNumber
              register={register}
              errors={errors}
              defaultValue={defaultVehicle?.vehicleNumber}
            />
            <VehicleType
              register={register}
              errors={errors}
              defaultValue={defaultVehicle?.vehicleType}
            />
            <div className="d-flex mt-3">
              <Button variant="primary" type="submit" className="ms-auto">
                GET PARKING SPOT
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
      <Card>
        <Card.Body onClick={toggleModelOne}>CHECK IN</Card.Body>
      </Card>
    </div>
  );
}
VehicleCheckIn.propTypes = {
  loading: PropTypes.object,
};
export default VehicleCheckIn;
