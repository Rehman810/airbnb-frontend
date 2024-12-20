import React from "react";
import { Box, Typography, Grid } from "@mui/material";
import Lottie from "react-lottie";
import animationData from "../../animations/step1animation.json";

const WebLottieAnimation = ({animation}) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: !animation ? animationData : animation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Lottie options={defaultOptions} height={"100%"} width={"100%"} />
    </Box>
  );
};

const Step1 = ({stepNo, title, description, animation}) => {
  return (
    <Box sx={{ py: 5, px: 5 }}>
      <Grid container spacing={8} alignItems="center" >
        <Grid item xs={12} md={6}>
          <Typography fontWeight={"bold"}>Step {stepNo}</Typography>
          <Typography
            variant="h3"
            sx={{
              mb: { xs: 3, md: 0 },
              fontWeight: "bold",
              color: "#333",
              paddingTop: "20px",
              textAlign: { xs: "center", md: "left" },
            }}
          >
            {title}
          </Typography>
          <Typography variant="body1" paddingTop="20px">
            {description}
          </Typography>
        </Grid>

        <Grid item xs={12} md={6}>
          <WebLottieAnimation animation={animation}/>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Step1;
