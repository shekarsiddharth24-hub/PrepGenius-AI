import api from "./axios";
import type { Analytics } from "../types/dashboard";

export async function getAnalytics(): Promise<Analytics> {
  const response = await api.get("/dashboard/analytics");
  return response.data;
}

// this file is responsible for communicating with backend