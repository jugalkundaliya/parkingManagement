import React from "react";
import { Nav } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import authService from "../services/authService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouseChimney } from "@fortawesome/free-solid-svg-icons";
function NavigationBar(props) {
  const user = authService.getCurrentUser();
  return (
    <Navbar bg="light" className="ps-0 pe-0 p-2 text-light " expand="lg">
      <Navbar.Brand className="font-weight-bold ">
        <NavLink to="/" className="nav-link ps-0">
          <img src="./logo.png" width="200px" alt="Parking Management" />
        </NavLink>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav " className="p-0">
        <Nav className="ms-auto ">
          <NavLink to="/home" className="nav-link">
            <FontAwesomeIcon icon={faHouseChimney} />
          </NavLink>
          <NavLink to="/parking" className="nav-link">
            Parking
          </NavLink>
          {user && (
            <>
              {user.role === "Admin" && (
                <NavLink to="/report" className=" nav-link">
                  Report
                </NavLink>
              )}
              <NavLink to="/logout" className="nav-link">
                Logout
              </NavLink>
            </>
          )}
          {!user && (
            <>
              <NavLink to="/login" className="nav-link">
                Login
              </NavLink>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavigationBar;
