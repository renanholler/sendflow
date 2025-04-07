import { BackButton } from "@/components/ui/BackButton";
import { useAuth } from "@/contexts/AuthContext";
import {
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import { Timestamp } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { listenContacts } from "../contacts/contactsModel";
import { addMessage, MessageStatus } from "./messages";

type Contact = {
  id: string;
  name: string;
  phone: string;
};

export function MessageSender() {
  const { user } = useAuth();
  const { id: connectionId } = useParams();

  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [schedule, setSchedule] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || !connectionId) return;
    return listenContacts(connectionId, setContacts);
  }, [user, connectionId]);

  const toggleContact = (id: string) => {
    setSelectedContacts((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedContacts.length === contacts.length) {
      setSelectedContacts([]);
    } else {
      setSelectedContacts(contacts.map((c) => c.id));
    }
  };

  const handleSubmit = async () => {
    if (
      !user ||
      !connectionId ||
      !message.trim() ||
      !schedule ||
      selectedContacts.length === 0
    )
      return;

    await addMessage({
      userId: user.uid,
      connectionId,
      contactIds: selectedContacts,
      text: message.trim(),
      scheduledAt: Timestamp.fromDate(new Date(schedule)),
      status: MessageStatus.AGENDADO,
    });

    setMessage("");
    setSchedule("");
    setSelectedContacts([]);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-[84vh] p-6">
      <div className="flex items-center gap-2 mb-6">
        <BackButton />
        <Typography variant="h5" className="mb-4">
          Nova Mensagem
        </Typography>
      </div>

      <div className="mb-4">
        <TextField
          label="Mensagem"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          multiline
          fullWidth
          rows={4}
        />
      </div>

      <div className="mb-4">
        <TextField
          label="Agendar para"
          type="datetime-local"
          value={schedule}
          onChange={(e) => setSchedule(e.target.value)}
          fullWidth
          InputLabelProps={{ shrink: true }}
        />
      </div>

      <div className="flex justify-between items-center mb-2">
        <Typography variant="subtitle1">Selecionar Contatos</Typography>
        <Button variant="contained" onClick={toggleSelectAll} size="small">
          {selectedContacts.length === contacts.length
            ? "Desmarcar Todos"
            : "Selecionar Todos"}
        </Button>
      </div>
      <div
        className="mb-4 border rounded max-h-40 overflow-y-auto flex flex-wrap gap-2"
        style={{ maxHeight: "200px" }}
      >
        {contacts.map((contact) => (
          <div
            className="hover:bg-gray-100 p-2 rounded w-fit"
            style={{ flex: "0 0 auto" }}
            key={contact.id}
          >
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedContacts.includes(contact.id)}
                  onChange={() => toggleContact(contact.id)}
                />
              }
              label={`${contact.name} (${contact.phone})`}
            />
          </div>
        ))}
      </div>

      <Button
        variant="contained"
        onClick={handleSubmit}
        disabled={!message.trim() || !schedule || selectedContacts.length === 0}
      >
        Agendar
      </Button>
    </div>
  );
}
