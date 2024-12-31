import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Avatar, Paper, Grid, Divider } from "@mui/material";
import axios from "axios";
import { fetchData } from "../../config/ServiceApi/serviceApi";

const PendingBooking = () => {
  const [pendingBookings, setPendingBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token")

  const bookings = [
    {
      id: 1,
      guestName: "John Doe",
      guestCapacity: 4,
      checkInDate: "2024-12-25",
      checkOutDate: "2024-12-30",
      guestPicture: "https://via.placeholder.com/150", // Placeholder image
      totalPrice: 250,
    },
    {
      id: 2,
      guestName: "Jane Smith",
      guestCapacity: 2,
      checkInDate: "2024-12-20",
      checkOutDate: "2024-12-22",
      guestPicture: "https://via.placeholder.com/150", // Placeholder image
      totalPrice: 150,
    },
    {
      id: 3,
      guestName: "Alice Johnson",
      guestCapacity: 3,
      checkInDate: "2024-12-18",
      checkOutDate: "2024-12-19",
      guestPicture: "https://via.placeholder.com/150", // Placeholder image
      totalPrice: 180,
    },
  ];
  

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetchData("temporary-booking", token);
        // setPendingBookings(response);
        console.log(response);
        
      } catch (error) {
        console.error("Error fetching pending bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handleAccept = (bookingId) => {
    console.log(`Accept booking: ${bookingId}`);
    // Make API call to accept the booking
  };

  const handleReject = (bookingId) => {
    console.log(`Reject booking: ${bookingId}`);
    // Make API call to reject the booking
  };

  if (loading) {
    return (
      <Box textAlign="center">
        <Typography variant="h6" color="textSecondary">
          Loading pending bookings...
        </Typography>
      </Box>
    );
  }

  if (bookings.length === 0) {
    return (
      <Box textAlign="center">
        <Typography variant="h6" color="textSecondary">
          No pending bookings at the moment.
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
    {bookings.map((booking) => (
      <Paper
        key={booking.id}
        elevation={3}
        sx={{
          p: 3,
          mb: 3,
          borderRadius: 2,
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Grid container spacing={3}>
          {/* Guest Info Section */}
          <Grid item xs={12} md={8}>
            <Box display="flex" alignItems="center" gap={2}>
              <Avatar
                src={booking.guestPicture}
                alt={booking.guestName}
                sx={{ width: 64, height: 64 }}
              />
              <Box>
                <Typography variant="h6" fontWeight="bold">
                  {booking.guestName}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {`Guest Capacity: ${booking.guestCapacity}`}
                </Typography>
              </Box>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Box sx={{display: "flex", flexDirection: "row", justifyContent: "space-evenly", alignItems: "center"}}>
              <Typography variant="body2" color="textSecondary">
                {`Check-in: ${new Date(booking.checkInDate).toLocaleDateString()}`}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {`Check-out: ${new Date(booking.checkOutDate).toLocaleDateString()}`}
              </Typography>
              <Typography
                variant="body1"
                fontWeight="bold"
                color="primary"
              >
                {`Total Price: $${booking.totalPrice}`}
              </Typography>
            </Box>
          </Grid>

          {/* Action Buttons Section */}
          <Grid
            item
            xs={12}
            md={4}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="flex-end"
          >
            <Button
              variant="contained"
              color="success"
              onClick={() => handleAccept(booking.id)}
              sx={{ mb: 1, px: 4 }}
            >
              Accept
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={() => handleReject(booking.id)}
              sx={{ px: 4 }}
            >
              Reject
            </Button>
          </Grid>
        </Grid>
      </Paper>
    ))}
  </Box>
  );
};

export default PendingBooking;
