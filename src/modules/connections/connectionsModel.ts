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

export function listenConnections(userId: string): Observable<Connection[]> {
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
  await deleteDoc(doc(db, "connections", id));
}

export function useConnectionsListener(userId: string) {
  const observable$ = useMemo(() => listenConnections(userId), [userId]);
  const { data: connections, loading } =
    useRxObservable<Connection[]>(observable$);

  if (!connections) {
    return { connections: [], loading };
  }

  return { connections, loading };
}
