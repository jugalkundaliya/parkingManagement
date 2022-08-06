import React from "react";
import {
  Accordion,
  Button,
  Col,
  Modal,
  OverlayTrigger,
  Popover,
  Row,
} from "react-bootstrap";
import PropTypes from "prop-types";
import {
  billDataInit,
  getChargeNote,
  getChargeNameBasedOnApiData,
  billChargeColumn,
} from "../helper";

function CheckoutBill({ bill, show, onHide }) {
  const chargeCalculationAccordion = (billCharge) => (
    <Accordion.Item
      eventKey={billCharge.charge.chargeValue}
      key={billCharge.charge.chargeValue + billCharge.charge.chargeName}
    >
      <Accordion.Header>
        {getChargeNameBasedOnApiData(billCharge.charge.chargeName)}
      </Accordion.Header>
      <Accordion.Body>
        <Row className="d-flex flex-column">
          {billChargeColumn.map((col, index) => (
            <Col
              className="d-flex justify-content-between flex-wrap"
              key={`${col.label} - ${index} - ${billCharge.charge.chargeName}`}
            >
              <span>{col.label}</span>
              <span>
                {col.content && col.content(billCharge)}
                {billCharge[col?.key]}
              </span>
            </Col>
          ))}
          <small>NOTE: {getChargeNote(billCharge.charge.chargeName)}</small>
        </Row>
      </Accordion.Body>
    </Accordion.Item>
  );
  const calculation = (
    <Popover
      id="popover-basic"
      className="charge-popover"
      arrowProps={{ position: "fixed" }}
    >
      <Popover.Header as="h3">Bill Calculations</Popover.Header>
      <Popover.Body>
        <Accordion>
          {bill?.billCharges?.map((bCharge) =>
            chargeCalculationAccordion(bCharge)
          )}
        </Accordion>
      </Popover.Body>
    </Popover>
  );
  return (
    <Modal
      backdrop="static"
      className="mt-2"
      show={show}
      onHide={onHide}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Bill</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row className="mb-2 d-flex flex-column justify-content-center mt-2 align-items-center text-center">
          {billDataInit.map((billData) => (
            <Col
              key={billData.label}
              className="d-flex justify-content-between flex-wrap"
            >
              <span>{billData.label}: </span>
              {billData.content !== undefined && billData.content(bill)}
              {billData.key && <span>{bill[billData.key]}</span>}
            </Col>
          ))}
          <Col>
            <OverlayTrigger
              className="right-end-pop"
              trigger="click"
              placement="top-end"
              overlay={calculation}
              rootClose
            >
              <Button
                variant="secondary"
                size="sm"
                className="w-50 d-flex ms-auto justify-content-center"
              >
                See Calculations
              </Button>
            </OverlayTrigger>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
}
CheckoutBill.propTypes = {
  bill: PropTypes.object,
  show: PropTypes.bool,
  onHide: PropTypes.func,
};
export default CheckoutBill;
