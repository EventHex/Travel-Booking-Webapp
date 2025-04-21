// import axios from "axios";
// import { API_BASE_URL } from "../config/api";

// const instance = axios.create({
//   baseURL: API_BASE_URL,
//   timeout: 5000,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// export default instance;


import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8078/api/v1/',
  // timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
});

export default instance;