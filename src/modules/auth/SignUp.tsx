import { AuthForm } from "./components/AuthForm";
import { registerUser } from "./UsersModel";

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
