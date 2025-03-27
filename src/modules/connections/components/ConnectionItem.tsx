import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

type Props = {
  id: string;
  name: string;
  onDelete: (id: string) => void;
};

export function ConnectionItem({ id, name, onDelete }: Props) {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/connections/${id}`);
  };

  return (
    <li
      className="bg-white p-4 rounded shadow border border-gray-200 flex justify-between items-center hover:bg-gray-200 hover:shadow-sm transition cursor-pointer"
      onClick={(e) => {
        if ((e.target as HTMLElement).closest("button")) return;
        handleNavigate();
      }}
    >
      <div className="w-full">{name}</div>
      <Button variant="contained" color="error" onClick={() => onDelete(id)}>
        Excluir
      </Button>
    </li>
  );
}
