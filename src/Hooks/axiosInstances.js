import axios from "axios";

// Base URL for both instance

const BASE_URL = "http://localhost:5000";

//1. Public Axios Instance (for unauthenticated requests)

export const axiosPublic = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});




