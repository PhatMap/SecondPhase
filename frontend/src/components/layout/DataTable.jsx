import React from "react";

const DataTable = ({ data }) => {
  return (
    <table className="my-table">
      <thead>
        <tr>
          {data.columns.map((column, columnIndex) => (
            <th key={columnIndex}>{column.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.rows.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {data.columns.map((column, cellIndex) => (
              <td key={cellIndex}>{row[column.field]}</td>
            ))}
          </tr>
        ))}
      </tbody>

    </table>
  );
};

export default DataTable;
