import { IconButton, Paper, Tab } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { Container } from "../globlaStyles";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import DataTable from "../component/GridTable/DataTable";
import { useSelector } from "react-redux";

const Register = () => {
  const { data } = useSelector((state) => state.ncrs);

  return (
    <Container>
      <Paper>
        <Box p={2} sx={{ display: "flex", justifyContent: "space-between" }}>
          <Link
            to="/addNCR"
            style={{
              display: "flex",
              alignItems: "center",
              color: "rgba(0,0,0,0.8)",
              transition: "0.2s ease-in",
              cursor: "pointer",
              "&:hover": {
                color: "blue",
              },
            }}
          >
            <AddIcon /> Create NCR
          </Link>
          <input />
        </Box>
      </Paper>
      <DataTable data={data} />
    </Container>
  );
};

export default Register;
