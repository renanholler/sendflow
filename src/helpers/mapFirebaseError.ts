import { FirebaseError } from "firebase/app";

export function mapFirebaseError(error: unknown): string {
  if (error instanceof FirebaseError) {
    switch (error.code) {
      case "auth/invalid-email":
        return "E-mail inválido";
      case "auth/user-not-found":
        return "Usuário não encontrado";
      case "auth/wrong-password":
      case "auth/invalid-credential":
        return "E-mail ou senha incorretos";
      case "auth/email-already-in-use":
        return "E-mail já está em uso";
      case "auth/weak-password":
        return "Senha muito fraca (mínimo 6 caracteres)";
      case "auth/missing-password":
        return "Informe a senha";
      case "auth/too-many-requests":
        return "Muitas tentativas. Tente novamente mais tarde";
      case "auth/network-request-failed":
        return "Sem conexão. Verifique sua internet";
      default:
        return "Erro desconhecido ao autenticar";
    }
  }

  return "Erro inesperado";
}
