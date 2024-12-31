import React, { useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  Button,
  TextField,
  Dialog,
  DialogContent,
} from "@mui/material";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

const ProfileSection = () => {
  const [phoneNumber, setPhoneNumber] = useState("123-456-7890");
  const [isEditingPhone, setIsEditingPhone] = useState(false);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const images = [
    { original: "/path-to-photo1.jpg", thumbnail: "/path-to-photo1-thumb.jpg" },
    { original: "/path-to-photo2.jpg", thumbnail: "/path-to-photo2-thumb.jpg" },
  ];

  const handlePhoneEdit = () => {
    setIsEditingPhone(!isEditingPhone);
  };

  const handleGalleryClose = () => {
    setGalleryOpen(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        alignItems: "center",
        gap: 4,
        padding: 3,
      }}
    >
      {/* Profile Section */}
      <Box sx={{ textAlign: "center" }}>
        <Avatar
          sx={{
            width: 100,
            height: 100,
            margin: "auto",
            cursor: "pointer",
          }}
          onClick={() => setGalleryOpen(true)}
          src={selectedPhoto}
        >
          A
        </Avatar>
        <Typography variant="h6">Abdul</Typography>
        <Typography variant="body2">Guest</Typography>
        <Typography variant="body2">1 Month on Airbnb</Typography>
      </Box>

      {/* Information Section */}
      <Box>
        <Typography variant="body1">Email: user@example.com</Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            marginTop: 1,
          }}
        >
          <Typography variant="body1">Phone:</Typography>
          {isEditingPhone ? (
            <TextField
              variant="outlined"
              size="small"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          ) : (
            <Typography variant="body1">{phoneNumber}</Typography>
          )}
          <Button
            variant="contained"
            size="small"
            onClick={handlePhoneEdit}
            sx={{ textTransform: "none" }}
          >
            {isEditingPhone ? "Save" : "Edit"}
          </Button>
        </Box>
      </Box>

      {/* Gallery Modal */}
      <Dialog open={galleryOpen} onClose={handleGalleryClose} fullWidth>
        <DialogContent>
          <ImageGallery
            items={images}
            onThumbnailClick={(event) => setSelectedPhoto(event.original)}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default ProfileSection;
