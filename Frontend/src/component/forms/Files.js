import React from "react";
import { Stack, Typography, IconButton } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import PreviewIcon from "@mui/icons-material/Preview";
import DeleteIcon from "@mui/icons-material/Delete";

const Files = ({ files }) => {
  const openFile = (file) => {
    const objUrl = window.URL.createObjectURL(file);
    return objUrl;
  };

  return (
    <Stack direction="column">
      {files.map((file, idx) => {
        return (
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            key={idx}
          >
            <Typography sx={{ fontSize: "12px" }}>{file.name}</Typography>
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
  );
};

export default Files;
