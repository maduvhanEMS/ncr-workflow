import { Box, IconButton, Typography } from '@mui/material';
import React from 'react';
import Charateristics from './Charateristics';

const Populate = () => {
  return (
    <Box>
      <Typography variant='h5' component='h'>
        Characteritics <IconButton>Maudvha</IconButton>
      </Typography>
      <Charateristics />
    </Box>
  );
};

export default Populate;
