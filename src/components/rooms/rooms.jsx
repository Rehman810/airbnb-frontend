import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Button,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Avatar,
  MenuItem,
  TextField,
  Menu,
  Skeleton,
  Dialog,
  DialogContent,
  IconButton,
} from "@mui/material";
import { DatePicker, Select } from "antd";
import "antd/dist/reset.css";
import LeafletMap from "../map/map";
import HostSection from "../hostSection/hostSection";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchDataById,
  postDataById,
} from "../../config/ServiceApi/serviceApi";
import dayjs from "dayjs";
import Swal from "sweetalert2";
import Amenities from "../amenities/amenities";
import useDocumentTitle from "../../hooks/dynamicTitle/dynamicTitle";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useBookingContext } from "../../context/booking";
import ShareIcon from "@mui/icons-material/Share";
import toast from "react-hot-toast";

const { RangePicker } = DatePicker;

const RoomPage = () => {
  const [place, setPlace] = useState({});
  const [host, setHost] = useState({});
  const [dates, setDates] = useState(null);
  const [maxGuests, setMaxGuests] = useState(1);
  const [bookedDates, setBookedDates] = useState([]);
  const [weekDayPrice, setWeekdayPrice] = useState(0);
  const [weekendDayPrice, setWeekenddayPrice] = useState(0);
  const serviceFeePercentage = 13;
  const [totalPrice, setTotalPrice] = useState(0);
  const [numofDays, setNumofDays] = useState(0);
  const [guestsAnchorEl, setGuestsAnchorEl] = useState(null);
  const openGuestsMenu = (event) => setGuestsAnchorEl(event.currentTarget);
  const closeGuestsMenu = () => setGuestsAnchorEl(null);
  const [guests, setGuests] = useState({
    adults: 0,
  });
  const [loadingImages, setLoadingImages] = useState(true);
  const [loadingText, setLoadingText] = useState(true);
  const [openImageModal, setOpenImageModal] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { setBookingData, setBookListing } = useBookingContext();
  const { roomId } = useParams();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleOpenModal = () => {
    setCurrentImageIndex(0);
    setOpenImageModal(true);
  };

  const handleCloseModal = () => {
    setOpenImageModal(false);
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex + 1 < place.photos.length ? prevIndex + 1 : 0
    );
  };

  const handlePreviousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex - 1 >= 0 ? prevIndex - 1 : place.photos.length - 1
    );
  };

  const toPascalCase = (str) => {
    return str
      ?.split(" ")
      ?.map(
        (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      )
      ?.join(" ");
  };

  const incrementGuest = (type) => {
    if (guests[type] < maxGuests) {
      setGuests((prev) => ({ ...prev, [type]: prev[type] + 1 }));
    }
  };

  useDocumentTitle(place.title ? toPascalCase(place.title) : "Airbnb");

  const decrementGuest = (type) => {
    if (guests[type] > 0) {
      setGuests((prev) => ({ ...prev, [type]: Math.max(0, prev[type] - 1) }));
    }
  };

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await fetchDataById("listing", token, roomId);
        console.log(response);

        if (response && response.listing) {
          setPlace(response.listing);
          setHost(response.hostData);
          setMaxGuests(response.listing.guestCapacity);
          setBookedDates(
            response.listing.bookings.map((booking) => ({
              startDate: dayjs(booking.startDate),
              endDate: dayjs(booking.endDate),
            }))
          );
          setWeekdayPrice(response.listing.weekdayPrice);
          setWeekenddayPrice(response.listing.weekendPrice);
          setLoadingText(false);
          console.log(response.listing);
        } else {
          console.error("Unexpected response format:", response);
        }
      } catch (error) {
        console.error("Failed to fetch options:", error);
      }
    };
    fetchOptions();
  }, [roomId, token]);

  const handleDateChange = (value) => {
    setDates(value);
    if (value && value.length === 2) {
      const startDate = value[0];
      const endDate = value[1];
      let total = 0;

      const numOfDays = endDate.diff(startDate, "days");
      setNumofDays(numOfDays);

      for (
        let date = startDate;
        date.isBefore(endDate, "day");
        date = date.add(1, "day")
      ) {
        if (date.day() === 0 || date.day() === 6) {
          total += weekendDayPrice;
        } else {
          total += weekDayPrice;
        }
      }

      setTotalPrice(total);
    }
  };

  const handleReserve = async () => {
    if (!dates || dates.length < 2) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please select a check-in and check-out date.",
      });
      return;
    }

    const [startDate, endDate] = dates;
    const data = {
      startDate: startDate.format("YYYY-MM-DD"),
      endDate: endDate.format("YYYY-MM-DD"),
      guestCapacity: guests.adults,
      priceForHouse: totalPrice,
      serviceFee: ((totalPrice * serviceFeePercentage) / 100).toFixed(2),
      nights: numofDays,
      total: (totalPrice + (totalPrice * serviceFeePercentage) / 100).toFixed(
        2
      ),
    };

    setBookListing(place);
    setBookingData(data);
    navigate(`/requestToBook/${place._id}`);
  };

  const disabledDate = (current) => {
    if (!current || !bookedDates || bookedDates.length === 0) {
      return false;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const isBooked = bookedDates.some(({ startDate, endDate }) => {
      return current.isBetween(startDate, endDate, "day", "[]");
    });

    return isBooked || current < today;
  };

  const formatAddress = (address) => {
    if (!address) return "";

    const formatted = [
      // address?.flat,
      address?.city,
      // address?.postcode,
      // address?.country,
    ]
      .filter((field) => field)
      .join(", ");

    return formatted + ", Pakistan" || "Address not available";
  };

  const handleImageLoad = () => {
    setLoadingImages(false);
  };

  const handleShareClick = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      toast.success("URL copied to clipboard!");  
      showSuccessToast("URL copied to clipboard!")
    }).catch((error) => {
      console.error("Error copying URL:", error);
      showErrorToast(error.message)
    });
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {loadingText ? (
          <Skeleton variant="text" width="60%" height={40} animation="wave" />
        ) : (
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            {toPascalCase(place.title)}
          </Typography>
        )}

        <IconButton
          onClick={handleShareClick}
          sx={{
            ml: 2,
            backgroundColor: "transparent",
            "&:hover": {
              backgroundColor: "transparent",
            },
          }}
        >
          <ShareIcon />
          <Typography variant="body1" sx={{ ml: 1 }}>
            Share
          </Typography>
        </IconButton>
      </Box>

      <Grid
        container
        spacing={2}
        onClick={handleOpenModal}
        style={{ cursor: "pointer" }}
      >
        <Grid item xs={12} md={6}>
          {loadingImages && (
            <Skeleton
              variant="rectangular"
              width="100%"
              height={500}
              animation="wave"
            />
          )}
          <CardMedia
            component="img"
            height="500"
            image={place?.photos?.[0]}
            alt="Main Image"
            sx={{ borderRadius: 2 }}
            onLoad={handleImageLoad}
            onError={(e) => (e.target.src = "/fallback-image.jpg")}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Grid container spacing={2}>
            {place?.photos?.slice(1, 5).map((photo, index) => (
              <Grid item xs={6} key={index}>
                {loadingImages ? (
                  <Skeleton
                    variant="rectangular"
                    width="100%"
                    height={240}
                    animation="wave"
                  />
                ) : (
                  <CardMedia
                    component="img"
                    height="240"
                    image={photo}
                    alt={`Small Image ${index + 1}`}
                    sx={{ borderRadius: 2 }}
                    onError={(e) => (e.target.src = "/fallback-image.jpg")}
                  />
                )}
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>

      <Dialog
        fullScreen
        open={openImageModal}
        onClose={handleCloseModal}
        sx={{ textAlign: "center" }}
      >
        <DialogContent
          sx={{
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Black with 80% opacity
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
          }}
        >
          <IconButton
            sx={{
              position: "absolute",
              top: 16,
              right: 16,
              color: "white",
            }}
            onClick={handleCloseModal}
          >
            <CloseIcon />
          </IconButton>

          <IconButton
            sx={{
              position: "absolute",
              top: "50%",
              left: 16,
              color: "white",
              transform: "translateY(-50%)",
            }}
            onClick={handlePreviousImage}
          >
            <ArrowBackIcon />
          </IconButton>

          <IconButton
            sx={{
              position: "absolute",
              top: "50%",
              right: 16,
              color: "white",
              transform: "translateY(-50%)",
            }}
            onClick={handleNextImage}
          >
            <ArrowForwardIcon />
          </IconButton>

          <img
            src={place?.photos?.[currentImageIndex] || "/fallback-image.jpg"}
            alt={`Image ${currentImageIndex + 1}`}
            style={{
              // maxWidth: "90%",
              // maxHeight: "90%",
              borderRadius: "8px",
              width: "70%",
            }}
          />
        </DialogContent>
      </Dialog>

      <Grid container spacing={2} sx={{ mt: 3 }}>
        <Grid item xs={12} md={8}>
          <Typography variant="h5" fontWeight={"bold"} gutterBottom>
            {place.roomType} in {formatAddress(place)}
          </Typography>
          <Typography variant="body2" gutterBottom>
            <strong>{place.guestCapacity} guest</strong> |{" "}
            <strong>{place.guestCapacity} beds</strong> |{" "}
            <strong>{place.bedrooms} bedrooms</strong>
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Typography variant="body1" gutterBottom>
            {place.description}
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Typography variant="h6" gutterBottom>
            Amenities
          </Typography>
          {/* <Amenities backendAmenities={place.amenities}/> */}
          <Divider sx={{ my: 2 }} />
          <Typography variant="h6" sx={{ mt: 2 }}>
            Guest Reviews
          </Typography>
          <Box sx={{ mt: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Avatar sx={{ mr: 2 }}>C</Avatar>
              <Typography>
                <strong>Charlotte:</strong> Amazing stay! Everything was
                perfect.
              </Typography>
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card
            sx={{
              position: { md: "sticky" },
              top: { md: 150 },
              borderRadius: 2,
              boxShadow: 2,
            }}
          >
            <CardContent sx={{ padding: 3 }}>
              <Typography
                variant="h5"
                fontWeight="bold"
                sx={{ color: "primary.main", mb: 2 }}
              >
                €{weekDayPrice} / night
              </Typography>

              <RangePicker
                style={{ width: "100%", marginBottom: 16 }}
                placeholder={["Check-in", "Check-out"]}
                onChange={handleDateChange}
                disabledDate={disabledDate}
                format="DD MMM, YYYY"
              />

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  cursor: "pointer",
                  mb: 2,
                }}
                onClick={openGuestsMenu}
              >
                <Typography
                  variant="body2"
                  sx={{ fontWeight: "bold", color: "text.primary" }}
                >
                  Guests
                </Typography>
                &nbsp;
                <TextField
                  placeholder="How many guests"
                  variant="standard"
                  fullWidth
                  InputProps={{ disableUnderline: true }}
                  sx={{
                    color: "text.secondary",
                    fontWeight: "bold",
                    textAlign: "right",
                  }}
                  value={
                    guests.adults ? `${guests.adults} Guests` : "Select guests"
                  }
                  readOnly
                />
              </Box>

              <Menu
                anchorEl={guestsAnchorEl}
                open={Boolean(guestsAnchorEl)}
                onClose={closeGuestsMenu}
                sx={{ width: 200 }}
              >
                {[{ label: "Adults", type: "adults" }].map((guest) => (
                  <MenuItem key={guest.type}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%",
                      }}
                    >
                      <Typography>{guest.label}</Typography>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                        }}
                      >
                        <Button
                          onClick={() => decrementGuest(guest.type)}
                          disabled={guests[guest.type] === 0}
                          sx={{ minWidth: 32 }}
                        >
                          -
                        </Button>
                        <Typography variant="body2">
                          {guests[guest.type]}
                        </Typography>
                        <Button
                          onClick={() => incrementGuest(guest.type)}
                          disabled={guests[guest.type] === maxGuests}
                          sx={{ minWidth: 32 }}
                        >
                          +
                        </Button>
                      </Box>
                    </Box>
                  </MenuItem>
                ))}
              </Menu>

              <Typography variant="body2" sx={{ mt: 2 }}>
                <strong>Weekday Price:</strong> €{weekDayPrice} / night
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                <strong>Weekend Price:</strong> €{weekendDayPrice} / night
              </Typography>
              <Typography variant="body1" sx={{ mt: 2 }}>
                <strong>Total for {numofDays} nights:</strong> €
                {totalPrice.toFixed(2)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Service Fee:</strong> €
                {((totalPrice * serviceFeePercentage) / 100).toFixed(2)}
              </Typography>

              <Divider sx={{ my: 2 }} />

              <Typography variant="body2" color="text.secondary">
                <strong>Total:</strong> €
                {(
                  totalPrice +
                  (totalPrice * serviceFeePercentage) / 100
                ).toFixed(2)}
              </Typography>

              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{
                  mt: 3,
                  padding: "14px",
                  fontWeight: "bold",
                  letterSpacing: 1,
                  textTransform: "uppercase",
                  "&:hover": {
                    backgroundColor: "primary.dark",
                  },
                }}
                onClick={handleReserve}
              >
                Reserve Now
              </Button>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 2, textAlign: "center" }}
              >
                You won’t be charged yet.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h6">Location</Typography>
        <LeafletMap
          latitude={place.latitude ? place.latitude : 24.8607}
          longitude={place.longitude ? place.longitude : 67.0011}
          // popupText="Karachi, Pakistan"
        />
      </Box>

      <Box sx={{ mt: 4 }}>
        <Divider sx={{ mb: 2 }} />
        <HostSection data={host} listing={place} />
      </Box>
    </Box>
  );
};

export default RoomPage;
