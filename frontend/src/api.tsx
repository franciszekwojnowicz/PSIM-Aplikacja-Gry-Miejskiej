import axios, { Axios, AxiosError } from "axios";
import {
  AchievementAPI,
  NewRestaurant,
  RestaurantInfoPageModel,
  RestaurantsAPI,
  UserModel,
  UserModelRanking,
} from "./types";
import { text } from "stream/consumers";

const API_URL = `http://localhost:8000/api`;

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
      `${API_URL}/restaurant/${restaurantID}/`,
      { params: { user: localStorage.getItem("userID") } }
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
    throw error;
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

export const postComment = async (
  text: string,
  comment: number | null
): Promise<Comment | null> => {
  try {
    setAuthToken();
    let response;
    if (comment != null) {
      response = await axios.post(
        `${API_URL}${window.location.pathname}/comment/`,
        {
          text: text,
          comment: comment,
          user: localStorage.getItem("userID"),
        }
      );
    } else {
      response = await axios.post(
        `${API_URL}${window.location.pathname}/comment/`,
        {
          text: text,
          user: localStorage.getItem("userID"),
        }
      );
    }
    console.log(response.data);
    window.location.href = window.location.href;
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getUser = async () => {
  try {
    setAuthToken();
    const response = await axios.get<UserModel>(
      `${API_URL}/user/${localStorage.getItem("userID")}/`
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error fetching user", error);
    return null;
  }
};

export const getUsers = async () => {
  try {
    setAuthToken();
    const response = await axios.get<UserModelRanking[]>(`${API_URL}/user/`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error getting users", error);
    return null;
  }
};

export const fetchUser = async (
  email: string,
  name: string,
  password: string
) => {
  try {
    setAuthToken();
    const response = await axios.patch<UserModel>(
      `${API_URL}/user/${localStorage.getItem("userID")}/`,
      { name: name, email: email, password: password }
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error patching user", error);
    throw error;
  }
};

export const postRating = async (rating: number) => {
  try {
    setAuthToken();
    const response = await axios.post(
      `${API_URL}${window.location.pathname}/rating/`,
      { user: localStorage.getItem("userID"), rating: rating }
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error post rating", error);
    throw error;
  }
};

export const patchRating = async (rating: number) => {
  try {
    setAuthToken();
    const response = await axios.patch(
      `${API_URL}${window.location.pathname}/rating/`,
      { user: localStorage.getItem("userID"), rating: rating }
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error patch rating", error);
    throw error;
  }
};
