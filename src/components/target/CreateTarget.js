/* eslint-disable react/prop-types */
/* eslint-disable camelcase */
import {
  Drawer,
  IconButton,
  Stack,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select
} from '@material-ui/core';
import closeFill from '@iconify/icons-eva/close-fill';
import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Icon from '@iconify/react';

import { createTargetImage } from '../../pages/request/target';
import { getAllMuseums } from '../../pages/request/museum';

const CreateTarget = ({ toggleDrawer, isDrawerOpen, setIsDrawerOpen, refetchTargetImages }) => {
  const [information, setInformation] = useState('');
  const [targetImageUrl, setTargetImageUrl] = useState('');
  const [type, setType] = useState('');
  const [x_location, setX_location] = useState(0);
  const [y_location, setY_location] = useState(0);
  const [floor, setFloor] = useState(0);
  const [museums_id, setMuseums_id] = useState('');
  const [museumList, setMuseumList] = useState([]);

  const clearFields = () => {
    setInformation('');
    setTargetImageUrl('');
    setType('');
    setX_location('');
    setY_location('');
    setFloor('');
    setMuseums_id('');
  };

  useEffect(() => {
    getAllMuseums().then((res) => {
      // console.log(res);
      setMuseumList(res);
    });
  }, []);

  return (
    <Drawer
      anchor="right"
      open={isDrawerOpen}
      onClose={() => {
        toggleDrawer();
        clearFields();
      }}
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
      <FormControl
        fullWidth
        variant="outlined"
        style={{ marginBottom: '15px' }}
        augment-input="museum"
      >
        <InputLabel>Museum</InputLabel>
        <Select name="museumId" onChange={(e) => setMuseums_id(e.target.value)} label="Country">
          {museumList.map((museum) => (
            <MenuItem augment-input={`${museum.name}`} key={museum.id} value={museum.id}>
              {museum.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        fullWidth
        label="Information"
        onChange={(e) => {
          setInformation(e.target.value);
        }}
        value={information}
        style={{ marginBottom: '15px' }}
        augment-input="info"
      />
      <TextField
        fullWidth
        label="Target Image URL"
        onChange={(e) => {
          setTargetImageUrl(e.target.value);
        }}
        value={targetImageUrl}
        style={{ marginBottom: '15px' }}
        augment-input="target-url"
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
        augment-input="target-x-loc"
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
        augment-input="target-y-loc"
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
        augment-input="target-floor"
      />
      <FormControl
        fullWidth
        variant="outlined"
        style={{ marginBottom: '15px' }}
        augment-input="target-type"
      >
        <InputLabel>Type</InputLabel>
        <Select name="museumId" onChange={(e) => setType(e.target.value)} label="--Type">
          {/* {museumList.map((museum) => ( */}
          <MenuItem value="museums" augment-input="target-type-museum">
            Museum
          </MenuItem>
          <MenuItem value="armodels" augment-input="target-type-model">
            Ar Model
          </MenuItem>
          {/* ))} */}
        </Select>
      </FormControl>

      <Button
        variant="contained"
        component={RouterLink}
        to="#"
        augment-button="create-target-image"
        onClick={() => {
          createTargetImage(
            information,
            targetImageUrl,
            x_location,
            y_location,
            floor,
            museums_id,
            type
          )
            .then((res) => {
              console.log(res);
              clearFields();
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
