import React from "react";
import { Modal, Row } from "react-bootstrap";
import formattingService from "../../../services/formattingService";
import { parkingReceiptColumns } from "../helper";
import PropTypes from "prop-types";

function CheckInReceipt({ show, close, receipt }) {
  const allotedTime = formattingService.formatDateTime(receipt.allotedTime);
  const receiptToPass = {
    ...receipt,
    allotedTime,
  };
  return (
    <Modal
      backdrop="static"
      className="mt-2"
      show={show}
      centered
      onHide={close}
    >
      <Modal.Header closeButton>
        <Modal.Title>Receipt</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row className="mb-2">
          {parkingReceiptColumns.map((col, index) => (
            <div
              className="d-flex justify-content-between"
              key={`${col.label}-${index}`}
            >
              <span className=" text-black-50">{col.label}</span>
              <span>{receiptToPass[col.key]}</span>
            </div>
          ))}
        </Row>
      </Modal.Body>
    </Modal>
  );
}
CheckInReceipt.propTypes = {
  show: PropTypes.bool,
  close: PropTypes.func,
  receipt: PropTypes.object,
};
export default CheckInReceipt;
