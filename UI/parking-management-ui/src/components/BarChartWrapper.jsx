import { Grid, TailSpin, CirclesWithBar } from "react-loader-spinner";
import React from "react";
import PropTypes from "prop-types";
import {
  BarChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
  loading,
} from "recharts";
import Loader from "./Loader";
function BarChartWrapper({
  data,
  dataKey,
  cellConfig,
  fillColor,
  borderColor,
  width,
  height,
  margin,
  loading,
}) {
  const chartHavingData = data?.find((d) => d[dataKey] !== null);

  return (
    <div className="chart-responsive-wrapper ">
      <Loader loading={loading} />
      {chartHavingData ? (
        <ResponsiveContainer>
          <BarChart width={width} height={height} data={data} margin={margin}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <ReferenceLine y={0} />
            <Bar dataKey={dataKey} stroke={borderColor} fill={fillColor}>
              {cellConfig}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <div className="no-chart-data ">
          <h4>No Chart Data</h4>
        </div>
      )}
    </div>
  );
}
BarChartWrapper.defaultProps = {
  height: 300,
  width: 550,
  margin: {
    top: 5,
    right: 5,
    left: 5,
    bottom: 5,
  },
  loading: true,
};
BarChartWrapper.propTypes = {
  data: PropTypes.array,
  dataKey: PropTypes.string,
  cellConfig: PropTypes.any,
  fillColor: PropTypes.string,
  width: PropTypes.string,
  width: PropTypes.number,
  borderColor: PropTypes.string,
  margin: PropTypes.object,
  loading: PropTypes.bool,
};
export default BarChartWrapper;
