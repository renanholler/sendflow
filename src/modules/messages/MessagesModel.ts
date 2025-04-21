import { useCollectionListener } from "@/hooks/useCollectionListener";
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

interface ListenMessagesParams {
  userId: string;
  connectionId: string;
}

const messagesCollection = collection(db, "messages");

export function listenMessages(params: ListenMessagesParams) {
  const { userId, connectionId } = params;
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

export function useMessagesListener(params: ListenMessagesParams) {
  return useCollectionListener(
    () => listenMessages(params),
    Object.values(params)
  );
}
