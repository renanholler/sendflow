import { ThemeProvider } from "@mui/material/styles";
import { AuthProvider } from "./modules/auth/AuthContext";
import { RouterProvider } from "./routes/RouterProvider";
import { theme } from "./styles/theme";

function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <RouterProvider />
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
