import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import HeroServiceTabs from "./HeroServiceTabs";
import HeroSearchBar from "./HeroSearchBar";
import HeroBenefits from "./HeroBenefits";

export default function HeroSection() {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        position: "relative",
        minWidth: 0,
        minHeight: {
          md: 500,
          lg: 600,
        },
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        px: {
          xs: 0,
          sm: 2,
          md: 3,
          lg: 2,
          xl: 3,
        },
        py: {
          xs: 4,
          md: 5,
        },
        color: "#FFFFFF",
      }}
    >
      <Box
        sx={{
          width: "100%",
          mx: "auto",
        }}
      >
        <Typography
          sx={{
            mb: 1.5,
            color: "rgba(255,255,255,.78)",
            fontSize: {
              xs: 10,
              sm: 11,
              md: 12,
            },
            fontWeight: 600,
            letterSpacing: {
              xs: 2,
              md: 4,
            },
          }}
        >
          {t("hero.slogan")}
        </Typography>

        <Typography
          component="h1"
          sx={{
            color: "#FFFFFF",
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontSize: {
              xs: 40,
              sm: 50,
              md: 58,
              lg: 60,
              xl: 68,
            },
            fontWeight: 400,
            lineHeight: 1.03,
            letterSpacing: "-1px",
            overflowWrap: "break-word",
          }}
        >
          {t("hero.titleFirst")}

          <Box
            component="span"
            sx={{
              display: "block",
              color: "#FFFFFF",
            }}
          >
            {t("hero.titleSecond")}
          </Box>
        </Typography>

        <Typography
          sx={{
            mt: 2,
            maxWidth: 570,
            color: "rgba(255,255,255,.80)",
            fontSize: {
              xs: 14,
              sm: 15,
              md: 17,
            },
            lineHeight: 1.7,
          }}
        >
          {t("hero.description")}
        </Typography>

        <Box sx={{ mt: { xs: 3.5, md: 4 } }}>
          <HeroServiceTabs />
        </Box>

        <Box sx={{ mt: 1.5 }}>
          <HeroSearchBar />
        </Box>
      </Box>

      <Box
        sx={{
          flex: 1,
          minHeight: {
            xs: 40,
            md: 50,
          },
        }}
      />

      <Box sx={{ width: "100%", minWidth: 0 }}>
        <HeroBenefits />
      </Box>
    </Box>
  );
}