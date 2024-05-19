import axios from "axios";
import { RestaurantsAPI } from "./types";

const API_URL = "http://localhost:8000/api";

export const setAuthToken = (): void => {
  const token = localStorage.getItem("token");
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Token ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

export const getRestaurants = async (): Promise<RestaurantsAPI | null> => {
  try {
    setAuthToken();
    const response = await axios.get<RestaurantsAPI>(
      `${API_URL}/user/${localStorage.getItem("userID")}/restaurants/`
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error fetching items", error);
    return null;
  }
};

export const handleLogin = async (name: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/login/`, {
      name: name,
      password: password,
    });
    const token = response.data.token;
    const userID = response.data.userID;
    localStorage.setItem("token", token);
    localStorage.setItem("userID", userID);
    window.location.href = "/restaurants/";
  } catch (error) {
    console.log("ERROR LOGIN");
  }
};

export const handleSignUp = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    const response = await axios.post(`${API_URL}/register/`, {
      name: name,
      email: email,
      password: password,
    });
    const token = response.data.token;
    const userID = response.data.userID;
    localStorage.setItem("token", token);
    localStorage.setItem("userID", userID);
    window.location.href = "/restaurants/";
  } catch (error) {
    console.log("ERROR REGISTER");
  }
};

// export const postCodeRestaurant = async (code: number) => {
//   try {
//     setAuthToken();
//     const response = await axios.post(`${API_URL}/register/`, {
//       name: name,
//       password: password,
//     });
//     const token = response.data.token;
//     localStorage.setItem("token", token);
//     window.location.href = "/restaurants/";
//   } catch (error) {
//     console.log("ERROR LOGIN");
//   }
// };
