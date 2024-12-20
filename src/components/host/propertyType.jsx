import React, { useState } from "react";
import { Box, Typography, Grid, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledPaper = styled(Paper)(({ theme, selected }) => ({
  padding: theme.spacing(3),
  textAlign: "center",
  cursor: "pointer",
  border: selected ? "2px solid black" : "1px solid #ddd",
  backgroundColor: selected ? "#F7F7F7" : "white",
  transition: "0.3s",
  borderRadius: "10px",
  "&:hover": {
    border: "2px solid black",
  },
}));

const PropertyType = ({type}) => {
  const [selected, setSelected] = useState("House");

  return (
    <Box sx={{ py: 5, px: 3, paddingTop: "150px" }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom textAlign="center">
        Which of these best describes your place?
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {type.map((property) => (
          <Grid item xs={12} sm={4} key={property.name}>
            <StyledPaper
              selected={selected === property.name}
              onClick={() => setSelected(property.name)}
              elevation={selected === property.name ? 6 : 2}
            >
              {property.icon}
              <Typography
                variant="body1"
                fontWeight="bold"
                sx={{ marginTop: 1 }}
              >
                {property.name}
              </Typography>
            </StyledPaper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default PropertyType;
