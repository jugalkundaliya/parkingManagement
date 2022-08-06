import React, { useState } from "react";
import { Button, Card, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import VehicleNumber from "../../../components/VehicleNumber";
import vehicleService from "../../../services/vehicleService";
import CheckoutBill from "./CheckoutBill";
import Swal from "sweetalert2";
import PropTypes from "prop-types";

function VehicleCheckOut({ loading }) {
  const [modalShow, setModalShow] = useState(false);
  const [billModalShow, setBillModalShow] = useState(false);
  const [bill, setBill] = useState(null);
  const closeCheckoutModal = () => {
    setModalShow(false);
    reset();
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    try {
      loading.startPageLoading();
      const { data: bill } = await vehicleService.checkoutVehicle(
        data.vehicleNumber
      );
      setBill(bill);
      setBillModalShow(true);
      closeCheckoutModal();
    } catch (error) {
      Swal.fire({
        title: "Not Found",
        text: error.response.data,
        icon: "error",
        confirmButtonColor: "var(--bs-primary)",
      });
    } finally {
      loading.stopPageLoading();
    }
  };
  const hideBill = () => setBillModalShow(false);
  const toggleModel = () => setModalShow(!modalShow);
  return (
    <div>
      {bill && (
        <CheckoutBill show={billModalShow} onHide={hideBill} bill={bill} />
      )}
      <Modal
        className="mt-2"
        show={modalShow}
        centered
        onHide={closeCheckoutModal}
      >
        <Modal.Header closeButton>
          <Modal.Title>Check In Your Vehicle</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <VehicleNumber register={register} errors={errors} />
            <div className="d-flex mt-3">
              <Button variant="primary" type="submit" className="ms-auto">
                CHECKOUT AND GET BILL
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
      <Card>
        <Card.Body onClick={toggleModel}>CHECK OUT</Card.Body>
      </Card>
    </div>
  );
}
VehicleCheckOut.propTypes = {
  loading: PropTypes.object,
};
export default VehicleCheckOut;
