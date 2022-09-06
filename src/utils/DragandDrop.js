import React from 'react';
import {
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import Box from '@mui/material/Box';

const style = {
  justifyContent: 'center',
  width: 600,
  bgcolor: '#f5f5f5',
  border: '2px solid #f5f5f5',
  boxShadow: 2,
  height: 100,
  p: 4,
  display: 'flex',
  margin: ' 10px auto',
  cursor: 'pointer',
};

function DragandDrop({ handleDrop }) {
  const handleDragEnter = (e) => {
    e.preventDefault();
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  //   const handleDrop = (e) => {
  //     e.preventDefault();
  //   };
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
      drag and drop
    </Box>
  );
}

export default DragandDrop;
