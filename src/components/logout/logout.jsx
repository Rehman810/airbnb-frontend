import axios from "axios";
import API_CONFIG from "../../config/Api/Api";

const handleLogout = async (navigate) => {
  const { apiKey } = API_CONFIG;

  try {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("No token found");
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.post(`${apiKey}/logout`, {}, config);

    console.log("Logout successful:", response.data);

    localStorage.removeItem("token");
    navigate("/"); 
  } catch (error) {
    console.error("Logout error:", error.message || error);
  }
};

export default handleLogout;
