import React, { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const LeafletMap = ({ latitude, longitude, popupText }) => {
  useEffect(() => {
    const map = L.map("map").setView([latitude, longitude], 12);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
    //   attribution:
    //     'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
    }).addTo(map);

    L.marker([latitude, longitude])
      .addTo(map)
      .bindPopup(popupText || "Location")
      .openPopup();

    return () => {
      map.remove(); 
    };
  }, [latitude, longitude, popupText]);

  return (
    <div
      id="map"
      style={{
        height: "300px",
        width: "100%",
        borderRadius: "8px",
        marginTop: "16px",
        zIndex: -10
      }}
    ></div>
  );
};

export default LeafletMap;
