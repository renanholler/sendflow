import { useCollectionListener } from "@/hooks/useCollectionListener";
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
import { collectionData } from "rxfire/firestore";
import { Observable } from "rxjs";

export type Contact = {
  id: string;
  name: string;
  phone: string;
  connectionId: string;
  createdAt?: Date;
};

interface ListenContactsParams {
  connectionId: string;
}

const contactsCollection = collection(db, "contacts");

export function listenContacts(params: ListenContactsParams) {
  const { connectionId } = params;
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

  await addDoc(contactsCollection, {
    name: name.trim(),
    phone: phone.trim(),
    connectionId,
    createdAt: serverTimestamp(),
  });
}

export async function deleteContact(id: string) {
  await deleteDoc(doc(contactsCollection, id));
}

export function useContactsListener(params: ListenContactsParams) {
  return useCollectionListener(
    () => listenContacts(params),
    Object.values(params)
  );
}
