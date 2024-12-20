import React from 'react';
import { Box, Typography, Grid, Card, CardContent, CardMedia } from '@mui/material';

import bed from '../../assets/images/bed.webp'
import sofa from '../../assets/images/sofa.webp'
import door from '../../assets/images/door.webp'

const steps = [
  {
    id: 1,
    title: ' 1. Tell us about your place',
    description: 'Share some basic info, like where it is and how many guests can stay.',
    image: bed, 
  },
  {
    id: 2,
    title: '2. Make it stand out',
    description: 'Add 5 or more photos plus a title and description—we’ll help you out.',
    image: sofa, 
  },
  {
    id: 3,
    title: '3. Finish up and publish',
    description: 'Choose a starting price, verify a few details, then publish your listing.',
    image: door, 
  },
];

const GetStarted = () => {
  return (
    <Box sx={{ py: 5, px: 5,}}>
      <Grid container spacing={8} alignItems="center">
        {/* Heading Section */}
        <Grid item xs={12} md={6}>
          <Typography
            variant="h3"
            sx={{ mb: { xs: 3, md: 0 }, fontWeight: 'bold', color: '#333', textAlign: { xs: 'center', md: 'left' } }}
          >
            It’s easy to get started on Airbnb
          </Typography>
        </Grid>

        {/* Cards Section */}
        <Grid item xs={12} md={6}>
          <Grid container spacing={2}>
            {steps.map((step) => (
              <Grid item xs={12} key={step.id}>
                <Card sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', boxShadow: 3, borderRadius: 2 }}>
                  
                  <CardContent sx={{ flex: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333' }}>
                      {step.title}
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1, color: '#666' }}>
                      {step.description}
                    </Typography>
                  </CardContent>
                  <CardMedia
                    component="img"
                    image={step.image}
                    alt={step.title}
                    sx={{ width: { xs: '100%', md: '40%' }, height: '150px', objectFit: 'contain', backgroundColor: '#fff' }}
                  />
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default GetStarted;
