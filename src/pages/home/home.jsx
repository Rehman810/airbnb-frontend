import React from 'react'
import SearchBar from '../../components/searchBar/searchBar'
import { Box, Grid } from '@mui/material'
import Card from '../../components/cards/cards'
import CardData from '../../data/data'

const Home = () => {
  return (
    <div>
      <SearchBar />
      <Box sx={{ flexGrow: 1, p: 2 }}>
      <Grid container spacing={2}>
        {CardData.map((item) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
            <Card data={item} />
          </Grid>
        ))}
      </Grid>
    </Box>
    </div>
  )
}

export default Home
