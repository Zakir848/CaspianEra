import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";

export default function ResendOtpButton({ onResend, disabled = false }) {
  const { t } = useTranslation();
  const unavailable = !onResend;

  return (
    <Button
      type="button"
      variant="text"
      disabled={disabled || unavailable}
      onClick={onResend}
      sx={{
        minHeight: 40,
        px: 1,
        color: "primary.main",
        fontSize: 13,
        "&:hover": { bgcolor: "rgba(24,59,74,.06)" },
      }}
    >
      {t("confirmEmail.resendCode")}
    </Button>
  );
}