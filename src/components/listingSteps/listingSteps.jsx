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
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import AcUnitIcon from "@mui/icons-material/AcUnit";

import ImageUploader from "../host/images";
import DescriptionInput from "../host/description";
import Pricing from "../host/pricing";
import ListingPreview from "../host/preview";
import { useAppContext } from "../../context/context";
import { postData } from "../../config/ServiceApi/serviceApi";
import { useNavigate } from "react-router-dom";

const GetStarted = lazy(() => import("../../components/host/getStarted"));

const propertyTypes = [
  { name: "House", icon: <HouseIcon fontSize="large" /> },
  { name: "Apartment", icon: <ApartmentIcon fontSize="large" /> },
  { name: "Shared Room", icon: <BarnIcon fontSize="large" /> },
  { name: "Bed & breakfast", icon: <BreakfastDiningIcon fontSize="large" /> },
  { name: "Boat", icon: <DirectionsBoatIcon fontSize="large" /> },
  { name: "Cabin", icon: <CabinIcon fontSize="large" /> },
  { name: "Campervan/motorhome", icon: <RvHookupIcon fontSize="large" /> },
  { name: "Casa particular", icon: <HomeWorkIcon fontSize="large" /> },
  { name: "Castle", icon: <CastleIcon fontSize="large" /> },
];

const amenities = [
  { name: "Wifi", icon: <WifiIcon fontSize="large" /> },
  { name: "TV", icon: <TvIcon fontSize="large" /> },
  { name: "Gym", icon: <KitchenIcon fontSize="large" /> },
  { name: "Parking", icon: <LocalParkingIcon fontSize="large" /> },
  { name: "Air Conditioning", icon: <AcUnitIcon fontSize="large" /> },
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
  {
    label: "Step 3",
    content: (
      <PropertyType
        type={propertyTypes}
        heading={"Which of these best describes your place?"}
      />
    ),
  },
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
  {
    label: "Step 9",
    content: (
      <PropertyType
        type={amenities}
        heading={"Tell guests what your place has to offer"}
        isAmenties={true}
      />
    ),
  },
  { label: "Step 10", content: <ImageUploader /> },
  {
    label: "Step 11",
    content: (
      <DescriptionInput
        isTitle={true}
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
  {
    label: "Step 14",
    content: (
      <Pricing
        isWeekDay={true}
        heading={"Now, set a weekday base price"}
        para={`Tip: $20. You’ll set a weekend price next.`}
        pricing={20}
      />
    ),
  },
  {
    label: "Step 15",
    content: (
      <Pricing
        heading={"Set a weekend price"}
        para={`Add a premium for Fridays and Saturdays.`}
        pricing={21}
      />
    ),
  },
  { label: "Step 16", content: <ListingPreview /> },
];

function ListingSteps() {
  const {
    placeType,
    propertyType,
    address,
    amenties,
    guestCount,
    description,
    title,
    uploadedImages,
    weekDayPrice,
    weekendPrice,
  } = useAppContext();
  const token = localStorage.getItem("token");
  const navigate = useNavigate()
  useDocumentTitle("Create your listing - Airbnb");
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const sendDataToApi = async () => {
    const formData = new FormData();
  
    formData.append("placeType", propertyType || "House");
    formData.append("roomType", placeType || "Entire Place");
    formData.append("street", address?.streetAddress || "");
    formData.append("flat", address?.flat || "");
    formData.append("city", address?.city || "");
    formData.append("town", address?.area || "");
    formData.append("postcode", address?.postcode || "");
    // formData.append("latitude", address?.latitude);
    // formData.append("longitude", address?.longitude );
    formData.append("guestCapacity", guestCount?.guests || 0);
    formData.append("bedrooms", guestCount?.bedrooms || 0);
    formData.append("beds", guestCount?.beds || 0);
    formData.append("amenities", amenties || []);
    formData.append("title", title || "Untitled Listing");
    formData.append("description", description || "No description provided.");
    formData.append("weekdayPrice", weekDayPrice || 0);
    formData.append("weekendPrice", weekendPrice || 0);
    if (uploadedImages.length > 0) {
      uploadedImages.forEach((image) => {
        formData.append("photos", image.file);
      });
    }
  
    try {
      const response = await postData("listings", formData, token, true);
      console.log("API Response:", response);
      navigate("/hosting/listings")
    } catch (error) {
      console.error("API Error:", error.message);
    }
  };

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      sendDataToApi();
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
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
              // disabled={activeStep === steps.length - 1}
              color="black"
            >
             {activeStep === steps.length - 1 ? "Finish" : "Next"}
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
