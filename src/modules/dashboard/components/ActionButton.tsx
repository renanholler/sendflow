import { Button } from "@mui/material";

interface ActionButtonProps {
  title: string;
  clickHandler: () => void;
}

export function ActionButton(props: ActionButtonProps) {
  const { title, clickHandler } = props;
  return (
    <Button
      variant="contained"
      className="h-30 w-70"
      sx={{ fontWeight: "bold" }}
      onClick={clickHandler}
    >
      {title}
    </Button>
  );
}
