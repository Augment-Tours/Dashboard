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
import { createArModel, getArModelDetail } from '../../pages/request/armodel';
import { getAllMuseums } from '../../pages/request/museum';

const EditDrawer = ({
  arModelId,
  isOpenFilter,
  setIsOpenFilter,
  toggleDrawer,
  refetchARModels
}) => {
  const [museumList, setMuseumList] = useState([]);
  const [arModel, setArModel] = useState({});
  const formik = useFormik({
    initialValues: { ...arModel },
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
      }),
    enableReinitialize: true
  });
  const { errors, handleSubmit, handleChange } = formik;
  console.log(errors);

  useEffect(() => {
    getAllMuseums().then((res) => {
      // console.log(res);
      setMuseumList(res);
    });
    getArModelDetail(arModelId).then((res) => {
      console.log('heres', res);
      setArModel({
        modelName: res.name,
        modelDescription: res.description,
        modelUrl: res.model,
        modelXLocation: res.x_location,
        modelYLocation: res.y_location,
        modelZLocation: res.z_location,
        modelFloor: res.floor,
        xScale: res.x_scale,
        yScale: res.y_scale,
        zScale: res.z_scale,
        museumId: res.museums_id,
        image: res.image
      });
      // formik.setFieldValue('modelName')
    });
    console.log('->', arModelId);
  }, [arModelId]);

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
          value={formik.values.modelName}
          onChange={handleChange}
          style={{ marginBottom: '15px' }}
        />
        <TextField
          fullWidth
          name="modelDescription"
          label="Model Description"
          value={formik.values.modelDescription}
          onChange={handleChange}
          style={{ marginBottom: '15px' }}
        />
        <TextField
          fullWidth
          name="modelUrl"
          label="Model URL"
          value={formik.values.modelUrl}
          onChange={handleChange}
          style={{ marginBottom: '15px' }}
        />

        <FormControl fullWidth variant="outlined" style={{ marginBottom: '15px' }}>
          <InputLabel>Museum</InputLabel>
          <Select
            name="museumId"
            onChange={handleChange}
            label="Country"
            value={formik.values.museumId}
          >
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
          value={formik.values.modelXLocation}
          onChange={handleChange}
          style={{ marginBottom: '15px' }}
        />
        <TextField
          fullWidth
          name="modelYLocation"
          label="Model Y-Location"
          value={formik.values.modelYLocation}
          onChange={handleChange}
          style={{ marginBottom: '15px' }}
        />
        <TextField
          fullWidth
          name="modelZLocation"
          label="Model Z-Location"
          value={formik.values.modelZLocation}
          onChange={handleChange}
          style={{ marginBottom: '15px' }}
        />
        <TextField
          fullWidth
          name="xScale"
          label="Model X-Scale"
          value={formik.values.xScale}
          onChange={handleChange}
          style={{ marginBottom: '15px' }}
        />
        <TextField
          fullWidth
          name="yScale"
          label="Model Y-Scale"
          value={formik.values.yScale}
          onChange={handleChange}
          style={{ marginBottom: '15px' }}
        />
        <TextField
          fullWidth
          name="zScale"
          label="Model Z-Scale"
          value={formik.values.zScale}
          onChange={handleChange}
          style={{ marginBottom: '15px' }}
        />
        <TextField
          fullWidth
          name="modelFloor"
          label="Model Floor"
          value={formik.values.modelFloor}
          onChange={handleChange}
          style={{ marginBottom: '15px' }}
        />
        <TextField
          fullWidth
          name="image"
          label="Image"
          value={formik.values.image}
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

export default EditDrawer;
