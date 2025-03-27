import { TextField } from "@mui/material";

type AuthFormFieldsProps = {
  form: {
    name: string;
    email: string;
    password: string;
  };
  mode: "signin" | "signup";
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export function AuthFormFields({ form, mode, onChange }: AuthFormFieldsProps) {
  return (
    <>
      {mode === "signup" && (
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium mb-1">
            Nome
          </label>
          <TextField
            id="name"
            name="name"
            type="text"
            value={form.name}
            onChange={onChange}
            fullWidth
            variant="outlined"
            placeholder="Seu nome"
          />
        </div>
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
          onChange={onChange}
          fullWidth
          variant="outlined"
          placeholder="exemplo@email.com"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="password" className="block text-sm font-medium mb-1">
          Senha
        </label>
        <TextField
          id="password"
          name="password"
          type="password"
          value={form.password}
          onChange={onChange}
          fullWidth
          variant="outlined"
          placeholder="••••••••"
        />
      </div>
    </>
  );
}
