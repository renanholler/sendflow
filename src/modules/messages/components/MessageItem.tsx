import { Timestamp } from "firebase/firestore";
import { MessageStatus } from "../messages";

type Props = {
  msg: {
    id: string;
    text: string;
    scheduledAt: Timestamp;
    status: MessageStatus;
  };
  onClick: () => void;
};

export function MessageItem({ msg, onClick }: Props) {
  return (
    <li onClick={onClick} className="cursor-pointer">
      <div className="p-4 bg-white rounded shadow border border-gray-200 hover:shadow-md transition">
        <div className="flex items-center justify-between mb-1">
          <p className="font-semibold text-base">{msg.text}</p>
          <span
            className={`text-xs px-2 py-1 rounded-full ${
              msg.status === MessageStatus.ENVIADO
                ? "bg-green-100 text-green-800"
                : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {msg.status}
          </span>
        </div>
        <p className="text-sm text-gray-500">
          Agendada para:{" "}
          {msg.scheduledAt.toDate().toLocaleString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>
    </li>
  );
}
