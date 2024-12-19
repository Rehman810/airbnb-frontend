import React from "react";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  TextField,
  Grid,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import Img1 from "../../assets/images/img1.jpg"
import Img2 from "../../assets/images/img2.jpg"
import useDocumentTitle from "../../hooks/dynamicTitle/dynamicTitle";
import { useNavigate } from "react-router-dom";

const listings = [
  {
    id: 1,
    title: "Good House",
    location: "Karachi, Sindh",
    img: Img1, 
    status: "Action required",
  },
  {
    id: 2,
    title: "Stylish Apartment",
    location: "Karachi, Sindh",
    img: Img2,
    status: "Action required",
  },
];

const ListingPage = () => {
    const navigate = useNavigate()
    useDocumentTitle("Listings - Airbnb");

  return (
    <Box>
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography variant="h5" fontWeight="bold">
            Your Listings
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <TextField
              variant="outlined"
              placeholder="Search"
              size="small"
              sx={{ borderRadius: 2 }}
              InputProps={{
                startAdornment: <SearchIcon sx={{ marginRight: 1 }} />,
              }}
            />
            <IconButton color="primary" sx={{ backgroundColor: "#f5f5f5", borderRadius: "50%" }} onClick={()=>navigate("/listingSteps")}>
              <AddIcon sx={{color: "black"}}/>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Box sx={{ padding: 3 }}>
        <Grid container spacing={3}>
          {listings.map((listing) => (
            <Grid item xs={12} sm={6} md={4} key={listing.id}>
              <Card
                sx={{
                  borderRadius: 3,
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                  transition: "transform 0.3s",
                  "&:hover": { transform: "scale(1.02)" },
                }}
              >
                <Box sx={{ position: "relative" }}>
                  <CardMedia
                    component="img"
                    height="280"
                    image={listing.img}
                    alt={listing.title}
                    sx={{ borderRadius: "12px 12px 0 0" }}
                  />
                </Box>
                <CardContent>
                  <Typography variant="h6" fontWeight="bold">
                    {listing.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ marginTop: 1 }}>
                    {listing.location}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default ListingPage;
