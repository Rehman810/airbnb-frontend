import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, Divider, IconButton } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { useAppContext } from "../../context/context";

const CounterRow = ({ label, value, onDecrement, onIncrement }) => (
  <Grid
    container
    alignItems="center"
    justifyContent="space-between"
    sx={{ py: 2 }}
  >
    <Grid item>
      <Typography variant="body1" fontWeight="bold">
        {label}
      </Typography>
    </Grid>
    <Grid item>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 3,
        }}
      >
        <IconButton
          onClick={onDecrement}
          disabled={value <= 1}
          sx={{
            backgroundColor: "#f1f1f1",
            "&:hover": { backgroundColor: "#e0e0e0" },
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
            width: "48px",
            height: "48px",
          }}
        >
          <RemoveIcon fontSize="medium" />
        </IconButton>

        <Typography variant="h5" sx={{ minWidth: "30px", textAlign: "center" }}>
          {value}
        </Typography>

        <IconButton
          onClick={onIncrement}
          sx={{
            backgroundColor: "#f1f1f1",
            "&:hover": { backgroundColor: "#e0e0e0" },
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
            width: "48px",
            height: "48px",
          }}
        >
          <AddIcon fontSize="medium" />
        </IconButton>
      </Box>
    </Grid>
  </Grid>
);

const GuestCounter = () => {
  const [guests, setGuests] = useState(4);
  const [bedrooms, setBedrooms] = useState(1);
  const [beds, setBeds] = useState(1);
  const { setGuestCount } = useAppContext();

  useEffect(() => {
    setGuestCount({ guests, bedrooms, beds });
  }, [guests, bedrooms, beds, setGuestCount]);

  return (
    <Box sx={{ p: 4, width: "600px", margin: "auto", backgroundColor: "#fff" }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Let&apos;s start with the basics
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        How many people can stay here?
      </Typography>

      <Divider />
      <CounterRow
        label="Guests"
        value={guests}
        onDecrement={() => setGuests((prev) => Math.max(1, prev - 1))}
        onIncrement={() => setGuests((prev) => prev + 1)}
      />
      <Divider />
      <CounterRow
        label="Bedrooms"
        value={bedrooms}
        onDecrement={() => setBedrooms((prev) => Math.max(1, prev - 1))}
        onIncrement={() => setBedrooms((prev) => prev + 1)}
      />
      <Divider />
      <CounterRow
        label="Beds"
        value={beds}
        onDecrement={() => setBeds((prev) => Math.max(1, prev - 1))}
        onIncrement={() => setBeds((prev) => prev + 1)}
      />
      <Divider />
    </Box>
  );
};

export default GuestCounter;
