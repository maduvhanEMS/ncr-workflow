import React, { useState } from "react";
import {
  Paper,
  Table,
  Typography,
  Box,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  IconButton,
  Input,
  Select,
  MenuItem,
  MenuList,
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import DeleteIcon from "@mui/icons-material/Delete";

const Charateristics = () => {
  const [formData, setFormData] = useState([
    {
      charateristics: "",
      specification: "",
      results: "",
      classification: "",
    },
  ]);
  const [isEdit, setIsEdit] = useState(true);

  const handleChange = (e, i) => {
    const { name, value } = e.target;

    //find index
    const data = [...formData];
    data[i][name] = value;
    setFormData(data);
  };

  const handleAdd = () => {
    setFormData((prevState) => [
      ...prevState,
      {
        charateristics: "",
        specification: "",
        results: "",
        classification: "",
      },
    ]);
  };

  const handleRemove = (idx) => {
    const filteredData = formData.filter((_, index) => index !== idx);
    console.log(filteredData);
    setFormData(filteredData);
  };

  const handleEdit = () => {
    setIsEdit(true);
  };
  const handleCancel = () => {};

  return (
    <TableContainer component="div">
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Box>
          <IconButton onClick={handleAdd}>
            <AddIcon sx={{ color: "blue" }} />
          </IconButton>
          <IconButton onClick={handleEdit}>
            <EditIcon sx={{ color: "blue" }} />
          </IconButton>
        </Box>
      </Box>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Charateristics</TableCell>
            <TableCell>Specification&nbsp;</TableCell>
            <TableCell>Results&nbsp;</TableCell>
            <TableCell>Classification&nbsp;</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {formData.map((data, index) => (
            <TableRow key={index}>
              <TableCell>
                <textarea
                  name="charateristics"
                  style={{ resize: "vertical" }}
                  value={data.charateristics}
                  onChange={(e) => handleChange(e, index)}
                />
              </TableCell>
              <TableCell>
                <textarea
                  name="specification"
                  value={data.specification}
                  style={{ resize: "vertical" }}
                  onChange={(e) => handleChange(e, index)}
                />
              </TableCell>
              <TableCell>
                <textarea
                  name="results"
                  value={data.results}
                  style={{ resize: "vertical" }}
                  onChange={(e) => handleChange(e, index)}
                />
              </TableCell>
              <TableCell>
                <textarea
                  name="classification"
                  value={data.classification}
                  style={{ resize: "vertical" }}
                  onChange={(e) => handleChange(e, index)}
                />
                {/* {isEdit ? (
                  <>
                    <IconButton onClick={() => handleEdit(index)}>
                      <SaveIcon />
                    </IconButton>
                    <IconButton onClick={() => handleCancel(index)}>
                      <CancelIcon />
                    </IconButton>
                  </>
                ) : (
                  <IconButton onClick={() => handleEdit(index)}>
                    <EditIcon />
                  </IconButton>
                )} */}
              </TableCell>
              <TableCell>
                {index > 0 && (
                  <IconButton
                    sx={{ color: "red" }}
                    onClick={() => handleRemove(index)}
                  >
                    <DeleteIcon />
                  </IconButton>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Charateristics;
