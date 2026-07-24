import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateProfile } from "../api/profile";
import type { UpdateProfileRequest } from "../api/profile";

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateProfileRequest) =>
      updateProfile(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["profile"],
      });
    },
  });
}