import { useAuth } from "@/contexts/AuthContext";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ActionButton } from "./components/ActionButton";

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <Box className="flex flex-col pt-[30vh]">
      <Typography variant="h4" className="text-center">
        Olá, {user?.displayName || user?.email?.split("@")[0]}
      </Typography>

      <Box className="flex mt-10 justify-evenly w-full">
        <ActionButton
          title="Nova mensagem"
          clickHandler={() => navigate("/send")}
        />
        <ActionButton
          title="Ver mensagens"
          clickHandler={() => navigate("/messages")}
        />
        <ActionButton
          title="Gerenciar Conexões"
          clickHandler={() => navigate("/connections")}
        />
      </Box>
    </Box>
  );
}
