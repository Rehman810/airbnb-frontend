import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  IconButton,
  Divider,
  Menu,
  MenuItem,
  Button,
  useMediaQuery,
} from "@mui/material";
import {
  Search as SearchIcon,
  LocationOn as LocationIcon,
} from "@mui/icons-material";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Icon1 from "../../assets/icons/icons1.png";
import Icon2 from "../../assets/icons/icons2.png";
import Icon3 from "../../assets/icons/icons3.png";
import "../../assets/styles/navbar.css";
import { useAppContext } from "../../context/context";
import { DatePicker } from "antd";
import { useTranslation } from "react-i18next";

const SearchBar = () => {
  const { t } = useTranslation();
  const { RangePicker } = DatePicker;
  const [isVisible, setIsVisible] = useState(true);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [dates, setDates] = useState(null);
  const [guests, setGuests] = useState({
    adults: 0,
    children: 0,
    infants: 0,
    pets: 0,
  });
  const [selectedDestination, setSelectedDestination] = useState("");
  const [whereAnchorEl, setWhereAnchorEl] = useState(null);
  const [guestsAnchorEl, setGuestsAnchorEl] = useState(null);
  const { searchVisible, setSearchVisible, setSearchParams } = useAppContext();
  const [isSearchDisabled, setIsSearchDisabled] = useState(true);

  const openWhereMenu = (event) => setWhereAnchorEl(event.currentTarget);
  const closeWhereMenu = () => setWhereAnchorEl(null);

  const openGuestsMenu = (event) => setGuestsAnchorEl(event.currentTarget);
  const closeGuestsMenu = () => setGuestsAnchorEl(null);

  const incrementGuest = (type) =>
    setGuests((prev) => ({ ...prev, [type]: prev[type] + 1 }));
  const decrementGuest = (type) =>
    setGuests((prev) => ({ ...prev, [type]: Math.max(0, prev[type] - 1) }));

  const isMobile = useMediaQuery("(max-width:600px)");

  const {karachi, islamabad, lahore} = t("cities");

  useEffect(() => {
    const isFormComplete =
      selectedDestination && dates && guests.adults + guests.children > 0;

    setIsSearchDisabled(!isFormComplete);
  }, [selectedDestination, dates, guests]);

  const cities = [
    {
      name: karachi.name,
      text: karachi.text,
      icon: Icon1,
    },
    {
      name: islamabad.name,
      text: islamabad.text,
      icon: Icon2,
    },
    {
      name: lahore.name,
      text: lahore.text,
      icon: Icon3,
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      if (currentScrollPos === 0) {
        setIsVisible(true);
      } else if (currentScrollPos > scrollPosition) {
        setSearchParams(null);
        setSearchVisible(false);
        setIsVisible(false);
      }
      setScrollPosition(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollPosition]);

  const handleSearch = () => {
    const [startDate, endDate] = dates;
    const searchParams = {
      destination: selectedDestination,
      checkIn: startDate.format("YYYY-MM-DD"),
      checkOut: endDate.format("YYYY-MM-DD"),
      guests: guests.adults + guests.children + guests.infants,
    };
    setSearchParams(searchParams);
  };

  const disableDates = (current) => {
    const today = new Date();
    return current && current < today.setHours(0, 0, 0, 0);
  };

  return (
    <Box
      className={`${
        searchVisible
          ? !isVisible
          : isVisible
          ? "search-visible"
          : "search-hidden"
      }`}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        paddingBottom: "20px",
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
            height: "60px",
            position: "relative",
            padding: "5px 20px",
          }}
        >
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
              {t("where")}
            </Typography>
            <TextField
              placeholder={t("destination")}
              variant="standard"
              fullWidth
              InputProps={{ disableUnderline: true }}
              sx={{ color: "gray", fontWeight: "bold" }}
              value={selectedDestination}
              readOnly
            />
          </Box>

          <Menu
            anchorEl={whereAnchorEl}
            open={Boolean(whereAnchorEl)}
            onClose={closeWhereMenu}
          >
            {cities.map((city) => (
              <MenuItem
                key={city}
                onClick={() => {
                  setSelectedDestination(`${city.name}, ${t("country")}`);
                  closeWhereMenu();
                }}
              >
                <img
                  src={city.icon}
                  alt={city.name}
                  width={50}
                  style={{ paddingRight: "20px" }}
                />
                <Box>
                  <Typography sx={{ fontWeight: "bold" }}>
                    {city.name}, {t("country")}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "gray" }}>
                    {city.text}
                  </Typography>
                </Box>
              </MenuItem>
            ))}
          </Menu>

          {!isMobile && (
            <>
              <Divider orientation="vertical" flexItem />

              <Box sx={{ flex: 2, padding: "15px 16px" }}>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: "bold", fontSize: "12px" }}
                >
                  {t("addDates")}
                </Typography>
                <RangePicker
                  onChange={(dates) => setDates(dates)}
                  placeholder={[t("checkIn"), t("checkOut")]}
                  disabledDate={disableDates}
                  style={{
                    width: "100%",
                    border: "none",
                    boxShadow: "none",
                  }}
                />
              </Box>

              <Divider orientation="vertical" flexItem />

              <Box
                sx={{
                  flex: 1,
                  padding: "15px 16px",
                  cursor: "pointer",
                }}
                onClick={openGuestsMenu}
              >
                <Typography
                  variant="body2"
                  sx={{ fontWeight: "bold", fontSize: "12px" }}
                >
                  {t("who")}
                </Typography>
                <TextField
                  placeholder={t("addGuests")}
                  variant="standard"
                  fullWidth
                  InputProps={{ disableUnderline: true }}
                  sx={{ color: "gray", fontWeight: "bold" }}
                  value={[
                    guests.adults ? `${guests.adults} ${t("adults")}` : "",
                    guests.children ? `${guests.children} ${t("children")}` : "",
                    guests.infants ? `${guests.infants} ${t("infants")}` : "",
                    guests.pets ? `${guests.pets} ${t("pets")}` : "",
                  ]
                    .filter(Boolean)
                    .join(", ")}
                  readOnly
                />
              </Box>

              <Menu
                anchorEl={guestsAnchorEl}
                open={Boolean(guestsAnchorEl)}
                onClose={closeGuestsMenu}
              >
                {[
                  { label: t("adults"), type: "adults" },
                  { label: t("children"), type: "children" },
                  { label: t("infants"), type: "infants" },
                  { label: t("pets"), type: "pets" },
                ].map((guest) => (
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
                        <Button onClick={() => decrementGuest(guest.type)}>
                          -
                        </Button>
                        <Typography>{guests[guest.type]}</Typography>
                        <Button onClick={() => incrementGuest(guest.type)}>
                          +
                        </Button>
                      </Box>
                    </Box>
                  </MenuItem>
                ))}
              </Menu>
            </>
          )}

          <Box sx={{ marginLeft: "8px" }}>
            <IconButton
              sx={{
                backgroundColor: "#FF385C",
                color: "white",
                "&:hover": { backgroundColor: "#FF385E" },
                width: 50,
                height: 50,
              }}
              onClick={handleSearch}
              disabled={isSearchDisabled}
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
