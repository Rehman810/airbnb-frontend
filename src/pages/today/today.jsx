import React, { useState } from "react";
import { Box, Button, Typography, Paper } from "@mui/material";
import useDocumentTitle from "../../hooks/dynamicTitle/dynamicTitle";
import CheckingOut from "../../components/checkingOut/checkingOut";
import CurrentlyHosting from "../../components/currentlyHosting/currentlyHosting";
import Upcoming from "../../components/upcoming/upcoming";
import PendingBooking from "../../components/pendingBooking/pendingBooking";
import { useBookingContext } from "../../context/booking";

const ReservationSection = () => {
  const [selectedTab, setSelectedTab] = useState("Pending Booking");
  useDocumentTitle("Host Dashboard - Airbnb");
  const user = JSON.parse(localStorage.getItem("user"));
  const { checkingOut, pendingBooking, currentlyHosting, upcoming } = useBookingContext();

  const tabs = [
    { label: "Pending Booking", count: pendingBooking || 0 },
    { label: "Checking out", count: checkingOut || 0 },
    { label: "Currently hosting", count: currentlyHosting || 0 },
    { label: "Upcoming", count: upcoming || 0 },
  ];

  const renderContent = () => {
    switch (selectedTab) {
      case "Checking out":
        return <CheckingOut />;
      case "Currently hosting":
        return <CurrentlyHosting />;
      case "Upcoming":
        return <Upcoming />;
      case "Pending Booking":
        return <PendingBooking />;
      default:
        return (
          <Typography variant="h6" color="textSecondary">
            No data available.
          </Typography>
        );
    }
  };

  const formatUserName = (userName) => {
    return userName
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };  

  return (
    <Box sx={{ p: 3 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" fontWeight="bold">
          Welcome, {formatUserName(user.userName)}!
        </Typography>
      </Box>

      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h6">Your reservations</Typography>
        <Button variant="text">All reservations {currentlyHosting || 0}</Button>
      </Box>

      <Box
        display="flex"
        flexWrap="wrap"
        gap={1}
        mt={2}
        mb={3}
        sx={{ overflowX: "auto" }}
      >
        {tabs.map((tab) => (
          <Button
            key={tab.label}
            variant={selectedTab === tab.label ? "outlined" : "text"}
            onClick={() => setSelectedTab(tab.label)}
            sx={{
              borderRadius: "50px",
              px: 2,
              py: 0.5,
              border:
                selectedTab === tab.label
                  ? "1px solid black"
                  : "1px solid transparent",
            }}
          >
            {`${tab.label} (${tab.count})`}
          </Button>
        ))}
      </Box>

      <Paper
        elevation={0}
        sx={{
          p: 3,
          textAlign: "center",
          bgcolor: "#f9f9f9",
          borderRadius: "10px",
        }}
      >
        {renderContent()}
      </Paper>
    </Box>
  );
};

export default ReservationSection;
