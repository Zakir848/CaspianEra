import {
  Alert,
  AlertTitle,
  Box,
  Button,
} from "@mui/material";

import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";

export default function ErrorMessage({
  title = "Xəta baş verdi",
  message = "Məlumatları əldə etmək mümkün olmadı.",
  onRetry,
}) {
  return (
    <Box
      sx={{
        width: "100%",
        py: 3,
      }}
    >
      <Alert
        severity="error"
        sx={{
          borderRadius: 3,
          alignItems: "center",
        }}
        action={
          onRetry ? (
            <Button
              color="inherit"
              size="small"
              startIcon={<RefreshRoundedIcon />}
              onClick={onRetry}
              sx={{
                textTransform: "none",
                fontWeight: 600,
              }}
            >
              Yenidən yoxla
            </Button>
          ) : null
        }
      >
        <AlertTitle sx={{ fontWeight: 700 }}>
          {title}
        </AlertTitle>

        {message}
      </Alert>
    </Box>
  );
}