import { Alert, Button, TextField } from "@mui/material";
import { UserCredential } from "firebase/auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { mapFirebaseError } from "../helpers/mapFirebaseError";

type AuthFormProps = {
  submitButtonText: string;
  onSubmit: (email: string, password: string) => Promise<UserCredential>;
  successMessage?: string;
  mode: "signin" | "signup";
};

export function AuthForm({
  submitButtonText,
  onSubmit,
  successMessage,
  mode,
}: AuthFormProps) {
  const [form, setForm] = useState({ email: "", password: "" });
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
      await onSubmit(form.email, form.password);
      setError("");
      if (mode === "signup" && successMessage) {
        setSuccess(successMessage);
        setTimeout(() => {
          navigate("/connections");
        }, 2000);
      } else {
        navigate("/connections");
      }
    } catch (err) {
      setSuccess("");
      setError(mapFirebaseError(err));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[rgb(21,21,21)]">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-semibold mb-6">SendFlow</h2>

        {error && (
          <Alert severity="error" className="mb-4">
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" className="mb-4">
            {success}
          </Alert>
        )}

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email
          </label>
          <TextField
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            placeholder="exemplo@email.com"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium mb-1">
            Senha
          </label>
          <TextField
            id="password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            placeholder="••••••••"
          />
        </div>

        <Button type="submit" variant="contained" color="primary" fullWidth>
          {submitButtonText}
        </Button>
        <p className="text-sm text-center mt-4">
          {mode === "signin" ? (
            <>
              Não tem uma conta?{" "}
              <Link to="/signup" className="text-blue-600 hover:underline">
                Cadastre-se
              </Link>
            </>
          ) : (
            <>
              Já tem conta?{" "}
              <Link to="/signin" className="text-blue-600 hover:underline">
                Entrar
              </Link>
            </>
          )}
        </p>
      </form>
    </div>
  );
}
