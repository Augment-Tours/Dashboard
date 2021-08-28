/* eslint-disable react/prop-types */
import React, { useState } from 'react';

import { Drawer, Stack, Typography, IconButton, Icon, TextField, Button } from '@material-ui/core';
import closeFill from '@iconify/icons-eva/close-fill';
import { Link as RouterLink } from 'react-router-dom';
import { createArModel } from '../../pages/request/armodel';

const CreateDrawer = ({ isOpenFilter, setIsOpenFilter, toggleDrawer }) => {
  const [modelName, setModelName] = useState('');
  const [modelDescription, setModelDescription] = useState('');
  const [modelUrl, setModelURL] = useState('');
  const [modelXLocation, setXLocation] = useState('');
  const [modelYLocation, setYLocation] = useState('');
  const [modelFloor, setFloor] = useState('');
  const [xScale, setXScale] = useState(0);
  const [yScale, setYScale] = useState(0);
  const [zScale, setZScale] = useState(0);
  const [museumId, setMuseumId] = useState('');

  return (
    <Drawer
      anchor="right"
      open={isOpenFilter}
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
          Add AR Model
        </Typography>
        <IconButton onClick={toggleDrawer}>
          <Icon icon={closeFill} width={20} height={20} />
        </IconButton>
      </Stack>
      <TextField
        fullWidth
        label="Model Name"
        onChange={(e) => {
          setModelName(e.target.value);
        }}
        style={{ marginBottom: '15px' }}
      />
      <TextField
        fullWidth
        label="Model Description"
        onChange={(e) => {
          setModelDescription(e.target.value);
        }}
        style={{ marginBottom: '15px' }}
      />
      <TextField
        fullWidth
        label="Model URL"
        onChange={(e) => {
          setModelURL(e.target.value);
        }}
        style={{ marginBottom: '15px' }}
      />

      <TextField
        fullWidth
        label="Museum Id"
        onChange={(e) => {
          setMuseumId(e.target.value);
        }}
        style={{ marginBottom: '15px' }}
      />
      <TextField
        fullWidth
        label="Model X-Location"
        onChange={(e) => {
          setXLocation(e.target.value);
        }}
        style={{ marginBottom: '15px' }}
      />
      <TextField
        fullWidth
        label="Model Y-Location"
        onChange={(e) => {
          setYLocation(e.target.value);
        }}
        style={{ marginBottom: '15px' }}
      />
      <TextField
        fullWidth
        label="Model X-Scale"
        onChange={(e) => {
          setXScale(e.target.value);
        }}
        style={{ marginBottom: '15px' }}
      />
      <TextField
        fullWidth
        label="Model Y-Scale"
        onChange={(e) => {
          setYScale(e.target.value);
        }}
        style={{ marginBottom: '15px' }}
      />
      <TextField
        fullWidth
        label="Model Z-Scale"
        onChange={(e) => {
          setZScale(e.target.value);
        }}
        style={{ marginBottom: '15px' }}
      />
      <TextField
        fullWidth
        label="Model Floor"
        onChange={(e) => {
          setFloor(e.target.value);
        }}
        style={{ marginBottom: '15px' }}
      />
      {/* <Button variant="contained" component="label" style={{ marginBottom: '40px' }}>
            Upload File
            <input type="file" hidden />
          </Button> */}

      <Button
        variant="contained"
        component={RouterLink}
        to="#"
        onClick={() => {
          createArModel(
            modelName,
            modelDescription,
            modelUrl,
            modelXLocation,
            modelYLocation,
            xScale,
            yScale,
            zScale,
            modelFloor,
            museumId
          )
            .then((res) => {
              console.log(res);
              setIsOpenFilter(false);
            })
            .catch((e) => console.log(e));
        }}
      >
        Save
      </Button>
    </Drawer>
  );
};

export default CreateDrawer;
