import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  IconButton,
  Divider,
  Menu,
  MenuItem,
  Avatar,
  Button,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Search as SearchIcon, LocationOn as LocationIcon } from "@mui/icons-material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const SearchBar = () => {
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [guests, setGuests] = useState({ adults: 0, children: 0, infants: 0, pets: 0 });
  const [whereAnchorEl, setWhereAnchorEl] = useState(null);
  const [guestsAnchorEl, setGuestsAnchorEl] = useState(null);

  const openWhereMenu = (event) => setWhereAnchorEl(event.currentTarget);
  const closeWhereMenu = () => setWhereAnchorEl(null);

  const openGuestsMenu = (event) => setGuestsAnchorEl(event.currentTarget);
  const closeGuestsMenu = () => setGuestsAnchorEl(null);

  const incrementGuest = (type) => setGuests((prev) => ({ ...prev, [type]: prev[type] + 1 }));
  const decrementGuest = (type) =>
    setGuests((prev) => ({ ...prev, [type]: Math.max(0, prev[type] - 1) }));

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        padding: "16px",
      }}
    >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            borderRadius: "40px",
            border: "1px solid #ddd",
            boxShadow: "0px 1px 6px rgba(0, 0, 0, 0.1)",
            overflow: "hidden",
            backgroundColor: "white",
            width: "100%",
            maxWidth: "900px",
            height: "70px",
            position: "relative",
          }}
        >
          {/* Where */}
          <Box
            sx={{
              flex: 1,
              padding: "15px 16px",
              cursor: "pointer",
            }}
            onClick={openWhereMenu}
          >
            <Typography
              variant="body2"
              sx={{ fontWeight: "bold", fontSize: "12px" }}
            >
              Where
            </Typography>
            <TextField
              placeholder="Search destinations"
              variant="standard"
              fullWidth
              InputProps={{ disableUnderline: true }}
              sx={{ color: "gray", fontWeight: "bold" }}
            />
          </Box>

          <Menu
            anchorEl={whereAnchorEl}
            open={Boolean(whereAnchorEl)}
            onClose={closeWhereMenu}
          >
            {["Karachi", "Islamabad", "Lahore"].map((city) => (
              <MenuItem key={city} onClick={closeWhereMenu}>
                <LocationIcon sx={{ marginRight: "8px" }} />
                <Box>
                  <Typography sx={{ fontWeight: "bold" }}>{city}, Pakistan</Typography>
                  <Typography variant="body2" sx={{ color: "gray" }}>
                    For sights like Faisal Mosque
                  </Typography>
                </Box>
              </MenuItem>
            ))}
          </Menu>

          <Divider orientation="vertical" flexItem />

          {/* Check In */}
          <Box sx={{ flex: 1, padding: "15px 16px" }}>
            <Typography variant="body2" sx={{ fontWeight: "bold", fontSize: "12px" }}>
              Check in
            </Typography>
            <DatePicker
              value={checkIn}
              onChange={(newValue) => setCheckIn(newValue)}
              slotProps={{
                textField: {
                  variant: "standard",
                  InputProps: { disableUnderline: true },
                  placeholder: "Add dates",
                },
              }}
            />
          </Box>

          <Divider orientation="vertical" flexItem />

          {/* Check Out */}
          <Box sx={{ flex: 1, padding: "15px 16px" }}>
            <Typography variant="body2" sx={{ fontWeight: "bold", fontSize: "12px" }}>
              Check out
            </Typography>
            <DatePicker
              value={checkOut}
              onChange={(newValue) => setCheckOut(newValue)}
              slotProps={{
                textField: {
                  variant: "standard",
                  InputProps: { disableUnderline: true },
                  placeholder: "Add dates",
                },
              }}
            />
          </Box>

          <Divider orientation="vertical" flexItem />

          {/* Who */}
          <Box
            sx={{
              flex: 1,
              padding: "15px 16px",
              cursor: "pointer",
            }}
            onClick={openGuestsMenu}
          >
            <Typography variant="body2" sx={{ fontWeight: "bold", fontSize: "12px" }}>
              Who
            </Typography>
            <TextField
              placeholder="Add guests"
              variant="standard"
              fullWidth
              InputProps={{ disableUnderline: true }}
              sx={{ color: "gray", fontWeight: "bold" }}
              value={`${guests.adults + guests.children + guests.infants + guests.pets} Guests`}
            />
          </Box>

          <Menu
            anchorEl={guestsAnchorEl}
            open={Boolean(guestsAnchorEl)}
            onClose={closeGuestsMenu}
          >
            {[
              { label: "Adults", range: "Ages 13 or above", type: "adults" },
              { label: "Children", range: "Ages 2–12", type: "children" },
              { label: "Infants", range: "Under 2", type: "infants" },
              { label: "Pets", range: "Bringing a pet?", type: "pets" },
            ].map((guestType) => (
              <MenuItem key={guestType.type}>
                <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                  <Box>
                    <Typography sx={{ fontWeight: "bold" }}>{guestType.label}</Typography>
                    <Typography variant="body2" sx={{ color: "gray" }}>
                      {guestType.range}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <Button
                      variant="outlined"
                      onClick={() => decrementGuest(guestType.type)}
                      sx={{ minWidth: "30px", padding: "0" }}
                    >
                      -
                    </Button>
                    <Typography>{guests[guestType.type]}</Typography>
                    <Button
                      variant="outlined"
                      onClick={() => incrementGuest(guestType.type)}
                      sx={{ minWidth: "30px", padding: "0" }}
                    >
                      +
                    </Button>
                  </Box>
                </Box>
              </MenuItem>
            ))}
          </Menu>

          <Box sx={{ display: "flex", alignItems: "center", marginLeft: "8px" }}>
            <IconButton
              sx={{
                backgroundColor: "red",
                color: "white",
                "&:hover": { backgroundColor: "darkred" },
                width: 50,
                height: 50,
              }}
            >
              <SearchIcon />
            </IconButton>
          </Box>
        </Box>
      </LocalizationProvider>
    </Box>
  );
};

export default SearchBar;
