import React from "react";
import Slider from "react-slick";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
  IconButton,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import StarIcon from "@mui/icons-material/Star";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CardItem = ({ data }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
  };

  return (
    <Card
      sx={{
        maxWidth: 360,
        height: 380,
        borderRadius: 4,
        position: "relative",
        boxShadow: 3,
        overflow: "hidden",
        "&:hover": { boxShadow: 6 },
      }}
    >
      <IconButton
        sx={{
          position: "absolute",
          top: 10,
          right: 10,
          zIndex: 2,
          backgroundColor: "white",
          "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.8)" },
        }}
      >
        <FavoriteBorderIcon />
      </IconButton>

      <Box sx={{ position: "relative" }}>
        <Slider {...settings}>
          {data.images.map((img, index) => (
            <Box key={index} sx={{ height: 220, overflow: "hidden" }}>
              <img
                src={img}
                alt={`Slide ${index}`}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </Box>
          ))}
        </Slider>

        <Box
          sx={{
            position: "absolute",
            bottom: 10,
            left: 10,
            display: "flex",
            alignItems: "center",
            gap: 1,
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            borderRadius: "8px",
            px: 1.5,
            py: 2.5,
            boxShadow: 1,
            transform: "perspective(600px) rotateY(0deg)",
            transformOrigin: "left center",
            transition: "transform 0.5s ease",
            "&:hover": {
              transform: "perspective(200px) rotateY(-20deg)",
            },
          }}
        >
          <Avatar
            src={data.profileImg}
            alt="Host"
            sx={{ width: 40, height: 40 }}
          />
        </Box>
      </Box>

      {data.guestFavourite && (
        <Box
          sx={{
            position: "absolute",
            top: 10,
            left: 10,
            backgroundColor: "white",
            px: 1,
            py: 0.5,
            borderRadius: 2,
            fontSize: "0.8rem",
            fontWeight: "bold",
            boxShadow: 1,
          }}
        >
          Guest favourite
        </Box>
      )}

      <CardContent>
        <Typography variant="h6" fontWeight="bold" fontSize={16}>
          {data.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={1}>
          {data.description}
        </Typography>
        <Typography variant="body2" fontWeight="bold" color="text.primary">
          {data.price}
        </Typography>
        <Box display="flex" alignItems="center" gap={0.5}>
          <StarIcon sx={{ color: "black", fontSize: 16 }} />
          <Typography variant="body2" fontWeight="bold" color="text.primary">
            {data.rating}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CardItem;
