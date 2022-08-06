import {
  faArrowDownWideShort,
  faArrowUpShortWide,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Table } from "react-bootstrap";
import formattingService from "../services/formattingService";
import PropTypes from "prop-types";
function TableWrapper({ columns, data, sort }) {
  return (
    <div className="table-wrapper">
      <Table className="mt-2" bordered>
        <thead>
          <tr className="flex-column">
            {columns.map((column, index) => (
              <th
                key={`${column.label} - ${index}`}
                className={column.sortable && "cursor-pointer"}
                onClick={() => column.sortable && sort.sortTable(column.key)}
              >
                <div className="justify-content-between d-flex align-items-center">
                  {column.label}
                  {column.sortable && column.key === sort.sortColumn && (
                    <FontAwesomeIcon
                      className="pe-0 ms-auto ps-auto"
                      icon={
                        sort.sortOrder === "asc"
                          ? faArrowUpShortWide
                          : faArrowDownWideShort
                      }
                    />
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((bill, index) => {
            return (
              <tr key={"table-row" + index}>
                {columns.map((column, index) => (
                  <td
                    key={`${column.label} ${index} table-cell`}
                    className={`${column.textRight && "text-right"} ${
                      column.textCenter && "text-center"
                    }`}
                  >
                    {column.content !== undefined
                      ? column.content(bill)
                      : column.amount !== undefined
                      ? formattingService.formatCurrency(bill[column.key])
                      : bill[column.key]}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}
TableWrapper.propTypes = {
  columns: PropTypes.array,
  data: PropTypes.array,
  sort: PropTypes.object,
};
export default TableWrapper;
