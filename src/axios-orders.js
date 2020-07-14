import axios from "axios";

const instance = axios.create({
  baseURL: "https://udemy-burger-builder-2d725.firebaseio.com/",
});

export default instance;
