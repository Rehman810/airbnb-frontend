import React, { useState } from "react";
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
import FavoriteIcon from "@mui/icons-material/Favorite";
import StarIcon from "@mui/icons-material/Star";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";
import { useWishlist } from "../../context/wishlistProvider";
import VerifyToken from "../protected/verifyToken";
import LoginModal from "../Login/LoginModal";

const CardItem = ({ data }) => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [signUp, isSignUp] = useState();

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

  const navigate = useNavigate();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();

  const isWishlisted = wishlist.some((item) => item._id === data._id);

  const handleWishlistClick = (e) => {
    e.stopPropagation();
    if (isWishlisted) {
      removeFromWishlist(data._id);
    } else {
      addToWishlist(data);
    }
  };

  const handleLoginModalOpen = () => {
    isSignUp(false);
    setIsLoginModalOpen(true);
    handleMenuClose();
  };

  const handleLoginModalClose = () => {
    setIsLoginModalOpen(false);
  };

  const VerifiedComponent = () =>
    isWishlisted ? (
      <FavoriteIcon sx={{ color: "red" }} />
    ) : (
      <FavoriteBorderIcon />
    );

  const UnverifiedComponent = ({ handleLoginModalOpen }) => (
    <span onClick={handleLoginModalOpen}>
      <FavoriteBorderIcon />
    </span>
  );

  return (
    <>
    <Card
      sx={{
        maxWidth: 360,
        height: 380,
        borderRadius: 4,
        position: "relative",
        boxShadow: 3,
        overflow: "hidden",
        "&:hover": { boxShadow: 6 },
        cursor: "pointer",
      }}
      onClick={() => navigate(`/rooms/${data._id}`)}
    >
      <IconButton
        sx={{
          position: "absolute",
          top: 10,
          right: 10,
          zIndex: 2,
          // "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.8)" },
        }}
        onClick={handleWishlistClick}
      >
        <VerifyToken
          VerifiedComponent={VerifiedComponent}
          UnverifiedComponent={UnverifiedComponent}
          handleLoginModalOpen={handleLoginModalOpen}
        />
      </IconButton>

      <Box
        sx={{ position: "relative", cursor: "default" }}
        onClick={(e) => e.stopPropagation()}
      >
        <Slider {...settings}>
          {data.photos?.map((img, index) => (
            <Box key={index} sx={{ height: 220, overflow: "hidden" }}>
              <img
                src={img}
                alt={`Slide ${index}`}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </Box>
          ))}
        </Slider>

        {data?.hostData && (
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
              src={data?.profileImg}
              alt="Host"
              sx={{ width: 40, height: 40 }}
            />
          </Box>
        )}
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
      <span        onClick={(e) => e.stopPropagation()}>
      {isLoginModalOpen && (
        <LoginModal
          open={isLoginModalOpen}
          onClose={handleLoginModalClose}
          signUp={signUp}
          isSignUp={isSignUp}
        />
      )}
      </span>
      </>
  );
};

export default CardItem;
