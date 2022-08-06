import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
} from "recharts";
import PropTypes from "prop-types";
import Loader from "./Loader";
import { Col } from "react-bootstrap";

function LineChartWrapper({
  data,
  dataKey,
  color,
  width,
  height,
  margin,
  activeDotRadius,
  loading,
}) {
  const chartHavingData = data?.find((d) => d[dataKey] !== null);
  return (
    <div className="chart-responsive-wrapper ">
      <Loader loading={loading} />
      {chartHavingData ? (
        <ResponsiveContainer>
          <LineChart data={data} width={width} height={height} margin={margin}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <ReferenceLine y={0} />
            <Line
              type="monotone"
              stroke={color}
              dataKey={dataKey}
              activeDot={{ r: { activeDotRadius } }}
            />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <div className="no-chart-data ">
          <h4>No Chart Data</h4>
        </div>
      )}
    </div>
  );
}
LineChartWrapper.defaultProps = {
  height: 300,
  width: 550,
  margin: {
    top: 5,
    right: 5,
    left: 5,
    bottom: 5,
  },
  dotRadius: 8,
  loading: true,
};
LineChart.propTypes = {
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
export default LineChartWrapper;
