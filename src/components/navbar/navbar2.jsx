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
import { useTranslation } from "react-i18next";

const NavbarHost = () => {
  const { t } = useTranslation();
  const [notificationsMenuAnchorEl, setNotificationsMenuAnchorEl] =
    useState(null);
  const [avatarMenuAnchorEl, setAvatarMenuAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [notifications] = useState([
    t("menu.notifications.newMessage"),
    t("menu.notifications.updateAvailable"),
    t("menu.notifications.reminder"),
  ]);
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user"));

  const isProfilePage = location.pathname.includes("hosting");

  const isMobile = useMediaQuery("(max-width:900px)");

  // Define routes for the hosting menu items
  const menuItems = [
    { name: t("menu.hostMenu.today"), route: "/hosting/today" },
    { name: t("menu.hostMenu.calendar"), route: "/hosting/calendar" },
    { name: t("menu.hostMenu.listings"), route: "/hosting/listings" },
    { name: t("menu.hostMenu.messages"), route: "/hosting/messages" },
  ];

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
                to={menu.route} // Use predefined routes
                style={{ textDecoration: "none" }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: "bold",
                    cursor: "pointer",
                    textTransform: "capitalize",
                    padding: "5px 10px",
                    color: location.pathname === menu.route ? "black" : "gray",
                    textDecoration:
                      location.pathname === menu.route ? "underline" : "none",
                    textUnderlineOffset: "10px",
                    fontSize: "14px",
                    "&:hover": {
                      backgroundColor: "#f0f0f0",
                      borderRadius: "20px",
                    },
                  }}
                >
                  {menu.name}
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
              <Box
                onClick={handleAvatarMenuOpen}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "row",
                  cursor: "pointer",
                }}
              >
                <Avatar
                  sx={{
                    bgcolor: user?.photoProfile ? "transparent" : "#f2f2f2",
                    color: user?.photoProfile ? "inherit" : "gray",
                    width: 32,
                    height: 32,
                  }}
                  src={user?.photoProfile || null}
                >
                  {!user?.photoProfile &&
                    user?.userName.charAt(0).toUpperCase()}
                </Avatar>
              </Box>

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
                {[
                  {
                    name: t("menu.hostMenu2.userProfile"),
                    route: "/user/profile",
                  },
                  {
                    name: t("menu.hostMenu2.userAccount"),
                    route: "/user/account",
                  },
                  {
                    name: t("menu.hostMenu2.visitHelpCenter"),
                    route: "/help/center",
                  },
                  {
                    name: t("menu.hostMenu2.helpSafetyIssue"),
                    route: "/help/safety-issue",
                  },
                  {
                    name: t("menu.hostMenu2.giftCards"),
                    route: "/user/gift-cards",
                  },
                ].map((item, index) => (
                  <MenuItem key={index} onClick={() => navigate(item.route)}>
                    {item.name}
                  </MenuItem>
                ))}
                <Divider />
                <MenuItem onClick={() => navigate("/")}>
                  {t("menu.hostMenu2.switchToTravelling")}
                </MenuItem>
                <MenuItem
                  onClick={() => handleLogout(navigate)}
                  style={{ color: "red" }}
                >
                  {t("menu.hostMenu2.logout")}
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
          {menuItems.map((menu, index) => (
            <Typography
              key={index}
              variant="body1"
              sx={{
                fontWeight: "medium",
                cursor: "pointer",
                textTransform: "capitalize",
                "&:hover": { textDecoration: "underline" },
              }}
              onClick={() => {
                setDrawerOpen(false);
                navigate(menu.route);
              }}
            >
              {menu.name}
            </Typography>
          ))}
          <Divider />

          {[
            {
              name: t("menu.hostMenu2.userProfile"),
              route: "/user/profile",
            },
            {
              name: t("menu.hostMenu2.userAccount"),
              route: "/user/account",
            },
            {
              name: t("menu.hostMenu2.visitHelpCenter"),
              route: "/help/center",
            },
            {
              name: t("menu.hostMenu2.helpSafetyIssue"),
              route: "/help/safety-issue",
            },
            {
              name: t("menu.hostMenu2.giftCards"),
              route: "/user/gift-cards",
            },
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
              onClick={() => {
                setDrawerOpen(false);
                navigate(item.route);
              }}
            >
              {option.name}
            </Typography>
          ))}
          <Divider />
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/")}
          >
            {t("menu.hostMenu2.switchToTravelling")}
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={() => handleLogout(navigate)}
          >
            {t("menu.hostMenu2.logout")}
          </Button>
        </Box>
      </Drawer>
      <Divider />
    </AppBar>
  );
};

export default NavbarHost;
