import axios from "axios";

export default axios.create({
  baseURL: "https://dog.ceo/api/",
  headers: {
    "Content-type": "application/json"
  }
});