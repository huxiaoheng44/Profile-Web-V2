const isDevelopment = process.env.NODE_ENV === "development";

export const BASE_URL =
  process.env.REACT_APP_BASE_URL || (isDevelopment ? "http://localhost:8000" : "");
