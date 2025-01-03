import React, { useState } from "react";
import { DatePicker, Button, Space } from "antd";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;

const MyComponent = () => {
  const [bookedDates, setBookedDates] = useState([
    { startDate: "2025-01-10", endDate: "2025-01-20" }, // Booked range 1
    { startDate: "2025-01-25", endDate: "2025-01-28" }, // Booked range 2
  ]);

  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedDates, setSelectedDates] = useState(null); // Tracks the selected range

  // Function to handle range selection
  const handleDateChange = (dates) => {
    if (dates && dates[0]) {
      setSelectedStartDate(dates[0]); // Set the selected start date
      setSelectedDates(dates); // Update the selected range
    } else {
      setSelectedStartDate(null); // Clear the selected start date
      setSelectedDates(null); // Clear the selected range
    }
    console.log("Selected Dates:", dates);
  };

  // Function to disable dates dynamically
  const disabledDate = (current) => {
    if (!current) return false;

    const currentDate = dayjs(current).startOf("day");

    // Loop through all booked ranges and disable the dates falling within them
    for (let booked of bookedDates) {
      const { startDate: bookedStartStr, endDate: bookedEndStr } = booked;
      const bookedStart = dayjs(bookedStartStr).startOf("day");
      const bookedEnd = dayjs(bookedEndStr).startOf("day");

      // If a start date is selected
      if (selectedStartDate) {
        const selectedStart = dayjs(selectedStartDate).startOf("day");

        if (selectedStart < bookedStart) {
          // If start date is before the booked range:
          // - Disable dates from the booked start onward
          // - Allow only dates between the selected start date and one day before the booked start
          if (currentDate >= bookedStart || currentDate < selectedStart) {
            return true; // Disable this date
          }
        }

        if (selectedStart > bookedEnd) {
          // If start date is after the booked range:
          // - Disable dates within the booked range
          if (currentDate >= bookedStart && currentDate <= bookedEnd) {
            return true; // Disable this date
          }
        }
      }

      // Default: Disable dates within the booked range
      if (currentDate >= bookedStart && currentDate <= bookedEnd) {
        return true; // Disable this date
      }
    }

    return false; // Enable all other dates
  };

  const clearDates = () => {
    setSelectedStartDate(null);
    setSelectedDates(null);
  };

  return (
    <div>
      <Space direction="vertical" style={{ width: "100%" }}>
        <RangePicker
          style={{
            width: "100%",
            marginBottom: 16,
          }}
          placeholder={["Check-in", "Check-out"]}
          onCalendarChange={handleDateChange}
          disabledDate={disabledDate}
          format="DD MMM, YYYY"
          value={selectedDates} 
        />
        <Button type="default" onClick={clearDates}>
          Clear Dates
        </Button>
      </Space>
    </div>
  );
};

export default MyComponent;
