import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  IconButton,
  InputAdornment,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useAppContext } from "../../context/context";

const PriceSection = ({pricing, heading, para, isWeekDay}) => {
  const [price, setPrice] = useState(20); 
  const [isEditable, setIsEditable] = useState(false);
  const { setWeekEndPrice, setWeekDayPrice } = useAppContext();

  useEffect(() => {
    setPrice(pricing); 
    isWeekDay ? setWeekDayPrice(pricing) : setWeekEndPrice(pricing)    
  }, [pricing]);

  const handlePriceChange = (event) => {
    const value = parseFloat(event.target.value) || 0;
    setPrice(value);    
    isWeekDay ? setWeekDayPrice(value) : setWeekEndPrice(value)    
  };

  const toggleEditable = () => {
    setIsEditable(!isEditable);
  };

  return (
    <Box
      sx={{
        textAlign: "center",
        p: 3,
        borderRadius: 2,
        margin: "auto",
      }}
    >
      <Typography variant="h4" fontWeight="bold" textAlign="left" sx={{ mb: 1 }}>
        {heading}
      </Typography>
      <Typography variant="body1" fontWeight="bold"  textAlign="left"sx={{ color: "gray", mb: 3 }}>
        {para}
      </Typography>

      <Box sx={{ position: "relative", mb: 2 }}>
        {isEditable ? (
          <TextField
            variant="standard"
            size="large"
            value={price}
            onChange={handlePriceChange}
            type="number"
            sx={{
              "& .MuiInputBase-root": {
                fontSize: "3rem",
                textAlign: "center",
              },
              "& .MuiInputBase-input": {
                paddingLeft: "0.5rem",
              },
            }}
            InputProps={{
              startAdornment: <InputAdornment position="start">$</InputAdornment>,
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={toggleEditable}>
                    <EditIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        ) : (
          <Typography
            variant="h1"
            onClick={toggleEditable}
            sx={{ cursor: "pointer", display: "inline-flex", alignItems: "center", fontWeight: "bold" }}
          >
            ${price}
            <IconButton sx={{ ml: 1 }} onClick={toggleEditable}>
              <EditIcon />
            </IconButton>
          </Typography>
        )}
      </Box>

      <Typography variant="body2" sx={{ color: "gray", mt: 1 }}>
        Guest price before taxes ${((price * 1.11).toFixed(2))}
      </Typography>
    </Box>
  );
};

export default PriceSection;
