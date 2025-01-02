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
import { useTranslation } from "react-i18next";

const Language = ({ open, toggleModal }) => {
  const { i18n } = useTranslation();

  const languages = [
    { code: "en", lang: "English" },
    { code: "zh", lang: "Chinese" },
  ];

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

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
          {languages.map((lng) => (
            <Grid item xs={6} sm={4} key={lng.code}>
              <Typography
                variant="body2"
                style={{
                  cursor: "pointer",
                  fontWeight: i18n.language === lng.code ? "bold" : "normal",
                }}
                onClick={() => changeLanguage(lng.code)}
              >
                {lng.lang}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default Language;
