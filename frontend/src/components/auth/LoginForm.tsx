import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { loginSchema } from "../../utils/validation";
import type { LoginFormData } from "../../utils/validation";

import { login as loginApi } from "../../api/auth";
import { useAuth } from "../../hooks/useAuth";

import GlassInput from "../ui/GlassInput";
import GlassButton from "../ui/GlassButton";

export default function LoginForm() {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setServerError("");

    try {
      const response = await loginApi(data);

      await login(response.access_token);

      navigate("/dashboard");
    } catch (error) {
      console.error(error);

      setServerError("Invalid email or password.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >

      {/* Email */}
      <div>
        <label className="mb-2 block text-sm font-medium text-white">
          Email
        </label>

        <GlassInput
          type="email"
          {...register("email")}
          placeholder="Enter your email"
        />

        {errors.email && (
          <p className="mt-1 text-sm text-red-400">
            {errors.email.message}
          </p>
        )}
      </div>


      {/* Password */}
      <div>
        <label className="mb-2 block text-sm font-medium text-white">
          Password
        </label>

        <GlassInput
          type="password"
          {...register("password")}
          placeholder="Enter your password"
        />

        {errors.password && (
          <p className="mt-1 text-sm text-red-400">
            {errors.password.message}
          </p>
        )}
      </div>


      {/* Server Error */}
      {serverError && (
        <div
          className="
            rounded-xl
            border
            border-red-400/20
            bg-red-500/10
            p-3
            text-sm
            text-red-300
            backdrop-blur-xl
          "
        >
          {serverError}
        </div>
      )}


      {/* Submit Button */}
      <GlassButton
        type="submit"
        disabled={isSubmitting}
        className="w-full"
      >
        {isSubmitting ? "Signing In..." : "Sign In"}
      </GlassButton>


      {/* Register Link */}
      <p className="text-center text-sm text-white/70">
        Don't have an account?

        <button
          type="button"
          onClick={() => navigate("/register")}
          className="
            ml-2
            text-cyan-400
            transition
            hover:text-cyan-300
            hover:underline
          "
        >
          Register
        </button>
      </p>

    </form>
  );
}