import React from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import {
  Paper,
  Grid,
  TextField,
  createTheme,
  ThemeProvider,
  MenuItem,
  TextareaAutosize,
  Button,
} from "@mui/material";

import { v4 as uuid } from "uuid";
import { useDispatch } from "react-redux";
import { addNCR } from "../../redux/features/ncr/ncrSlice";

const theme = createTheme({
  Typography: {
    fontFamily: "Hahmlet, serif",
    textTransform: "capitalize",
    fontSize: "14px",
  },
});

const ncrTypes = ["AMSS", "DEV", "DM4", "OPS", "SMG"];

const ValidationSchema = yup.object({
  ncrType: yup.string("Select an NCR Type").required("NCR Type is required"),
  partDescription: yup
    .string("Enter part description")
    .required("Part Description is required"),
});

const CreateNCR = () => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      id: uuid(),
      ncrType: "",
      projectName: "",
      partDescription: "",
      drawingNumber: "",
      nonConformance: "",
      lotNumber: "",
      plant: "",
      responsiblePerson: "",
      status: "Initiated",
      priorityLevel: "",
      details: [],
      files: [],
    },
    validationSchema: ValidationSchema,
    onSubmit: (values) => {
      //   alert(JSON.stringify(values, null, 2));
      dispatch(addNCR(values));
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <Paper
        elevation={3}
        sx={{
          p: 4,
          maxWidth: "1200px",
          justifyContent: "center",
          width: "100%",
          margin: "0 auto",
        }}
      >
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={6}>
              <TextField
                select
                fullWidth
                variant="outlined"
                name="ncrType"
                label="NCR Type"
                onChange={formik.handleChange}
                value={formik.values.ncrType}
                margin="normal"
                error={formik.touched.ncrType && Boolean(formik.errors.ncrType)}
                helperText={formik.touched.ncrType && formik.errors.ncrType}
                sx={{
                  backgroundColor: (theme) =>
                    theme.palette.mode === "light"
                      ? "rgba(225,225,225,0.8)"
                      : "black",
                  mt: 3,
                  borderRadius: "5px",
                }}
              >
                {ncrTypes.map((item) => (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                fullWidth
                variant="outlined"
                name="partDescription"
                label="Part Description"
                margin="normal"
                onChange={formik.handleChange}
                value={formik.values.partDescription}
                autoFocus
                error={
                  formik.touched.partDescription &&
                  Boolean(formik.errors.partDescription)
                }
                helperText={
                  formik.touched.partDescription &&
                  formik.errors.partDescription
                }
                sx={{
                  backgroundColor: (theme) =>
                    theme.palette.mode === "light"
                      ? "rgba(225,225,225,0.5)"
                      : "black",
                  mt: 3,
                  borderRadius: "5px",
                }}
              />
              <TextareaAutosize
                placeholder="Please Enter Non-Conformance"
                name="nonConformance"
                label="Non-Conformance"
                onChange={formik.handleChange}
                value={formik.values.nonConformance}
                minRows={2}
                autoFocus
                style={{
                  backgroundColor: "rgba(225,225,225,0.5)",
                  width: "100%",
                  borderRadius: "5px",
                  padding: "10px",
                  fontFamily: "Hahmlet, serif",
                  fontSize: "14px",
                  border: "1px solid rgba(225,225,225,0.5)",
                  boxShadow: "0 0 4px 0 rgba(225,225,225,1",
                  outline: "none",
                  marginTop: "25px",
                  resize: "vertical",
                }}
              />
              <TextField
                select
                fullWidth
                variant="outlined"
                name="plant"
                helperText="Plant"
                autoFocus
                onChange={formik.handleChange}
                value={formik.values.plant}
                margin="normal"
                sx={{
                  color: (theme) =>
                    theme.palette.mode === "light"
                      ? "rgba(225,225,225,0.8)"
                      : "black",
                  mt: 3,
                  borderRadius: "5px",
                }}
              >
                {ncrTypes.map((item) => (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                variant="outlined"
                name="projectName"
                label="Project Name"
                margin="normal"
                onChange={formik.handleChange}
                value={formik.values.projectName}
                autoFocus
                sx={{
                  backgroundColor: (theme) =>
                    theme.palette.mode === "light"
                      ? "rgba(225,225,225,0.5)"
                      : "black",
                  mt: 3,
                  borderRadius: "5px",
                }}
              />
              <TextField
                fullWidth
                name="drawingNumber"
                label="Drawing Number"
                margin="normal"
                autoFocus
                onChange={formik.handleChange}
                value={formik.values.drawingNumber}
                sx={{
                  backgroundColor: (theme) =>
                    theme.palette.mode === "light"
                      ? "rgba(225,225,225,0.5)"
                      : "black",
                  mt: 3,
                  borderRadius: "5px",
                  outline: "none",
                  border: "none",
                  color: "red",
                }}
                variant="outlined"
                // InputProps={{
                //   disableUnderline: true,
                // }}
              />
              <TextField
                fullWidth
                variant="outlined"
                name="lotNumber"
                label="Seial/Lot Number"
                margin="normal"
                onChange={formik.handleChange}
                value={formik.values.lotNumber}
                sx={{
                  backgroundColor: (theme) =>
                    theme.palette.mode === "light"
                      ? "rgba(225,225,225,0.5)"
                      : "black",
                  mt: 3,
                  borderRadius: "5px",
                }}
              />
              <TextField
                select
                fullWidth
                variant="outlined"
                name="responsiblePerson"
                label="Responsible Person"
                margin="normal"
                onChange={formik.handleChange}
                value={formik.values.responsiblePerson}
                sx={{
                  backgroundColor: (theme) =>
                    theme.palette.mode === "light"
                      ? "rgba(225,225,225,0.8)"
                      : "black",
                  mt: 3,
                  borderRadius: "5px",
                }}
              >
                {ncrTypes.map((item) => (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Button type="submit">Submit</Button>
            <Button color="error">Clear</Button>
          </Grid>
        </form>
      </Paper>
    </ThemeProvider>
  );
};

export default CreateNCR;
