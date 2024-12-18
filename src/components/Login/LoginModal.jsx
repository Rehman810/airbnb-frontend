import React from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Divider,
  Grid,
} from "@mui/material";
import { FaGoogle, FaFacebookF } from "react-icons/fa";

const LoginModal = ({ open, onClose }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="login-modal"
      aria-describedby="responsive-login-modal"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "90%", sm: "400px" },
          bgcolor: "background.paper",
          borderRadius: "10px",
          boxShadow: 24,
          p: 3,
        }}
      >
        {/* Header */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" fontWeight="bold">
            Log in or sign up
          </Typography>
          <Button
            onClick={onClose}
            sx={{ minWidth: "auto", fontSize: "1.5rem", color: "black" }}
          >
            &times;
          </Button>
        </Box>

        {/* Welcome Message */}
        <Typography variant="h5" mt={2} mb={2} fontWeight="bold">
          Welcome to Airbnb
        </Typography>

        {/* Email Field */}
        <TextField
          fullWidth
          label="Email"
          variant="outlined"
          margin="normal"
          InputLabelProps={{ shrink: true }}
        />

        {/* Password Field */}
        <TextField
          fullWidth
          label="Password"
          variant="outlined"
          margin="normal"
          type="password"
          InputLabelProps={{ shrink: true }}
        />

        {/* Continue Button */}
        <Button
          fullWidth
          variant="contained"
          sx={{
            background: "linear-gradient(90deg, #ff385c, #d70466)",
            color: "#fff",
            fontWeight: "bold",
            mt: 2,
            mb: 2,
            "&:hover": { background: "#d70466" },
          }}
        >
          Continue
        </Button>

        {/* Divider */}
        <Divider>or</Divider>

        {/* Social Buttons */}
        <Grid container spacing={2} mt={2}>
          <Grid item xs={12}>
            <SocialButton icon={<FaGoogle />} text="Continue with Google" />
          </Grid>
          <Grid item xs={12}>
            <SocialButton
              icon={<FaFacebookF color="#1877f2" />}
              text="Continue with Facebook"
            />
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

// Social Button Component
const SocialButton = ({ icon, text }) => {
  return (
    <Button
      fullWidth
      variant="outlined"
      startIcon={icon}
      sx={{
        color: "black",
        borderColor: "#ddd",
        textTransform: "none",
        justifyContent: "center",
        fontWeight: "bold",
        padding:'10px',
        "&:hover": {
          borderColor: "#bbb",
        },
      }}
    >
      {text}
    </Button>
  );
};

export default LoginModal;
