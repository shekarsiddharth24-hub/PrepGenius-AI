import { useMutation } from "@tanstack/react-query";

import { changePassword, type ChangePasswordRequest } from "../api/profile";

export function useChangePassword() {
  return useMutation({
    mutationFn: (data: ChangePasswordRequest) =>
      changePassword(data),
  });
}