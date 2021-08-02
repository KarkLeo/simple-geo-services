import axios from "axios";
import { BASE_URI } from "./config";

export const client = axios.create({
  baseURL: BASE_URI,
});
