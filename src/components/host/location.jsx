import React, { useState } from "react";
import { Box, Typography, TextField, InputAdornment, Paper, Autocomplete } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const MapLocation = () => {
  const [location, setLocation] = useState({ lat: 33.6844, lng: 73.0479 }); 

  const handleSearchChange = async (event, value) => {
    if (value) {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?city=${value}&format=json&limit=1`
      );
      
      const data = await response.json();
      
      if (data.length > 0) {
        const { lat, lon } = data[0];
        setLocation({ lat: parseFloat(lat), lng: parseFloat(lon) });
      } else {
        console.error("No results found for the given city.");
      }
    }
  };

  return (
    <Box sx={{ p: 3, paddingTop: "100px" }}>
      <Typography
        variant="h5"
        fontWeight="bold"
        sx={{ mb: 2, textAlign: "center" }}
      >
        Enter your address
      </Typography>

      <Paper
        sx={{
          height: "400px",
          position: "relative",
          borderRadius: "16px",
          overflow: "hidden",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 16,
            left: 16,
            right: 16,
            zIndex: 1000,
          }}
        >
          <Autocomplete
            freeSolo
            options={[]}
            onInputChange={handleSearchChange} 
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                placeholder="Enter your address"
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationOnIcon />
                    </InputAdornment>
                  ),
                  sx: {
                    backgroundColor: "white",
                    borderRadius: "50px",
                    boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.2)",
                  },
                }}
              />
            )}
          />
        </Box>

        <Box
          component="img"
          src={`https://static-maps.yandex.ru/1.x/?ll=${location.lng},${location.lat}&size=650,450&z=10&l=map`}
          alt="Map"
          sx={{
            width: "100%",
            height: "400px",
            objectFit: "cover",
            borderRadius: "10px",
          }}
        />
      </Paper>
    </Box>
  );
};

export default MapLocation;
