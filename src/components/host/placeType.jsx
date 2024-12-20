import React, { useState } from "react";
import { Box, Typography, Grid, Paper, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
import HouseIcon from "@mui/icons-material/House";
import ApartmentIcon from "@mui/icons-material/Apartment";
import BarnIcon from "@mui/icons-material/StoreMallDirectory";

const StyledPaper = styled(Paper)(({ theme, selected }) => ({
  padding: theme.spacing(2),
  cursor: "pointer",
  border: selected ? "1.5px solid black" : "1px solid #ddd",
  backgroundColor: selected ? "#F7F7F7" : "white",
  transition: "0.3s",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  borderRadius: "10px",
  width: "100%",
  maxWidth: "500px",
  margin: "0 auto",
  "&:hover": {
    border: "1.5px solid black",
  },
}));

const propertyTypes = [
  { name: "House", text: "Guests have the whole place to themselves", icon: <HouseIcon fontSize="large" /> },
  { name: "Flat/apartment", text: "Guests have the whole place to themselves", icon: <ApartmentIcon fontSize="large" /> },
  { name: "Barn", text: "Guests have the whole place to themselves", icon: <BarnIcon fontSize="large" /> },
];

const PlaceType = () => {
  const [selected, setSelected] = useState("House");

  return (
    <Box sx={{ py: 5, px: 5 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom textAlign="center">
        Which type of place will guests have?
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        {propertyTypes.map((property) => (
          <Grid item xs={12} sm={12} md={8} key={property.name}>
            <StyledPaper
              selected={selected === property.name}
              onClick={() => setSelected(property.name)}
              elevation={selected === property.name ? 6 : 1}
            >
              <Box>
                <Typography variant="h6" fontWeight="bold">
                  {property.name}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {property.text}
                </Typography>
              </Box>
              <Box>{property.icon}</Box>
            </StyledPaper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default PlaceType;
