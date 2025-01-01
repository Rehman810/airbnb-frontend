import React, {
  useState,
  useEffect,
} from "react";
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
import CloseIcon from "@mui/icons-material/Close";
import { updateDataById } from "../../config/ServiceApi/serviceApi";

const ProfileSection = () => {
  const initialUser = JSON.parse(
    localStorage.getItem("user")
  );
  const [user, setUser] = useState(initialUser);
  const [isEditing, setIsEditing] =
    useState(false);
  const [editedFields, setEditedFields] =
    useState({});
  const isVerifiedEmail =
    JSON.parse(
      localStorage.getItem("isVerifiedEmail")
    ) || false;

  const token = localStorage.getItem("token");

  const handleProfilePhotoUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = async () => {
        const newPhoto = reader.result;
        const updatedUser = {
          ...user,
          photoProfile: newPhoto,
        };
        setUser(updatedUser);
        localStorage.setItem(
          "user",
          JSON.stringify(updatedUser)
        );
        console.log(file);

        try {
          const response = await updateDataById(
            "update-profile",
            token,
            user._id,
            {
              photoProfile: file,
            }
          );
          console.log(response);
          
          if (response && response.updatedData) {
            console.log(
              "Profile photo updated successfully:",
              response.updatedData
            );
          }
        } catch (error) {
          console.error(
            "Error updating profile photo:",
            error
          );
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    setIsEditing(false);

    const changes = {};
    if (editedFields.email)
      changes.email = editedFields.email;
    if (editedFields.phoneNumber)
      changes.phoneNumber =
        editedFields.phoneNumber;

    if (Object.keys(changes).length > 0) {
      try {
        const response = await updateDataById(
          "update-profile",
          token,
          user._id,
          changes
        );
        if (response && response.updatedData) {
          const updatedUser = {
            ...user,
            ...response.updatedData,
          };
          localStorage.setItem(
            "user",
            JSON.stringify(updatedUser)
          );
          setUser(updatedUser);
          setEditedFields({});
          console.log(
            "User updated successfully:",
            updatedUser
          );
        }
      } catch (error) {
        console.error(
          "Error saving profile changes:",
          error
        );
      }
    }
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
      }}>
      {/* Profile Image and Name */}
      <Grid item xs={12} md={4}>
        <Paper
          elevation={3}
          sx={{
            padding: 3,
            textAlign: "center",
            borderRadius: 2,
          }}>
          <IconButton
            component="label"
            sx={{
              position: "relative",
              cursor: "pointer",
              margin: "auto",
            }}>
            <Avatar
              sx={{
                width: 100,
                height: 100,
                fontSize: 40,
                bgcolor: "primary.main",
              }}
              src={user.photoProfile}>
              {user.userName
                .charAt(0)
                .toUpperCase()}
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
          <Typography
            variant="body2"
            color="text.secondary">
            Guest
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary">
            {user.duration}
          </Typography>
        </Paper>
      </Grid>

      {/* About Section */}
      <Grid item xs={12} md={8}>
        <Box>
          <Typography variant="h5" sx={{ mb: 2 }}>
            About {user.userName}
          </Typography>
          <Typography
            variant="body1"
            sx={{ mb: 1 }}>
            <strong>Email:</strong>{" "}
            {isEditing ? (
              <TextField
                size="small"
                value={user.email}
                onChange={(e) => {
                  setUser({
                    ...user,
                    email: e.target.value,
                  });
                  setEditedFields((prev) => ({
                    ...prev,
                    email: e.target.value,
                  }));
                }}
                variant="outlined"
              />
            ) : (
              user.email
            )}
          </Typography>
          <Typography
            variant="body1"
            sx={{ mb: 1 }}>
            <strong>Phone:</strong>{" "}
            {isEditing ? (
              <TextField
                size="small"
                value={user.phoneNumber}
                onChange={(e) => {
                  setUser({
                    ...user,
                    phoneNumber: e.target.value,
                  });
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
            onClick={
              isEditing
                ? handleSave
                : () => setIsEditing(true)
            }
            sx={{ mt: 2 }}>
            {isEditing ? (
              <SaveIcon />
            ) : (
              <EditIcon />
            )}
          </IconButton>
        </Box>
      </Grid>

      {/* Confirmed Information */}
      <Grid item xs={12}>
        <Paper
          elevation={2}
          sx={{
            padding: 2,
            borderRadius: 2,
          }}>
          <Typography
            variant="subtitle1"
            sx={{ mb: 1 }}>
            {user.userName}'s confirmed
            information
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}>
            {isVerifiedEmail ? (
              <CheckCircleIcon color="success" />
            ) : (
              <CloseIcon color="error" />
            )}
            <Typography variant="body1">
              Email address
            </Typography>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default ProfileSection;
