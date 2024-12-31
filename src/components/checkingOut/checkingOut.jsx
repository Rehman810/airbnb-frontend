import React from "react";
import { Typography, Box } from "@mui/material";

const CheckingOut = () => (
  <Box textAlign="center">
    <Typography variant="h6" color="textSecondary">
      You don’t have any guests checking out today or tomorrow.
    </Typography>
  </Box>
);

export default CheckingOut;
