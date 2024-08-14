import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ThemeProvider, CssBaseline, Box, Toolbar } from "@mui/material";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import Product from "./components/Product";
import Login from "./components/Login";
import { lightTheme, darkTheme } from "./theme";
import AddProduct from "./components/AddProduct";

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    // Retrieve the theme mode from localStorage
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "dark";
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Check if the user is already authenticated
    return localStorage.getItem("isAuthenticated") === "true";
  });

  useEffect(() => {
    // Store the theme mode in localStorage whenever it changes
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem("isAuthenticated", "true");
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated");
  };

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <Router>
        {!isAuthenticated ? (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100vh",
              bgcolor: "background.default",
            }}
          >
            <Login onLogin={handleLogin} />
          </Box>
        ) : (
          <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
            <Header
              darkMode={darkMode}
              setDarkMode={setDarkMode}
              onLogout={handleLogout}
            />
            <Sidebar />
            <Box
              component="main"
              sx={{
                flexGrow: 1,
                bgcolor: "background.default",
                p: 3,
                ml: 240, // Match the width of the sidebar
                overflowY: "auto", // Ensure scrolling only within content area
              }}
            >
              <Toolbar />
              <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/product" element={<Product />} />
                <Route path="/addproduct" element={<AddProduct />} />
                <Route path="*" element={<Navigate to="/dashboard" />} />
              </Routes>
            </Box>
          </Box>
        )}
      </Router>
    </ThemeProvider>
    
  );
}

export default App;
