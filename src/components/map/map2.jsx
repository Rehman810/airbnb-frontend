import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import {
  Box,
  Typography,
  Paper,
  TextField,
  InputAdornment,
  Button,
  IconButton,
  Alert,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SearchIcon from "@mui/icons-material/Search";
import { useAppContext } from "../../context/context";

const LeafletMap = ({
  initialLatitude = 24.8607, 
  initialLongitude = 67.0011,
  popupText = "Location",
}) => {
  const mapRef = useRef(null); 
  const markerRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState(""); 
  const [latitude, setLocalLatitude] = useState(initialLatitude);
  const [longitude, setLocalLongitude] = useState(initialLongitude); 
  const [alertShown, setAlertShown] = useState(false); 
  const [locationDenied, setLocationDenied] = useState(false); 
  const { setContextLatitude, setContextLongitude } = useAppContext(); 

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocalLatitude(latitude);
          setLocalLongitude(longitude);
          setContextLatitude(latitude);
          setContextLongitude(longitude);
          setLocationDenied(false);
        },
        () => {
          setLocationDenied(true);
          setLocalLatitude(initialLatitude);
          setLocalLongitude(initialLongitude);
          setContextLatitude(initialLatitude);
          setContextLongitude(initialLongitude);
        }
      );
    } else {
      setLocalLatitude(initialLatitude);
      setLocalLongitude(initialLongitude);
      setContextLatitude(initialLatitude);
      setContextLongitude(initialLongitude);
    }
  }, []);

  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = L.map("map").setView([latitude, longitude], 12);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
      }).addTo(mapRef.current);

      markerRef.current = L.marker([latitude, longitude])
        .addTo(mapRef.current)
        .bindPopup(popupText)
        .openPopup();
    } else {
      mapRef.current.setView([latitude, longitude], 12);
      markerRef.current.setLatLng([latitude, longitude]);
      markerRef.current.setPopupContent(popupText).openPopup();
    }
  }, [latitude, longitude, popupText]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = async () => {
    const query = searchQuery.trim();
    if (!query) return;

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
          query
        )}&format=json`
      );
      const data = await response.json();

      if (data.length > 0) {
        const { lat, lon, display_name } = data[0];
        const newLat = parseFloat(lat);
        const newLon = parseFloat(lon);
        setLocalLatitude(newLat);
        setLocalLongitude(newLon);
        setContextLatitude(newLat);
        setContextLongitude(newLon);
        markerRef.current.bindPopup(display_name).openPopup();
        setAlertShown(false);
      } else {
        if (!alertShown) {
          setAlertShown(true);
          console.log("Location not found");
        }
      }
    } catch (error) {
      console.error("Error fetching location:", error);
    }
  };

  return (
    <Box sx={{ p: 3, paddingTop: "100px", width: "100%" }}>
      <Typography variant="h5" fontWeight="bold" sx={{ mb: 2, textAlign: "center" }}>
        Enter your address
      </Typography>

      <Paper
        sx={{
          height: "400px",
          position: "relative",
          borderRadius: "16px",
          overflow: "hidden",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 16,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 1000,
            width: "90%",
            maxWidth: "600px",
          }}
        >
          <TextField
            fullWidth
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Enter your address"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LocationOnIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleSearch}>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
              sx: {
                backgroundColor: "white",
                borderRadius: "50px",
                boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.2)",
              },
            }}
          />
        </Box>

        {locationDenied && (
          <Alert
            severity="warning"
            sx={{
              position: "absolute",
              bottom: 50,
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 1000,
            }}
          >
            Location access denied, defaulting to Karachi.
          </Alert>
        )}

        <div
          id="map"
          style={{
            width: "100%",
            height: "400px",
            objectFit: "cover",
            borderRadius: "10px",
          }}
        ></div>
      </Paper>
    </Box>
  );
};

export default LeafletMap;
