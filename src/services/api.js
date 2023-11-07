import axios from "axios";
import { autoLogin } from "./userServices.js";

const instance = axios.create({
  baseURL: "/api",
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response.status === 401) {
      if (error.response.data.message === "Token is not valid") {
        try {
          const response = await autoLogin();
          console.log("fetching autologin", response);
        } catch (error) {
          //Add what the page should show
          console.log("Permission denied, no refreshtoken ");
          /*    localStorage.removeItem("accessToken"); */
          /*    window.location = "/"; */
        }
      } else {
        console.log("Response data is not 401", error.response.data.message);
        /*  localStorage.removeItem("accessToken"); */
        window.location = "/";
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
