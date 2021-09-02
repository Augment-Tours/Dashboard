/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';

import {
  Drawer,
  Stack,
  Typography,
  IconButton,
  Icon,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@material-ui/core';
import closeFill from '@iconify/icons-eva/close-fill';
// import { Link as RouterLink } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { createArModel } from '../../pages/request/armodel';
import { getAllMuseums } from '../../pages/request/museum';

const CreateDrawer = ({ isOpenFilter, setIsOpenFilter, toggleDrawer, refetchARModels }) => {
  const [museumList, setMuseumList] = useState([]);
  const { errors, handleSubmit, handleChange } = useFormik({
    initialValues: {
      modelName: '',
      modelDescription: '',
      modelUrl: '',
      modelXLocation: '',
      modelYLocation: '',
      modelZLocation: '',
      modelFloor: '',
      xScale: '',
      yScale: '',
      zScale: '',
      museumId: '',
      image: ''
    },
    onSubmit: (values) => {
      createArModel(
        values.modelName,
        values.modelDescription,
        values.modelUrl,
        values.modelXLocation,
        values.modelYLocation,
        values.modelZLocation,
        values.xScale,
        values.yScale,
        values.zScale,
        values.modelFloor,
        values.museumId,
        values.image
      )
        .then((res) => {
          console.log(res);
          setIsOpenFilter(false);
          refetchARModels();
        })
        .catch((e) => console.log(e));
      // console.log(values);
    },
    validationSchema: () =>
      Yup.object().shape({
        modelName: Yup.string().required(),
        modelDescription: Yup.string().required(),
        modelUrl: Yup.string().url().required(),
        modelXLocation: Yup.number().required(),
        modelYLocation: Yup.number().required(),
        modelZLocation: Yup.number().required(),
        modelFloor: Yup.number().required(),
        xScale: Yup.number().required(),
        yScale: Yup.number().required(),
        zScale: Yup.number().required(),
        museumId: Yup.string().required(),
        image: Yup.string().url().required()
      })
  });

  console.log(errors);

  useEffect(() => {
    getAllMuseums().then((res) => {
      // console.log(res);
      setMuseumList(res);
    });
  }, []);

  // console.log(museumList);

  return (
    <Drawer
      anchor="right"
      open={isOpenFilter}
      onClose={() => toggleDrawer()}
      PaperProps={{
        sx: { width: 400, border: 'none', overflow: 'overflow', padding: '20px 20px' }
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
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          name="modelName"
          label="Model Name"
          onChange={handleChange}
          style={{ marginBottom: '15px' }}
        />
        <TextField
          fullWidth
          name="modelDescription"
          label="Model Description"
          onChange={handleChange}
          style={{ marginBottom: '15px' }}
        />
        <TextField
          fullWidth
          name="modelUrl"
          label="Model URL"
          onChange={handleChange}
          style={{ marginBottom: '15px' }}
        />

        <FormControl fullWidth variant="outlined" style={{ marginBottom: '15px' }}>
          <InputLabel>Museum</InputLabel>
          <Select name="museumId" onChange={handleChange} label="Country">
            {museumList.map((museum) => (
              <MenuItem key={museum.id} value={museum.id}>
                {museum.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          fullWidth
          name="modelXLocation"
          label="Model X-Location"
          onChange={handleChange}
          style={{ marginBottom: '15px' }}
        />
        <TextField
          fullWidth
          name="modelYLocation"
          label="Model Y-Location"
          onChange={handleChange}
          style={{ marginBottom: '15px' }}
        />
        <TextField
          fullWidth
          name="modelZLocation"
          label="Model Z-Location"
          onChange={handleChange}
          style={{ marginBottom: '15px' }}
        />
        <TextField
          fullWidth
          name="xScale"
          label="Model X-Scale"
          onChange={handleChange}
          style={{ marginBottom: '15px' }}
        />
        <TextField
          fullWidth
          name="yScale"
          label="Model Y-Scale"
          onChange={handleChange}
          style={{ marginBottom: '15px' }}
        />
        <TextField
          fullWidth
          name="zScale"
          label="Model Z-Scale"
          onChange={handleChange}
          style={{ marginBottom: '15px' }}
        />
        <TextField
          fullWidth
          name="modelFloor"
          label="Model Floor"
          onChange={handleChange}
          style={{ marginBottom: '15px' }}
        />
        <TextField
          fullWidth
          name="image"
          label="Image"
          onChange={handleChange}
          style={{ marginBottom: '15px' }}
        />
        <p>{Object.entries(errors).length > 0 && Object.entries(errors)[0][1]}</p>
        <Button variant="contained" type="submit">
          Save
        </Button>
      </form>
    </Drawer>
  );
};

export default CreateDrawer;
