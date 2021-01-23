import React, { useEffect, useState } from "react";
import { DataGrid } from "@material-ui/data-grid";

const DataGridList = ({ loading, columns, rows }) => {
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid autoHeight loading={loading} columns={columns} rows={rows} />
    </div>
  );
};

export default DataGridList;
