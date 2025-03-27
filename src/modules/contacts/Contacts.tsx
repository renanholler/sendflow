import { Button, CircularProgress, TextField } from "@mui/material";
import { MuiTelInput } from "mui-tel-input";

import { BackButton } from "@/components/ui/BackButton";
import {
  addContact,
  Contact,
  deleteContact,
  listenContacts,
} from "@/services/firestore/contacts";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ContactItem } from "./components/ContactItem";

export function Contacts() {
  const { id: connectionId } = useParams();
  const [form, setForm] = useState({ name: "", phone: "" });
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!connectionId) return;

    const unsubscribe = listenContacts(connectionId, (data) => {
      setContacts(data);
      setLoading(false);
    });

    return unsubscribe;
  }, [connectionId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!form.name.trim() || !form.phone.trim() || !connectionId) return;
    await addContact(connectionId, form.name, form.phone);
    setForm({ name: "", phone: "" });
  };

  const handleDelete = async (id: string) => {
    await deleteContact(id);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh]">
        <CircularProgress color="primary" />
      </div>
    );
  }

  return (
    <>
      <div className="min-h-[84vh] p-6">
        <div className="flex items-center gap-2 mb-6">
          <BackButton />
          <h1 className="text-2xl font-bold">Contatos</h1>
        </div>
        <div className="flex gap-2 mb-6">
          <TextField
            label="Nome"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-3/4"
            required
          />
          <MuiTelInput
            label="Telefone"
            name="phone"
            value={form.phone}
            onChange={(value) => setForm((prev) => ({ ...prev, phone: value }))}
            defaultCountry="BR"
            className="w-1/4"
            required
          />
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={!form.name.trim() || !form.phone.trim()}
          >
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
      </div>
    </>
  );
}
