import React, { createContext, useState, useContext } from "react";

const AppContext = createContext();

export const useAppContext = () => {
  return useContext(AppContext);
};

export const AppProvider = ({ children }) => {
  const [searchVisible, setSearchVisible] = useState(false);
  const [placeType, setPlaceType] = useState();
  const [propertyType, setPropertyType] = useState();
  const [address, setAddress] = useState({});
  const [amenties, setAmenties] = useState([]);
  const [guestCount, setGuestCount] = useState({});
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [uploadedImages, setUploadedImages] = useState([]);
  const [weekDayPrice, setWeekDayPrice] = useState();
  const [weekendPrice, setWeekEndPrice] = useState();
  const [contextLatitude, setContextLatitude] = useState();
  const [contextLongitude, setContextLongitude] = useState();

  const resetListingState = () => {
    setPlaceType(null);
    setPropertyType(null);
    setAddress({});
    setAmenties([]);
    setGuestCount({});
    setDescription("");
    setTitle("");
    setUploadedImages([]);
    setWeekDayPrice(null);
    setWeekEndPrice(null);
    setContextLatitude(null);
    setContextLongitude(null);
  };

  const value = {
    searchVisible,
    setSearchVisible,
    guestCount,
    setGuestCount,
    description,
    setDescription,
    uploadedImages,
    setUploadedImages,
    placeType,
    setPlaceType,
    propertyType,
    setPropertyType,
    address,
    setAddress,
    amenties,
    setAmenties,
    title,
    setTitle,
    weekDayPrice,
    setWeekDayPrice,
    weekendPrice,
    setWeekEndPrice,
    resetListingState,
    setContextLatitude,
    setContextLongitude,
    contextLatitude,
    contextLongitude
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
