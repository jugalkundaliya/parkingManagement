import React, { useEffect } from "react";
import Layout from "./../../../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { getReport } from "../../../store/slices/parking/selectors";
import { parkingReportRequested } from "../../../store/slices/parking/slice";
import authService from "../../../services/authService";
import { useNavigate } from "react-router-dom";
import MonthlyAnalysis from "./components/MonthlyAnalysis";
import YearlyAnalysis from "./components/YearlyAnalysis";

function Report(props) {
  const currentDate = new Date();
  const dispatch = useDispatch();
  const report = useSelector(getReport);
  const user = authService.getCurrentUser();
  const navigate = useNavigate();
  useEffect(() => {
    user.role !== "Admin" && navigate("/login", { replace: true });
    dispatch(parkingReportRequested());
  }, []);

  return (
    <Layout loading={report.isLoading}>
      <MonthlyAnalysis currentDate={currentDate} />
      <YearlyAnalysis currentDate={currentDate} />
    </Layout>
  );
}

export default Report;
