import React, { useEffect, useState } from "react";
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
import { fetchDataById } from "../../config/ServiceApi/serviceApi";

const ListingPage = () => {
  const [listing, setListing] = useState([])
    const navigate = useNavigate()
    useDocumentTitle("Listings - Airbnb");
    const token = localStorage.getItem("token")
    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
      const fetchOptions = async () => {
        try {
          const response = await fetchDataById("listings", token, user?._id);
          // console.log(response.listing);
          setListing(response.listing);
        } catch (error) {
          console.error("Failed to fetch options:", error);
        }
      };
      fetchOptions();
    }, []);

    
    const formatAddress = (address) => {
      if (!address) return ''; 
    
      const formatted = [
        address?.flat,
        address?.city,
        address?.postcode,
        address?.country,
      ]
        .filter((field) => field) 
        .join(', ');
    
      return formatted || 'Address not available'; 
    };
    
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
          {listing.map((listing) => (
            <Grid item xs={12} sm={6} md={4} key={listing._id}>
              <Card
                sx={{
                  borderRadius: 3,
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                  transition: "transform 0.3s",
                  "&:hover": { transform: "scale(1.02)" },
                  height: "25rem"
                }}
              >
                <Box sx={{ position: "relative" }}>
                  <CardMedia
                    component="img"
                    height="280"
                    image={listing?.photos[0]}
                    alt={listing.title}
                    sx={{ borderRadius: "12px 12px 0 0" }}
                  />
                </Box>
                <CardContent>
                  <Typography variant="h6" fontWeight="bold">
                    {listing.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ marginTop: 1 }}>
                    {formatAddress(listing)}
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
