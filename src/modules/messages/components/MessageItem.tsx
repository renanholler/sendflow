import { Timestamp } from "firebase/firestore";
import { MessageStatus } from "../MessagesModel";

interface MessageItemProps {
  msg: {
    id: string;
    text: string;
    scheduledAt: Timestamp;
    status: MessageStatus;
  };
  onClick: () => void;
}

export function MessageItem(props: MessageItemProps) {
  const { msg, onClick } = props;
  return (
    <li
      className="bg-white p-4 rounded shadow border border-gray-200 flex justify-between items-center cursor-pointer hover:bg-gray-50"
      onClick={onClick}
    >
      <div>
        <p className="font-medium">{msg.text}</p>
        <p className="text-sm text-gray-500">
          {msg.scheduledAt.toDate().toLocaleString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>
      <div>
        <p
          className={`text-sm font-medium ${
            msg.status === MessageStatus.AGENDADO
              ? "text-yellow-600"
              : msg.status === MessageStatus.ENVIADO
              ? "text-green-600"
              : "text-red-600"
          }`}
        >
          {msg.status === MessageStatus.AGENDADO
            ? "Agendado"
            : msg.status === MessageStatus.ENVIADO
            ? "Enviada"
            : "Falhou"}
        </p>
      </div>
    </li>
  );
}
