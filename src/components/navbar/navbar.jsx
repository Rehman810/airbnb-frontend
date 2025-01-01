import { useState } from "react";
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
import SearchBar2 from "../searchBar/searchBar2";
import { useNavigate } from "react-router-dom";
import handleLogout from "../logout/logout";
import VerifyToken from "../protected/verifyToken";

const VerifiedMenu = ({
  anchorEl,
  handleMenuClose,
  navigate,
  handleLogout,
}) => (
  <Menu
    anchorEl={anchorEl}
    open={Boolean(anchorEl)}
    onClose={handleMenuClose}
    keepMounted>
    <MenuItem>Messages</MenuItem>
    <MenuItem>Notifications</MenuItem>
    <MenuItem>Trips</MenuItem>
    <MenuItem
      onClick={() => navigate("/user/wishlist")}>
      Wishlists
    </MenuItem>
    <Divider />
    <MenuItem
      onClick={() =>
        navigate("/hosting/listings")
      }>
      Manage Listings
    </MenuItem>
    <MenuItem>Account</MenuItem>
    <Divider />
    <MenuItem>Gift cards</MenuItem>
    <MenuItem>Help center</MenuItem>
    <MenuItem
      onClick={() => handleLogout(navigate)}>
      Logout
    </MenuItem>
  </Menu>
);

const UnverifiedMenu = ({
  anchorEl,
  handleMenuClose,
  handleLoginModalOpen,
  handleSignUpModalOpen,
}) => (
  <Menu
    anchorEl={anchorEl}
    open={Boolean(anchorEl)}
    onClose={handleMenuClose}
    keepMounted>
    <MenuItem onClick={handleLoginModalOpen}>
      Login
    </MenuItem>
    <MenuItem onClick={handleSignUpModalOpen}>
      Sign up
    </MenuItem>
    <Divider />
    <MenuItem>Gift cards</MenuItem>
    <MenuItem>Airbnb your home</MenuItem>
    <MenuItem>Host an experience</MenuItem>
    <MenuItem>Help center</MenuItem>
  </Menu>
);

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isLoginModalOpen, setIsLoginModalOpen] =
    useState(false);
  const [signUp, isSignUp] = useState();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLoginModalOpen = () => {
    isSignUp(false);
    setIsLoginModalOpen(true);
    handleMenuClose();
  };

  const handleSignUpModalOpen = () => {
    isSignUp(true);
    setIsLoginModalOpen(true);
    handleMenuClose();
  };

  const handleLoginModalClose = () => {
    setIsLoginModalOpen(false);
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "white",
        color: "black",
        boxShadow: "none",
        position: "sticky",
        top: 0,
        zIndex: 10,
      }}>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: "0 16px",
        }}>
        <Box>
          <Typography
            variant="h6"
            component="div"
            sx={{
              fontWeight: "bold",
              color: "red",
              cursor: "pointer",
            }}
            className="airbnbBold"
            onClick={() => {
              navigate("/");
            }}>
            airbnb
          </Typography>
        </Box>

        <Box>
          <SearchBar2 />
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}>
            <Button
              variant="text"
              sx={{
                fontWeight: 600,
                textTransform: "none",
                color: "black",
                display: {
                  xs: "none",
                  sm: "inline-flex",
                },
                fontSize: "14px",
              }}
              onClick={() =>
                navigate("/hosting/today")
              }>
              {!token
                ? "Airbnb your home"
                : "Switch to hosting"}
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
            }}>
            <Box
              onClick={handleMenuOpen}
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
                cursor: "pointer",
              }}>
              <IconButton>
                <MenuIcon />
              </IconButton>
              <Avatar
                sx={{
                  bgcolor: user?.photoProfile
                    ? "transparent"
                    : "#f2f2f2",
                  color: user?.photoProfile
                    ? "inherit"
                    : "gray",
                  width: 32,
                  height: 32,
                }}
                src={user?.photoProfile || null}>
                {!user?.photoProfile &&
                  user?.userName
                    .charAt(0)
                    .toUpperCase()}
              </Avatar>
            </Box>

            <VerifyToken
              VerifiedComponent={VerifiedMenu}
              UnverifiedComponent={UnverifiedMenu}
              anchorEl={anchorEl}
              handleMenuClose={handleMenuClose}
              navigate={navigate}
              handleLogout={handleLogout}
              handleLoginModalOpen={
                handleLoginModalOpen
              }
              handleSignUpModalOpen={
                handleSignUpModalOpen
              }
            />
          </Box>
        </Box>
      </Toolbar>
      <SearchBar />
      <Divider />
      {isLoginModalOpen && (
        <LoginModal
          open={isLoginModalOpen}
          onClose={handleLoginModalClose}
          signUp={signUp}
          isSignUp={isSignUp}
        />
      )}
    </AppBar>
  );
};

export default Navbar;
