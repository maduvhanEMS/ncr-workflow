import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Paper, Typography, Box, IconButton, Button } from "@mui/material";
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
import Assign from "./Populate/Assign";
import { AssignNCR } from "../../redux/features/ncr/ncrSlice";
import PriorityLevel from "./Populate/PriorityLevel";

const ProgressForm = ({ id, status }) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    files: [],
    details: [
      {
        name: "",
        department: "",
        status: "Not Started",
        createdAt: Date.now(),
      },
    ],
    characteristics: [
      {
        characteristics: "",
        specification: "",
        results: "",
        classification: "",
      },
    ],
    priorityLevel: "",
  });

  const [open, setOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [dept, setDept] = useState("");

  const data = useSelector((state) =>
    state.ncrs.data.find((item) => item.id === id)
  );

  //update the initial values
  useEffect(() => {
    if (data !== undefined) {
      setFormData(data);
    }
  }, [data]);

  const handleAddFile = (file) => {
    setFormData((prevState) => ({
      ...prevState,
      files: [...prevState.files, ...file],
    }));
  };

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("You are about to submit a form");
    // if (status === "Initiated") {
    dispatch(AssignNCR({ ...formData, id }));
  };

  return (
    <Paper elevation={0}>
      <Typography id="transition-modal-title" variant="h5" component="h2">
        {status}
      </Typography>
      <Charateristics
        status={status}
        setData={setFormData}
        data={formData}
        ncrData={data.characteristics}
      />
      <Assign
        data={formData}
        ncrData={data.details}
        open={isOpen}
        status={status}
        setData={setFormData}
        handleOpen={(dept) => {
          setIsOpen((prev) => !prev);
          setDept(dept);
        }}
      />
      <PriorityLevel
        handleChange={(e) => {
          setFormData((prev) => ({ ...prev, priorityLevel: e.target.value }));
        }}
        priorityLevel={formData.priorityLevel}
      />
      <Box>
        <Box mt={2}>
          <Typography>
            Attachments
            <IconButton onClick={handleOpen}>
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </Typography>
          {open && <Files files={formData.files} />}
        </Box>
        <Box>
          <DragandDrop files={formData.files} handleAddFile={handleAddFile} />
        </Box>
        <Box mt={5}>
          <Button variant="contained" type="submit" onClick={handleSubmit}>
            Submit
          </Button>
          <Button variant="contained" sx={{ marginLeft: "10px" }} color="error">
            Clear
          </Button>
        </Box>
      </Box>
      <Comments
        open={isOpen}
        handleOpen={() => setIsOpen((prev) => !prev)}
        setOpen={setIsOpen}
        width={800}
        dept={dept}
        data={data}
      />
    </Paper>
  );
};

export default ProgressForm;
