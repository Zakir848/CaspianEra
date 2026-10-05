import {
  Box,
  Typography,
} from "@mui/material";

import WorkspacePremiumOutlinedIcon from "@mui/icons-material/WorkspacePremiumOutlined";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import HeadsetMicOutlinedIcon from "@mui/icons-material/HeadsetMicOutlined";
import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";

import { useTranslation } from "react-i18next";

export default function HeroBenefits() {
  const { t } = useTranslation();

  const benefits = [
    {
      icon: WorkspacePremiumOutlinedIcon,
      title: t("hero.benefits.hotels"),
      description: t(
        "hero.benefits.hotelsDescription"
      ),
    },
    {
      icon: ShieldOutlinedIcon,
      title: t("hero.benefits.safe"),
      description: t(
        "hero.benefits.safeDescription"
      ),
    },
    {
      icon: HeadsetMicOutlinedIcon,
      title: t("hero.benefits.support"),
      description: t(
        "hero.benefits.supportDescription"
      ),
    },
    {
      icon: StarBorderRoundedIcon,
      title: t("hero.benefits.reviews"),
      description: t(
        "hero.benefits.reviewsDescription"
      ),
    },
  ];

  return (
    <Box
      sx={{
        width: "100%",

        display: "grid",

        gridTemplateColumns: {
          xs: "repeat(2, 1fr)",
          md: "repeat(4, 1fr)",
        },

        gap: {
          xs: 2,
          md: 3,
        },
      }}
    >
      {benefits.map((item) => {
        const Icon = item.icon;

        return (
          <Box
            key={item.title}
            sx={{
              display: "flex",
              alignItems: "center",

              gap: 1.2,
            }}
          >
            <Box
              sx={{
                width: {
                  xs: 42,
                  md: 50,
                },

                height: {
                  xs: 42,
                  md: 50,
                },

                flexShrink: 0,

                display: "flex",
                alignItems: "center",
                justifyContent: "center",

                border:
                  "1px solid rgba(255,255,255,.65)",

                borderRadius: "50%",

                color: "#FFFFFF",
              }}
            >
              <Icon />
            </Box>

            <Box>
              <Typography
                sx={{
                  color: "#FFFFFF",

                  fontSize: {
                    xs: 11,
                    md: 13,
                  },

                  fontWeight: 700,
                }}
              >
                {item.title}
              </Typography>

              <Typography
                sx={{
                  mt: 0.3,

                  display: {
                    xs: "none",
                    sm: "block",
                  },

                  color:
                    "rgba(255,255,255,.65)",

                  fontSize: 10,
                }}
              >
                {item.description}
              </Typography>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}