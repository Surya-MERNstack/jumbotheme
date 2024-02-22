import React, { useState } from 'react';
import { TextField, Button, Switch, FormControlLabel, Typography, Box } from '@mui/material';

const UserInfoForm = ({ onSubmit, onClose }) => {
  const [image, setImage] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isActive, setIsActive] = useState(false);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]?.name || '');
  };

  const handleSubmit = () => {
    onSubmit({ image, username, password, isActive });
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Box p={3}>
      <Typography variant="h5" mb={2}>
        Info Form
      </Typography>
      <form>
        <TextField
          type="file"
          label="Upload Image"
          InputLabelProps={{ shrink: true }}
          onChange={handleImageChange}
          fullWidth
          margin="normal"
        />
        <TextField 
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
        />
        <FormControlLabel
          control={
            <Switch
              checked={isActive}
              onChange={() => setIsActive(!isActive)}
            />
          }
          label="Active"
          sx={{ color: isActive ? 'green' : 'inherit' }} // Set color dynamically
        />
        <Box mt={2} display="flex" justifyContent="space-between">
          <Button
            variant="contained"
            color={isActive ? 'success' : 'primary'} // Change color dynamically
            onClick={handleSubmit}
          >
            Add
          </Button>
          <Button variant="outlined" color="primary" onClick={handleClose}>
            Close
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default UserInfoForm;
