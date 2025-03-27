import { Box, Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import { Header } from "./Header";

export function AppLayout() {
  return (
    <Box className="min-h-screen">
      <Header />
      <Container className="max-w-screen-lg pt-16">
        <Outlet />
      </Container>
    </Box>
  );
}
