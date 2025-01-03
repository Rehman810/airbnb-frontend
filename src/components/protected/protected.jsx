import React, {
  useEffect,
  useState,
} from "react";
import {
  useNavigate,
  useLocation,
} from "react-router-dom";
import axios from "axios";
import API_CONFIG from "../../config/Api/Api";
import Loader from "../loader/loader";
import LoginModal from "../Login/LoginModal";

const Protected = ({
  Component,
  allowedRoles,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isAuthenticated, setIsAuthenticated] =
    useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] =
    useState(false);
  const [signUp, setSignUp] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const verifyTokenWithBackend = async () => {
      try {
        const { apiKey } = API_CONFIG;
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
        setIsLoginModalOpen(true);
        localStorage.removeItem("token")
        localStorage.removeItem("user")
      }
    };

    verifyTokenWithBackend();
  }, [navigate, location, allowedRoles]);

  const handleLoginModalClose = () => {
    setIsLoginModalOpen(false);
    navigate(-1);
  };

  return (
    <>
      {isAuthenticated ? (
        <Component />
      ) : (
        <>
          <Loader open={true} />
          <LoginModal
            open={isLoginModalOpen}
            onClose={handleLoginModalClose}
            signUp={signUp}
            isSignUp={setSignUp}
          />
        </>
      )}
    </>
  );
};

export default Protected;
