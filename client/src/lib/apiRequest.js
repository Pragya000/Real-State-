import axios from "axios";

const apiRequest = axios.create({
    baseURL: "https://real-state-tzax.onrender.com/api",
    withCredentials: true,
});

export default apiRequest; 

console.log("Base URL:", import.meta.env.VITE_API_URL);

