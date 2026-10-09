import { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import OtpInput from "./OtpInput";
import ResendOtpButton from "./ResendOtpButton";

const CODE_LENGTH = 6;

export default function VerifyEmailForm({ onVerify, onResend }) {
  const { t } = useTranslation();
  const [code, setCode] = useState("");
  const [status, setStatus] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    if (code.length !== CODE_LENGTH || !onVerify) return;

    setStatus("");
    const result = await onVerify(code);
    if (typeof result === "string") setStatus(result);
  }

  function handleCodeChange(nextCode) {
    setCode(nextCode);
    setStatus("");
  }

  return (
    <Box
      component="form"
      aria-label={t("confirmEmail.codeFormLabel")}
      onSubmit={handleSubmit}
    >
      <OtpInput value={code} onChange={handleCodeChange} />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        disabled={code.length !== CODE_LENGTH}
        sx={{
          minHeight: 52,
          borderRadius: 1.25,
          bgcolor: "primary.main",
          color: "primary.contrastText",
          fontSize: 15,
          "&:hover": { bgcolor: "primary.dark" },
          "&.Mui-disabled": {
            color: "rgba(255,255,255,.68)",
            bgcolor: "rgba(24,59,74,.48)",
          },
        }}
      >
        {t("confirmEmail.submit")}
      </Button>
      {status && (
        <Typography
          role="status"
          aria-live="polite"
          sx={{
            mt: 1.5,
            color: "warning.dark",
            fontSize: 13,
            lineHeight: 1.6,
            textAlign: "center",
          }}
        >
          {status}
        </Typography>
      )}
      <Box
        sx={{
          mt: 1.5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <ResendOtpButton onResend={onResend} />
        {!onResend && (
          <Typography
            sx={{
              color: "text.secondary",
              fontSize: 12,
              lineHeight: 1.6,
              textAlign: "center",
            }}
          >
            {t("confirmEmail.resendUnavailable")}
          </Typography>
        )}
      </Box>
    </Box>
  );
}