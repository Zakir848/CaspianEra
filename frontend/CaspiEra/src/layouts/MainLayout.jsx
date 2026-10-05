import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

import Footer from "../components/navigation/Footer";

export default function MainLayout() {
  return (
    <Box
      sx={{
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        bgcolor: "#F7F9FC",
      }}
    >
      <Box
        component="main"
        sx={{
          flex: 1,
        }}
      >
        <Outlet />
      </Box>

      <Footer />
    </Box>
  );
}