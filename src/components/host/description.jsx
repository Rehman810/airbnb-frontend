import React, { useEffect, useState } from "react";
import { Box, Typography, TextField } from "@mui/material";

const DescriptionInput = ({ max, heading, para, placholder}) => {    
  const [description, setDescription] = useState("");
  const maxCharacters = max;

  useEffect(() => {
    setDescription(placholder); 
    }, [placholder]);

  const handleChange = (e) => {
    if (e.target.value.length <= maxCharacters) {
      setDescription(e.target.value);
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

      <Typography variant="body2" sx={{ textAlign: "right", mt: 1, color: "#757575" }}>
        {description.length}/{maxCharacters}
      </Typography>
    </Box>
  );
};

export default DescriptionInput;
