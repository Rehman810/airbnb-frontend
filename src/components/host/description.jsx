import React, { useEffect, useState } from "react";
import { Box, Typography, TextField } from "@mui/material";
import { useAppContext } from "../../context/context";

const DescriptionInput = ({ max, heading, para, placholder, isTitle }) => {
  const [description, setDescriptions] = useState("");
  const maxCharacters = max;
  const { setDescription, setTitle } = useAppContext();

  useEffect(() => {
    setDescriptions(placholder);
    isTitle ? setTitle(placholder) : setDescription(placholder);
  }, [placholder]);

  const handleChange = (e) => {
    if (e.target.value.length <= maxCharacters) {
      setDescriptions(e.target.value);
      isTitle ? setTitle(e.target.value) : setDescription(e.target.value);
    }
  };

  return (
    <Box sx={{ width: "600px", margin: "auto", p: 3 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        {heading}
      </Typography>
      <Typography variant="body1" sx={{ mb: 2, color: "#757575" }}>
        {para}
      </Typography>

      <TextField
        multiline
        rows={5}
        fullWidth
        variant="outlined"
        // placeholder={placholder}
        value={description}
        onChange={handleChange}
        inputProps={{ maxLength: maxCharacters }}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "8px",
          },
        }}
      />

      <Typography
        variant="body2"
        sx={{ textAlign: "right", mt: 1, color: "#757575" }}
      >
        {description.length}/{maxCharacters}
      </Typography>
    </Box>
  );
};

export default DescriptionInput;
