import React from "react";
import Loader from "./Loader";
import NavigationBar from "./Navbar";
import PropTypes from "prop-types";

function Layout({ loading, children }) {
  return (
    <div className="mb-4 layout">
      <Loader loading={loading} />
      <NavigationBar />
      <hr />
      {children}
    </div>
  );
}
Layout.propTypes = {
  loading: PropTypes.bool,
};
export default Layout;
