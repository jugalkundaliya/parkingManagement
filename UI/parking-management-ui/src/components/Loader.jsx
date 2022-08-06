import React from "react";
import { Grid } from "react-loader-spinner";
import PropTypes from "prop-types";

function Loader({ loading }) {
  return (
    loading && (
      <div className="loader">
        <Grid ariaLabel="loading-indicator" color="var(--bs-white)" />
      </div>
    )
  );
}
Loader.propTypes = {
  loading: PropTypes.bool,
};
export default Loader;
