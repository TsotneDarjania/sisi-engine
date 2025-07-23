// hooks/useAuthForm.ts
"use client";

import { useForm } from "react-hook-form";

export function useAuthForm(isSignUp: boolean) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  return {
    register,
    handleSubmit,
    reset,
    errors,
    fieldConfig: {
      username: { required: isSignUp },
      email: { required: true },
      password: { required: true, minLength: 6 },
    },
  };
}
