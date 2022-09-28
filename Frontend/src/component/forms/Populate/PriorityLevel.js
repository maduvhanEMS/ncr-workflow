import React from "react";
import { Box, Typography, TextField, MenuItem } from "@mui/material";

const PriorityLevel = ({ handleChange, priorityLevel }) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
      <Typography>
        Priority Level <span style={{ color: "red" }}>*</span>:
      </Typography>
      <TextField
        size="small"
        select
        label="Priority Level"
        value={priorityLevel}
        name="priorityLevel"
        variant="filled"
        onChange={(e) => handleChange(e)}
        sx={{
          border: priorityLevel === "" ? "1px solid red" : "inherit",
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
  );
};

export default PriorityLevel;
