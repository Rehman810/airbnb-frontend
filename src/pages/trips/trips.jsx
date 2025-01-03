import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Avatar,
  Stack,
  Chip,
  Divider,
  Dialog,
  DialogContent,
  DialogActions,
  IconButton,
} from "@mui/material";
import { useMediaQuery } from "@mui/material";
import Slider from "react-slick";
import { Close as CloseIcon } from "@mui/icons-material";
import { fetchData } from "../../config/ServiceApi/serviceApi";

const tripsData = [
  {
    id: 1,
    title: "Cozy Beach House",
    location: "Malibu, California",
    description:
      "A beautiful beachfront house perfect for a relaxing vacation.",
    photos: [
      "https://source.unsplash.com/featured/?beach-house",
      "https://source.unsplash.com/featured/?beach",
      "https://source.unsplash.com/featured/?ocean",
    ],
    amenities: ["Wi-Fi", "Swimming Pool", "Free Parking", "Kitchen"],
    hostName: "John Doe",
    hostAvatar: "https://source.unsplash.com/random/?person",
    type: "House",
    roomType: "Entire Home",
  },
  {
    id: 2,
    title: "Mountain Cabin Retreat",
    location: "Aspen, Colorado",
    description:
      "Escape to the mountains in this charming cabin, perfect for hiking.",
    photos: [
      "https://source.unsplash.com/featured/?mountain-cabin",
      "https://source.unsplash.com/featured/?mountain",
      "https://source.unsplash.com/featured/?snow",
    ],
    amenities: ["Fireplace", "Hiking Trails", "Hot Tub"],
    hostName: "Emily Smith",
    hostAvatar: "https://source.unsplash.com/random/?person2",
    type: "Cabin",
    roomType: "Private Room",
  },
];

const Trips = () => {
  const [openImageDialog, setOpenImageDialog] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [activeTrip, setActiveTrip] = useState(null);
  const [trips, setTrips] = useState([])
  const token = localStorage.getItem("token")

  useEffect(() => {
    const fetchTrips = async () => {
      const response = await fetchData("guest-bookings", token);
      console.log(response.userBookings);
      setTrips(response.userBookings) 
    };
    fetchTrips();
  }, []);

  const isMobile = useMediaQuery("(max-width:900px)");

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setOpenImageDialog(true);
  };

  const handleCloseImageDialog = () => {
    setOpenImageDialog(false);
    setSelectedImage("");
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Box sx={{ padding: isMobile ? 2 : 4 }}>
      <Typography variant="h4" fontWeight="bold" marginBottom={4} textAlign="center">
        Your Trips
      </Typography>
      <Grid container spacing={3}>
        {tripsData.map((trip) => (
          <Grid item xs={12} sm={6} md={4} key={trip.id}>
            <Card
              sx={{
                borderRadius: 3,
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                overflow: "hidden",
              }}
            >
              <Slider {...settings}>
                {trip.photos.map((photo, index) => (
                  <div key={index} onClick={() => handleImageClick(photo)}>
                    <img
                      src={photo}
                      alt={`Trip image ${index}`}
                      style={{
                        width: "100%",
                        height: "200px",
                        objectFit: "cover",
                        cursor: "pointer",
                      }}
                    />
                  </div>
                ))}
              </Slider>
              <CardContent>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  {trip.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {trip.location}
                </Typography>
                <Typography variant="body1" sx={{ marginBottom: 2 }}>
                  {trip.description}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: "bold" }}>
                  Type: {trip.type}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Room Type: {trip.roomType}
                </Typography>
                <Divider sx={{ marginY: 1 }} />
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  Amenities
                </Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap">
                  {trip.amenities.map((amenity, index) => (
                    <Chip
                      key={index}
                      label={amenity}
                      variant="outlined"
                      sx={{ marginBottom: 1 }}
                    />
                  ))}
                </Stack>
                <Divider sx={{ marginY: 2 }} />
                <Stack direction="row" spacing={2} alignItems="center">
                  <Avatar
                    src={trip.hostAvatar}
                    alt={trip.hostName}
                    sx={{ width: 50, height: 50 }}
                  />
                  <Typography variant="body1">
                    Hosted by <strong>{trip.hostName}</strong>
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Full-screen Image Dialog */}
      <Dialog open={openImageDialog} onClose={handleCloseImageDialog} maxWidth="lg" fullWidth>
        <DialogContent>
          <img
            src={selectedImage}
            alt="Full screen"
            style={{ width: "100%", height: "auto", borderRadius: "8px" }}
          />
        </DialogContent>
        <DialogActions>
          <IconButton onClick={handleCloseImageDialog}>
            <CloseIcon />
          </IconButton>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Trips;
