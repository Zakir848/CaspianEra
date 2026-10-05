import { Box, CircularProgress, Typography } from "@mui/material";

export default function Loading({ text = "Yüklənir..." }) {
  return (
    <Box
      sx={{
        minHeight: 200,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 2,
      }}
    >
      <CircularProgress
        size={38}
        thickness={4}
        sx={{
          color: "#0B3B60",
        }}
      />

      <Typography
        sx={{
          color: "#64748B",
          fontSize: 14,
          fontWeight: 500,
        }}
      >
        {text}
      </Typography>
    </Box>
  );
}