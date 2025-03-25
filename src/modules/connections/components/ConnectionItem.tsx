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
    <li className="bg-white rounded shadow border border-gray-200 flex items-stretch">
      <div className="p-4 w-full cursor-pointer" onClick={handleNavigate}>
        {name}
      </div>
      <Button
        className="rounded-none"
        variant="contained"
        color="error"
        onClick={() => onDelete(id)}
      >
        Excluir
      </Button>
    </li>
  );
}
