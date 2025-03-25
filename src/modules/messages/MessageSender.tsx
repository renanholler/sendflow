import { useAuth } from "@/contexts/AuthContext";
import { db } from "@/services/firebase";
import {
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

type Contact = {
  id: string;
  name: string;
  phone: string;
};

export function MessageSender() {
  const { id: connectionId } = useParams();
  const { user } = useAuth();

  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [schedule, setSchedule] = useState("");

  useEffect(() => {
    if (!user || !connectionId) return;

    const q = query(
      collection(db, "contacts"),
      where("userId", "==", user.uid),
      where("connectionId", "==", connectionId)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Contact[];
      setContacts(data);
    });

    return () => unsubscribe();
  }, [user, connectionId]);

  const toggleContact = (id: string) => {
    setSelectedContacts((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
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

    await addDoc(collection(db, "messages"), {
      userId: user.uid,
      connectionId,
      contactIds: selectedContacts,
      text: message.trim(),
      scheduledAt: new Date(schedule),
      status: "agendado",
      createdAt: serverTimestamp(),
    });

    setMessage("");
    setSchedule("");
    setSelectedContacts([]);
  };

  return (
    <div className="min-h-screen p-6">
      <Typography variant="h5" className="mb-4">
        Agendar Mensagem
      </Typography>

      <div className="mb-4">
        <TextField
          label="Mensagem"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          multiline
          fullWidth
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

      <Typography variant="subtitle1" className="mb-2">
        Selecionar Contatos
      </Typography>
      <div className="mb-4 space-y-1">
        {contacts.map((contact) => (
          <FormControlLabel
            key={contact.id}
            control={
              <Checkbox
                checked={selectedContacts.includes(contact.id)}
                onChange={() => toggleContact(contact.id)}
              />
            }
            label={`${contact.name} (${contact.phone})`}
          />
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
