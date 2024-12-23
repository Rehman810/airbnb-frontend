import React from "react";
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
import Img from "../../assets/images/img2.jpg"
import HostSection from "../hostSection/hostSection";
import Amenities from "../amenities/amenities";

const { RangePicker } = DatePicker;

const backendAmenities = ["Wifi", "TV", "Parking", "Air Conditioning"];


const RoomPage = () => {
  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        "The Willow" Stunning Location, Amazing Views
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <CardMedia
            component="img"
            height="500"
            image={Img}
            alt="Cover Image"
            sx={{ borderRadius: 2 }}
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <CardMedia
            component="img"
            height="150"
            image={Img}
            alt="Small Image 1"
            sx={{ borderRadius: 2 }}
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <CardMedia
            component="img"
            height="150"
            image={Img}
            alt="Small Image 2"
            sx={{ borderRadius: 2 }}
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <CardMedia
            component="img"
            height="150"
            image={Img}
            alt="Small Image 3"
            sx={{ borderRadius: 2 }}
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <CardMedia
            component="img"
            height="150"
            image={Img}
            alt="Small Image 4"
            sx={{ borderRadius: 2 }}
          />
        </Grid>
      </Grid>

      <Grid container spacing={2} sx={{ mt: 3 }}>
        <Grid item xs={12} md={8}>
          <Typography variant="h6" gutterBottom>
            Farm stay in Pembroke, United Kingdom
          </Typography>
          <Typography variant="body2" gutterBottom>
            <strong>Guest:</strong> 4 | <strong>Beds:</strong> 2 | <strong>Bedrooms:</strong> 1
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Typography variant="body1" gutterBottom>
            The Willow is the ultimate luxury pod stay located on a farm, offering stunning views of the countryside.
          </Typography>
          <Divider sx={{ my: 2 }} />

          <Typography variant="h6" gutterBottom>
            Amenities
          </Typography>
          <Amenities backendAmenities={backendAmenities} />

          <Divider sx={{ my: 2 }} />
          <Typography variant="h6" sx={{ mt: 2 }}>
            Guest Reviews
          </Typography>
          <Box sx={{ mt: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Avatar sx={{ mr: 2 }}>C</Avatar>
              <Typography>
                <strong>Charlotte:</strong> Amazing stay! Everything was perfect.
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
