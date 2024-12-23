import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Button,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Avatar,
} from "@mui/material";
import { DatePicker } from "antd";
import "antd/dist/reset.css";
import LeafletMap from "../map/map";
import Img from "../../assets/images/img2.jpg";
import HostSection from "../hostSection/hostSection";
import Amenities from "../amenities/amenities";
import { useParams } from "react-router-dom";
import { fetchDataById } from "../../config/ServiceApi/serviceApi";

const { RangePicker } = DatePicker;

const backendAmenities = ["Wifi", "TV", "Parking", "Air Conditioning"];

const RoomPage = () => {
  const [place, setPlace] = useState({});
  const { roomId } = useParams();

  const token = localStorage.getItem("token");
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await fetchDataById("listing", token, roomId);
        if (response && response.listing) {
          setPlace(response.listing);
        } else {
          console.error("Unexpected response format:", response);
        }
      } catch (error) {
        console.error("Failed to fetch options:", error);
      }
    };
    fetchOptions();
  }, []);

  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        {place.title}
      </Typography>
      <Grid container spacing={2}>
        {place && place.photos && place.photos.length > 0 && (
          <Grid item xs={12}>
            <CardMedia
              component="img"
              height="500"
              image={place.photos[0]}
              alt="Cover Image"
              sx={{ borderRadius: 2 }}
            />
          </Grid>
        )}
        {place?.photos?.map((a, index) => (
          <Grid item xs={6} sm={3} key={index}>
            <CardMedia
              component="img"
              height="150"
              image={a}
              alt="Small Image 1"
              sx={{ borderRadius: 2 }}
            />
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={2} sx={{ mt: 3 }}>
        <Grid item xs={12} md={8}>
          <Typography variant="h6" gutterBottom>
            Farm stay in Pembroke, United Kingdom
          </Typography>
          <Typography variant="body2" gutterBottom>
            <strong>Guest:</strong> {place.guestCapacity} |{" "}
            <strong>Beds:</strong> {place.guestCapacity} |{" "}
            <strong>Bedrooms:</strong> 1
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Typography variant="body1" gutterBottom>
            {place.description}
          </Typography>
          <Divider sx={{ my: 2 }} />

          <Typography variant="h6" gutterBottom>
            Amenities
          </Typography>
          {/* <Amenities backendAmenities={place.amenities} /> */}

          <Divider sx={{ my: 2 }} />
          <Typography variant="h6" sx={{ mt: 2 }}>
            Guest Reviews
          </Typography>
          <Box sx={{ mt: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Avatar sx={{ mr: 2 }}>C</Avatar>
              <Typography>
                <strong>Charlotte:</strong> Amazing stay! Everything was
                perfect.
              </Typography>
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ position: { md: "sticky" }, top: { md: 150 } }}>
            <CardContent>
              <Typography variant="h5" fontWeight="bold">
                €169 / night
              </Typography>
              <RangePicker
                style={{ width: "100%", marginTop: 16 }}
                placeholder={["Check-in", "Check-out"]}
              />
              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
              >
                Reserve
              </Button>
              <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
                You won’t be charged yet.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h6">Location</Typography>
        <LeafletMap
          latitude={24.8607}
          longitude={67.0011}
          popupText="Karachi, Pakistan"
        />
      </Box>

      <Box sx={{ mt: 4 }}>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="h6">Meet Your Host</Typography>
        <HostSection />
      </Box>
    </Box>
  );
};

export default RoomPage;
