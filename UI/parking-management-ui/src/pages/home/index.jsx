import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import Layout from "../../components/Layout";
import VehicleCheckIn from "./components/VehicleCheckIn";
import "./style.css";
import VehicleCheckOut from "./components/VehicleCheckOut";
import ViewHistory from "./components/ViewHistory";
import VehicleCharges from "./components/VehicleCharges";
import { getParkingChargesSelector } from "../../store/slices/parking/selectors";
import { useSelector } from "react-redux";

function Home(props) {
  const [pageLoading, setPageLoading] = useState(false);
  const startPageLoading = () => setPageLoading(true);
  const stopPageLoading = () => setPageLoading(false);
  const parkingCharges = useSelector(getParkingChargesSelector);
  return (
    <Layout loading={pageLoading || parkingCharges.loading}>
      <Row className="row mt-5 home">
        <Col xl="6">
          <VehicleCheckIn loading={{ startPageLoading, stopPageLoading }} />
        </Col>
        <Col xl="6">
          <VehicleCheckOut loading={{ startPageLoading, stopPageLoading }} />
        </Col>
        <Col xl="6">
          <ViewHistory loading={{ startPageLoading, stopPageLoading }} />
        </Col>
        <Col xl="6">
          <VehicleCharges charges={parkingCharges.charges} />
        </Col>
      </Row>
    </Layout>
  );
}

export default Home;
