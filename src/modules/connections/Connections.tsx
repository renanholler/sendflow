import { Header } from "@/components/Header";
import { Button, TextField } from "@mui/material";
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
import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { db } from "../../services/firebase";
import { ConnectionItem } from "./components/ConnectionItem";

type Connection = {
  id: string;
  name: string;
};

export function Connections() {
  const { user } = useAuth();
  const [newName, setNewName] = useState("");
  const [connections, setConnections] = useState<Connection[]>([]);

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, "connections"),
      where("userId", "==", user.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Connection[];
      setConnections(data);
    });

    return () => unsubscribe();
  }, [user]);

  const handleAddConnection = async () => {
    if (!newName.trim() || !user?.uid) return;

    await addDoc(collection(db, "connections"), {
      name: newName.trim(),
      userId: user.uid,
      createdAt: serverTimestamp(),
    });

    setNewName("");
  };

  const handleDeleteConnection = async (id: string) => {
    await deleteDoc(doc(db, "connections", id));
  };

  return (
    <>
      <Header />
      <div className="min-h-screen p-6">
        <h1 className="text-2xl font-bold mb-6">Suas Conexões</h1>

        <div className="flex gap-2">
          <TextField
            label="Nome da conexão"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            fullWidth
          />
          <Button
            variant="contained"
            onClick={handleAddConnection}
            disabled={!user?.uid || !newName.trim()}
          >
            Adicionar
          </Button>
        </div>

        <ul className="mt-6 space-y-2">
          {connections.map((conn) => (
            <ConnectionItem
              key={conn.id}
              id={conn.id}
              name={conn.name}
              onDelete={handleDeleteConnection}
            />
          ))}
        </ul>
      </div>
    </>
  );
}
