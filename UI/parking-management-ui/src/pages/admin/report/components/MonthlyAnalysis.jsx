import React, { useEffect } from "react";
import { Col, Form, Row, Card } from "react-bootstrap";
import { statementsInit } from "../helper";
import { useSelector, useDispatch } from "react-redux";
import { getMonthlyReport } from "../../../../store/slices/parking/selectors";
import formattingService from "../../../../services/formattingService";
import { loadMonthlyStat } from "../../../../store/slices/parking/actionCreators";
import Loader from "../../../../components/Loader";
import PropTypes from "prop-types";

function MonthlyAnalysis({ currentDate }) {
  const { data, isLoading } = useSelector(getMonthlyReport);
  const dispatch = useDispatch();
  useEffect(() => {
    loadMonthlyStatementData();
  }, []);
  const loadMonthlyStatementData = (
    monthYear = {
      month: currentDate.getMonth() + 1,
      year: currentDate.getFullYear(),
    }
  ) => {
    dispatch(loadMonthlyStat(monthYear));
  };
  const handleMonthChange = (e) => {
    const monthYear = e.target.value.split("-");
    loadMonthlyStatementData({ month: monthYear[1], year: monthYear[0] });
  };
  const handleMonthlyChartRefresh = () => {
    loadMonthlyStatementData(data?.monthYear);
  };
  return (
    <>
      <h3 className="mt-4">Monthly Analysis</h3>
      <Row className="mt-4 d-flex align-items-center">
        <Col xl="2">Select Month/Year: </Col>
        <Col xl="2">
          <Form.Control
            onChange={handleMonthChange}
            type="month"
            defaultValue={`${currentDate.getFullYear()}-${
              currentDate.getMonth() < 9 && "0"
            }${currentDate.getMonth() + 1}`}
          />
        </Col>
        <Col>
          <i
            className={`fa fa-refresh cursor-pointer ${
              isLoading && "fa-spin"
            } `}
            onClick={handleMonthlyChartRefresh}
          />
        </Col>
      </Row>
      {data !== null && (
        <Row className="mt-4">
          {statementsInit.map((statement, index) => (
            <Col xl="3" lg="4" md="6" key={index + data.amount}>
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
    </>
  );
}
MonthlyAnalysis.propTypes = {
  currentDate: PropTypes.object,
};
export default MonthlyAnalysis;
