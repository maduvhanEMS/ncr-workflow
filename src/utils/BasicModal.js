import React, { useState } from "react";
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
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { toast } from "react-toastify";

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

const boxstyle = {
  display: "flex",
  p: 4,
  flexDirection: "column",
};

const theme = createTheme({
  typography: {
    fontFamily: "Hahmlet, serif",
  },
});

export default function TransitionsModal({ open, setOpen }) {
  const [formData, setFormData] = useState({
    priority: "",
    details: [{ name: "", department: "" }],
  });

  const { priority, details } = formData;

  const handleClose = () => setOpen(false);
  const handleRemove = (e, index) => {
    e.preventDefault();
    const data = [...formData];
    data.splice(index, 1);
    setFormData(data);
  };

  const handleAdd = () => {
    setFormData([...formData, { name: "", department: "" }]);
  };

  const handleChange = (e, index) => {
    const { name, value } = e.target;

    const data = [...formData];
    //first check if the value exist first

    const exist = data.filter((item) => item[name] === value);

    if (exist.length < 1) {
      data[index][name] = value;
      setFormData(data);
    } else {
      toast.error("Already selected");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div>
        {/* <Button onClick={handleOpen}>Open modal</Button> */}
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          // onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <Box sx={style}>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
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
              </Box>

              <Box sx={boxstyle}>
                {formData.details.map((item, index) => {
                  return (
                    <div style={{ display: "flex", marginBottom: "10px" }}>
                      <FormControl variant="filled" fullWidth>
                        <InputLabel id="departments">Department</InputLabel>
                        <Select
                          labelId="departments"
                          label="departments"
                          value={item.department}
                          name="department"
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
                      {index > 0 ? (
                        <IconButton
                          sx={{ color: "red" }}
                          onClick={(e) => handleRemove(e, index)}
                        >
                          <RemoveIcon fontSize="medium" />
                        </IconButton>
                      ) : (
                        <span style={{ width: 90 }}></span>
                      )}
                    </div>
                  );
                })}
              </Box>
              <Typography>
                Priority Level <span style={{ color: "red" }}>*</span>:
                <TextField
                  select
                  label="Priority Level"
                  value="priority"
                  name="priority"
                  variant="filled"
                  // onChange={}
                  sx={{ width: 150 }}
                >
                  <MenuItem value="">High</MenuItem>
                  <MenuItem value="low">Low</MenuItem>
                  <MenuItem value="medium">Medium</MenuItem>
                  <MenuItem value="high">High</MenuItem>
                </TextField>
              </Typography>
            </Box>
          </Fade>
        </Modal>
      </div>
    </ThemeProvider>
  );
}
