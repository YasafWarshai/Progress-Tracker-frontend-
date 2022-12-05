import axios from "axios";

const BASE_URL = "http://localhost:8080";

export const Get = async (path) => {
  const res = await axios.get(BASE_URL + path, { withCredentials: true });
  return res.data;
}

export const Post = async (path, data) => {
  const res = await axios.post(BASE_URL + path, data, { withCredentials: true });
  return res.data;
}

export const Put = async (path, data) => {
  const res = await axios.put(BASE_URL + path, data, { withCredentials: true });
  return res.data;
}