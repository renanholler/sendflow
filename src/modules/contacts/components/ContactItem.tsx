import { Button } from "@mui/material";

type Props = {
  id: string;
  name: string;
  phone: string;
  onDelete: (id: string) => void;
};

export function ContactItem({ id, name, phone, onDelete }: Props) {
  return (
    <li className="bg-white p-4 rounded shadow border border-gray-200 flex justify-between items-center ">
      <div>
        <p className="font-medium">{name}</p>
        <p className="text-sm text-gray-500">{phone}</p>
      </div>
      <Button variant="contained" color="error" onClick={() => onDelete(id)}>
        Excluir
      </Button>
    </li>
  );
}
