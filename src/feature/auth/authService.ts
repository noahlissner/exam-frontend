import axios from "axios";
import { IUserData } from "./types";

const API_URL = "http://localhost:5000/api/admin/users/";

//Login
const login = async (userData: IUserData) => {
  const response = await axios.post(API_URL + "login", userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  login,
  logout,
};

export default authService;
