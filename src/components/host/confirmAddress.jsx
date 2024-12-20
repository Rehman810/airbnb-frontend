import React from "react";
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Switch,
  FormControlLabel,
  Paper,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useAppContext } from "../../context/context";

const AddressForm = () => {
  const [showLocation, setShowLocation] = React.useState(true);
  const [country, setCountry] = React.useState("Pakistan - PK");
  const { setAddress } = useAppContext();

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
          <MenuItem value="India - IN">India - IN</MenuItem>
          <MenuItem value="USA - US">USA - US</MenuItem>
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
        <TextField
          label="City/town/village"
          defaultValue="Karachi"
          variant="outlined"
          onChange={(e) => handleFieldChange("city", e.target.value)}
        />
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

      {showLocation && (
        <Paper
          sx={{
            height: 300,
            mt: 3,
            borderRadius: 3,
            overflow: "hidden",
            position: "relative",
          }}
        >
          <Box
            component="img"
            src="https://maps.googleapis.com/maps/api/staticmap?center=Karachi,Sindh&zoom=15&size=600x300&markers=color:red%7Clabel:H%7CKarachi,Sindh&key=YOUR_API_KEY"
            alt="Map"
            sx={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "primary.main",
              color: "#fff",
              borderRadius: "50%",
              p: 1.5,
            }}
          >
            <LocationOnIcon fontSize="large" />
          </Box>
        </Paper>
      )}
    </Box>
  );
};

export default AddressForm;
