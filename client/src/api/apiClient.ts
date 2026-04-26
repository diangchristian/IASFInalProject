import axios from "axios";

const configuredBaseUrl = import.meta.env.VITE_BACKEND_URL?.trim();
console.log("Configured API Base URL:", configuredBaseUrl || "Not set, using default");
const baseURL = configuredBaseUrl
  ? configuredBaseUrl.replace(/\/$/, "")
  : "http://localhost:3000";

export const apiClient = axios.create({
  baseURL,
});
