import { ArrowBack } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";

export function BackButton() {
  const navigate = useNavigate();

  return (
    <Tooltip title="Voltar">
      <IconButton onClick={() => navigate(-1)} size="large">
        <ArrowBack />
      </IconButton>
    </Tooltip>
  );
}
