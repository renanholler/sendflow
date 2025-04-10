import { useRxObservable } from "@/hooks/useRxObservable";
import { db } from "@/services/firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { useMemo } from "react";
import { collectionData } from "rxfire/firestore";
import { Observable } from "rxjs";

export type Contact = {
  id: string;
  name: string;
  phone: string;
  connectionId: string;
  createdAt?: Date;
};

const contactsCollection = collection(db, "contacts");

export function listenContacts(connectionId: string) {
  const q = query(
    contactsCollection,
    where("connectionId", "==", connectionId)
  );
  return collectionData(q, { idField: "id" }) as Observable<Contact[]>;
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

export function useContactsListener(connectionId: string) {
  const observable$ = useMemo(
    () => listenContacts(connectionId),
    [connectionId]
  );
  const { data: contacts, loading } = useRxObservable<Contact[]>(observable$);

  if (!contacts) {
    return { contacts: [], loading };
  }

  return { contacts, loading };
}
