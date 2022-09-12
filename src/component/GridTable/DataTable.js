import React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box } from "@mui/system";
import { Paper, Typography } from "@mui/material";

//define columns
const columns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "initiator",
    headerName: "Initiator",
    width: 150,
  },

  {
    field: "ncrNumber",
    headerName: "NCR Number",
    width: 160,
  },
  {
    field: "projectName",
    headerName: "Project Name",
    width: 200,
  },
  {
    field: "partDescription",
    headerName: "Part Description",
    width: 160,
  },
  {
    field: "nonConformance",
    headerName: "Non-Conformance",
    width: 300,
    render: (params) => <Typography fullWidth>{params.value}</Typography>,
  },
  {
    field: "status",
    headerName: "Status",
    width: 150,
  },
];

const DataTable = ({ data }) => {
  return (
    <Box>
      <Paper sx={{ width: "100%", mt: 5 }} elevation={3}>
        <DataGrid
          sx={{ typography: "body2", fontSize: "12px" }}
          autoHeight={true}
          // loading={true}
          rows={data}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
          components={{ Toolbar: GridToolbar }}
        />
      </Paper>
    </Box>
  );
};

export default DataTable;
