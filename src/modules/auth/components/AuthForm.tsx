import { useAuthForm } from "@/modules/auth/hooks/useAuthForm";
import { Button } from "@mui/material";
import { UserCredential } from "firebase/auth";
import { Link } from "react-router-dom";
import { AuthFormFields } from "./AuthFormFields";
import { AuthFormLayout } from "./AuthFormLayout";

type AuthFormProps = {
  submitButtonText: string;
  onSubmit: (
    email: string,
    password: string,
    name?: string
  ) => Promise<UserCredential>;
  successMessage?: string;
  mode: "signin" | "signup";
};

export function AuthForm({
  submitButtonText,
  onSubmit,
  successMessage,
  mode,
}: AuthFormProps) {
  const { form, error, success, handleChange, handleSubmit } = useAuthForm(
    mode,
    onSubmit,
    successMessage
  );

  const footer =
    mode === "signin" ? (
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
    );

  return (
    <AuthFormLayout
      mode={mode}
      error={error}
      success={success}
      onSubmit={handleSubmit}
      submitButton={
        <Button type="submit" variant="contained" color="primary" fullWidth>
          {submitButtonText}
        </Button>
      }
      footer={footer}
    >
      <AuthFormFields form={form} mode={mode} onChange={handleChange} />
    </AuthFormLayout>
  );
}
