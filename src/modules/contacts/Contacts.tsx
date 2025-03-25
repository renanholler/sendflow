import { Header } from "@/components/Header";
import { useAuth } from "@/contexts/AuthContext";
import { db } from "@/services/firebase";
import { Button, Fab, TextField } from "@mui/material";
import { MuiTelInput } from "mui-tel-input";

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ContactItem } from "./components/ContactItem";

type Contact = {
  id: string;
  name: string;
  phone: string;
};

export function Contacts() {
  const { id: connectionId } = useParams();
  const { user } = useAuth();
  const [form, setForm] = useState({ name: "", phone: "" });
  const [contacts, setContacts] = useState<Contact[]>([]);
  const navigate = useNavigate();

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!form.name.trim() || !form.phone.trim() || !user || !connectionId)
      return;

    await addDoc(collection(db, "contacts"), {
      name: form.name.trim(),
      phone: form.phone.trim(),
      userId: user.uid,
      connectionId,
      createdAt: serverTimestamp(),
    });

    setForm({ name: "", phone: "" });
  };

  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, "contacts", id));
  };

  return (
    <>
      <Header />
      <div className="min-h-screen p-6">
        <h1 className="text-2xl font-bold mb-6">Contatos</h1>
        <Button
          variant="outlined"
          className="mb-4"
          component={Link}
          to={`/connections/${connectionId}/messages/manage`}
        >
          Ver Mensagens
        </Button>
        <div className="flex gap-2 mb-6">
          <TextField
            label="Nome"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-3/4"
          />
          <MuiTelInput
            label="Telefone"
            name="phone"
            value={form.phone}
            onChange={(value) => setForm((prev) => ({ ...prev, phone: value }))}
            defaultCountry="BR"
            className="w-1/4"
          />
          <Button variant="contained" onClick={handleSubmit}>
            Adicionar
          </Button>
        </div>

        <ul className="space-y-2">
          {contacts.map((contact) => (
            <ContactItem
              key={contact.id}
              id={contact.id}
              name={contact.name}
              phone={contact.phone}
              onDelete={handleDelete}
            />
          ))}
        </ul>
        <Fab
          color="primary"
          variant="extended"
          aria-label="agendar mensagem"
          onClick={() => navigate(`/connections/${connectionId}/messages`)}
          sx={{
            position: "fixed",
            bottom: 24,
            right: 24,
          }}
        >
          Enviar mensagem
        </Fab>
      </div>
    </>
  );
}
