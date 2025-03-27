import { db } from "@/services/firebase";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  query,
  serverTimestamp,
  Timestamp,
  updateDoc,
  where,
} from "firebase/firestore";

export enum Collection {
  MESSAGES = "messages",
}

export enum MessageStatus {
  AGENDADO = "agendado",
  ENVIADO = "enviado",
}

export type Message = {
  id: string;
  text: string;
  contactIds: string[];
  userId: string;
  connectionId: string;
  scheduledAt: Timestamp;
  status: MessageStatus;
};

export function listenMessages(
  userId: string,
  connectionId: string,
  callback: (data: Message[]) => void
) {
  const q = query(
    collection(db, Collection.MESSAGES),
    where("userId", "==", userId),
    where("connectionId", "==", connectionId)
  );

  return onSnapshot(q, (snapshot) => {
    const messages = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<Message, "id">),
    }));
    callback(messages);
  });
}

export async function addMessage(data: Omit<Message, "id">) {
  await addDoc(collection(db, Collection.MESSAGES), {
    ...data,
    createdAt: serverTimestamp(),
  });
}

export async function updateMessageStatus(id: string, status: MessageStatus) {
  await updateDoc(doc(db, Collection.MESSAGES, id), {
    status,
  });
}
