import { User } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { authState } from "rxfire/auth";
import { auth } from "../../services/firebase";

type AuthContextType = {
  user: User | null;
  loading: boolean;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
});

export function AuthProvider(props: AuthProviderProps) {
  const { children } = props;
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const sub = authState(auth).subscribe((user) => {
      setUser(user);
      setLoading(false);
    });

    return () => sub.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
