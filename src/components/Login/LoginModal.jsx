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
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { loginUser } from "../../config/ServiceApi/serviceApi";
import { useNavigate } from "react-router-dom";

const LoginModal = ({ open, onClose, signUp, isSignUp }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {    
    try {
      const res = await (signUp
        ? loginUser("signup", {
            userName: data.userName,
            email: data.email,
            password: data.password,
          })
        : loginUser("login", { email: data.email, password: data.password }));
      if (res) {                
        localStorage.setItem("token", res.token);
        localStorage.setItem("user", JSON.stringify(res.user));
        Swal.fire({
          icon: "success",
          title: "Login Successful",
          text: `Welcome ${res.user.userName}!`,
        });
        onClose();
        // setTimeout(() => {
        //   navigate("/");
        // }, 500);
      }
    } catch (error) {
      onClose();
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: "Invalid credentials. Please try again.",
      });
      console.error("Login Error:", error);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="login-modal"
      aria-describedby="responsive-login-modal"
    >
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
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

        <Typography variant="h5" mt={2} mb={2} fontWeight="bold">
          Welcome to Airbnb
        </Typography>

        {signUp && (
          <TextField
            fullWidth
            label="Name"
            variant="outlined"
            margin="normal"
            {...register("userName", { required: "Name is required" })}
            error={!!errors.userName}
            helperText={errors.userName?.message}
          />
        )}

        <TextField
          fullWidth
          label="Email"
          variant="outlined"
          margin="normal"
          {...register("email", { required: "Email is required" })}
          error={!!errors.email}
          helperText={errors.email?.message}
        />

        <TextField
          fullWidth
          label="Password"
          variant="outlined"
          margin="normal"
          type="password"
          {...register("password", { required: "Password is required" })}
          error={!!errors.password}
          helperText={errors.password?.message}
        />

        <Button
          type="submit"
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

        {signUp ? (
          <Typography>
            Already have an account?{" "}
            <span
              style={{ color: "#1976d2", cursor: "pointer" }}
              onClick={() => isSignUp(false)}
            >
              Log in
            </span>
          </Typography>
        ) : (
          <Typography>
            Don’t have an account?{" "}
            <span
              style={{ color: "#1976d2", cursor: "pointer" }}
              onClick={() => isSignUp(true)}
            >
              Sign up
            </span>
          </Typography>
        )}

        <Divider>or</Divider>

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
        padding: "10px",
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
