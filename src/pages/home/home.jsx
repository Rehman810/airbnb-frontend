import React, { useEffect, useState } from "react";
import { Box, Grid, Skeleton } from "@mui/material";
import Card from "../../components/cards/cards";
import { fetchData } from "../../config/ServiceApi/serviceApi";

const Home = () => {
  const [listing, setListing] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await fetchData("all-listring", token);
        console.log(response);
        setListing(response);
      } catch (error) {
        console.error("Failed to fetch options:", error);
      }
      finally{
        setLoading(false);
      }
    };
    fetchOptions();
  }, []);

  return (
    <div>
      <Box sx={{ flexGrow: 1, p: 2 }}>
        <Grid container spacing={2}>
          {loading
            ? Array.from({ length: 4 }).map((_, index) => (
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
            : listing.map((item) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={item._id}>
                  <Card data={item} />
                </Grid>
              ))}
        </Grid>
      </Box>
    </div>
  );
};

export default Home;
