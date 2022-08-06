import React, { useEffect, useState } from "react";
import Layout from "./../../../components/Layout";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import {
  loadParking,
  loadParkingSpots,
} from "../../../store/slices/parking/actionCreators";
import { getParkingSelector } from "../../../store/slices/parking/selectors";
import { statisticsInit } from "./helper";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import ParkingStructure from "../../../components/ParkingStructure";
import authService from "../../../services/authService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faSearch } from "@fortawesome/free-solid-svg-icons";
import { useRef } from "react";
function Parking(props) {
  const [activeNumber, setActiveNumber] = useState(null);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const parking = useSelector(getParkingSelector);
  const searchBar = useRef();
  const user = authService.getCurrentUser();
  parking?.error?.status === 401 && navigate("/");
  useEffect(() => {
    user && dispatch(loadParking());
    !user && dispatch(loadParkingSpots());
    navigateToHomeIfAlloted();
  }, []);
  const navigateToHomeIfAlloted = () => {
    location.state?.activeParkingNumber !== undefined &&
      setTimeout(() => {
        navigate("/");
      }, 10000);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    searchBar.current.focus();
    setActiveNumber(e.target[0].value.toUpperCase().trim());
  };
  const handleReset = () => {
    setActiveNumber(null);
  };

  return (
    <Layout loading={parking.isLoading}>
      <div className="d-flex gap-2 align-items-center justify-content-center mb-4">
        <span>Search: </span>
        <form
          onSubmit={handleSubmit}
          onReset={handleReset}
          className="card d-flex flex-row align-items-center p-1 gap-2"
        >
          <input
            type="text"
            className=" border-none outline-none"
            ref={searchBar}
          />
          <Button
            size="sm"
            variant="white"
            type="reset"
            className={` ${
              (activeNumber === null || activeNumber === "") && "invisible"
            }`}
          >
            <FontAwesomeIcon icon={faClose} className=" cursor-pointer" />
          </Button>
          <Button size="sm" variant="secondary" type="submit">
            <FontAwesomeIcon icon={faSearch} className=" cursor-pointer" />
          </Button>
        </form>
      </div>
      <ParkingStructure
        parkingSpots={parking?.parkingSpots}
        activeParkingNumber={
          location.state?.activeParkingNumber || activeNumber
        }
      />
      <hr />
      {user && (
        <Row className="mt-3 ">
          {statisticsInit.map((stat) => {
            return (
              <Col xl="4" lg="5" key={stat.key + stat.label}>
                <Card>
                  <Card.Header className="parking-header-stat">
                    {stat.label}
                  </Card.Header>
                  <Card.Body>
                    <div className={`h2 text-${stat.textClass}`}>
                      {parking[stat.key]}
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      )}
    </Layout>
  );
}

export default Parking;
