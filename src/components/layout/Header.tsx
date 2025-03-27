import { auth } from "@/services/firebase";
import { AppBar, Button, Toolbar } from "@mui/material";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export function Header() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/signin");
  };

  return (
    <AppBar position="fixed" color="secondary" className="z-50 shadow">
      <Toolbar className="flex justify-between">
        <img
          src="/assets/logo.svg"
          alt="SendFlow"
          className="h-10 cursor-pointer"
          onClick={() => navigate("/dashboard")}
        />
        <Button color="primary" variant="contained" onClick={handleLogout}>
          Sair
        </Button>
      </Toolbar>
    </AppBar>
  );
}
