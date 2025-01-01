import React from "react";
import {
  Box,
  Typography,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import notFoundAnimation from "../../animations/notfound.json";

const NotFoundPage = () => {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        bgcolor: "background.default",
        p: 3,
      }}>
      <Box
        sx={{
          width: 300,
          height: 300,
          mb: 3,
        }}>
        <Lottie
          animationData={notFoundAnimation}
          loop={true}
        />
      </Box>

      <Typography
        variant="h3"
        sx={{ mb: 1, fontWeight: "bold" }}>
        Oops! Page Not Found
      </Typography>
      <Typography
        variant="body1"
        color="text.secondary"
        sx={{ mb: 3 }}>
        It seems you're lost. But don't worry, we
        can guide you back!
      </Typography>

      <Box>
        <Button
          component={Link}
          to="/"
          variant="outlined"
          color="primary"
          sx={{ mr: 2 }}>
          Go to Home
        </Button>
      </Box>
    </Box>
  );
};

export default NotFoundPage;
