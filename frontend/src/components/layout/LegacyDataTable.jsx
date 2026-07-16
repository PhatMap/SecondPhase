import { isValidElement, useMemo, useState } from "react";
import DataTable from "react-data-table-component";
import PropTypes from "prop-types";

const getSortableValue = (value) => {
  if (typeof value === "string" || typeof value === "number") return value;
  if (typeof value === "boolean") return String(value);
  if (Array.isArray(value)) return value.map(getSortableValue).join(" ");
  if (isValidElement(value)) return getSortableValue(value.props.children);
  return "";
};

const LegacyDataTable = ({
  data,
  className = "",
  bordered = false,
  striped = false,
  hover = false,
}) => {
  const [filterText, setFilterText] = useState("");
  const columns = useMemo(
    () =>
      data.columns.map((column, index) => ({
        id: column.field || index,
        name: column.label,
        selector: (row) => getSortableValue(row[column.field]),
        cell: (row) => row[column.field],
        sortable: Boolean(column.sort),
      })),
    [data.columns]
  );
  const filteredRows = useMemo(() => {
    const query = filterText.trim().toLowerCase();
    if (!query) return data.rows;

    return data.rows.filter((row) =>
      data.columns.some((column) =>
        String(getSortableValue(row[column.field])).toLowerCase().includes(query)
      )
    );
  }, [data.columns, data.rows, filterText]);
  const customStyles = bordered
    ? {
        table: { style: { border: "1px solid #dee2e6" } },
        headCells: { style: { borderRight: "1px solid #dee2e6" } },
        cells: { style: { borderRight: "1px solid #dee2e6" } },
      }
    : undefined;

  return (
    <div className={className}>
      <input
        aria-label="Search table"
        className="form-control mb-3"
        onChange={(event) => setFilterText(event.target.value)}
        placeholder="Search"
        type="search"
        value={filterText}
      />
      <DataTable
        columns={columns}
        customStyles={customStyles}
        data={filteredRows}
        highlightOnHover={hover}
        pagination
        responsive
        striped={striped}
      />
    </div>
  );
};

LegacyDataTable.propTypes = {
  bordered: PropTypes.bool,
  className: PropTypes.string,
  data: PropTypes.shape({
    columns: PropTypes.arrayOf(
      PropTypes.shape({
        field: PropTypes.string.isRequired,
        label: PropTypes.node.isRequired,
        sort: PropTypes.string,
      })
    ).isRequired,
    rows: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
  hover: PropTypes.bool,
  striped: PropTypes.bool,
};

export default LegacyDataTable;
