import { useRef } from "react";
import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const CODE_LENGTH = 6;

export default function OtpInput({ value, onChange, disabled = false }) {
  const { t } = useTranslation();
  const inputRefs = useRef([]);
  const digits = Array.from(
    { length: CODE_LENGTH },
    (_, index) => value[index] || "",
  );

  function updateCode(index, inputValue) {
    const enteredDigits = inputValue.replace(/\D/g, "");
    const nextDigits = [...digits];

    if (!enteredDigits) {
      nextDigits[index] = "";
      onChange(nextDigits.join(""));
      return;
    }

    enteredDigits
      .slice(0, CODE_LENGTH - index)
      .split("")
      .forEach((digit, offset) => {
        nextDigits[index + offset] = digit;
      });

    onChange(nextDigits.join(""));
    const nextIndex = Math.min(index + enteredDigits.length, CODE_LENGTH - 1);
    inputRefs.current[nextIndex]?.focus();
  }

  function handleKeyDown(index, event) {
    if (event.key === "Backspace" && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (event.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (event.key === "ArrowRight" && index < CODE_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  }

  function handlePaste(index, event) {
    const pastedDigits = event.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, CODE_LENGTH - index);

    if (!pastedDigits) return;

    event.preventDefault();
    updateCode(index, pastedDigits);
  }

  return (
    <Box>
      <Typography
        component="label"
        htmlFor="email-code-0"
        sx={{
          display: "block",
          mb: 1.5,
          color: "text.primary",
          fontSize: 14,
          fontWeight: 700,
        }}
      >
        {t("confirmEmail.codeLabel")}
      </Typography>
      <Box
        role="group"
        aria-label={t("confirmEmail.codeFormLabel")}
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(6, minmax(0, 1fr))",
          gap: { xs: 1, sm: 1.5 },
          mb: 2,
        }}
      >
        {digits.map((digit, index) => (
          <Box
            key={index}
            component="input"
            ref={(element) => {
              inputRefs.current[index] = element;
            }}
            id={`email-code-${index}`}
            type="text"
            inputMode="numeric"
            autoComplete={index === 0 ? "one-time-code" : "off"}
            aria-label={t("confirmEmail.digitLabel", {
              number: index + 1,
            })}
            maxLength={CODE_LENGTH}
            value={digit}
            disabled={disabled}
            onChange={(event) => updateCode(index, event.target.value)}
            onKeyDown={(event) => handleKeyDown(index, event)}
            onPaste={(event) => handlePaste(index, event)}
            sx={{
              width: "100%",
              height: { xs: 54, sm: 66 },
              minWidth: 0,
              boxSizing: "border-box",
              border: "1px solid",
              borderColor: digit ? "secondary.main" : "divider",
              borderRadius: 1.5,
              outline: "none",
              bgcolor: digit ? "rgba(184,138,68,.07)" : "background.paper",
              color: "text.primary",
              textAlign: "center",
              font: "700 25px/1 Inter, Arial, sans-serif",
              transition:
                "border-color .18s ease, box-shadow .18s ease, background-color .18s ease",
              "&:hover": { borderColor: "primary.light" },
              "&:focus": {
                borderColor: "secondary.main",
                boxShadow: "0 0 0 3px rgba(184,138,68,.18)",
              },
              "&:disabled": { opacity: 0.65 },
            }}
          />
        ))}
      </Box>
      <Typography
        sx={{
          mb: 3,
          color: "text.secondary",
          fontSize: 13,
          lineHeight: 1.6,
        }}
      >
        {t("confirmEmail.codeHint")}
      </Typography>
    </Box>
  );
}