import { auth } from "@/services/firebase";
import { Button } from "@mui/material";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export function Header() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/signin");
  };

  return (
    <header className="flex justify-between items-center p-4 bg-[var(--bg-black)]">
      <h1 className="text-xl font-semibold text-white">SendFlow</h1>
      <Button variant="contained" onClick={handleLogout}>
        Sair
      </Button>
    </header>
  );
}
