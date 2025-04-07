import { BackButton } from "@/components/ui/BackButton";
import { useAuth } from "@/contexts/AuthContext";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { Timestamp } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MessageItem } from "./components/MessageItem";
import { MessageModal } from "./components/MessageModal";
import { listenMessages, MessageStatus } from "./messages";

type Message = {
  id: string;
  text: string;
  scheduledAt: Timestamp;
  status: MessageStatus;
  contactIds: string[]; // Adicionado para suportar contatos enviados
};

export function MessageManager() {
  const { user } = useAuth();
  const { id: connectionId } = useParams();
  const [messages, setMessages] = useState<Message[]>([]);
  const [statusFilter, setStatusFilter] = useState<MessageStatus | "all">(
    "all"
  );
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const handleClose = () => setSelectedMessage(null);

  useEffect(() => {
    if (!user || !connectionId) return;
    return listenMessages(user.uid, connectionId, setMessages);
  }, [user, connectionId]);

  const filtered =
    statusFilter === "all"
      ? messages
      : messages.filter((m) => m.status === statusFilter);

  return (
    <div className="min-h-[84vh] p-6">
      <div className="flex items-center gap-2 mb-6">
        <BackButton />
        <h1 className="text-2xl font-bold">Mensagens</h1>
      </div>
      <ToggleButtonGroup
        value={statusFilter}
        exclusive
        onChange={(_, value) => value && setStatusFilter(value)}
        className="mb-6"
      >
        <ToggleButton value="all">Todas</ToggleButton>
        <ToggleButton value={MessageStatus.AGENDADO}>Agendadas</ToggleButton>
        <ToggleButton value={MessageStatus.ENVIADO}>Enviadas</ToggleButton>
      </ToggleButtonGroup>

      <div className="flex justify-between items-center mb-2">
        <p className="text-sm text-gray-600">
          {filtered.length} mensagem{filtered.length !== 1 ? "s" : ""} encontrad
          {filtered.length !== 1 ? "as" : "a"}
        </p>
      </div>
      <ul className="space-y-3">
        {filtered.map((msg) => (
          <MessageItem
            key={msg.id}
            msg={msg}
            onClick={() => setSelectedMessage(msg)}
          />
        ))}
      </ul>

      <MessageModal message={selectedMessage} onClose={handleClose} />
    </div>
  );
}
