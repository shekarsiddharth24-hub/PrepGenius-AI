import { useEffect, useState } from "react";

import { useUpdateProfile } from "../../hooks/useUpdateProfile";

interface EditProfileDialogProps {
  open: boolean;
  onClose: () => void;
  name: string;
  email: string;
}

export default function EditProfileDialog({
  open,
  onClose,
  name,
  email,
}: EditProfileDialogProps) {

  const [formData, setFormData] = useState({
    name,
    email,
  });

  useEffect(() => {
    setFormData({
      name,
      email,
    });
  }, [name, email]);

  const updateProfileMutation = useUpdateProfile();

  const handleSubmit = async () => {
    try {
      await updateProfileMutation.mutateAsync(formData);

      onClose();
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">

        <h2 className="text-2xl font-bold">
          Edit Profile
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          Update your personal information.
        </p>

        <div className="mt-6 space-y-4">

          <div>
            <label className="mb-2 block text-sm font-medium">
              Name
            </label>

            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  name: e.target.value,
                })
              }
              className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Email
            </label>

            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  email: e.target.value,
                })
              }
              className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

        </div>

        <div className="mt-8 flex justify-end gap-3">

          <button
            onClick={onClose}
            className="rounded-lg border px-4 py-2 hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={updateProfileMutation.isPending}
            className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {updateProfileMutation.isPending
              ? "Saving..."
              : "Save Changes"}
          </button>

        </div>

      </div>

    </div>
  );
}