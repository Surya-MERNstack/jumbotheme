import React, { useState } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";

const UserPersonalForm = ({ onSubmit, onClose }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cellphone, setCellphone] = useState("");
  const [cellphone2, setCellphone2] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = () => {
    onSubmit({ name, email, cellphone, cellphone2, address });
    onClose(); // Close the form after submitting
  };

  const handleClose = () => {
    onClose(); // Close the form without submitting
  };

  return (
    <Box p={3}>
      <Typography variant="h5" mb={2}>
        Personal Form
      </Typography>
      <form>
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Cellphone"
          value={cellphone}
          onChange={(e) => setCellphone(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Cellphone 2"
          value={cellphone2}
          onChange={(e) => setCellphone2(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Box mt={2} display="flex" justifyContent="space-between">
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            sx={{ mr: 2 }}
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

export default UserPersonalForm;
