import { Alert } from "@mui/material";
import { ReactNode } from "react";

type AuthFormLayoutProps = {
  children: ReactNode;
  error?: string;
  success?: string;
  mode: "signin" | "signup";
  submitButton: ReactNode;
  footer: ReactNode;
  onSubmit: (e: React.FormEvent) => void;
};

export function AuthFormLayout({
  children,
  error,
  success,
  submitButton,
  footer,
  onSubmit,
}: AuthFormLayoutProps) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={onSubmit}
        className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-sm"
      >
        <div className="flex justify-center mb-6">
          <img src="/assets/logo-login.png" alt="SendFlow" className="w-24" />
        </div>

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

        {children}

        <div className="mt-6">{submitButton}</div>

        <div className="text-sm text-center mt-4">{footer}</div>
      </form>
    </div>
  );
}
