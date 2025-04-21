import { BackButton } from "@/components/ui/BackButton";
import {
  CircularProgress,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { Timestamp } from "firebase/firestore";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { MessageItem } from "./components/MessageItem";
import { MessageModal } from "./components/MessageModal";
import { MessageStatus, useMessagesListener } from "./MessagesModel";

type Message = {
  id: string;
  text: string;
  scheduledAt: Timestamp;
  status: MessageStatus;
  contactIds: string[];
};

export function MessageManager() {
  const { user } = useAuth();
  const { id: connectionId } = useParams();
  const [statusFilter, setStatusFilter] = useState<MessageStatus | "all">(
    "all"
  );
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const handleClose = () => setSelectedMessage(null);
  const { data: messages, loading } = useMessagesListener({
    userId: user?.uid || "",
    connectionId: connectionId || "",
  });

  const filtered =
    statusFilter === "all"
      ? messages
      : messages?.filter((m) => m.status === statusFilter) || [];

  return (
    <div className="min-h-[84vh] p-6">
      <div className="flex items-center gap-2 mb-6">
        <BackButton />
        <h1 className="text-2xl font-bold">Mensagens</h1>
      </div>
      {loading && (
        <div className="flex justify-center items-center h-full">
          <CircularProgress />
        </div>
      )}
      {!loading && (
        <>
          <ToggleButtonGroup
            value={statusFilter}
            exclusive
            onChange={(_, value) => value && setStatusFilter(value)}
            className="mb-6"
          >
            <ToggleButton value="all">Todas</ToggleButton>
            <ToggleButton value={MessageStatus.AGENDADO}>
              Agendadas
            </ToggleButton>
            <ToggleButton value={MessageStatus.ENVIADO}>Enviadas</ToggleButton>
          </ToggleButtonGroup>

          <div className="flex justify-between items-center mb-2"></div>
          <ul className="space-y-3">
            {filtered.map((msg) => (
              <MessageItem
                key={msg.id}
                msg={msg}
                onClick={() => setSelectedMessage(msg)}
              />
            ))}
          </ul>
        </>
      )}

      <MessageModal message={selectedMessage} onClose={handleClose} />
    </div>
  );
}
