import React, { useEffect } from "react";
import { Col, Form, Row, Card } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { getYearlyReport } from "../../../../store/slices/parking/selectors";
import LineChartWrapper from "../../../../components/LineChartWrapper";
import BarChartWrapper from "./../../../../components/BarChartWrapper";
import { Cell } from "recharts";
import { loadYearlyStat } from "../../../../store/slices/parking/actionCreators";
import PropTypes from "prop-types";
import {
  getDataForChart,
  optionsForYearSelector,
  statementsInit,
} from "../helper";
import Loader from "../../../../components/Loader";
import formattingService from "../../../../services/formattingService";

function YearlyAnalysis({ currentDate }) {
  const { data, isLoading } = useSelector(getYearlyReport);
  const dispatch = useDispatch();
  useEffect(() => {
    loadYearlyStatData();
  }, []);
  const loadYearlyStatData = (year = currentDate.getFullYear()) => {
    dispatch(loadYearlyStat(year));
  };
  const handleYearChange = (e) => {
    const monthYear = e.target.value.split("-");
    loadYearlyStatData(monthYear[0]);
  };
  const handleYearlyChartRefresh = () => {
    loadYearlyStatData(data.year);
  };
  return (
    <>
      <hr className="mt-4" />
      <h3>Yearly Analysis</h3>
      <Row className="mt-4 d-flex align-items-center ">
        <Col xl="2">Select Year: </Col>
        <Col xl="2">
          <Form.Select
            aria-label="Default select example"
            onChange={handleYearChange}
          >
            {optionsForYearSelector().map((option, index) => (
              <option key={`${option} - ${index}`} value={option}>
                {option}
              </option>
            ))}
          </Form.Select>
        </Col>
        <Col>
          <i
            className={`fa fa-refresh cursor-pointer ${
              isLoading && "fa-spin"
            } `}
            onClick={handleYearlyChartRefresh}
          />
        </Col>
      </Row>
      {data !== null && (
        <Row className="mt-4">
          {statementsInit.map((statement, index) => (
            <Col xl="3" lg="4" md="6" key={index + data?.amount}>
              <Card>
                <Loader loading={isLoading} />
                <Card.Header className="parking-header-stat">
                  {statement?.label}
                  {statement?.labelContent &&
                    statement?.labelContent(data !== null && data)}
                </Card.Header>
                <Card.Body>
                  {statement.content ? (
                    <h4
                      className={`text-${
                        data.amount >= 0 ? "success" : "danger"
                      } ${statement.textClass}`}
                    >
                      {statement?.content(data)}
                    </h4>
                  ) : (
                    <h4 className={`text-${statement.textClass}`}>
                      {statement.isAmount
                        ? formattingService.formatCurrency(data[statement.key])
                        : data[statement.key]}
                    </h4>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
      <Row className="mt-4 d-flex align-items-center ">
        <Col className=" position-relative" xl="6">
          <h5>Profit Percentage Chart</h5>
          <LineChartWrapper
            loading={isLoading}
            data={getDataForChart(data?.profitLosses)}
            dataKey="percentage"
          />
        </Col>
        <Col className=" position-relative" xl="6">
          <h5>Profit Amount Chart</h5>
          <BarChartWrapper
            loading={isLoading}
            data={getDataForChart(data?.profitLosses)}
            dataKey="amount"
            cellConfig={getDataForChart(data?.profitLosses)?.map(
              (entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.amount > 0 ? "green" : "red"}
                />
              )
            )}
          />
        </Col>
      </Row>
      <Row className="mt-4 d-flex align-items-center ">
        <Col xl="6">
          <h5>Earning Chart</h5>
          <LineChartWrapper
            loading={isLoading}
            color="var(--bs-success)"
            data={getDataForChart(data?.profitLosses)}
            dataKey="earnings"
          />
        </Col>
      </Row>
    </>
  );
}
YearlyAnalysis.propTypes = {
  currentDate: PropTypes.object,
};
export default YearlyAnalysis;
