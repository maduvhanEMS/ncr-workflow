import { Box, IconButton, Typography, Stack } from "@mui/material";
import React, { useState } from "react";
import Charateristics from "./Charateristics";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Comments from "./Comments";

const Populate = () => {
  const [openForms, setOpenForms] = useState([
    {
      name: "Characteristics",
      open: false,
    },
    {
      name: "Comments PD",
      open: false,
    },
    {
      name: "Comments OPS",
      open: false,
    },
    {
      name: "Comments QA",
      open: false,
    },
  ]);

  const handleOpen = (idx) => {
    const updatedData = openForms.map((item, index) =>
      index === idx ? { ...item, open: !item.open } : { ...item }
    );

    setOpenForms(updatedData);
  };

  const arrowDirection = (open) => {
    if (open) {
      return <KeyboardArrowUpIcon />;
    }

    return <KeyboardArrowDownIcon />;
  };

  return (
    <Stack direction="row" spacing={2} justifyContent="space-evenly">
      <Stack direction="column" sx={{ width: "55%" }}>
        <Box>
          <Typography variant="h7" component="h">
            Characteritics
            <IconButton onClick={() => handleOpen(0)}>
              {arrowDirection(openForms?.[0]?.open)}
            </IconButton>
          </Typography>

          {openForms?.[0]?.name === "Characteristics" &&
            openForms?.[0]?.open && <Charateristics />}
        </Box>
        <Box mt={2}>
          <Typography variant="h7" component="h">
            Comments PD
            <IconButton onClick={() => handleOpen(1)}>
              {arrowDirection(openForms?.[1]?.open)}
            </IconButton>
          </Typography>

          {openForms?.[1]?.name === "Comments PD" && openForms?.[1]?.open && (
            <Comments editorJS={openForms?.[1]?.name} />
          )}
        </Box>
      </Stack>

      <Stack sx={{ width: "45%" }}>
        <Box>
          <Typography variant="h7" component="h">
            Comments OPS
            <IconButton onClick={() => handleOpen(2)}>
              {arrowDirection(openForms?.[2]?.open)}
            </IconButton>
          </Typography>

          {openForms?.[2]?.name === "Comments OPS" && openForms?.[2]?.open && (
            <Comments editorJS={openForms?.[2]?.name} />
          )}
        </Box>
        <Box mt={2}>
          <Typography variant="h7" component="h">
            Comments QA
            <IconButton onClick={() => handleOpen(3)}>
              {arrowDirection(openForms?.[3]?.open)}
            </IconButton>
          </Typography>

          {openForms?.[3]?.name === "Comments QA" && openForms?.[3]?.open && (
            <Comments editorJS={openForms?.[3]?.name} />
          )}
        </Box>
      </Stack>
    </Stack>
  );
};

export default Populate;
