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
import useDocumentTitle from "../../hooks/dynamicTitle/dynamicTitle";
import Step1 from "../host/step1";
import PropertyType from "../host/propertyType";
import PlaceType from "../host/placeType";
import MapLocation from "../host/location";
import AddressForm from "../host/confirmAddress";
import GuestCounter from "../host/guestCounter";
import animationData from "../../animations/step3animation.json";

import HouseIcon from "@mui/icons-material/House";
import ApartmentIcon from "@mui/icons-material/Apartment";
import CabinIcon from "@mui/icons-material/Cabin";
import BreakfastDiningIcon from "@mui/icons-material/BreakfastDining";
import DirectionsBoatIcon from "@mui/icons-material/DirectionsBoat";
import CastleIcon from "@mui/icons-material/Castle";
import BarnIcon from "@mui/icons-material/StoreMallDirectory";
import RvHookupIcon from "@mui/icons-material/RvHookup";
import HomeWorkIcon from "@mui/icons-material/HomeWork";

import WifiIcon from "@mui/icons-material/Wifi";
import TvIcon from "@mui/icons-material/Tv";
import KitchenIcon from "@mui/icons-material/Kitchen";
import LocalLaundryServiceIcon from "@mui/icons-material/LocalLaundryService";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import WorkIcon from "@mui/icons-material/Work";
import ImageUploader from "../host/images";
import DescriptionInput from "../host/description";
import Pricing from "../host/pricing";
import ListingPreview from "../host/preview";

const GetStarted = lazy(() => import("../../components/host/getStarted"));

const propertyTypes = [
  { name: "House", icon: <HouseIcon fontSize="large" /> },
  { name: "Flat/apartment", icon: <ApartmentIcon fontSize="large" /> },
  { name: "Barn", icon: <BarnIcon fontSize="large" /> },
  { name: "Bed & breakfast", icon: <BreakfastDiningIcon fontSize="large" /> },
  { name: "Boat", icon: <DirectionsBoatIcon fontSize="large" /> },
  { name: "Cabin", icon: <CabinIcon fontSize="large" /> },
  { name: "Campervan/motorhome", icon: <RvHookupIcon fontSize="large" /> },
  { name: "Casa particular", icon: <HomeWorkIcon fontSize="large" /> },
  { name: "Castle", icon: <CastleIcon fontSize="large" /> },
];

const amenities = [
  { name: "Wifi", icon: <WifiIcon fontSize="large" /> },
  { name: "Tv", icon: <TvIcon fontSize="large" /> },
  { name: "Kitchen", icon: <KitchenIcon fontSize="large" /> },
  {
    name: "Washing Machine",
    icon: <LocalLaundryServiceIcon fontSize="large" />,
  },
  {
    name: "Free parking on premises",
    icon: <DirectionsCarIcon fontSize="large" />,
  },
  {
    name: "Paid parking on premises",
    icon: <LocalParkingIcon fontSize="large" />,
  },
  { name: "Air conditioning", icon: <AcUnitIcon fontSize="large" /> },
  { name: "Dedicated workspace", icon: <WorkIcon fontSize="large" /> },
  { name: "Castle", icon: <CastleIcon fontSize="large" /> },
];

const steps = [
  { label: "Step 1", content: <GetStarted /> },
  {
    label: "Step 2",
    content: (
      <Step1
        stepNo={1}
        title={"Tell us about your place"}
        description={`In this step, we'll ask you which type of property you have and if
            guests will book the entire place or just a room. Then let us know
            the location and how many guests can stay.`}
      />
    ),
  },
  { label: "Step 3", content: <PropertyType type={propertyTypes} /> },
  { label: "Step 4", content: <PlaceType /> },
  { label: "Step 5", content: <MapLocation /> },
  { label: "Step 6", content: <AddressForm /> },
  { label: "Step 7", content: <GuestCounter /> },
  {
    label: "Step 8",
    content: (
      <Step1
        stepNo={2}
        title={"Make your place stand out"}
        description={`In this step, you’ll add some of the amenities your place offers, plus 5 or more photos. Then you’ll create a title and description.`}
      />
    ),
  },
  { label: "Step 9", content: <PropertyType type={amenities} /> },
  { label: "Step 10", content: <ImageUploader /> },
  {
    label: "Step 11",
    content: (
      <DescriptionInput
        heading={"Now, let's give your house a title"}
        para={`Short titles work best. Have fun with it – you can always change it later.`}
        max={32}
        placholder={"Your Title"}
      />
    ),
  },
  {
    label: "Step 12",
    content: (
      <DescriptionInput
        heading={"Create your description"}
        para={`Share what makes your place special.`}
        max={500}
        placholder={
          "You'll have a great time at this comfortable place to stay"
        }
      />
    ),
  },
  {
    label: "Step 13",
    content: (
      <Step1
        stepNo={3}
        title={"Finish up and publish"}
        description={`Finally, you’ll choose booking settings, set up pricing and publish your listing.`}
        animation={animationData}
      />
    ),
  },
  { label: "Step 14", content: <Pricing heading={"Now, set a weekday base price"} para={`Tip: $20. You’ll set a weekend price next.`} pricing={20}/> },
  { label: "Step 15", content: <Pricing heading={"Set a weekend price"} para={`Add a premium for Fridays and Saturdays.`} pricing={21}/> },
  { label: "Step 16", content: <ListingPreview /> },
];

function ListingSteps() {
  useDocumentTitle("Create your listing - Airbnb");
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
      <AppBar
        position="static"
        sx={{ backgroundColor: "white", color: "black" }}
      >
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
          // paddingTop: "100px",
        }}
      >
        {steps[activeStep].content}
      </Box>

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
