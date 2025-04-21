import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface ConnectionItemProps {
  id: string;
  name: string;
  onDelete: (id: string) => void;
}

export function ConnectionItem(props: ConnectionItemProps) {
  const { id, name, onDelete } = props;
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/connections/${id}/contacts`);
  };

  return (
    <li className="bg-white p-4 rounded shadow border border-gray-200 flex justify-between items-center">
      <div onClick={handleNavigate} className="cursor-pointer">
        <p className="font-medium">{name}</p>
      </div>
      <Button variant="contained" color="error" onClick={() => onDelete(id)}>
        Excluir
      </Button>
    </li>
  );
}
