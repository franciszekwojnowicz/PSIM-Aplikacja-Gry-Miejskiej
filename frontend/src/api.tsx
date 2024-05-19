import axios, { AxiosError } from "axios";
import {
  AchievementAPI,
  NewRestaurant,
  RestaurantInfoPageModel,
  RestaurantsAPI,
} from "./types";

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

export const getAchivements = async (): Promise<AchievementAPI | null> => {
  try {
    setAuthToken();
    const response = await axios.get<AchievementAPI>(
      `${API_URL}/user/${localStorage.getItem("userID")}/achievements/`
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error fetching items", error);
    return null;
  }
};

export const getRestaurantInfo = async (
  restaurantID: number
): Promise<RestaurantInfoPageModel | null> => {
  try {
    setAuthToken();
    const response = await axios.get<RestaurantInfoPageModel>(
      `${API_URL}/restaurant/${restaurantID}/`
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error fetching restaurantInfo", error);
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
    console.log(error);
    throw error;
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

export const postCodeRestaurant = async (
  code: number
): Promise<NewRestaurant | null> => {
  try {
    setAuthToken();
    const response = await axios.post(
      `${API_URL}/user/${localStorage.getItem("userID")}/restaurants/`,
      {
        code: code,
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
