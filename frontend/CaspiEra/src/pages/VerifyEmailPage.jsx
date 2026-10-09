import { ArrowBackRounded, MarkEmailReadOutlined } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageSelector from "../components/navigation/LanguageSelector";
import VerifyEmailForm from "../features/Email/components/VerifyEmailForm";

function maskEmail(address) {
  const separatorIndex = address.lastIndexOf("@");
  if (separatorIndex < 0) return address;

  const username = address.slice(0, separatorIndex);
  const domain = address.slice(separatorIndex + 1);
  return `${username.slice(0, 3)}*****@${domain}`;
}

export default function VerifyEmailPage() {
  const { t } = useTranslation();
  const location = useLocation();
  const email =
    location.state?.email ||
    new URLSearchParams(location.search).get("email") ||
    "";

  function handleVerify() {
    return t("confirmEmail.verificationUnavailable");
  }

  return (
    <Box
      sx={{
        minHeight: "100dvh",
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "1.1fr 0.9fr" },
        bgcolor: "background.default",
      }}
    >
      <Box
        sx={{
          display: { xs: "none", md: "flex" },
          position: "relative",
          overflow: "hidden",
          minHeight: "100dvh",
          flexDirection: "column",
          justifyContent: "space-between",
          p: { md: 5, lg: 8 },
          color: "common.white",
          background:
            "radial-gradient(circle at 78% 18%, rgba(184,138,68,.32), transparent 28%), linear-gradient(145deg, #102B36 0%, #183B4A 58%, #315866 100%)",
          "&::after": {
            content: '""',
            position: "absolute",
            width: 420,
            height: 420,
            right: -180,
            bottom: -200,
            border: "1px solid rgba(248,245,238,.12)",
            borderRadius: "50%",
            boxShadow:
              "0 0 0 38px rgba(248,245,238,.035), 0 0 0 76px rgba(248,245,238,.025)",
          },
        }}
      >
        <Typography
          sx={{
            position: "relative",
            zIndex: 1,
            color: "secondary.light",
            fontSize: 14,
            fontWeight: 800,
            letterSpacing: 3,
          }}
        >
          CASPIANERA
        </Typography>
        <Box sx={{ position: "relative", zIndex: 1, maxWidth: 540, mb: 5 }}>
          <Box
            sx={{
              width: 62,
              height: 62,
              mb: 3,
              display: "grid",
              placeItems: "center",
              border: "1px solid rgba(208,173,115,.45)",
              borderRadius: 2,
              color: "secondary.light",
              bgcolor: "rgba(255,255,255,.06)",
            }}
          >
            <MarkEmailReadOutlined sx={{ fontSize: 32 }} />
          </Box>
          <Typography
            component="h1"
            sx={{
              color: "common.white",
              fontSize: { md: 38, lg: 48 },
              lineHeight: 1.15,
              fontWeight: 800,
              mb: 2,
            }}
          >
            {t("confirmEmail.brandTitle")}
          </Typography>
          <Typography
            sx={{
              color: "rgba(255,255,255,.76)",
              fontSize: { md: 15, lg: 17 },
              lineHeight: 1.8,
              maxWidth: 470,
            }}
          >
            {t("confirmEmail.brandDescription")}
          </Typography>
        </Box>
        <Typography
          sx={{
            position: "relative",
            zIndex: 1,
            color: "rgba(255,255,255,.58)",
            fontSize: 12,
            letterSpacing: 1.2,
          }}
        >
          {t("confirmEmail.footer")}
        </Typography>
      </Box>

      <Box
        sx={{
          minHeight: { xs: "100dvh", md: "auto" },
          display: "flex",
          flexDirection: "column",
          bgcolor: "background.paper",
          px: { xs: 2.5, sm: 5, md: 6, lg: 9 },
          py: { xs: 2.5, sm: 4 },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
          }}
        >
          <Box
            component={Link}
            to="/register"
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 0.5,
              color: "primary.main",
              fontSize: 14,
              fontWeight: 700,
              textDecoration: "none",
              "&:hover": { color: "primary.dark" },
            }}
          >
            <ArrowBackRounded sx={{ fontSize: 19 }} />
            {t("confirmEmail.back")}
          </Box>
          <LanguageSelector />
        </Box>

        <Box
          sx={{
            width: "100%",
            maxWidth: 500,
            m: "auto",
            py: { xs: 5, sm: 7 },
          }}
        >
          <Box
            sx={{
              width: 58,
              height: 58,
              mb: 3,
              display: { xs: "grid", md: "none" },
              placeItems: "center",
              borderRadius: 2,
              color: "primary.main",
              bgcolor: "rgba(24,59,74,.08)",
            }}
          >
            <MarkEmailReadOutlined sx={{ fontSize: 30 }} />
          </Box>
          <Typography
            component="h2"
            sx={{
              color: "text.primary",
              fontSize: { xs: 30, sm: 36 },
              fontWeight: 800,
              mb: 1.25,
            }}
          >
            {t("confirmEmail.title")}
          </Typography>
          <Typography
            sx={{
              color: "text.secondary",
              fontSize: { xs: 14, sm: 15 },
              lineHeight: 1.75,
              mb: 1,
            }}
          >
            {t("confirmEmail.description")}
          </Typography>
          <Typography
            sx={{
              minHeight: 24,
              mb: 4,
              color: email ? "primary.main" : "text.secondary",
              fontSize: 14,
              fontWeight: email ? 700 : 400,
              overflowWrap: "anywhere",
            }}
          >
            {email ? maskEmail(email) : t("confirmEmail.emailFallback")}
          </Typography>

          <VerifyEmailForm onVerify={handleVerify} />
        </Box>
      </Box>
    </Box>
  );
}
