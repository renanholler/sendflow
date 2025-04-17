import { Navigate } from "react-router-dom";
import { useAuth } from "../modules/auth/AuthContext";

interface PrivateRouteProps {
  children: React.ReactNode;
}

export const PrivateRoute = (props: PrivateRouteProps) => {
  const { children } = props;
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/signin" />;
  }

  return <>{children}</>;
};
