import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.HOST_API_URL,
});
