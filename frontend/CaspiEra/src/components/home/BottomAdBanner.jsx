import {
  Box,
  Button,
  Typography,
} from "@mui/material";

import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import CampaignOutlinedIcon from "@mui/icons-material/CampaignOutlined";

import { useTranslation } from "react-i18next";

export default function BottomAdBanner() {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        position: "relative",

        minHeight: {
          xs: 300,
          sm: 280,
          md: 250,
        },

        display: "flex",
        alignItems: "center",

        overflow: "hidden",

        borderRadius: {
          xs: 3,
          md: 4,
        },

        backgroundImage: `
          linear-gradient(
            90deg,
            rgba(4, 30, 50, .96) 0%,
            rgba(4, 30, 50, .86) 45%,
            rgba(4, 30, 50, .30) 100%
          ),
          url('/images/ad-bottom.jpg')
        `,

        backgroundSize: "cover",
        backgroundPosition: "center",

        boxShadow:
          "0 12px 40px rgba(15,23,42,.12)",
      }}
    >
      <Box
        sx={{
          width: {
            xs: "100%",
            md: "65%",
            lg: "55%",
          },

          p: {
            xs: 3,
            sm: 4,
            md: 5,
          },
        }}
      >
        {/* BADGE */}

        <Box
          sx={{
            display: "inline-flex",
            alignItems: "center",

            gap: 0.7,

            px: 1.3,
            py: 0.7,

            mb: 2,

            borderRadius: "50px",

            bgcolor:
              "rgba(255,255,255,.12)",

            border:
              "1px solid rgba(255,255,255,.15)",
          }}
        >
          <CampaignOutlinedIcon
            sx={{
              fontSize: 16,
              color: "#FFFFFF",
            }}
          />

          <Typography
            sx={{
              color: "#FFFFFF",

              fontSize: 10,
              fontWeight: 800,

              letterSpacing: 1.3,
            }}
          >
            {t("ads.advertisement")}
          </Typography>
        </Box>

        <Typography
          component="h2"
          sx={{
            maxWidth: 600,

            color: "#FFFFFF",

            fontSize: {
              xs: 25,
              sm: 30,
              md: 34,
            },

            fontWeight: 800,
            lineHeight: 1.2,
          }}
        >
          {t("ads.title")}
        </Typography>

        <Typography
          sx={{
            maxWidth: 600,

            mt: 1.5,
            mb: 3,

            color:
              "rgba(255,255,255,.72)",

            fontSize: {
              xs: 13,
              md: 15,
            },

            lineHeight: 1.7,
          }}
        >
          {t("ads.bottomDescription")}
        </Typography>

        <Button
          variant="contained"
          endIcon={
            <ArrowForwardRoundedIcon />
          }
          sx={{
            px: 3,
            py: 1.3,

            bgcolor: "#FFFFFF",
            color: "#0B3B60",

            borderRadius: "50px",

            fontSize: 13,
            fontWeight: 700,

            textTransform: "none",

            boxShadow: "none",

            "&:hover": {
              bgcolor: "#F1F5F9",

              transform:
                "translateY(-1px)",

              boxShadow: "none",
            },
          }}
        >
          {t("ads.contact")}
        </Button>
      </Box>
    </Box>
  );
}