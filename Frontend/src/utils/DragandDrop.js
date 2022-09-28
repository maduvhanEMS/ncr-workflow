import React from "react";
import Box from "@mui/material/Box";
import { toast } from "react-toastify";

const style = {
  justifyContent: "center",
  width: 600,
  bgcolor: "#f5f5f5",
  border: "2px solid #f5f5f5",
  boxShadow: 2,
  height: 100,
  p: 4,
  display: "flex",
  margin: " 20px auto",
  cursor: "pointer",
};

function DragandDrop({ files, handleAddFile }) {
  const handleDragEnter = (e) => {
    e.preventDefault();
  };

  const handleFiles = (e) => {
    e.preventDefault();
    handleFile(Object.values({ ...e.target.files }));
  };

  const handleFile = (uploadFiles) => {
    let fileArray = [];
    uploadFiles.forEach((file) => {
      if (!file.type.startsWith("application")) {
        return toast.error("Please Insert pdf file");
      }
      const idx = files.findIndex((item) => item.name === file.name);
      if (idx >= 0) {
        return toast.error("File already uploaded");
      }
      fileArray.push(file);
    });

    handleAddFile(fileArray);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    handleFile(Object.values({ ...e.dataTransfer.files }));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
  };

  return (
    <Box
      sx={style}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="file-input">
        <input
          type="file"
          className="custom-file-input"
          multiple
          id="file"
          onChange={handleFiles}
        />
        <label htmlFor="file">drag and drop or click to select file(s)</label>
      </div>
    </Box>
  );
}

export default DragandDrop;
