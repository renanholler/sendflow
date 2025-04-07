import { db } from "@/services/firebase";
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

export type Contact = {
  id: string;
  name: string;
  phone: string;
  connectionId: string;
  createdAt?: Date;
};

export function listenContacts(
  connectionId: string,
  callback: (data: Contact[]) => void
) {
  const q = query(
    collection(db, "contacts"),
    where("connectionId", "==", connectionId)
  );

  return onSnapshot(q, (snapshot) => {
    const contacts = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<Contact, "id">),
    }));
    callback(contacts);
  });
}

export async function addContact(
  connectionId: string,
  name: string,
  phone: string
) {
  if (!name.trim() || !phone.trim()) return;

  await addDoc(collection(db, "contacts"), {
    name: name.trim(),
    phone: phone.trim(),
    connectionId,
    createdAt: serverTimestamp(),
  });
}

export async function deleteContact(id: string) {
  await deleteDoc(doc(db, "contacts", id));
}

import { useEffect, useState } from "react";

export function useContactsListener(connectionId?: string) {
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

  return { contacts, loading };
}
