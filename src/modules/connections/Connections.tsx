import { Button, TextField } from "@mui/material";
import { signOut } from "firebase/auth";
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
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { auth, db } from "../../services/firebase";

type Connection = {
  id: string;
  name: string;
};

export function Connections() {
  const { user } = useAuth();
  const [newName, setNewName] = useState("");
  const [connections, setConnections] = useState<Connection[]>([]);
  const navigate = useNavigate();

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

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/signin");
  };

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
    <div className="min-h-screen p-6">
      <Button variant="outlined" onClick={handleLogout} className="ml-auto">
        Sair
      </Button>
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
          <li
            key={conn.id}
            className="bg-white p-4 rounded shadow border border-gray-200"
          >
            {conn.name}
            <Button
              variant="outlined"
              color="error"
              onClick={() => handleDeleteConnection(conn.id)}
            >
              Excluir
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
