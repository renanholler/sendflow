import { BackButton } from "@/components/ui/BackButton";
import { Connection } from "@/types/connections";
import { Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { ConnectionItem } from "./components/ConnectionItem";
import {
  addConnection,
  deleteConnection,
  listenConnections,
} from "./connectionsModel";

export function Connections() {
  const { user } = useAuth();
  const [newName, setNewName] = useState("");
  const [connections, setConnections] = useState<Connection[]>([]);

  useEffect(() => {
    if (!user?.uid) return;
    return listenConnections(user.uid, setConnections);
  }, [user]);

  const handleAddConnection = async () => {
    if (!newName.trim() || !user?.uid) return;
    await addConnection(user.uid, newName);
    setNewName("");
  };

  const handleDeleteConnection = async (id: string) => {
    await deleteConnection(id);
  };

  return (
    <div className="min-h-[84vh] p-6">
      <div className="flex items-center gap-2 mb-6">
        <BackButton />
        <h1 className="text-2xl font-bold">Suas Conexões</h1>
      </div>
      <div className="flex gap-2">
        <TextField
          label="Nome da conexão"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          fullWidth
          required
        />
        <Button
          variant="contained"
          onClick={handleAddConnection}
          disabled={!user?.uid || !newName.trim()}
        >
          Adicionar
        </Button>
      </div>

      <ul className="mt-6 space-y-2">
        {connections.map((conn) => (
          <ConnectionItem
            key={conn.id}
            id={conn.id}
            name={conn.name}
            onDelete={handleDeleteConnection}
          />
        ))}
      </ul>
    </div>
  );
}
