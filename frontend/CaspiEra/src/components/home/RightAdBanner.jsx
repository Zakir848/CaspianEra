import {
  Box,
  Button,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import Groups2OutlinedIcon from "@mui/icons-material/Groups2Outlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import SupportAgentRoundedIcon from "@mui/icons-material/SupportAgentRounded";
import CampaignOutlinedIcon from "@mui/icons-material/CampaignOutlined";

import { useTranslation } from "react-i18next";

function AdInfo({
  icon,
  title,
  description,
}) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",

        gap: 1.2,
      }}
    >
      <Box
        sx={{
          width: 36,
          height: 36,

          flexShrink: 0,

          display: "flex",
          alignItems: "center",
          justifyContent: "center",

          bgcolor:
            "rgba(255,255,255,.12)",

          border:
            "1px solid rgba(255,255,255,.12)",

          borderRadius: 2,

          color: "#FFFFFF",
        }}
      >
        {icon}
      </Box>

      <Box>
        <Typography
          sx={{
            color: "#FFFFFF",

            fontSize: 12,
            fontWeight: 700,

            lineHeight: 1.3,
          }}
        >
          {title}
        </Typography>

        <Typography
          sx={{
            mt: 0.2,

            color:
              "rgba(255,255,255,.65)",

            fontSize: 10,
          }}
        >
          {description}
        </Typography>
      </Box>
    </Box>
  );
}

export default function RightAdBanner() {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        position: "relative",

        width: "100%",
        minHeight: 500,

        overflow: "hidden",

        borderRadius: 4,

        backgroundImage: `
          linear-gradient(
            180deg,
            rgba(5, 38, 62, 0.84),
            rgba(4, 29, 48, 0.97)
          ),
          url('/images/ad-right.jpg')
        `,

        backgroundSize: "cover",
        backgroundPosition: "center",

        boxShadow:
          "0 12px 35px rgba(15, 23, 42, 0.12)",

        p: {
          lg: 2.5,
          xl: 3,
        },

        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* BADGE */}

      <Box
        sx={{
          alignSelf: "flex-start",

          display: "flex",
          alignItems: "center",

          gap: 0.6,

          px: 1.2,
          py: 0.6,

          mb: 2.5,

          bgcolor:
            "rgba(255,255,255,.12)",

          border:
            "1px solid rgba(255,255,255,.12)",

          borderRadius: "50px",
        }}
      >
        <CampaignOutlinedIcon
          sx={{
            color: "#FFFFFF",
            fontSize: 15,
          }}
        />

        <Typography
          sx={{
            color: "#FFFFFF",

            fontSize: 9,
            fontWeight: 800,

            letterSpacing: 1.2,
          }}
        >
          {t("ads.advertisement")}
        </Typography>
      </Box>

      <Typography
        sx={{
          color: "#FFFFFF",

          fontSize: {
            lg: 21,
            xl: 24,
          },

          fontWeight: 800,
          lineHeight: 1.25,
        }}
      >
        {t("ads.brandTitle")}
      </Typography>

      <Typography
        sx={{
          mt: 1,
          mb: 2.5,

          color:
            "rgba(255,255,255,.68)",

          fontSize: 12,
          lineHeight: 1.65,
        }}
      >
        {t("ads.description")}
      </Typography>

      <Divider
        sx={{
          mb: 2.5,

          borderColor:
            "rgba(255,255,255,.12)",
        }}
      />

      {/* STATISTICS */}

      <Stack spacing={2}>
        <AdInfo
          icon={
            <Groups2OutlinedIcon
              sx={{ fontSize: 19 }}
            />
          }
          title="100.000+"
          description={t(
            "ads.monthlyVisitors"
          )}
        />

        <AdInfo
          icon={
            <LocationOnOutlinedIcon
              sx={{ fontSize: 19 }}
            />
          }
          title={t("ads.allAzerbaijan")}
          description={t(
            "ads.nationwideReach"
          )}
        />

        <AdInfo
          icon={
            <TrendingUpRoundedIcon
              sx={{ fontSize: 19 }}
            />
          }
          title={t(
            "ads.effectiveAdvertising"
          )}
          description={t(
            "ads.targetAudience"
          )}
        />

        <AdInfo
          icon={
            <SupportAgentRoundedIcon
              sx={{ fontSize: 19 }}
            />
          }
          title={t(
            "ads.professionalSupport"
          )}
          description={t(
            "ads.supportDescription"
          )}
        />
      </Stack>

      <Box sx={{ flex: 1 }} />

      <Button
        fullWidth
        variant="contained"
        endIcon={
          <ArrowForwardRoundedIcon />
        }
        sx={{
          mt: 3,

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
  );
}