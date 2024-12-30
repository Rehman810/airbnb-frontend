import React, { useEffect, useState } from "react";
import { Box, Button, Grid, Skeleton, Typography } from "@mui/material";
import Card from "../../components/cards/cards";
import { fetchData } from "../../config/ServiceApi/serviceApi";
import { useAppContext } from "../../context/context";
import { useWishlist } from "../../context/wishlistProvider";
import LeafletMap from "../../components/map/map";

const Home = () => {
  const [listing, setListing] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mapVisible, setMapVisible] = useState(false);
  const token = localStorage.getItem("token");
  const { searchParams } = useAppContext();
  // const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
      // wishlist.map((a)=>console.log(a)
      // )
  useEffect(() => {
    if (listing.length === 0) {
      setFilteredData([]);
      return;
    }
  
    if (!searchParams || !searchParams.destination || !searchParams.checkIn || !searchParams.checkOut) {
      console.error("Missing or invalid booking dates in searchParams");
      return; 
    }
  
    const filteredProducts = listing.filter((product) => {
      const cityMatches = searchParams.destination.split(",")[0].trim().toLowerCase() == product.city.trim().toLowerCase();

      const checkInDate = new Date(searchParams.checkIn);
      const checkOutDate = new Date(searchParams.checkOut);
  
      const isAvailable = !product.bookings.some((booking) => {
        const bookingStart = new Date(booking.startDate);
        const bookingEnd = new Date(booking.endDate);
  
        const isOverlap = (checkInDate < bookingEnd && checkOutDate > bookingStart);
        return isOverlap;
      });

      const guests = searchParams.guests <= product.guestCapacity
  
      return cityMatches && isAvailable && guests; 
    });
  
    setFilteredData(filteredProducts);
  }, [searchParams, listing]);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await fetchData("all-listring", token);
        console.log(response);
        setListing(response);
        setFilteredData(response);
      } catch (error) {
        console.error("Failed to fetch options:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOptions();
  }, []); 

  const toggleMapVisibility = () => {
    setMapVisible((prev) => !prev); 
  };

  return (
    <div>
      {mapVisible ? (
        <Box
          sx={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            top: 0,
            height: "100vh",
            transition: "height 0.3s ease-in-out",
          }}
        >
          <LeafletMap
            latitude={filteredData[0]?.latitude || 24.8607}
            longitude={filteredData[0]?.longitude || 67.0011}
            steps={true}
          />
        </Box>
      ) : (
        <Box sx={{ flexGrow: 1, p: 2 }}>
          <Grid container spacing={2}>
            {loading ? (
              Array.from({ length: 4 }).map((_, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                  <Box
                    sx={{
                      height: 380,
                      borderRadius: 2,
                      overflow: "hidden",
                      boxShadow: 2,
                    }}
                  >
                    <Skeleton
                      variant="rectangular"
                      width="100%"
                      height={220}
                      sx={{ borderRadius: 2 }}
                    />
                    <Skeleton
                      variant="text"
                      width="80%"
                      height={32}
                      sx={{ mt: 1, mx: 2 }}
                    />
                    <Skeleton
                      variant="text"
                      width="90%"
                      height={20}
                      sx={{ mt: 1, mx: 2 }}
                    />
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        mt: 1,
                        mx: 2,
                      }}
                    >
                      <Skeleton variant="circular" width={20} height={20} />
                      <Skeleton
                        variant="text"
                        width="30%"
                        height={20}
                        sx={{ ml: 1 }}
                      />
                    </Box>
                  </Box>
                </Grid>
              ))
            ) : listing.length === 0 ? (
              <Grid item xs={12}>
                <Typography variant="h6" align="center" color="text.secondary">
                  No listings present
                </Typography>
              </Grid>
            ) : (
              filteredData.map((item) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={item._id}>
                  <Card data={item} />
                </Grid>
              ))
            )}
          </Grid>
        </Box>
      )}
  
      <Button
        variant="contained"
        color="primary"
        sx={{
          position: "fixed",
          bottom: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          borderRadius: "25px",
          padding: 1.5,
          boxShadow: 2,
          zIndex: 10,
          backgroundColor: "#222222",
          paddingLeft: "25px",
          paddingRight: "25px",
          fontSize: "12px",
        }}
        onClick={toggleMapVisibility}
      >
        {mapVisible ? "Show list" : "Show map"}
      </Button>
    </div>
  );
  
};

export default Home;
