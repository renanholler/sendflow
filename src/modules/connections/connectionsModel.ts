import { db } from "@/services/firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";

export type Connection = {
  id: string;
  name: string;
  userId: string;
  createdAt?: Date;
};

export function listenConnections(
  userId: string,
  callback: (data: Connection[]) => void
) {
  const q = query(collection(db, "connections"), where("userId", "==", userId));

  return onSnapshot(q, (snapshot) => {
    const connections = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<Connection, "id">),
    }));
    callback(connections);
  });
}

export async function addConnection(userId: string, name: string) {
  if (!name.trim()) return;

  await addDoc(collection(db, "connections"), {
    name: name.trim(),
    userId,
    createdAt: serverTimestamp(),
  });
}

export async function deleteConnection(id: string) {
  await deleteDoc(doc(db, "connections", id));
}

export async function getConnections(userId: string): Promise<Connection[]> {
  const q = query(collection(db, "connections"), where("userId", "==", userId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<Connection, "id">),
  }));
}
