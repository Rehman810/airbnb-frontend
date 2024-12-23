import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
  Modal,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useAppContext } from "../../context/context";

const ListingCard = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const { 
    placeType, 
    propertyType, 
    address, 
    amenties, 
    guestCount, 
    description, 
    title, 
    uploadedImages, 
    weekDayPrice, 
    weekendPrice 
  } = useAppContext();

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

    // console.log("placeType:", placeType);
    // console.log("propertyType:", propertyType);
    // console.log("address:", address);
    // console.log("amenties:", amenties);
    // console.log("guestCount:", guestCount);
    // console.log("description:", description);
    // console.log("title:", title);
    // console.log("uploadedImages:", uploadedImages);
    // console.log("weekDayPrice:", weekDayPrice);
    // console.log("weekendPrice:", weekendPrice);

    const formatAddress = (address) => {
      return `${address?.flat}, ${address?.streetAddress}, ${address?.area}, ${address?.city}, ${address?.postcode}, ${address?.country}`;
    };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", p: 2, marginTop: "100px" }}>
      <Typography variant="h4" sx={{ mb: 1 }}>
        Review your listing
      </Typography>
      <Typography variant="body1" sx={{ color: "gray", mb: 3 }}>
        Here's what we'll show to guests. Make sure everything looks good.
      </Typography>
      <Box sx={{ display: "flex", flexDirection: {xs: "column", md: "row"}, alignItems: "center", justifyContent: "space-between" }}>
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          boxShadow: 3,
          borderRadius: 2,
          width: "100%",
          maxWidth: 800,
          position: "relative",
          marginRight: "20px"
        }}
      >
        <CardMedia
          component="img"
          height="250"
          image={URL.createObjectURL(uploadedImages[0].file)}
          alt="Listing Image"
          sx={{ cursor: "pointer" }}
          onClick={openModal}
        />
        <Button
          onClick={openModal}
          sx={{
            position: "absolute",
            top: 10,
            left: 10,
            backgroundColor: "white",
            color: "black",
            fontWeight: "bold",
            textTransform: "none",
            padding: "5px 10px",
            borderRadius: "8px",
            boxShadow: 1,
          }}
        >
          Show preview
        </Button>

        <CardContent sx={{ display: "flex", justifyContent: "space-between", p: 2 }}>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              {title}
            </Typography>
            {/* <Typography
              variant="body2"
              sx={{ textDecoration: "line-through", color: "gray", fontSize: "14px" }}
            >
              $20
            </Typography> */}
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            <Typography component="span" variant="body1"> Week Day </Typography>${weekDayPrice} <Typography component="span" variant="body2">/ night</Typography>
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            <Typography component="span" variant="body1"> Week End </Typography>${weekendPrice} <Typography component="span" variant="body2">/ night</Typography>
            </Typography>
          </Box>
          <Typography
            variant="body2"
            sx={{
              color: "white",
              backgroundColor: "black",
              padding: "2px 8px",
              borderRadius: "12px",
              alignSelf: "center",
            }}
          >
            New
          </Typography>
        </CardContent>
      </Card>

      <Box sx={{ mt: 4, width: "100%", maxWidth: 800, textAlign: "left" }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          What's next?
        </Typography>

        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
            Confirm a few details and publish
          </Typography>
          <Typography variant="body2" sx={{ color: "gray" }}>
            We’ll let you know if you need to verify your identity or register with the local
            government.
          </Typography>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
            Set up your calendar
          </Typography>
          <Typography variant="body2" sx={{ color: "gray" }}>
            Choose which dates your listing is available. It will be visible 24 hours after you
            publish.
          </Typography>
        </Box>

        <Box>
          <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
            Adjust your settings
          </Typography>
          <Typography variant="body2" sx={{ color: "gray" }}>
            Set house rules, select a cancellation policy, choose how guests book and more.
          </Typography>
        </Box>
      </Box>
      </Box>
      <Modal
        open={isModalOpen}
        onClose={closeModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "90%",
            maxWidth: 800,
            bgcolor: "background.paper",
            boxShadow: 24,
            borderRadius: 2,
            p: 3,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 3,
            }}
          >
            <Typography id="modal-title" variant="h6" component="h2">
              Full preview
            </Typography>
            <IconButton onClick={closeModal}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 2 }}>
            <Box sx={{ flex: 1 }}>
              <CardMedia
                component="img"
                height="200"
                image={URL.createObjectURL(uploadedImages[0].file)}
                alt="Listing Image"
                sx={{ borderRadius: 2 }}
              />
            </Box>
            <Box sx={{ flex: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                {title}
              </Typography>
              <Typography variant="body2" sx={{ color: "gray", mb: 2 }}>
                Place to stay in a home hosted by Abdul
              </Typography>
              <Typography variant="body2" sx={{ color: "gray", mb: 2 }}>
                {`${guestCount.guests} guests · ${guestCount.bedrooms} bedroom · ${guestCount.beds} bed`}
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                {description}
              </Typography>
              <Typography variant="subtitle2" sx={{ fontWeight: "bold", mb: 1 }}>
                Location
              </Typography>
              <Typography variant="body2" sx={{ color: "gray" }}>
                {formatAddress(address)}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default ListingCard;
