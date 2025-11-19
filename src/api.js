import axios from "axios";

export const api = axios.create({
  baseURL: "/.netlify/functions",
  headers: {
    "Content-Type": "application/json"
  }
});
