import { mapFirebaseError } from "@/helpers/mapFirebaseError";
import { UserCredential } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function useAuthForm(
  mode: "signin" | "signup",
  onSubmit: (
    email: string,
    password: string,
    name?: string
  ) => Promise<UserCredential>,
  successMessage?: string
) {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (mode === "signup") {
        await onSubmit(form.email, form.password, form.name);
      } else {
        await onSubmit(form.email, form.password);
      }
      setError("");
      if (mode === "signup" && successMessage) {
        setSuccess(successMessage);
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      setSuccess("");
      setError(mapFirebaseError(err));
    }
  };

  const formErrors = {
    name: mode === "signup" && !form.name.trim() ? "Nome obrigatório" : "",
    email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
      ? "Email inválido"
      : "",
    password:
      form.password.length < 6
        ? "A senha deve ter pelo menos 6 caracteres"
        : "",
  };

  return {
    form,
    error,
    success,
    formErrors,
    handleChange,
    handleSubmit,
  };
}
