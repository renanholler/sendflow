import { BackButton } from "@/components/ui/BackButton";
import { useAuth } from "@/contexts/AuthContext";
import {
  ConnectionMode,
  useConnectionsListener,
} from "@/modules/connections/ConnectionsModel";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";

type Props = {
  mode: ConnectionMode;
};

export function ConnectionSelector({ mode }: Props) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { connections, loading } = useConnectionsListener(user?.uid || "");

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh]">
        <CircularProgress color="primary" />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-[84vh] p-6">
      <div className="flex items-center gap-2 mb-6">
        <BackButton />
        <h1 className="text-2xl font-bold">Selecione uma conexão</h1>
      </div>
      {connections.length === 0 && <p>Nenhuma conexão encontrada</p>}
      <ul className="space-y-2">
        {connections.map((conn) => (
          <li key={conn.id}>
            <button
              onClick={() =>
                navigate(
                  mode === ConnectionMode.SEND
                    ? `/send/${conn.id}`
                    : `/messages/${conn.id}`
                )
              }
              className="bg-white p-4 rounded shadow border border-gray-200 flex justify-between items-center w-full cursor-pointer"
            >
              {conn.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
