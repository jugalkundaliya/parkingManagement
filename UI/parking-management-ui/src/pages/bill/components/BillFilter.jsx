import React from "react";
import { Button, Form } from "react-bootstrap";
import Nouislider from "nouislider-react";
import "nouislider/distribute/nouislider.css";

function BillFilter({ onSubmit, filter, min, max, onSliderUpdate }) {
  return (
    <Form onSubmit={onSubmit}>
      <Form.Group>
        <Form.Label className="mt-3">Start Date</Form.Label>
        <Form.Control type="date" defaultValue={filter.startDate} />
      </Form.Group>
      <Form.Group>
        <Form.Label className="mt-3">End Date</Form.Label>
        <Form.Control type="date" defaultValue={filter.endDate} />
      </Form.Group>

      <Form.Group>
        <Form.Label className="mt-3">Amount</Form.Label>
        <div className="d-flex justify-content-between mb-2 gap-5">
          <Form.Control
            type="text"
            value={`min: ${min}`}
            size="sm"
            disabled
            className="bg-light "
          />
          <Form.Control
            className="bg-light "
            type="text"
            size="sm"
            value={`max: ${max} ${max === 1000 ? "+" : ""}`}
            disabled
          />
        </div>
        <div className="m-3">
          <Nouislider
            range={{ min: 0, max: 1000 }}
            start={[filter.min, filter.max]}
            onUpdate={onSliderUpdate}
            connect
          />
        </div>
      </Form.Group>
      <Button size="sm" className="mt-4" type="submit">
        Apply
      </Button>
    </Form>
  );
}

export default BillFilter;
