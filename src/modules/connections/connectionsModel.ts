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

const connectionsCollection = collection(db, "connections");

export type Connection = {
  id: string;
  name: string;
  userId: string;
  createdAt?: Date;
};

export enum ConnectionMode {
  SEND = "send",
  LIST = "list",
}

interface ListenConnectionsParams {
  userId: string;
}

export function listenConnections(
  params: ListenConnectionsParams
): Observable<Connection[]> {
  const { userId } = params;
  const q = query(connectionsCollection, where("userId", "==", userId));
  return collectionData(q, { idField: "id" }) as Observable<Connection[]>;
}

export async function addConnection(userId: string, name: string) {
  if (!name.trim()) return;

  await addDoc(connectionsCollection, {
    name: name.trim(),
    userId,
    createdAt: serverTimestamp(),
  });
}

export async function deleteConnection(id: string) {
  await deleteDoc(doc(connectionsCollection, id));
}

export function useConnectionsListener(params: ListenConnectionsParams) {
  return useCollectionListener(
    () => listenConnections(params),
    Object.values(params)
  );
}
