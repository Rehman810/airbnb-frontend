import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  Grid,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const Language = ({ open, toggleModal }) => {
  return (
    <Dialog
      open={open}
      onClose={toggleModal}
      fullWidth
      maxWidth="md"
      PaperProps={{
        style: {
          height: "50vh", 
          borderRadius: "10px",
        },
      }}
    >
      <DialogTitle
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6">Language and region</Typography>
        {/* Close Button */}
        <IconButton onClick={toggleModal}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        {/* Language Options */}
        <Typography variant="body1" style={{ marginBottom: "10px" }}>
          Choose a language
          <hr />
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6} sm={4}>
            <Typography variant="body2">English</Typography>
            <Typography variant="caption">United States</Typography>
          </Grid>
          <Grid item xs={6} sm={4}>
            <Typography variant="body2">Azərbaycan dili</Typography>
            <Typography variant="caption">Azerbaycan</Typography>
          </Grid>
          <Grid item xs={6} sm={4}>
            <Typography variant="body2">Bahasa Indonesia</Typography>
            <Typography variant="caption">Indonesia</Typography>
          </Grid>
          <Grid item xs={6} sm={4}>
            <Typography variant="body2">Bosanski</Typography>
            <Typography variant="caption">Bosna i Hercegovina</Typography>
          </Grid>
          <Grid item xs={6} sm={4}>
            <Typography variant="body2">Català</Typography>
            <Typography variant="caption">Espanya</Typography>
          </Grid>
          {/* Add more language options as needed */}
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default Language;
