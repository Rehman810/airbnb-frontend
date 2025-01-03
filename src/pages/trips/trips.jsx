import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Divider,
  Dialog,
  DialogContent,
  IconButton,
  Stack,
  Chip,
  Avatar,
} from "@mui/material";
import { useMediaQuery } from "@mui/material";
import Slider from "react-slick";
import { Close as CloseIcon } from "@mui/icons-material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { fetchData } from "../../config/ServiceApi/serviceApi";

const Trips = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageDialogOpen, setImageDialogOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [activeTripIndex, setActiveTripIndex] = useState(null);
  const [trips, setTrips] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchTrips = async () => {
      const response = await fetchData("guest-bookings", token);
      console.log(response.userBookings);
      setTrips(response.userBookings);
    };
    fetchTrips();
  }, []);

  const isMobile = useMediaQuery("(max-width:900px)");

  const handleImageClick = (image, index, tripIndex) => {
    setSelectedImage(image);
    setCurrentImageIndex(index);
    setActiveTripIndex(tripIndex); 
    setImageDialogOpen(true);
  };

  const handleCloseImageDialog = () => {
    setImageDialogOpen(false);
    setSelectedImage("");
    setCurrentImageIndex(0);
    setActiveTripIndex(null);
  };

  const handleNextImage = () => {
    if (activeTripIndex !== null) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex + 1 < trips[activeTripIndex].listingId.photos.length
          ? prevIndex + 1
          : 0
      );
    }
  };

  const handlePreviousImage = () => {
    if (activeTripIndex !== null) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex - 1 >= 0
          ? prevIndex - 1
          : trips[activeTripIndex].listingId.photos.length - 1
      );
    }
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
      <Typography
        variant="h4"
        fontWeight="bold"
        marginBottom={4}
        textAlign="center"
      >
        Your Trips
      </Typography>
      <Grid container spacing={3}>
        {trips.length > 0 ? (
          trips.map((trip, tripIndex) => (
            <Grid item xs={12} sm={6} md={4} key={trip.id}>
              <Card
                sx={{
                  borderRadius: 3,
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                  overflow: "hidden",
                }}
              >
                <Slider {...settings}>
                  {trip.listingId.photos.map((photo, index) => (
                    <div
                      key={index}
                      onClick={() => handleImageClick(photo, index, tripIndex)}
                    >
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
                <Card>
                  <CardContent>
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Typography variant="h6" fontWeight="bold" gutterBottom>
                        {trip.listingId.title}
                      </Typography>
                      <Typography
                        variant="subtitle2"
                        fontWeight="bold"
                        color={
                          trip.status === "Active"
                            ? "success.main"
                            : "error.main"
                        }
                        sx={{
                          padding: "4px 8px",
                          border: "1px solid",
                          borderRadius: "4px",
                        }}
                      >
                        {trip.status}
                      </Typography>
                    </Box>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      gutterBottom
                    >
                      {trip.listingId.street}, {trip.listingId.flat},{" "}
                      {trip.listingId.postcode}, {trip.listingId.city},{" "}
                      {trip.listingId.town}
                    </Typography>
                    <Typography variant="body1" sx={{ marginBottom: 2 }}>
                      {trip.listingId.description}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ fontWeight: "bold" }}
                    >
                      Type: {trip.listingId.placeType}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Room Type: {trip.listingId.roomType}
                    </Typography>
                    <Divider sx={{ marginY: 1 }} />
                    <Typography
                      variant="subtitle1"
                      fontWeight="bold"
                      gutterBottom
                    >
                      Amenities
                    </Typography>
                    <Stack direction="row" spacing={1} flexWrap="wrap">
                      {trip.listingId.amenities.map((amenity, index) => (
                        <Chip
                          key={index}
                          label={amenity}
                          variant="outlined"
                          sx={{ marginBottom: 1 }}
                        />
                      ))}
                    </Stack>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ marginTop: 2 }}
                    >
                      <strong>Trip Dates: </strong>
                      {new Date(trip.startDate).toLocaleDateString()} -{" "}
                      {new Date(trip.endDate).toLocaleDateString()}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Total Price:</strong> {trip.totalPrice}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Bedrooms:</strong> {trip.listingId.bedrooms} |{" "}
                      <strong>Beds:</strong> {trip.listingId.beds}
                    </Typography>
                <Divider sx={{ marginY: 1 }}/>
                <Stack direction="row" spacing={2} alignItems="center" pt={2}>
                  <Avatar
                    src={trip.hostData.photoProfile}
                    alt={trip.hostData.userName}
                    sx={{ width: 50, height: 50 }}
                  />
                  <Typography variant="body1">
                    Hosted by <strong>{trip.hostData.userName}</strong>
                  </Typography>
                </Stack>
                  </CardContent>
                </Card>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="h6" color="text.secondary" textAlign="center">
            No trips available.
          </Typography>
        )}
      </Grid>

      <Dialog
        fullScreen
        open={imageDialogOpen}
        onClose={handleCloseImageDialog}
        sx={{ textAlign: "center" }}
      >
        <DialogContent
          sx={{
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
          }}
        >
          <IconButton
            sx={{ position: "absolute", top: 16, right: 16, color: "white" }}
            onClick={handleCloseImageDialog}
          >
            <CloseIcon />
          </IconButton>

          <IconButton
            sx={{
              position: "absolute",
              top: "50%",
              left: 16,
              color: "white",
              transform: "translateY(-50%)",
            }}
            onClick={handlePreviousImage}
          >
            <ArrowBackIcon />
          </IconButton>

          <IconButton
            sx={{
              position: "absolute",
              top: "50%",
              right: 16,
              color: "white",
              transform: "translateY(-50%)",
            }}
            onClick={handleNextImage}
          >
            <ArrowForwardIcon />
          </IconButton>

          <img
            src={
              trips[activeTripIndex]?.listingId?.photos?.[currentImageIndex] ||
              "/fallback-image.jpg"
            }
            alt={`Image ${currentImageIndex + 1}`}
            style={{ borderRadius: "8px", width: "70%" }}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Trips;
