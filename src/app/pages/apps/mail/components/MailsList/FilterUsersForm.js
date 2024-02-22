// FilterUsersForm.js
import React, { useState } from 'react';
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';

const FilterUsersForm = ({ users, onClose, onUpdateFilteredUsers }) => {
  const [username, setUsername] = useState('');
  const [status, setStatus] = useState('all');

  const handleFilterSubmit = () => {
    // Implement your filtering logic based on the provided criteria
    let filteredUsers = users;

    if (username) {
      filteredUsers = filteredUsers.filter(user =>
        user.name.toLowerCase().includes(username.toLowerCase())
      );
    }

    if (status !== 'all') {
      filteredUsers = filteredUsers.filter(user => user.isactive === status);
    }

    // Call the callback function to update the filtered users in the parent component
    onUpdateFilteredUsers(filteredUsers);

    // Close the filter form
    onClose();
  };

  return (
    <div>
      <h2>Filter Users</h2>
      <form>
        <TextField
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          fullWidth
          margin="normal"
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Status</InputLabel>
          <Select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="inactive">Inactive</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained" color="primary" onClick={handleFilterSubmit}>
          Search
        </Button>
      </form>
    </div>
  );
};

export default FilterUsersForm;
