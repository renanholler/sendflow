import { createUserWithEmailAndPassword } from "firebase/auth";
import { AuthForm } from "../../components/AuthForm";
import { auth } from "../../services/firebase";

export function SignUp() {
  return (
    <AuthForm
      submitButtonText="Criar Conta"
      onSubmit={(email, password) =>
        createUserWithEmailAndPassword(auth, email, password)
      }
      successMessage="Conta criada com sucesso!"
      mode="signup"
    />
  );
}
