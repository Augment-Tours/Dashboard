/* eslint-disable react/prop-types */
/* eslint-disable camelcase */
import { Drawer, IconButton, Stack, Typography, TextField, Button } from '@material-ui/core';
import closeFill from '@iconify/icons-eva/close-fill';
import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Icon from '@iconify/react';

import { createTargetImage } from '../../pages/request/target';

const CreateTarget = ({ toggleDrawer, isDrawerOpen, setIsDrawerOpen, refetchTargetImages }) => {
  const [information, setInformation] = useState('');
  const [targetImageUrl, setTargetImageUrl] = useState('');
  const [x_location, setX_location] = useState(0);
  const [y_location, setY_location] = useState(0);
  const [floor, setFloor] = useState(0);
  const [museums_id, setMuseums_id] = useState('');
  return (
    <Drawer
      anchor="right"
      open={isDrawerOpen}
      onClose={() => {}}
      PaperProps={{
        sx: { width: 400, border: 'none', overflow: 'hidden', padding: '20px 20px' }
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ px: 1, py: 2 }}
      >
        <Typography variant="subtitle1" sx={{ ml: 1 }}>
          Add Target Image
        </Typography>
        <IconButton onClick={toggleDrawer}>
          <Icon icon={closeFill} width={20} height={20} />
        </IconButton>
      </Stack>
      <TextField
        fullWidth
        label="Museum Id"
        onChange={(e) => {
          setMuseums_id(e.target.value);
        }}
        value={museums_id}
        style={{ marginBottom: '15px' }}
      />
      <TextField
        fullWidth
        label="Information"
        onChange={(e) => {
          setInformation(e.target.value);
        }}
        value={information}
        style={{ marginBottom: '15px' }}
      />
      <TextField
        fullWidth
        label="Target Image URL"
        onChange={(e) => {
          setTargetImageUrl(e.target.value);
        }}
        value={targetImageUrl}
        style={{ marginBottom: '15px' }}
      />
      <TextField
        fullWidth
        type="number"
        label="X Location"
        onChange={(e) => {
          setX_location(e.target.value);
        }}
        value={x_location}
        style={{ marginBottom: '15px' }}
      />
      <TextField
        fullWidth
        type="number"
        label="Y Location"
        onChange={(e) => {
          setY_location(e.target.value);
        }}
        value={y_location}
        style={{ marginBottom: '15px' }}
      />
      <TextField
        fullWidth
        label="Floor"
        type="number"
        onChange={(e) => {
          setFloor(e.target.value);
        }}
        value={floor}
        style={{ marginBottom: '15px' }}
      />

      <Button
        variant="contained"
        component={RouterLink}
        to="#"
        onClick={() => {
          createTargetImage(information, targetImageUrl, x_location, y_location, floor, museums_id)
            .then((res) => {
              console.log(res);
              setIsDrawerOpen(false);
              refetchTargetImages();
            })
            .catch((e) => console.log(e));
        }}
      >
        Add
      </Button>
    </Drawer>
  );
};

export default CreateTarget;
