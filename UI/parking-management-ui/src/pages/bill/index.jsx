import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getVehicle } from "./../../store/slices/vehicle/selectors";
import { Button, OverlayTrigger, Popover } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import CheckoutBill from "../home/components/CheckoutBill";
import Layout from "./../../components/Layout";
import { filterInit, removeNullParameters } from "./helper";
import "./style.css";
import { loadVehicleBills } from "../../store/slices/vehicle/actionCreators";
import { useLocation, useNavigate } from "react-router-dom";
import TableWrapper from "../../components/TableWrapper";
import PaginationWrapper from "../../components/PaginationWrapper";
import Swal from "sweetalert2";
import { vehicleRemoved } from "../../store/slices/vehicle/slice";
import BillFilter from "./components/BillFilter";

function Bills(props) {
  const [billShow, setBillShow] = useState(false);
  const [bill, setBill] = useState(null);
  const vehicle = useSelector(getVehicle);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(1000);
  const [filter, setFilter] = useState({ ...filterInit });
  const dispatch = useDispatch();
  const vehicleNumber = useLocation().state;
  const navigate = useNavigate();
  if (vehicle.error) {
    Swal.fire({
      title: "Not Found",
      text: vehicle.error.response.data,
      icon: "error",
      confirmButtonColor: "var(--bs-primary)",
    });
    navigate("/", { replace: true });
  }
  useEffect(() => {
    return () => dispatch(vehicleRemoved());
  }, []);
  useEffect(() => {
    if (vehicleNumber !== null) {
      const filterToApply = removeNullParameters(filter);
      dispatch(loadVehicleBills({ vehicleNumber, filter: filterToApply }));
    } else {
      navigate("/", { replace: true });
    }
  }, [filter]);
  const applyFilter = (e) => {
    e.preventDefault();
    setFilter({
      ...filter,
      startDate: e.target[0].value,
      endDate: e.target[1].value,
      min,
      max,
    });
    document.body.click();
  };
  const handleSliderUpdate = (e) => {
    setMax(Math.round(e[1]));
    setMin(Math.round(e[0]));
  };
  const resetTheFilters = () => setFilter({ ...filterInit });
  const sortTable = (key) =>
    setFilter({
      ...filter,
      sortColumn: key,
      sortOrder:
        filter.sortColumn === key && filter.sortOrder === "asc"
          ? "desc"
          : "asc",
    });
  const hideBill = () => setBillShow(false);
  const handlePageSizeChange = (e) =>
    setFilter({ ...filter, pageSize: e.target.value });
  const handlePageChange = (e) =>
    setFilter({ ...filter, pageNo: e.selected + 1 });
  const billColumn = [
    {
      key: "allottingTime",
      label: "Allotted Time",
      sortable: true,
    },
    {
      key: "checkoutTime",
      label: "Checkout Time",
      sortable: true,
    },
    {
      key: "totalCharges",
      label: "Amount Paid",
      sortable: true,
      textRight: true,
      amount: true,
    },
    {
      label: "View Details",
      textCenter: true,
      content: (bill) => {
        return (
          <FontAwesomeIcon
            icon={faEye}
            className=" cursor-pointer"
            onClick={() => {
              setBillShow(true);
              setBill(bill);
            }}
          />
        );
      },
    },
  ];

  const filterPopOver = (
    <Popover className="charge-popover">
      <Popover.Header as="h3">Filters</Popover.Header>
      <Popover.Body>
        <BillFilter
          onSubmit={applyFilter}
          filter={filter}
          min={min}
          max={max}
          onSliderUpdate={handleSliderUpdate}
        />
      </Popover.Body>
    </Popover>
  );

  return (
    <Layout loading={vehicle.loading}>
      {bill && <CheckoutBill bill={bill} show={billShow} onHide={hideBill} />}
      <OverlayTrigger
        trigger="click"
        placement="bottom-start"
        overlay={filterPopOver}
        rootClose
      >
        <Button variant="dark">Filter</Button>
      </OverlayTrigger>
      <Button variant="secondary" className="ms-3" onClick={resetTheFilters}>
        Reset
      </Button>
      <TableWrapper
        columns={billColumn}
        data={vehicle.vehicleBills}
        sort={{
          sortColumn: filter.sortColumn,
          sortOrder: filter.sortOrder,
          sortTable: sortTable,
        }}
      />
      <PaginationWrapper
        pageSize={filter.pageSize}
        pageCount={Math.ceil(vehicle.billCount / filter.pageSize)}
        onPageSizeChange={handlePageSizeChange}
        onPageChange={handlePageChange}
      />
    </Layout>
  );
}

export default Bills;
