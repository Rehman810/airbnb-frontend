import React, { useEffect, useState } from 'react'
import { Box, Grid } from '@mui/material'
import Card from '../../components/cards/cards'
import CardData from '../../data/data'
import { fetchData } from '../../config/ServiceApi/serviceApi'

const Home = () => {
  const [listing, setListing] = useState([])
  const token = localStorage.getItem("token")
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await fetchData("all-listring", token);
        console.log(response);
        setListing(response);
      } catch (error) {
        console.error("Failed to fetch options:", error);
      }
    };
    fetchOptions();
  }, []);
  
  return (
    <div>
      <Box sx={{ flexGrow: 1, p: 2 }}>
      <Grid container spacing={2}>
        {listing.map((item) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={item._id}>
            <Card data={item} />
          </Grid>
        ))}
      </Grid>
    </Box>
    </div>
  )
}

export default Home
