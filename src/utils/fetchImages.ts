import axios from "axios";
import { Image } from "../types/Image";

const BASE_URL = import.meta.env.VITE_BASE_API_URL;

export const fetchImages = async (): Promise<Image[]> => {
  try {
    const response = await axios.get(BASE_URL);

    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
