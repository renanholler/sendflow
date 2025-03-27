import { Button } from "@mui/material";

type Props = {
  title: string;
  clickHandler: () => void;
};

export function ActionButton({ title, clickHandler }: Props) {
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
