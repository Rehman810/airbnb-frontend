import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Switch,
  FormControlLabel,
  Paper,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useAppContext } from "../../context/context";
import LeafletMap from "../map/map";

const AddressForm = () => {
  const [showLocation, setShowLocation] = useState(true);
  const [country, setCountry] = useState("Pakistan - PK");
  const { setAddress, contextLatitude, contextLongitude } = useAppContext();
  const [selectedCity, setSelectedCity] = useState("Karachi");

  const cities = [
    { name: "Karachi", label: "Karachi" },
    { name: "Islamabad", label: "Islamabad" },
    { name: "Lahore", label: "Lahore" },
  ];

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
    handleFieldChange("city", event.target.value)
  };

  const [addressData, setAddressData] = React.useState({
    country: "Pakistan - PK",
    streetAddress: "",
    flat: "",
    city: "Karachi",
    area: "Sindh",
    postcode: "",
  });

  const handleFieldChange = (field, value) => {
    const updatedData = { ...addressData, [field]: value };
    setAddressData(updatedData);
    setAddress(updatedData);
  };

  return (
    <Box sx={{ p: 4, maxWidth: 600, margin: "auto" }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Confirm your address
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Your address is only shared with guests after they've made a
        reservation.
      </Typography>

      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <TextField
          select
          label="Country/region"
          value={country}
          onChange={(e) => handleFieldChange("country", e.target.value)}
          variant="outlined"
        >
          <MenuItem value="Pakistan - PK">Pakistan - PK</MenuItem>
          {/* <MenuItem value="India - IN">India - IN</MenuItem>
          <MenuItem value="USA - US">USA - US</MenuItem> */}
        </TextField>
        <TextField
          label="Street address"
          variant="outlined"
          onChange={(e) => handleFieldChange("streetAddress", e.target.value)}
        />
        <TextField
          label="Flat, floor, bldg (if applicable)"
          variant="outlined"
          onChange={(e) => handleFieldChange("flat", e.target.value)}
        />
        {/* <TextField
          label="City/town/village"
          defaultValue="Karachi"
          variant="outlined"
          onChange={(e) => handleFieldChange("city", e.target.value)}
        /> */}

        <FormControl fullWidth variant="outlined">
          <InputLabel>City</InputLabel>
          <Select
            value={selectedCity}
            onChange={handleCityChange}
            label="City/town/village"
          >
            {cities.map((city) => (
              <MenuItem key={city.name} value={city.name}>
                {city.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          label="Town / county / area (if applicable)"
          defaultValue="Sindh"
          variant="outlined"
          onChange={(e) => handleFieldChange("area", e.target.value)}
        />
        <TextField
          label="Postcode (if applicable)"
          variant="outlined"
          onChange={(e) => handleFieldChange("postcode", e.target.value)}
        />
      </Box>

      <FormControlLabel
        control={
          <Switch
            checked={showLocation}
            onChange={() => setShowLocation(!showLocation)}
          />
        }
        label={
          <Typography variant="body2" fontWeight="bold">
            Show your specific location
          </Typography>
        }
        sx={{ mt: 3 }}
      />
      <Typography variant="body2" color="text.secondary">
        Make it clear to guests where your place is located. We'll only share
        your address after they've made a reservation.
        <Typography component="span" color="primary" sx={{ cursor: "pointer" }}>
          {" "}
          Learn more
        </Typography>
      </Typography>

      <LeafletMap
        steps={true}
        latitude={contextLatitude}
        longitude={contextLongitude}
        // popupText="Karachi, Pakistan"
      />
    </Box>
  );
};

export default AddressForm;
