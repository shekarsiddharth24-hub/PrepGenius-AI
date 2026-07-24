import { useState } from "react";

import { useChangePassword } from "../../hooks/useChangePassword";

interface ChangePasswordDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function ChangePasswordDialog({
  open,
  onClose,
}: ChangePasswordDialogProps) {

  const [formData, setFormData] = useState({
    current_password: "",
    new_password: "",
    confirm_password: "",
  });

  const [error, setError] = useState("");

  const changePasswordMutation = useChangePassword();

  if (!open) return null;

  const handleSubmit = async () => {

    setError("");

    if (
      !formData.current_password ||
      !formData.new_password ||
      !formData.confirm_password
    ) {
      setError("All fields are required.");
      return;
    }

    if (formData.new_password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (
      formData.new_password !==
      formData.confirm_password
    ) {
      setError("Passwords do not match.");
      return;
    }

    try {

      await changePasswordMutation.mutateAsync({
        current_password: formData.current_password,
        new_password: formData.new_password,
      });

      setFormData({
        current_password: "",
        new_password: "",
        confirm_password: "",
      });

      onClose();

    } catch (err: any) {

      setError(
        err?.response?.data?.detail ??
        "Failed to change password."
      );

    }

  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">

        <h2 className="text-2xl font-bold">
          Change Password
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          Update your account password.
        </p>

        {error && (
          <div className="mt-4 rounded-lg bg-red-100 p-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="mt-6 space-y-4">

          <div>

            <label className="mb-2 block text-sm font-medium">
              Current Password
            </label>

            <input
              type="password"
              value={formData.current_password}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  current_password: e.target.value,
                })
              }
              className="w-full rounded-lg border px-3 py-2"
            />

          </div>

          <div>

            <label className="mb-2 block text-sm font-medium">
              New Password
            </label>

            <input
              type="password"
              value={formData.new_password}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  new_password: e.target.value,
                })
              }
              className="w-full rounded-lg border px-3 py-2"
            />

          </div>

          <div>

            <label className="mb-2 block text-sm font-medium">
              Confirm New Password
            </label>

            <input
              type="password"
              value={formData.confirm_password}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  confirm_password: e.target.value,
                })
              }
              className="w-full rounded-lg border px-3 py-2"
            />

          </div>

        </div>

        <div className="mt-8 flex justify-end gap-3">

          <button
            onClick={onClose}
            className="rounded-lg border px-4 py-2"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={changePasswordMutation.isPending}
            className="rounded-lg bg-red-600 px-4 py-2 text-white disabled:opacity-50"
          >
            {changePasswordMutation.isPending
              ? "Changing..."
              : "Change Password"}
          </button>

        </div>

      </div>

    </div>
  );
}