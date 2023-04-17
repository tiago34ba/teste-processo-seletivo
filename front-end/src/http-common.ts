import axios from "axios";

export default axios.create({
 // baseURL: "http://localhost:8080/api",
  baseURL: "http://616d6bdb6dacbb001794ca17.mockapi.io/devnology/",
  headers: {
    "Content-type": "application/json"
  }
});