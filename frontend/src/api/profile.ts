import api from "./axios";

export interface Profile {
  id: number;
  name: string;
  email: string;
}

export interface UpdateProfileRequest {
  name: string;
  email: string;
}

export interface ChangePasswordRequest {
  current_password: string;
  new_password: string;
}

export interface MessageResponse {
  message: string;
}

export async function getProfile(): Promise<Profile> {
  const response = await api.get("/auth/me");
  return response.data;
}

export async function updateProfile(
  data: UpdateProfileRequest,
): Promise<Profile> {

  const response = await api.put(
    "/auth/me",
    data,
  );

  return response.data;
}

export async function changePassword(
  data: ChangePasswordRequest,
): Promise<MessageResponse> {

  const response = await api.put(
    "/auth/change-password",
    data,
  );

  return response.data;
}