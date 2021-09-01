/* eslint-disable react/prop-types */
import React from 'react';

import { Drawer, Stack, Typography, IconButton, Icon, TextField, Button } from '@material-ui/core';
import closeFill from '@iconify/icons-eva/close-fill';
// import { Link as RouterLink } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

// import { createArModel } from '../../pages/request/armodel';
import { createMuseum } from '../../pages/request/museum';

const CreateDrawer = ({ isOpenFilter, setIsOpenFilter, toggleDrawer }) => {
  const { errors, handleSubmit, handleChange } = useFormik({
    initialValues: {
      museumName: '',
      description: '',
      imageUrl: ''
    },
    onSubmit: (values) => {
      createMuseum(values.museumName, values.description, values.imageUrl)
        .then((res) => {
          console.log(res);
          setIsOpenFilter(false);
        })
        .catch((e) => console.log(e));
      // console.log(values);
    },
    validationSchema: () =>
      Yup.object().shape({
        museumName: Yup.string().required('fill all required fields (name)'),
        description: Yup.string().required('fill all required fields (description)'),
        imageUrl: Yup.string()
          .url('invalid image error')
          .required('fill all required fields (imageURL)')
      })
  });

  console.log(errors);

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
          Add Museum
        </Typography>
        <IconButton onClick={toggleDrawer}>
          <Icon icon={closeFill} width={20} height={20} />
        </IconButton>
      </Stack>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          name="museumName"
          label="Museum"
          onChange={handleChange}
          style={{ marginBottom: '15px' }}
        />
        <TextField
          fullWidth
          name="description"
          label="Description"
          style={{ marginBottom: '15px' }}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          name="imageUrl"
          label="Image URL"
          sx={{ mb: 2 }}
          onChange={handleChange}
        />
        <p>{Object.entries(errors).length > 0 && Object.entries(errors)[0][1]}</p>
        <Button variant="contained" type="submit">
          Add
        </Button>
      </form>
    </Drawer>
  );
};

export default CreateDrawer;
