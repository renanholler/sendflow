import { useAuth } from "@/contexts/AuthContext";
import { db } from "@/services/firebase";
import { ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

type Message = {
  id: string;
  text: string;
  scheduledAt: string;
  status: "agendado" | "enviado";
};

export function MessageManager() {
  const { user } = useAuth();
  const { id: connectionId } = useParams();
  const [messages, setMessages] = useState<Message[]>([]);
  const [statusFilter, setStatusFilter] = useState<
    "agendado" | "enviado" | "all"
  >("all");

  useEffect(() => {
    if (!user || !connectionId) return;

    const q = query(
      collection(db, "messages"),
      where("userId", "==", user.uid),
      where("connectionId", "==", connectionId)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Message[];
      setMessages(data);
    });

    return () => unsubscribe();
  }, [user, connectionId]);

  const filtered =
    statusFilter === "all"
      ? messages
      : messages.filter((m) => m.status === statusFilter);

  return (
    <div className="min-h-screen p-6">
      <Typography variant="h5" className="mb-4">
        Mensagens
      </Typography>

      <ToggleButtonGroup
        value={statusFilter}
        exclusive
        onChange={(_, value) => value && setStatusFilter(value)}
        className="mb-6"
      >
        <ToggleButton value="all">Todas</ToggleButton>
        <ToggleButton value="agendado">Agendadas</ToggleButton>
        <ToggleButton value="enviado">Enviadas</ToggleButton>
      </ToggleButtonGroup>

      <ul className="space-y-2">
        {filtered.map((msg) => (
          <li
            key={msg.id}
            className="bg-white p-4 rounded shadow border border-gray-200"
          >
            <p className="font-medium">{msg.text}</p>
            <p className="text-sm text-gray-500">
              Agendada para: {new Date(msg.scheduledAt).toLocaleString()}
            </p>
            <p className="text-xs text-gray-400">Status: {msg.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
