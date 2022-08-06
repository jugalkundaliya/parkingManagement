import React from "react";
import { Form } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import PropTypes from "prop-types";

function PaginationWrapper({
  pageCount,
  onPageChange,
  onPageSizeChange,
  pageSize,
}) {
  return (
    <div className=" d-flex w-100 justify-content-between align-items-center flex-wrap">
      {pageSize && (
        <div className="d-flex align-items-center gap-2">
          <span>Page Size:</span>
          <Form.Select
            size="sm"
            className="w-auto"
            onChange={onPageSizeChange}
            value={pageSize}
          >
            <option value="3">3</option>
            <option value="5">5</option>
            <option value="10">10</option>
          </Form.Select>
        </div>
      )}
      <div className="d-flex align-items-center gap-2 flex-wrap">
        <span>Total Pages: {pageCount}</span>
        <ReactPaginate
          previousLabel={"<<"}
          nextLabel={">>"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={2}
          onPageChange={onPageChange}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"}
        />
      </div>
    </div>
  );
}
PaginationWrapper.propTypes = {
  pageCount: PropTypes.number,
  onPageChange: PropTypes.func,
  onPageSizeChange: PropTypes.func,
  pageSize: PropTypes.number,
};
export default PaginationWrapper;
