import React, { useState } from 'react';

import { Stack, Drawer, Typography, IconButton, Icon, TextField, Button } from '@material-ui/core';

import closeFill from '@iconify/icons-eva/close-fill';
import { Link as RouterLink } from 'react-router-dom';

import { createUser } from '../../pages/request/user';

const CreateDrawer = ({ isOpenFilter, setIsOpenFilter, toggleDrawer }) => {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userIsAdmin, setUserIsAdmin] = useState(false);
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
          Add User
        </Typography>
        <IconButton onClick={toggleDrawer}>
          <Icon icon={closeFill} width={20} height={20} />
        </IconButton>
      </Stack>
      <TextField
        fullWidth
        label="User Name"
        onChange={(e) => {
          setUserName(e.target.value);
        }}
        style={{ marginBottom: '15px' }}
      />
      <TextField
        fullWidth
        label="User Email"
        onChange={(e) => {
          setUserEmail(e.target.value);
        }}
        style={{ marginBottom: '15px' }}
      />
      <TextField
        fullWidth
        label="User Password"
        onChange={(e) => {
          setUserPassword(e.target.value);
        }}
        style={{ marginBottom: '15px' }}
      />

      <TextField
        fullWidth
        label="Is Admin"
        onChange={(e) => {
          setUserIsAdmin(e.target.value);
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
          createUser(userName, userEmail, userPassword, userIsAdmin)
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
