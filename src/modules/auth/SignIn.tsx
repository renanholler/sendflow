import { auth } from "@/services/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { AuthForm } from "./components/AuthForm";

export function SignIn() {
  return (
    <AuthForm
      submitButtonText="Entrar"
      onSubmit={(email, password) =>
        signInWithEmailAndPassword(auth, email, password)
      }
      mode="signin"
    />
  );
}
