import useObservable from "@/hooks/useObservable";
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

export function useContactsListener(connectionId: string) {
  const contacts$ = useObservable(
    () => listenContacts(connectionId),
    [connectionId],
    []
  );

  return { contacts: contacts$ || [], loading: !contacts$ };
}
