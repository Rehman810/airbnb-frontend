import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Divider,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Language as GlobalIcon,
  Person as PersonIcon,
} from "@mui/icons-material";
import LoginModal from "../Login/LoginModal";
import SearchBar from "../searchBar/searchBar";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLoginModalOpen = () => {
    setIsLoginModalOpen(true);
    handleMenuClose(); 
  };

  const handleLoginModalClose = () => {
    setIsLoginModalOpen(false);
  };

  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "white", color: "black", boxShadow: "none", position: "sticky", top: 0, zIndex: 10 }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: "0 16px",
        }}
      >
        <Box>
          <Typography
            variant="h6"
            component="div"
            sx={{ fontWeight: "bold", color: "red", cursor: "pointer" }}
            className="airbnbBold"
          >
            airbnb
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Button
              variant="text"
              sx={{
                fontWeight: 600,
                textTransform: "none",
                color: "black",
                display: { xs: "none", sm: "inline-flex" },
                fontSize: "14px",
              }}
            >
              Airbnb your home
            </Button>
            <IconButton>
              <GlobalIcon />
            </IconButton>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              border: "1px solid #ddd",
              borderRadius: "30px",
              padding: "5px 10px",
              gap: "10px",
            }}
          >
            <Box
              onClick={handleMenuOpen}
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
                cursor: "pointer",
              }}
            >
              <IconButton>
                <MenuIcon />
              </IconButton>
              <Avatar
                sx={{
                  bgcolor: "#f2f2f2",
                  color: "gray",
                  width: 32,
                  height: 32,
                }}
              >
                <PersonIcon />
              </Avatar>
            </Box>

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              keepMounted
            >
              <MenuItem onClick={handleLoginModalOpen}>Login</MenuItem>
              <MenuItem onClick={handleLoginModalOpen}>Sign up</MenuItem>
              <Divider />
              <MenuItem>Gift cards</MenuItem>
              <MenuItem>Airbnb your home</MenuItem>
              <MenuItem>Host an experience</MenuItem>
              <MenuItem>Help center</MenuItem>
            </Menu>
          </Box>
        </Box>
      </Toolbar>
      <SearchBar />
      <Divider />
      {isLoginModalOpen && (
        <LoginModal open={isLoginModalOpen} onClose={handleLoginModalClose} />
      )}
    </AppBar>
  );
};

export default Navbar;
