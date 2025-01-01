import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Divider,
  Badge,
  Drawer,
  Button,
  useMediaQuery,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  Notifications as NotificationsIcon,
  Person as PersonIcon,
} from "@mui/icons-material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import handleLogout from "../logout/logout";

const NavbarHost = () => {
  const [notificationsMenuAnchorEl, setNotificationsMenuAnchorEl] =
    useState(null);
  const [avatarMenuAnchorEl, setAvatarMenuAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [notifications] = useState([
    "New message",
    "Update available",
    "Reminder",
  ]);
  const navigate = useNavigate();
  const location = useLocation();

  const isProfilePage = location.pathname.includes("hosting");
  
  const isMobile = useMediaQuery("(max-width:900px)");

  const menuItems = ["Today", "Calendar", "Listings", "Messages"];

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const handleNotificationsMenuOpen = (event) => {
    setNotificationsMenuAnchorEl(event.currentTarget);
  };
  const handleNotificationsMenuClose = () => {
    setNotificationsMenuAnchorEl(null);
  };

  const handleAvatarMenuOpen = (event) => {
    setAvatarMenuAnchorEl(event.currentTarget);
  };
  const handleAvatarMenuClose = () => {
    setAvatarMenuAnchorEl(null);
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: "white",
        color: "black",
        boxShadow: "none",
        top: 0,
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: "0 16px",
          zIndex: 200,
        }}
      >
        <Box>
          <Typography
            variant="h6"
            component="div"
            sx={{ fontWeight: "bold", color: "red", cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            airbnb
          </Typography>
        </Box>
{isProfilePage && (
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            alignItems: "center",
            justifyContent: "center",
            gap: "20px",
          }}
        >
          {menuItems.map((menu, index) => (
            <Link
              key={index}
              to={`/hosting/${menu.toLowerCase()}`}
              style={{ textDecoration: "none" }}
            >
              <Typography
                variant="body1"
                sx={{
                  fontWeight: "bold",
                  cursor: "pointer",
                  textTransform: "capitalize",
                  padding: "5px 10px",
                  color:
                    location.pathname === `/hosting/${menu.toLowerCase()}`
                      ? "black"
                      : "gray",
                  textDecoration:
                    location.pathname === `/hosting/${menu.toLowerCase()}`
                      ? "underline"
                      : "none",
                  textUnderlineOffset: "10px",
                  fontSize: "14px",
                  "&:hover": {
                    backgroundColor: "#f0f0f0",
                    borderRadius: "20px",
                  },
                }}
              >
                {menu}
              </Typography>
            </Link>
          ))}
        </Box>
)}
        <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <IconButton onClick={handleNotificationsMenuOpen}>
            <Badge badgeContent={notifications.length} color="error">
              <NotificationsIcon sx={{ color: "gray", fontSize: 25 }} />
            </Badge>
          </IconButton>
          <Menu
            anchorEl={notificationsMenuAnchorEl}
            open={Boolean(notificationsMenuAnchorEl)}
            onClose={handleNotificationsMenuClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            {notifications.length > 0 ? (
              notifications.map((notification, index) => (
                <MenuItem key={index} onClick={handleNotificationsMenuClose}>
                  {notification}
                </MenuItem>
              ))
            ) : (
              <MenuItem onClick={handleNotificationsMenuClose}>
                No new notifications
              </MenuItem>
            )}
          </Menu>

          {!isMobile && (
            <>
              <IconButton onClick={handleAvatarMenuOpen}>
                <Avatar
                  sx={{
                    bgcolor: "#f2f2f2",
                    color: "gray",
                    width: 30,
                    height: 30,
                  }}
                >
                  <PersonIcon />
                </Avatar>
              </IconButton>
              <Menu
                anchorEl={avatarMenuAnchorEl}
                open={Boolean(avatarMenuAnchorEl)}
                onClose={handleAvatarMenuClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                <MenuItem onClick={() => navigate("/user/profile")}>
                  Profile
                </MenuItem>
                <MenuItem>Account</MenuItem>
                <MenuItem>Visit the help center</MenuItem>
                <MenuItem>Get help with safety issue</MenuItem>
                <MenuItem>Gift cards</MenuItem>
                <Divider />
                <MenuItem onClick={() => navigate("/")}>
                  Switch to travelling
                </MenuItem>
                <MenuItem
                  onClick={() => handleLogout(navigate)}
                  style={{ color: "red" }}
                >
                  Logout
                </MenuItem>
              </Menu>
            </>
          )}
          <IconButton
            sx={{ display: { xs: "block", md: "none" }, color: "black" }}
            onClick={toggleDrawer(!drawerOpen)}
          >
            {drawerOpen ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
        </Box>
      </Toolbar>

      <Drawer
        anchor="top"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        sx={{ zIndex: 10 }}
      >
        <Box
          sx={{
            width: "90%",
            padding: "16px",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            marginTop: "50px",
          }}
          role="presentation"
          onKeyDown={toggleDrawer(false)}
        >
          {["Today", "Calendar", "Listings", "Messages"].map((menu, index) => (
            <Typography
              key={index}
              variant="body1"
              sx={{
                fontWeight: "medium",
                cursor: "pointer",
                textTransform: "capitalize",
                "&:hover": { textDecoration: "underline" },
              }}
              onClick={() => navigate(`/${menu.toLowerCase()}`)}
            >
              {menu}
            </Typography>
          ))}
          <Divider />

          {[
            "Profile",
            "Account",
            "Visit the help center",
            "Get help with safety issue",
            "Gift cards",
          ].map((option, index) => (
            <Typography
              key={index}
              variant="body1"
              sx={{
                fontWeight: "medium",
                cursor: "pointer",
                textTransform: "capitalize",
                "&:hover": { textDecoration: "underline" },
              }}
            >
              {option}
            </Typography>
          ))}
          <Divider />
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/")}
          >
            Switch to travelling
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={() => handleLogout(navigate)}
          >
            Logout
          </Button>
        </Box>
      </Drawer>
      <Divider />
    </AppBar>
  );
};

export default NavbarHost;
