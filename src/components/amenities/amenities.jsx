import React from "react";
import { Grid, Typography } from "@mui/material";
import WifiIcon from "@mui/icons-material/Wifi";
import TvIcon from "@mui/icons-material/Tv";
import KitchenIcon from "@mui/icons-material/Kitchen";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import AcUnitIcon from "@mui/icons-material/AcUnit";

const Amenities = ({ backendAmenities }) => {
  // Predefined amenities with their respective icons
  const amenities = [
    { name: "Wifi", icon: <WifiIcon fontSize="large" /> },
    { name: "TV", icon: <TvIcon fontSize="large" /> },
    { name: "Gym", icon: <KitchenIcon fontSize="large" /> },
    { name: "Parking", icon: <LocalParkingIcon fontSize="large" /> },
    { name: "Air Conditioning", icon: <AcUnitIcon fontSize="large" /> },
  ];

  // Filter only the amenities received from the backend
  const filteredAmenities = amenities.filter((amenity) =>
    backendAmenities.includes(amenity.name)
  );

  return (
    <Grid container spacing={2} sx={{ mt: 2 }}>
      {filteredAmenities.map((amenity, index) => (
        <Grid item xs={6} key={index}>
          <Typography
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            {amenity.icon} {amenity.name}
          </Typography>
        </Grid>
      ))}
    </Grid>
  );
};

export default Amenities;
