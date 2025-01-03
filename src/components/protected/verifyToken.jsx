import React, { useEffect, useState } from "react";
import axios from "axios";
import API_CONFIG from "../../config/Api/Api";

const VerifyToken = ({ VerifiedComponent, UnverifiedComponent, ...props }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const token = localStorage.getItem("token");

  const verifyTokenWithBackend = async () => {
    try {
      const { apiKey } = API_CONFIG;

      if (!token) {
        throw new Error("No token found");
      }

      const response = await axios.post(
        `${apiKey}/verify-token`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIsAuthenticated(true);
    } catch (error) {
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    verifyTokenWithBackend();
  }, [token]);

  return isAuthenticated === null
    ? <p></p> 
    : isAuthenticated
    ? <VerifiedComponent {...props} />
    : <UnverifiedComponent {...props} />;
};

export default VerifyToken;
