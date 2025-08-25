// src/services/api.ts or plantService.ts
import axios from "axios";
import { Plant } from "../types/Plant";

// ✅ configure axios instance
const api = axios.create({
  baseURL: "http://localhost:8000/api", // adjust if hosted
  timeout: 10000,
});

export const plantService = {
  // ✅ Get all plants with optional filters
  getPlants: async (params?: { name?: string; category?: string }) => {
    const response = await api.get<Plant[]>("/plants", { params });
    return response.data;
  },

  // ✅ Get single plant by id
  getPlant: async (id: string) => {
    const response = await api.get<Plant>(`/plants/${id}`);
    return response.data;
  },

  // ✅ Add new plant (sending plain JSON)
  addPlant: async (plantData: Omit<Plant, "_id" | "__v">) => {
    const response = await api.post<Plant>("/plants", plantData, {
      headers: {
        "Content-Type": "application/json", // 👈 JSON now
      },
    });
    return response.data;
  },
};
