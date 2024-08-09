import React, { useState } from "react";
import { TextField, Button, Box, Typography, Paper } from "@mui/material";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginClick = () => {
    onLogin(); // Call the onLogin function passed as a prop
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh", // Ensure full viewport height
        width: "100vw", // Ensure full viewport width
        bgcolor: "background.default",
        margin: 0, // Ensure no margins around the container
        padding: 0,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          width: "100%",
          maxWidth: 400,
          textAlign: "center",
        }}
      >
        <Typography variant="h5" component="h1" gutterBottom>
          Login
        </Typography>
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          InputLabelProps={{
            shrink: true, // Ensures label doesn't overlap with placeholder
          }}
        />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputLabelProps={{
            shrink: true, // Ensures label doesn't overlap with placeholder
          }}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleLoginClick}
          sx={{ marginTop: 2 }}
        >
          Login
        </Button>
      </Paper>
    </Box>
  );
};

export default Login;
