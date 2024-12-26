import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import {
  Box,
  Typography,
  Paper,
  TextField,
  InputAdornment,
  IconButton,
  Alert,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
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
  const [suggestions, setSuggestions] = useState([]);
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

    if (e.target.value.length > 2) {
      fetchSuggestions(e.target.value);
    } else {
      setSuggestions([]);
    }
  };

  const fetchSuggestions = async (query) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
          query
        )}&countrycodes=pk&format=json`
      );
      const data = await response.json();
console.log(response);

      if (data.length > 0) {
        setSuggestions(data);
        setAlertShown(false);
      } else {
        setSuggestions([]);
        if (!alertShown) {
          setAlertShown(true);
          console.log("Location not found");
        }
      }
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  const handleSuggestionClick = (lat, lon, display_name) => {
    const newLat = parseFloat(lat);
    const newLon = parseFloat(lon);
    setLocalLatitude(newLat);
    setLocalLongitude(newLon);
    setContextLatitude(newLat);
    setContextLongitude(newLon);
    markerRef.current.bindPopup(display_name).openPopup();
    setSuggestions([]);
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
                  <IconButton onClick={() => fetchSuggestions(searchQuery)}>
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
          {suggestions.length>0 && (
          <List
            sx={{
              position: "absolute",
              top: "100%",
              left: 0,
              right: 0,
              backgroundColor: "white",
              boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.2)",
              maxHeight: "200px",
              overflowY: "auto",
            }}
          >
            {suggestions.map((suggestion, index) => (
              <ListItem key={index} disablePadding>
                <ListItemButton
                  onClick={() =>
                    handleSuggestionClick(
                      suggestion.lat,
                      suggestion.lon,
                      suggestion.display_name
                    )
                  }
                >
                  <ListItemText primary={suggestion.display_name} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>)}
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
