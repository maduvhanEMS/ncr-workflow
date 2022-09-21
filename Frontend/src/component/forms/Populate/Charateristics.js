import React, { useState, useEffect } from "react";
import {
  Table,
  Box,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import DeleteIcon from "@mui/icons-material/Delete";

const data = [
  {
    charateristics: "Relative Dynamic Vivacity",
    specification: "06-7600-2020-046",
    results: "0.3",
    classification: "Major B",
  },
];

const Charateristics = ({ status }) => {
  const [formData, setFormData] = useState([
    {
      charateristics: "",
      specification: "",
      results: "",
      classification: "",
    },
  ]);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    setFormData([...data]);
  }, []);

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
    if (status !== "Initiated") {
      setIsEdit(true);
    }
  };

  const handleRemove = (idx) => {
    const filteredData = formData.filter((_, index) => index !== idx);
    setFormData(filteredData);
  };

  const handleEdit = () => {
    setIsEdit(true);
  };

  const handleCancel = () => {
    //check if there is a
    const chars = [...formData];

    const isEmptyArray = formData.map((item) =>
      Object.values(item).some((item) => item === "")
    );
    for (var i = 0; i < isEmptyArray.length; i++) {
      if (isEmptyArray[i] === true) {
        chars.splice(i, 1);
      }
    }

    setFormData(chars);
    setIsEdit(false);
  };

  console.log(
    formData.map((item) => Object.values(item).some((item) => item === ""))
  );

  return (
    <TableContainer component="div">
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Box>
          <IconButton onClick={handleAdd}>
            <AddIcon sx={{ color: "blue" }} />
          </IconButton>
          {!isEdit ? (
            <IconButton onClick={handleEdit}>
              <EditIcon sx={{ color: "blue" }} />
            </IconButton>
          ) : (
            <>
              <IconButton>
                <SaveIcon />
              </IconButton>
              <IconButton onClick={handleCancel}>
                <CancelIcon />
              </IconButton>
            </>
          )}
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
          {formData.map((data, index) =>
            status === "Initiated" || isEdit ? (
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
            ) : (
              <TableRow key={index}>
                <TableCell>{data.charateristics}</TableCell>
                <TableCell>{data.specification}</TableCell>
                <TableCell>{data.results}</TableCell>
                <TableCell>{data.classification}</TableCell>
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
            )
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Charateristics;
