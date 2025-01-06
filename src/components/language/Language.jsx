import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  Grid,
  IconButton,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useTranslation } from "react-i18next";
import { useAppContext } from "../../context/context";

const Language = ({ open, toggleModal }) => {
  const { i18n } = useTranslation();
  const { setLanguage } = useAppContext();

  const languages = [
    { code: "en", lang: "English" },
    { code: "zh", lang: "Chinese" },
  ];

  const otherLanguages = [
    { code: "tr", lang: "Turkish" },
    { code: "ar", lang: "Arabic" },
    { code: "ur", lang: "Urdu" },
    { code: "fr", lang: "French" },
    { code: "de", lang: "German" },
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
        <Typography variant="h5" fontWeight={"bold"}>Language and region</Typography>
        {/* Close Button */}
        <IconButton onClick={toggleModal}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        {/* Language Options */}
        <Typography variant="body1" style={{ marginBottom: "10px" }}>
          Choose a language
          <Divider style={{ margin: "20px 0" }}/>
        </Typography>
        <Grid container spacing={2}>
          {/* First, display English and Chinese */}
          {languages.map((lng) => (
            <Grid item xs={6} sm={4} key={lng.code}>
              <Typography
                variant="body2"
                style={{
                  cursor: "pointer",
                  fontWeight: i18n.language === lng.code ? "bold" : "normal",
                  border: i18n.language === lng.code ? "1px solid black" : "none",
                  padding: "4px",
                  borderRadius: "10px",
                  textAlign: "center",
                  width: "50%"
                }}
                onClick={() => {
                  setLanguage(lng);
                  changeLanguage(lng.code);
                }}
              >
                {lng.lang}
              </Typography>
            </Grid>
          ))}
        </Grid>
        <Divider style={{ margin: "20px 0" }} />
        <Grid container spacing={2}>
          {/* Other languages */}
          {otherLanguages.map((lng) => (
            <Grid item xs={6} sm={4} key={lng.code}>
              <Typography
                variant="body2"
                style={{
                  cursor: "pointer",
                  fontWeight: i18n.language === lng.code ? "bold" : "normal",
                  border: i18n.language === lng.code ? "1px solid black" : "none",
                  padding: "4px",
                  borderRadius: "10px",
                  textAlign: "center",
                  width: "50%"
                }}
                onClick={() => {
                  setLanguage(lng);
                  changeLanguage(lng.code);
                }}
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
