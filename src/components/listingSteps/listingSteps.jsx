import React, { lazy, useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  MobileStepper,
  useTheme,
} from "@mui/material";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import Logo from "../../assets/images/logo.png";

const GetStarted = lazy(() => import("../../components/host/getStarted"));

const steps = [
  { label: "Step 1", content: <GetStarted /> },
  { label: "Step 2", content: <div>Content for Step 2</div> },
  { label: "Step 3", content: <div>Content for Step 3</div> },
  { label: "Step 4", content: <div>Content for Step 4</div> },
  { label: "Step 5", content: <div>Content for Step 5</div> },
  { label: "Step 6", content: <div>Content for Step 6</div> },
];

function ListingSteps() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      {/* Navbar */}
      <AppBar position="static" sx={{ backgroundColor: "white", color: "black" }}>
        <Toolbar>
          <Box
            component="img"
            src={Logo}
            alt="Logo"
            sx={{ height: 42, marginRight: 2, marginLeft: 2 }}
          />
          <Box sx={{ flexGrow: 1 }} />
          <Box>
            <Button
              color="inherit"
              sx={{
                textTransform: "none",
                marginRight: 1,
                border: "1px solid gray",
                borderRadius: "20px",
                padding: "8px",
              }}
            >
              Questions?
            </Button>
            <Button
              color="inherit"
              sx={{
                textTransform: "none",
                border: "1px solid gray",
                borderRadius: "20px",
                padding: "8px",
              }}
            >
              Save & Exit
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          flex: "1 1 0%", 
          overflow: "auto",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f9f9f9",
          padding: 2,
          paddingTop: "100px"
        }}
      >
        {steps[activeStep].content}
      </Box>

      {/* Footer with Stepper */}
      <Box
        sx={{
          boxShadow: "0px -2px 4px rgba(0,0,0,0.1)",
          padding: 2,
          backgroundColor: "white",
        }}
      >
        <MobileStepper
          variant="progress"
          steps={steps.length}
          position="static"
          activeStep={activeStep}
          nextButton={
            <Button
              size="small"
              onClick={handleNext}
              disabled={activeStep === steps.length - 1}
              color="black"
            >
              Next
              {theme.direction === "rtl" ? (
                <KeyboardArrowLeft />
              ) : (
                <KeyboardArrowRight />
              )}
            </Button>
          }
          backButton={
            <Button
              size="small"
              onClick={handleBack}
              disabled={activeStep === 0}
              color="black"
            >
              {theme.direction === "rtl" ? (
                <KeyboardArrowRight />
              ) : (
                <KeyboardArrowLeft />
              )}
              Back
            </Button>
          }
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        />
      </Box>
    </Box>
  );
}

export default ListingSteps;
