import React, { useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
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
  //   TextField,
  IconButton,
  Input,
  Select,
  MenuItem,
  MenuList,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { toast } from "react-toastify";
import BasicModal from "../../utils/BasicModal";
import moment from "moment";
import Files from "./Files";
import DragandDrop from "../../utils/DragandDrop";
import Comments from "./Populate/Comments";
import Charateristics from "./Populate/Charateristics";

const ProgressForm = ({ id, status }) => {
  const [edit, setEdit] = useState({ index: "", isEdit: false });
  const [open, setOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [files, setFiles] = useState([]);
  const [dept, setDept] = useState("");

  const data = useSelector((state) =>
    state.ncrs.data.find((item) => item.id === id)
  );

  const handleEdit = (i) => {
    setEdit((prevState) => ({
      ...prevState,
      isEdit: true,
      index: i,
    }));
  };

  //Update the files when the data changes
  useMemo(() => {
    console.log("you have been updated");
    setFiles(data.files);
  }, [data]);

  const handleSave = (e, i) => {};

  const handleCancel = (i) => {
    setEdit((prevState) => ({
      ...prevState,
      isEdit: false,
    }));
  };

  const handleFiles = (e) => {
    let file = [];
    if (e.target.files.length > 1) {
      for (let x = 0; x < e.target.files.length; x++) {
        file.push(e.target.files[x]);
      }
    } else {
      //first check if file already exist
      const idx = files.findIndex(
        (file) => file.name === e.target.files[0].name
      );

      if (idx < 0) {
        file.push(e.target.files[0]);
      } else {
        toast.error("File already uploaded");
      }
    }

    setFiles([...files, ...file]);
  };

  const handleFile = (file) => {
    //validation
    if (!file.type.startsWith("application"))
      return toast.error("Please Insert pdf file");

    //create object url
    setFiles([...files, file]);
    // setUrls([...urls, window.URL.createObjectURL(file)]);
  };

  // const handleClick = () => {
  //   console.log("We are clicked");
  // };

  const handleDrop = (e) => {
    e.preventDefault();
    handleFile(e.dataTransfer.files[0]);
  };

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleIsOpen = (dept) => {
    setIsOpen(!isOpen);
    setDept(dept);
  };

  return (
    <Paper elevation={0}>
      <Typography id="transition-modal-title" variant="h5" component="h2">
        {status}
      </Typography>
      <Charateristics status={status} />
      {/* <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          width: "100%",
        }}
      >
        <IconButton>
          <AddIcon sx={{ color: "blue" }} />
        </IconButton>
        <IconButton>N
          <EditIcon sx={{ color: "blue" }} />
        </IconButton>
      </Box> */}
      <Box>
        <TableContainer component="div" sx={{ mt: 2 }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Department</TableCell>
                <TableCell>Name&nbsp;</TableCell>
                <TableCell>Status&nbsp;</TableCell>
                <TableCell>UpdatedAt&nbsp;</TableCell>
                <TableCell>Actions&nbsp;</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.details.map((row, index) => (
                <TableRow key={index}>
                  {edit.index === index && edit.isEdit ? (
                    <>
                      <TableCell>
                        <Select
                          value={row.name}
                          name="department"
                          fullWidth
                          size="small"
                          sx={{ width: 150 }}
                        >
                          <MenuItem value="Maduvha Nemadandila">
                            Maduvha Nemadandila
                          </MenuItem>
                          <MenuItem value="Maduvha Nemadandila">
                            Heinrich
                          </MenuItem>
                          <MenuItem value="Karabo Notwana">
                            Karabo Notwana
                          </MenuItem>
                          <MenuItem value="Thabiso Bokaba">
                            Thabiso Bokaba
                          </MenuItem>
                        </Select>
                      </TableCell>
                      <TableCell>{row.department}</TableCell>
                      <TableCell>
                        <Select
                          size="small"
                          labelId="departments"
                          label="departments"
                          value={row.status}
                          name="department"
                          //   onChange={(e) => handleChange(e, index)}
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          <MenuItem value="Completed">Completed</MenuItem>
                          <MenuItem value="Checked out">In Progress</MenuItem>
                          <MenuItem value="Not Started">Not Started</MenuItem>
                        </Select>
                      </TableCell>
                      <TableCell>{moment().startOf("day").fromNow()}</TableCell>
                    </>
                  ) : (
                    <>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.department}</TableCell>
                      <TableCell>{row.status}</TableCell>
                      <TableCell>{moment().startOf("day").fromNow()}</TableCell>
                    </>
                  )}

                  <TableCell>
                    {edit.index === index && edit.isEdit ? (
                      <>
                        <IconButton onClick={() => handleEdit(index)}>
                          <SaveIcon />
                        </IconButton>
                        <IconButton onClick={() => handleCancel(index)}>
                          <CancelIcon />
                        </IconButton>
                      </>
                    ) : (
                      <>
                        <IconButton onClick={() => handleEdit(index)}>
                          <EditIcon />
                        </IconButton>
                        <span
                          style={{ color: "blue", cursor: "pointer" }}
                          onClick={() => handleIsOpen(row.department)}
                        >
                          Comment
                        </span>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box mt={2}>
          <Typography>
            Attachments
            <IconButton onClick={handleOpen}>
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </Typography>
          {open && (
            // <MenuList>
            //   <MenuItem>Maduvha</MenuItem>
            //   <MenuItem>Maduvha</MenuItem>
            //   <MenuItem>Maduvha</MenuItem>
            //   <MenuItem>Maduvha</MenuItem>
            // </MenuList>
            <Files files={files} />
          )}
        </Box>
        <Box>
          <DragandDrop handleDrop={handleDrop} handleFiles={handleFiles} />
        </Box>
      </Box>
      <Comments open={isOpen} setOpen={setIsOpen} width={800} dept={dept} />
    </Paper>
  );
};

export default ProgressForm;
