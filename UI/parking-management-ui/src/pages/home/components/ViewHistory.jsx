import React, { useState } from "react";
import { Button, Card, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import VehicleNumber from "../../../components/VehicleNumber";
import { useNavigate } from "react-router-dom";

function ViewHistory(props) {
  const [modalShow, setModalShow] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => navigate("/bills", { state: data.vehicleNumber });
  const handleHideModel = () => {
    setModalShow(false);
    reset();
  };
  const toggleModel = () => setModalShow(!modalShow);
  return (
    <div>
      <Modal
        className="mt-2"
        show={modalShow}
        centered
        onHide={handleHideModel}
      >
        <Modal.Header closeButton>
          <Modal.Title>View History of Vehicle</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <VehicleNumber register={register} errors={errors} />
            <div className="d-flex mt-3">
              <Button variant="primary" type="submit" className="ms-auto">
                VIEW BILL HISTORY
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
      <Card>
        <Card.Body onClick={toggleModel}>VIEW HISTORY</Card.Body>
      </Card>
    </div>
  );
}

export default ViewHistory;
