import React, { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  Avatar,
  Box,
  TextField,
  Divider,
  Paper,
  IconButton,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close"; // Added Close Icon for not verified email
import { postDataById, updateDataById } from "../../config/ServiceApi/serviceApi";

const ProfileSection = () => {
  const initialUser = JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState(initialUser);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaveEnabled, setIsSaveEnabled] = useState(false);

  // Track the edited fields
  const [editedFields, setEditedFields] = useState({});

  // Check for email verification status
  const isVerifiedEmail = JSON.parse(localStorage.getItem("isVerifiedEmail")) || false;

  // Effect to enable Save button if any data is edited
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (
      userData.email !== initialUser.email ||
      userData.phoneNumber !== initialUser.phoneNumber ||
      userData.photoProfile !== initialUser.photoProfile
    ) {
      setIsSaveEnabled(true);
    } else {
      setIsSaveEnabled(false);
    }
  }, [user, initialUser]);

  const handleProfilePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const updatedUser = { ...user, photoProfile: reader.result };
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));

        // Add the new profile photo to edited fields
        setEditedFields((prev) => ({ ...prev, photoProfile: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const token = localStorage.getItem("token");

  const handleSave = async () => {
    setIsEditing(false);

    // Create a new object with only edited fields
    const changes = {};
    if (editedFields.email) changes.email = editedFields.email;
    if (editedFields.phoneNumber) changes.phoneNumber = editedFields.phoneNumber;
    if (editedFields.photoProfile) changes.photoProfile = editedFields.photoProfile;
console.log(changes);

    // Only send data to the API that was edited
    if (Object.keys(changes).length > 0) {
      try {
        const response = await updateDataById("update-profile", token, user._id, changes);
        console.log("API Response:", response);
      } catch (error) {
        console.error("Error sending data to API:", error);
      }
    }

    // Reset edited fields after saving
    setEditedFields({});
  };

  return (
    <Grid
      container
      spacing={4}
      sx={{
        maxWidth: 800,
        margin: "auto",
        padding: 3,
        bgcolor: "background.default",
      }}
    >
      <Grid item xs={12} md={4}>
        <Paper
          elevation={3}
          sx={{
            padding: 3,
            textAlign: "center",
            borderRadius: 2,
          }}
        >
          <IconButton
            component="label"
            sx={{
              position: "relative",
              cursor: "pointer",
              margin: "auto",
            }}
          >
            <Avatar
              sx={{
                width: 100,
                height: 100,
                fontSize: 40,
                bgcolor: "primary.main",
              }}
              src={user.photoProfile}
            >
              {user.userName.charAt(0).toUpperCase()}
            </Avatar>
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handleProfilePhotoUpload}
            />
          </IconButton>
          <Typography variant="h6" sx={{ mt: 2 }}>
            {user.userName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Guest
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {user.duration}
          </Typography>
        </Paper>
      </Grid>

      {/* Right Section: About */}
      <Grid item xs={12} md={8}>
        <Box>
          <Typography variant="h5" sx={{ mb: 2 }}>
            About {user.userName}
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <strong>Email:</strong>{" "}
            {isEditing ? (
              <TextField
                size="small"
                value={user.email}
                onChange={(e) => {
                  setUser({ ...user, email: e.target.value });
                  setEditedFields((prev) => ({ ...prev, email: e.target.value }));
                }}
                variant="outlined"
              />
            ) : (
              user.email
            )}
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <strong>Phone:</strong>{" "}
            {isEditing ? (
              <TextField
                size="small"
                value={user.phoneNumber}
                onChange={(e) => {
                  setUser({ ...user, phoneNumber: e.target.value });
                  setEditedFields((prev) => ({
                    ...prev,
                    phoneNumber: e.target.value,
                  }));
                }}
                variant="outlined"
              />
            ) : (
              user.phoneNumber
            )}
          </Typography>
          <IconButton
            color="primary"
            onClick={isEditing ? handleSave : () => setIsEditing(true)}
            sx={{ mt: 2 }}
          >
            {isEditing ? <SaveIcon /> : <EditIcon />}
          </IconButton>
        </Box>
      </Grid>

      <Grid item xs={12}>
        <Paper
          elevation={2}
          sx={{
            padding: 2,
            borderRadius: 2,
          }}
        >
          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            {user.userName}'s confirmed information
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {isVerifiedEmail ? (
              <CheckCircleIcon color="success" />
            ) : (
              <CloseIcon color="error" />
            )}
            <Typography variant="body1">Email address</Typography>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default ProfileSection;
