import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "rgb(250, 223, 76)",
      contrastText: "#000",
    },
    secondary: {
      main: "#111",
      contrastText: "#fff",
    },
    error: {
      main: "#d32f2f",
    },
    background: {
      default: "#111",
      paper: "#1a1a1a",
    },
  },
  shape: {
    borderRadius: 8,
  },
});
