import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Divider,
  useMediaQuery,
} from "@mui/material";
import {
  Search as SearchIcon,
  LocationOn as LocationIcon,
} from "@mui/icons-material";
import { useAppContext } from "../../context/context";

const SearchBar2 = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [scrollPosition, setScrollPosition] = useState(0);
  const { setSearchVisible } = useAppContext();
  const isMobile = useMediaQuery("(max-width:900px)");

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      if (currentScrollPos === 0) {
        setIsVisible(true);
      } else if (currentScrollPos > scrollPosition) {
        setIsVisible(false);
      }
      setScrollPosition(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollPosition]);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
    setSearchVisible(true)
  };

  return (
    <Box
    onClick={toggleVisibility}
      className={`${!isVisible ? "search-visible" : "search-hidden"}`}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "105%",
        paddingBottom: "20px",
        marginTop: "10px",
        marginLeft: "100px",
      }}
    >
      {!isMobile && (
        <>
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
              height: "40px",
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
            >
              <Typography
                variant="body2"
                sx={{ fontWeight: "bold", fontSize: "12px" }}
              >
                Anywhere
              </Typography>
            </Box>

            <Divider orientation="vertical" flexItem />

            <Box sx={{ flex: 1, padding: "15px 16px" }}>
              <Typography
                variant="body2"
                sx={{ fontWeight: "bold", fontSize: "12px" }}
              >
                Any week
              </Typography>
            </Box>

            <Divider orientation="vertical" flexItem />

            <Box
              sx={{
                flex: 1,
                padding: "15px 16px",
                cursor: "pointer",
              }}
            >
              <Typography
                variant="body2"
                sx={{ fontWeight: "bold", fontSize: "12px" }}
              >
                Add guests
              </Typography>
            </Box>

            <Box sx={{ marginLeft: "8px" }}>
              <IconButton
                sx={{
                  backgroundColor: "#FF385C",
                  color: "white",
                  "&:hover": { backgroundColor: "#FF385E" },
                  width: 30,
                  height: 30,
                }}
              >
                <SearchIcon />
              </IconButton>
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
};

export default SearchBar2;
