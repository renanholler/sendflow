import CloseIcon from "@mui/icons-material/Close";
import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import { Timestamp } from "firebase/firestore";
import { MessageStatus } from "../MessagesModel";

type Props = {
  message: {
    id: string;
    text: string;
    scheduledAt: Timestamp;
    status: MessageStatus;
  } | null;
  onClose: () => void;
};

export function MessageModal({ message, onClose }: Props) {
  return (
    <Dialog
      open={!!message}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          backgroundColor: "white",
        },
      }}
    >
      <DialogTitle className="flex justify-between items-center">
        Detalhes da Mensagem
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent className="space-y-4">
        <div>
          <p className="text-sm font-semibold">Mensagem:</p>
          <p>{message?.text}</p>
        </div>
        <div>
          <p className="text-sm font-semibold">Status:</p>
          <p>{message?.status}</p>
        </div>
        <div>
          <p className="text-sm font-semibold">Agendada para:</p>
          <p>
            {message?.scheduledAt.toDate().toLocaleString("pt-BR", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
