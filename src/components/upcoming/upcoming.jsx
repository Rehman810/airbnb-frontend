import React, { useState, useEffect } from "react";
import { Box, Typography, Avatar, Paper, Grid, Divider } from "@mui/material";
import { fetchData } from "../../config/ServiceApi/serviceApi";

const Upcoming = () => {
  const [checkouts, setCheckouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  
  useEffect(() => {
    const fetchCheckouts = async () => {
      const response = await fetchData("upcoming-bookings", token);
      setCheckouts(response.upcomingBookings);
      setLoading(false);
      console.log((response));
      
    };

    fetchCheckouts();
  }, []);

  if (loading) {
    return (
      <Box textAlign="center" sx={{ mt: 5 }}>
        <Typography variant="h6" color="textSecondary">
          Loading guests checking out today...
        </Typography>
      </Box>
    );
  }

  if (checkouts.length === 0) {
    return (
      <Box textAlign="center" sx={{ mt: 5 }}>
        <Typography variant="h6" color="textSecondary">
        No upcoming arrivals.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      {checkouts.map((checkout) => (
        <Paper
          key={checkout.id}
          elevation={3}
          sx={{
            p: 3,
            mb: 3,
            borderRadius: 2,
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            // backgroundColor: "#f9f9f9",
          }}
        >
          <Grid container spacing={3} sx={{ alignItems: "center" }}>
            <Grid item xs={12} md={4}>
              <Box
                display="flex"
                flexDirection="column"
                gap={2}
                sx={{ alignItems: "center" }}
              >
                <img
                  src={checkout.listingId?.photos[0]}
                  alt={checkout.listingId.title}
                  style={{
                    width: "100%",
                    height: "auto",
                    borderRadius: 8,
                    objectFit: "cover",
                  }}
                />
                <Typography variant="h6" fontWeight="bold" align="center">
                  {checkout.listingId.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" align="center">
                  {checkout.listingId.city}
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12} md={4}>
              <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
                <Avatar
                  src={checkout.userSpecificData.photoProfile}
                  alt={checkout.userSpecificData.name}
                  sx={{ width: 72, height: 72 }}
                />
                <Box textAlign="center">
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    {checkout.userSpecificData.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {`Guests: ${checkout.guestCapacity}`}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {`Phone: ${checkout.userSpecificData?.phoneNumber}`}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {`Email: ${checkout.userSpecificData?.email}`}
                  </Typography>
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12} md={4}>
              <Box>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  {`Check-in: ${new Date(
                    checkout.startDate
                  ).toLocaleDateString()}`}
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  {`Check-out: ${new Date(
                    checkout.endDate
                  ).toLocaleDateString()}`}
                </Typography>
                <Typography variant="body1" fontWeight="bold" color="primary">
                  {`Total: Rs${checkout.totalPrice}`}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      ))}
    </Box>
  );
};

export default Upcoming;
