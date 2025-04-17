import useObservable from "@/hooks/useObservable";
import { db } from "@/services/firebase";
import {
  addDoc,
  collection,
  doc,
  query,
  serverTimestamp,
  Timestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { collectionData } from "rxfire/firestore";
import { Observable } from "rxjs";

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

const messagesCollection = collection(db, Collection.MESSAGES);

export function listenMessages(userId: string, connectionId: string) {
  const q = query(
    messagesCollection,
    where("userId", "==", userId),
    where("connectionId", "==", connectionId)
  );
  return collectionData(q, { idField: "id" }) as Observable<Message[]>;
}

export async function addMessage(data: Omit<Message, "id">) {
  await addDoc(messagesCollection, {
    ...data,
    createdAt: serverTimestamp(),
  });
}

export async function updateMessageStatus(id: string, status: MessageStatus) {
  await updateDoc(doc(messagesCollection, id), {
    status,
  });
}

export function useMessagesListener(userId: string, connectionId: string) {
  const messages$ = useObservable(
    () => listenMessages(userId, connectionId),
    [userId, connectionId],
    []
  );

  return { messages: messages$ || [], loading: !messages$ };
}
