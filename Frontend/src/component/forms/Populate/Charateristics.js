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
import { FieldArray, Form, Field, Formik } from "formik";
import * as Yup from "yup";
import styles from "./form.module.css";

// const validationSchema = Yup.object({
//   charateristics: Yup.array().of(
//     Yup.object().shape({
//       charateristics: Yup.string().required("Charateristics is required"),
//       specification: Yup.string().required("Specification is required"),
//       results: Yup.string().required("Results is required"),
//       classification: Yup.string().required("Classification is required"),
//     })
//   ),
// });

const Charateristics = ({ status, data, setData, ncrData }) => {
  // const [formData, setFormData] = useState([
  //   {
  //     charateristics: "",
  //     specification: "",
  //     results: "",
  //     classification: "",
  //   },
  // ]);
  const [isEdit, setIsEdit] = useState(false);

  // useEffect(() => {
  //   setData((prev) => ({ ...prev, characteristics: ncrData }));
  // }, [ncrData, setData]);

  const handleChange = (i) => {
    return (e) => {
      const { name, value } = e.target;

      setData((prevState) => {
        const newState = prevState.characteristics.map((obj, index) => {
          if (i === index) {
            return { ...obj, [name]: value };
          }
          return obj;
        });

        return { ...prevState, characteristics: newState };
      });
    };
  };

  const handleAdd = () => {
    setData((prevState) => ({
      ...prevState,
      characteristics: [
        ...prevState.characteristics,
        {
          characteristics: "",
          specification: "",
          results: "",
          classification: "",
        },
      ],
    }));
    if (status !== "Initiated") {
      setIsEdit(true);
    }
  };

  const handleRemove = (idx) => {
    const filteredData = data.charateristics.filter(
      (_, index) => index !== idx
    );
    setData(filteredData);
  };

  const handleEdit = () => {
    setIsEdit(true);
  };

  const handleCancel = () => {
    const isEmptyArray = data.characteristics.filter((item) =>
      Object.values(item).some((item) => item !== "")
    );
    setData(isEmptyArray);
    setIsEdit(false);
  };

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
          {data.characteristics.map((chars, index) =>
            status === "Initiated" || isEdit ? (
              <TableRow key={index}>
                <TableCell>
                  <textarea
                    name="characteristics"
                    className={styles["input-textarea"]}
                    value={chars.charateristics}
                    onChange={handleChange(index)}
                  />
                </TableCell>
                <TableCell>
                  <textarea
                    name="specification"
                    value={chars.specification}
                    className={styles["input-textarea"]}
                    onChange={handleChange(index)}
                  />
                </TableCell>
                <TableCell>
                  <textarea
                    name="results"
                    value={chars.results}
                    style={{ textAlign: "center" }}
                    className={styles["input-textarea"]}
                    onChange={handleChange(index)}
                  />
                </TableCell>
                <TableCell>
                  <textarea
                    name="classification"
                    value={chars.classification}
                    style={{ textAlign: "center" }}
                    className={styles["input-textarea"]}
                    onChange={handleChange(index)}
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
                <TableCell>{chars.characteristics}</TableCell>
                <TableCell>{chars.specification}</TableCell>
                <TableCell>{chars.results}</TableCell>
                <TableCell>{chars.classification}</TableCell>
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
