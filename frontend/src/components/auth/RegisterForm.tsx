import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  registerSchema,
  type RegisterFormData,
} from "../../utils/validation";

import { register as registerApi } from "../../api/auth";

import GlassInput from "../ui/GlassInput";
import GlassButton from "../ui/GlassButton";

export default function RegisterForm() {
  const navigate = useNavigate();

  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });


  const onSubmit = async (data: RegisterFormData) => {
    setServerError("");
    setSuccessMessage("");

    try {
      await registerApi({
        name: data.name,
        email: data.email,
        password: data.password,
      });

      setSuccessMessage(
        "Registration successful! Redirecting..."
      );

      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (error: any) {
      setServerError(
        error.response?.data?.detail ??
          "Registration failed."
      );
    }
  };


  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >

      {/* Name */}
      <div>
        <label className="mb-2 block text-sm font-medium text-white">
          Name
        </label>

        <GlassInput
          type="text"
          {...register("name")}
          placeholder="Enter your name"
        />

        {errors.name && (
          <p className="mt-1 text-sm text-red-400">
            {errors.name.message}
          </p>
        )}
      </div>


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
          placeholder="Create a password"
        />

        {errors.password && (
          <p className="mt-1 text-sm text-red-400">
            {errors.password.message}
          </p>
        )}
      </div>


      {/* Confirm Password */}
      <div>
        <label className="mb-2 block text-sm font-medium text-white">
          Confirm Password
        </label>

        <GlassInput
          type="password"
          {...register("confirmPassword")}
          placeholder="Confirm your password"
        />

        {errors.confirmPassword && (
          <p className="mt-1 text-sm text-red-400">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>


      {/* Success Message */}
      {successMessage && (
        <div
          className="
            rounded-xl
            border
            border-green-400/20
            bg-green-500/10
            p-3
            text-sm
            text-green-300
            backdrop-blur-xl
          "
        >
          {successMessage}
        </div>
      )}


      {/* Error Message */}
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


      {/* Submit */}
      <GlassButton
        type="submit"
        disabled={isSubmitting}
        className="w-full"
      >
        {isSubmitting
          ? "Creating Account..."
          : "Create Account"}
      </GlassButton>


      {/* Login Link */}
      <p className="text-center text-sm text-white/70">

        Already have an account?

        <span
          onClick={() => navigate("/login")}
          className="
            ml-2
            cursor-pointer
            text-cyan-400
            transition
            hover:text-cyan-300
            hover:underline
          "
        >
          Sign In
        </span>

      </p>

    </form>
  );
}