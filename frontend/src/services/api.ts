
import axios from "axios";
import { Plant } from "../types/Plant";

// ✅ configure axios instance
const api = axios.create({
  baseURL: "https://urvann-backend.vercel.app/api", 
  timeout: 10000,
});

export const plantService = {
  
  getPlants: async (params?: { name?: string; category?: string }) => {
    const response = await api.get<Plant[]>("/plants", { params });
    return response.data;
  },

  
  getPlant: async (id: string) => {
    const response = await api.get<Plant>(`/plants/${id}`);
    return response.data;
  },

  // ✅ Add new plant (sending plain JSON)
  addPlant: async (plantData: Omit<Plant, "_id" | "__v">) => {
    const response = await api.post<Plant>("/plants", plantData, {
      headers: {
        "Content-Type": "application/json", 
      },
    });
    return response.data;
  },
};
