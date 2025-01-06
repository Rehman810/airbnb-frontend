import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import {
  Box,
  CircularProgress,
  Typography,
  Container,
  Paper,
  Avatar,
} from "@mui/material";
import { fetchData } from "../../config/ServiceApi/serviceApi";

const HostBookingsCalendar = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetchData("guest-bookings", token);
        console.log(response);

        const formattedBookings = response.userBookings.map((booking) => ({
          title: booking.hostData.userName
            ? booking.hostData.userName.replace(/^5a/, "")
            : "Booking",
          start: booking.startDate,
          end: booking.endDate,
        }));
        setBookings(formattedBookings);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  return (
    <Container maxWidth="lg">
      <Paper
        elevation={3}
        sx={{
          padding: 3,
          marginTop: 3,
          backgroundColor: "#fafafa",
          borderRadius: "16px",
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          textAlign="center"
          sx={{
            color: "#ff5a5f",
            fontWeight: "bold",
            fontFamily: "Arial, sans-serif",
          }}
        >
          Host Bookings Calendar
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "70vh",
          }}
        >
          {loading ? (
            <CircularProgress />
          ) : (
            <FullCalendar
              plugins={[dayGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              events={bookings}
              headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,dayGridWeek,dayGridDay",
              }}
              eventContent={(eventInfo) => (
                <Box
                  sx={{
                    backgroundColor: "#fff",
                    padding: "8px",
                    borderRadius: "8px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Avatar
                    sx={{
                      width: 24,
                      height: 24,
                      marginRight: "8px",
                      backgroundColor: "#ff5a5f",
                      color: "#fff",
                      fontSize: "0.75rem",
                    }}
                  >
                    {eventInfo.event.title.charAt(0).toUpperCase()}
                  </Avatar>
                  <Typography
                    sx={{
                      fontSize: "0.9rem",
                      fontWeight: "bold",
                      color: "#333",
                    }}
                  >
                    {eventInfo.event.title}
                  </Typography>
                </Box>
              )}
              height="auto"
              dayCellDidMount={(info) => {
                if (info.date.toDateString() === new Date().toDateString()) {
                  info.el.style.backgroundColor = "red";
                  info.el.style.border = "1px solid #fbc02d";
                }
              }}
            />
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default HostBookingsCalendar;
