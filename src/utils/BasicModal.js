import React, { useState, useEffect } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Button,
  Stack,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { toast } from "react-toastify";
import DragandDrop from "./DragandDrop";
import DownloadIcon from "@mui/icons-material/Download";
import PreviewIcon from "@mui/icons-material/Preview";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AssignNCR, reset } from "../redux/features/ncr/ncrSlice";

const style = {
  position: "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  // border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const theme = createTheme({
  typography: {
    fontFamily: "Hahmlet, serif",
  },
});

export default function TransitionsModal({ open, setOpen }) {
  const [formData, setFormData] = useState({
    priority: "",
    details: [{ name: "", department: "", status: "" }],
  });
  const [checkDetails, setCheckDetails] = useState(0);
  const [files, setFiles] = useState([]);
  const [urls, setUrls] = useState([]);
  const [submit, setSubmit] = useState(false);
  const [searchParams, setsearchParams] = useSearchParams();

  const dispatch = useDispatch();
  const { isSuccess } = useSelector((state) => state.ncrs);

  const id = searchParams.get("id");

  const handleFile = (file) => {
    //validation
    if (!file.type.startsWith("application"))
      return toast.error("Please Insert pdf file");

    //create object url
    setFiles([...files, file]);
    setUrls([...urls, window.URL.createObjectURL(file)]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    handleFile(e.dataTransfer.files[0]);
  };

  const handleFiles = (e) => {
    let file = [];
    if (e.target.files.length > 1) {
      for (let x = 0; x < e.target.files.length; x++) {
        file.push(e.target.files[x]);
      }
    } else {
      file.push(e.target.files[0]);
    }

    setFiles([...files, ...file]);
  };

  // console.log(files);
  const openFile = (file) => {
    const objUrl = window.URL.createObjectURL(file);
    return objUrl;
  };

  const { priority, details } = formData;

  const handleClose = () => setOpen(false);

  const handleRemove = (e, index) => {
    e.preventDefault();
    const data = { ...formData };
    data.details.splice(index, 1);
    setFormData(data);
  };

  const handleAdd = () => {
    if (formData.details.length < 3) {
      const updatedData = [
        ...formData.details,
        { name: "", department: "", status: "" },
      ];
      setFormData({ ...formData, details: updatedData });
    } else {
      toast.error("Max number of Assignment reached");
    }
  };

  const handleChange = (e, index) => {
    const { name, value } = e.target;

    const data = { ...formData };

    if (name === "name" || name === "department") {
      const exist = data.details.filter((item) => item[name] === value);

      if (exist.length < 1) {
        data.details[index][name] = value;
        setFormData(data);
      } else {
        toast.error("Already selected");
      }
    } else {
      setFormData((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  useEffect(() => {
    const checkLength = formData.details.filter(
      (item) => item.name !== "" || item.details !== ""
    ).length;
    setCheckDetails(checkLength);

    //set Errors
  }, [formData]);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Successfully assigned");
      setFormData({
        priority: "",
        details: [{ name: "", department: "" }],
      });
      setFiles([]);
      setSubmit(false);
      dispatch(reset());
    }
  }, [isSuccess, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmit(true);

    if (priority !== "" && checkDetails !== 0) {
      const data = new FormData();

      for (var x = 0; x < files.length; x++) {
        data.append("file", files[x]);
      }

      data.append("priority", priority);
      data.append("details", details);

      dispatch(AssignNCR({ id, priority, files, details }));
    } else {
      toast.error("Please populate all required fields ");
    }
  };

  const handleReset = (e) => {
    setFormData({
      priority: "",
      details: [{ name: "", department: "" }],
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <div>
        {/* <Button onClick={handleOpen}>Open modal</Button> */}
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <Box
              sx={style}
              component="form"
              variant="form"
              onSubmit={handleSubmit}
            >
              <Stack direction="row" spacing="2" justifyContent="space-between">
                <Typography
                  id="transition-modal-title"
                  variant="h5"
                  component="h2"
                >
                  Tasks Assignment
                </Typography>
                <IconButton color="primary" onClick={handleAdd}>
                  <AddIcon fontSize="medium" />
                </IconButton>
              </Stack>
              <Stack direction="column" spacing={3} m={1} p={1}>
                {formData.details.map((item, index) => {
                  return (
                    <div
                      style={{ display: "flex", marginBottom: "10px" }}
                      key={index}
                    >
                      <FormControl variant="filled" fullWidth>
                        <InputLabel id="departments">Department</InputLabel>
                        <Select
                          labelId="departments"
                          label="departments"
                          value={item.department}
                          name="department"
                          sx={{
                            border:
                              submit && checkDetails === 0
                                ? "1px solid red"
                                : "inherit",
                          }}
                          onChange={(e) => handleChange(e, index)}
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          <MenuItem value="QA">Quality Assurance</MenuItem>
                          <MenuItem value="OPS">Operations</MenuItem>
                          <MenuItem value="PD">Product Developement</MenuItem>
                        </Select>
                      </FormControl>
                      <FormControl variant="filled" fullWidth sx={{ mx: 2 }}>
                        <InputLabel id="name">Name</InputLabel>
                        <Select
                          labelId="name"
                          label="name"
                          value={item.name}
                          onChange={(e) => handleChange(e, index)}
                          name="name"
                          sx={{
                            border:
                              submit && checkDetails === 0
                                ? "1px solid red"
                                : "inherit",
                          }}
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          <MenuItem value="Maduvha Nemadandila">
                            Maduvha Nemadandila
                          </MenuItem>
                          <MenuItem value="Karabo Notwana">
                            Karabo Notwana
                          </MenuItem>
                          <MenuItem value="Thabiso Bokaba">
                            Thabiso Bokaba
                          </MenuItem>
                        </Select>
                      </FormControl>

                      <IconButton
                        sx={{
                          color: "red",
                          display: index === 0 ? "none" : "block",
                        }}
                        onClick={(e) => handleRemove(e, index)}
                      >
                        <RemoveIcon fontSize="medium" />
                      </IconButton>
                    </div>
                  );
                })}
              </Stack>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography>
                  Priority Level <span style={{ color: "red" }}>*</span>:
                </Typography>
                <TextField
                  select
                  label="Priority Level"
                  value={priority}
                  name="priority"
                  variant="filled"
                  onChange={(e) => handleChange(e, 0)}
                  sx={{
                    border:
                      submit && priority === "" ? "1px solid red" : "inherit",
                    width: 150,
                  }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="low">Low</MenuItem>
                  <MenuItem value="medium">Medium</MenuItem>
                  <MenuItem value="high">High</MenuItem>
                </TextField>
              </Box>
              <DragandDrop handleDrop={handleDrop} handleFiles={handleFiles} />
              <Stack direction="column">
                {files.map((file, idx) => {
                  return (
                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                      key={idx}
                    >
                      <Typography sx={{ fontSize: "12px" }}>
                        {file.name}
                      </Typography>
                      <div>
                        <IconButton
                          component="a"
                          target="_blank"
                          href={openFile(file)}
                          sx={{
                            fontSize: "12px",
                            textDecoration: "none",
                            pl: 2,
                          }}
                        >
                          <PreviewIcon />
                        </IconButton>
                        <IconButton
                          sx={{
                            fontSize: "12px",
                            textDecoration: "none",
                          }}
                        >
                          <DownloadIcon />
                        </IconButton>
                        <IconButton
                          sx={{
                            fontSize: "12px",
                            textDecoration: "none",
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </div>
                    </Stack>
                  );
                })}
              </Stack>
              <Stack direction="row" spacing={2}>
                <Button variant="outlined" color="primary" type="submit">
                  Submit
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  type="reset"
                  onClick={handleReset}
                >
                  Clear
                </Button>
              </Stack>
            </Box>
          </Fade>
        </Modal>
      </div>
    </ThemeProvider>
  );
}
