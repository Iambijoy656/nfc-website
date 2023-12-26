import Axios from "axios";

// Create an axios instance with your baseURL
const api = Axios.create({
  baseURL: "http://localhost:5001/api/v1/",
  // baseURL: "https://nfc-card-backend-iambijoy656.vercel.app/api/v1/",
});

api.defaults.headers.common["Access-Control-Allow-Origin"] = "*"; // Replace with the actual origin of your frontend
api.defaults.headers.common["Access-Control-Allow-Methods"] =
  "GET, POST, PUT, PATCH, DELETE"; // Define the allowed HTTP methods
// axios.defaults.headers.common["Access-Control-Allow-Headers"] = "Content-Type, Authorization"; // Define the allowed headers

// Set default headers for the axios instance
// axios.defaults.headers.common["Authorization"] =
//   "Bearer " + localStorage.getItem("access-token");

export default api;
