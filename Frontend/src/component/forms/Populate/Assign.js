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
  Select,
  MenuItem,
} from "@mui/material";
import moment from "moment";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";
import { toast } from "react-toastify";
import CancelIcon from "@mui/icons-material/Cancel";
import DeleteIcon from "@mui/icons-material/Delete";

const department = ["Product Development", "Operations", "Quality Assurance"];
const names = ["Maduvha Nemadandila", "Karabo Notwana", "Thabiso Bokaba"];

const Assign = ({ data, handleOpen, status, setData, ncrData }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const handleSave = () => {
    setIsEdit((prevState) => !prevState);
  };

  const handleAdd = () => {
    setData((prevState) => ({
      ...prevState,
      details: [
        ...prevState.details,
        {
          name: "",
          department: "",
          status: "",
          createdAt: Date.now(),
        },
      ],
    }));

    if (status !== "Initiated") {
      setIsEdit(true);
    }
  };

  const handleCancel = () => {
    if (data.details.length > 1) {
      const isEmptyArray = data.details.filter((items) =>
        Object.values(items).some((item) => item !== "")
      );
      setData(isEmptyArray);
      setIsEdit((prevState) => !prevState);
    } else {
      toast.error("Please populate at least one row");
    }
  };

  const handleEdit = (i) => {
    setIsEdit((prevState) => ({
      ...prevState,
      isEdit: true,
      index: i,
    }));
  };

  const handleIsOpen = (dept) => {
    handleOpen(dept);
  };

  // useEffect(() => {
  //   setData((prev) => ({ ...prev, details: ncrData }));
  //   checkForMissingValues(ncrData);
  // }, [setData, ncrData]);

  function checkForMissingValues(details) {
    details?.forEach((item) => {
      if (Object.values(item).some((val) => val === "")) {
        setIsEdit(true);
        setDisabled(true);
      } else {
        setDisabled(false);
        setIsEdit(false);
      }
    });
  }

  // useEffect(() => {
  //   data?.details?.forEach((item) => {
  //     if (Object.values(item).some((val) => val === "")) {
  //       setIsEdit(true);
  //       setDisabled(true);
  //     } else {
  //       setDisabled(false);
  //       setIsEdit(false);
  //     }
  //   });
  // }, [data]);

  function handleRemove(idx) {
    const filteredData = data.details.filter((_, index) => index !== idx);
    setData({ ...data, details: filteredData });
  }

  function updateState(name, value, i) {
    return setData((prevState) => {
      const newState = prevState.details.map((obj, index) => {
        if (i === index) {
          return { ...obj, [name]: value };
        }
        return obj;
      });
      return { ...prevState, details: newState };
    });
  }

  const handleChange = (e, i) => {
    const { name, value } = e.target;

    const details = [...data.details];

    if (name === "name" || name === "department") {
      const exist = details.filter((item) => item[name] === value);

      if (exist.length < 1) {
        updateState(name, value, i);
      } else {
        toast.error("Already selected");
      }
    } else {
      updateState(name, value, i);
    }
  };

  return (
    <TableContainer component="div" sx={{ mt: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Box>
          <IconButton onClick={handleAdd}>
            <AddIcon sx={{ color: "blue" }} />
          </IconButton>
          {status !== "Initiated" ? (
            !isEdit ? (
              <IconButton onClick={handleEdit}>
                <EditIcon sx={{ color: "blue" }} />
              </IconButton>
            ) : (
              <>
                <IconButton onClick={handleSave}>
                  <SaveIcon />
                </IconButton>
                <IconButton onClick={handleCancel}>
                  <CancelIcon />
                </IconButton>
              </>
            )
          ) : (
            ""
          )}
        </Box>
      </Box>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Department</TableCell>
            <TableCell>Name&nbsp;</TableCell>
            {status !== "Initiated" && <TableCell>Status&nbsp;</TableCell>}
            <TableCell>
              {status === "Initiated" ? "CreatedAt" : "UpdatedAt"}
            </TableCell>
            <TableCell>Actions&nbsp;</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.details?.map((row, index) => (
            <TableRow key={index}>
              {isEdit || status === "Initiated" ? (
                <>
                  <TableCell>
                    <Select
                      value={row.department}
                      name="department"
                      labelId="department "
                      label="department"
                      size="small"
                      sx={{ width: 150 }}
                      onChange={(e) => handleChange(e, index)}
                    >
                      <MenuItem value="" key="emptyValue">
                        <em>None</em>
                      </MenuItem>
                      {department.map((dept, idx) => (
                        <MenuItem value={dept} key={idx}>
                          {dept}
                        </MenuItem>
                      ))}
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Select
                      value={row.name}
                      name="name"
                      size="small"
                      sx={{ width: 150 }}
                      onChange={(e) => handleChange(e, index)}
                    >
                      <MenuItem value="" key="emptyValue">
                        <em>None</em>
                      </MenuItem>
                      {names.map((name, idx) => (
                        <MenuItem value={name} key={idx}>
                          {name}
                        </MenuItem>
                      ))}
                    </Select>
                  </TableCell>
                  {status !== "Initiated" && (
                    <TableCell>
                      <Select
                        size="small"
                        labelId="status"
                        label="status"
                        value={row.status}
                        name="status"
                        sx={{ width: 150 }}
                        onChange={(e) => handleChange(e, index)}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value="Completed">Completed</MenuItem>
                        <MenuItem value="In Progress">In Progress</MenuItem>
                        <MenuItem value="Not Started">Not Started</MenuItem>
                      </Select>
                    </TableCell>
                  )}
                  <TableCell>{moment().startOf("day").fromNow()}</TableCell>
                </>
              ) : (
                <>
                  <TableCell>{row.department}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.status}</TableCell>
                  <TableCell>{moment(row.createdAt).fromNow()}</TableCell>
                </>
              )}

              <TableCell>
                {isEdit && status !== "Initiated" ? (
                  <>
                    <IconButton onClick={() => handleSave(index)}>
                      <SaveIcon />
                    </IconButton>
                    <IconButton onClick={() => handleCancel(index)}>
                      <CancelIcon />
                    </IconButton>
                  </>
                ) : (
                  <>
                    {status !== "Initiated" && (
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
                  </>
                )}
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

export default Assign;
