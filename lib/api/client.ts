import axios from "axios";

const baseURL =
  process.env.NEXT_PUBLIC_API_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}/api` : "/api");

export const apiClient = axios.create({
  baseURL,
  timeout: 10_000,
  headers: {
    "Content-Type": "application/json",
  },
});
