import { AuthForm } from "./components/AuthForm";
import { registerUser } from "./users";

export function SignUp() {
  return (
    <AuthForm
      submitButtonText="Criar Conta"
      onSubmit={(email, password, name) => registerUser(email, password, name!)}
      successMessage="Conta criada com sucesso!"
      mode="signup"
    />
  );
}
