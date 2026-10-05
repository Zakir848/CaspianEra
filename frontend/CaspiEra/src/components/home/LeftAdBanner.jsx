import {
  Box,
  Button,
  Typography,
} from "@mui/material";

import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import CampaignOutlinedIcon from "@mui/icons-material/CampaignOutlined";

import { useTranslation } from "react-i18next";

export default function LeftAdBanner() {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        minHeight: 500,

        display: "flex",
        alignItems: "flex-end",

        overflow: "hidden",

        borderRadius: 4,

        backgroundImage: `
          linear-gradient(
            180deg,
            rgba(4, 28, 47, 0.08) 0%,
            rgba(4, 28, 47, 0.35) 45%,
            rgba(4, 28, 47, 0.95) 100%
          ),
          url('/images/ad-left.jpg')
        `,

        backgroundSize: "cover",
        backgroundPosition: "center",

        boxShadow:
          "0 12px 35px rgba(15, 23, 42, 0.12)",
      }}
    >
      {/* AD BADGE */}

      <Box
        sx={{
          position: "absolute",
          top: 16,
          left: 16,

          display: "flex",
          alignItems: "center",

          gap: 0.7,

          px: 1.3,
          py: 0.7,

          borderRadius: "50px",

          bgcolor: "rgba(255,255,255,.92)",

          backdropFilter: "blur(8px)",
        }}
      >
        <CampaignOutlinedIcon
          sx={{
            fontSize: 16,
            color: "#0B3B60",
          }}
        />

        <Typography
          sx={{
            color: "#0B3B60",

            fontSize: 9,
            fontWeight: 800,

            letterSpacing: 1.2,
          }}
        >
          {t("ads.advertisement")}
        </Typography>
      </Box>

      {/* CONTENT */}

      <Box
        sx={{
          position: "relative",
          zIndex: 2,

          width: "100%",

          p: {
            xs: 2.5,
            lg: 3,
          },
        }}
      >
        <Typography
          sx={{
            mb: 1,

            color: "#FFFFFF",

            fontSize: {
              lg: 22,
              xl: 25,
            },

            fontWeight: 800,
            lineHeight: 1.25,
          }}
        >
          {t("ads.title")}
        </Typography>

        <Typography
          sx={{
            mb: 2.5,

            color: "rgba(255,255,255,.75)",

            fontSize: 13,
            lineHeight: 1.7,
          }}
        >
          {t("ads.description")}
        </Typography>

        <Button
          fullWidth
          variant="contained"
          endIcon={
            <ArrowForwardRoundedIcon />
          }
          sx={{
            minHeight: 44,

            bgcolor: "#FFFFFF",
            color: "#0B3B60",

            borderRadius: 2.5,

            fontSize: 12,
            fontWeight: 700,

            textTransform: "none",

            boxShadow: "none",

            "&:hover": {
              bgcolor: "#F1F5F9",
              boxShadow: "none",
            },
          }}
        >
          {t("ads.placeAd")}
        </Button>
      </Box>
    </Box>
  );
}