import React from "react";
import { AppBar, Toolbar, IconButton, Typography, Switch } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

const Header = ({ darkMode, setDarkMode, onLogout }) => {
  const handleThemeChange = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar>
        <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
          Admin Dashboard
        </Typography>
        <Switch checked={darkMode} onChange={handleThemeChange} />
        <IconButton color="inherit" onClick={onLogout}>
          <LogoutIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
