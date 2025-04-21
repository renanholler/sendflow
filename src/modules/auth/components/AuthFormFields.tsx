import { TextField } from "@mui/material";

interface AuthFormFieldsProps {
  form: {
    name: string;
    email: string;
    password: string;
  };
  mode: "signin" | "signup";
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function AuthFormFields(props: AuthFormFieldsProps) {
  const { form, mode, onChange } = props;
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
            value={form.name}
            onChange={onChange}
            fullWidth
            required
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
          required
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
          required
        />
      </div>
    </>
  );
}
