import React, {
  useState,
  useEffect,
} from "react";
import {
  Box,
  Typography,
  Button,
  Avatar,
  Paper,
  Grid,
  Divider,
} from "@mui/material";
import { fetchData } from "../../config/ServiceApi/serviceApi";

const PendingBooking = () => {
  const [pendingBookings, setPendingBookings] =
    useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetchData(
          "temporary-booking",
          token
        );
        setPendingBookings(response.bookings);
        console.log(response);
      } catch (error) {
        console.error(
          "Error fetching pending bookings:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handleAccept = (bookingId) => {
    console.log(`Accept booking: ${bookingId}`);
  };

  const handleReject = (bookingId) => {
    console.log(`Reject booking: ${bookingId}`);
  };

  if (loading) {
    return (
      <Box textAlign="center">
        <Typography
          variant="h6"
          color="textSecondary">
          Loading pending bookings...
        </Typography>
      </Box>
    );
  }

  if (pendingBookings?.length === 0 || {}) {
    return (
      <Box textAlign="center">
        <Typography
          variant="h6"
          color="textSecondary">
          No pending bookings at the moment.
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      {pendingBookings?.map((booking) => (
        <Paper
          key={booking.id}
          elevation={3}
          sx={{
            p: 3,
            mb: 3,
            borderRadius: 2,
            boxShadow:
              "0 2px 8px rgba(0, 0, 0, 0.1)",
          }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Box
                display="flex"
                alignItems="center"
                gap={2}>
                <Avatar
                  src={
                    booking.userSpecificData
                      .photoProfile
                  }
                  alt={
                    booking.userSpecificData.name
                  }
                  sx={{ width: 64, height: 64 }}
                />
                <Box>
                  <Typography
                    variant="h6"
                    fontWeight="bold">
                    {
                      booking.userSpecificData
                        .name
                    }
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary">
                    {`Guest Capacity: ${booking.guestCapacity}`}
                  </Typography>
                </Box>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                }}>
                <Typography
                  variant="body2"
                  color="textSecondary">
                  {`Check-in: ${new Date(
                    booking.startDate
                  ).toLocaleDateString()}`}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary">
                  {`Check-out: ${new Date(
                    booking.endDate
                  ).toLocaleDateString()}`}
                </Typography>
                <Typography
                  variant="body1"
                  fontWeight="bold"
                  color="primary">
                  {`Total Price: Rs${booking.totalPrice}`}
                </Typography>
              </Box>
            </Grid>

            <Grid
              item
              xs={12}
              md={4}
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="flex-end">
              <Button
                variant="contained"
                color="success"
                onClick={() =>
                  handleAccept(booking.id)
                }
                sx={{ mb: 1, px: 4 }}>
                Accept
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={() =>
                  handleReject(booking.id)
                }
                sx={{ px: 4 }}>
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
