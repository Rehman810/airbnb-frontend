import React, { createContext, useState, useContext } from "react";

const BookingContext = createContext();

export const useBookingContext = () => {
  return useContext(BookingContext);
};

export const BookingProvider = ({ children }) => {
  const [bookingData, setBookingData] = useState({});
  const [bookListing, setBookListing] = useState({});

  const resetBookingState = () => {
    setBookingData({});
    setBookListing({});
  };

  const value = {
    resetBookingState,
    bookListing,
    bookingData,
    setBookingData,
    setBookListing
  };

  return (
    <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
  );
};
