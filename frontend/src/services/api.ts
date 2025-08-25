// src/services/api.ts or plantService.ts
import axios from "axios";
import { Plant } from "../types/Plant";

const api = axios.create({
  baseURL: "http://localhost:8000/api", 
  timeout: 10000,
});

export const plantService = {
  // Get all plants with optional filters
  getPlants: async (params?: { name?: string; category?: string }) => {
    const response = await api.get<Plant[]>("/plants", { params });
    return response.data;
  },

  // Get single plant
  getPlant: async (id: string) => {
    const response = await api.get<Plant>(`/plants/${id}`);
    return response.data;
  },

  // src/services/api.ts
addPlant: async (plantFormData: FormData) => {
  const response = await api.post<Plant>("/plants", plantFormData, {
    headers: {
      "Content-Type": "multipart/form-data", // ✅ let axios set boundary
    },
  });
  return response.data;
},
};
