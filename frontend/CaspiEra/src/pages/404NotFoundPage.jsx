import {
  Box,
  Button,
  Container,
  Typography,
} from "@mui/material";

import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import LocationOffRoundedIcon from "@mui/icons-material/LocationOffRounded";

import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import LanguageSelector from "../components/navigation/LanguageSelector";

export default function NotFoundPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        minHeight: "100dvh",
        bgcolor: "#F8FAFC",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background decoration */}
      <Box
        sx={{
          position: "absolute",
          width: {
            xs: 280,
            md: 500,
          },
          height: {
            xs: 280,
            md: 500,
          },
          borderRadius: "50%",
          bgcolor: "rgba(11, 59, 96, 0.05)",
          top: {
            xs: -120,
            md: -250,
          },
          right: {
            xs: -130,
            md: -180,
          },
        }}
      />

      <Box
        sx={{
          position: "absolute",
          width: {
            xs: 220,
            md: 420,
          },
          height: {
            xs: 220,
            md: 420,
          },
          borderRadius: "50%",
          bgcolor: "rgba(11, 59, 96, 0.035)",
          bottom: {
            xs: -120,
            md: -230,
          },
          left: {
            xs: -100,
            md: -180,
          },
        }}
      />

      {/* Top bar */}
      <Container
        maxWidth="xl"
        sx={{
          position: "relative",
          zIndex: 2,
        }}
      >
        <Box
          sx={{
            minHeight: {
              xs: 70,
              md: 82,
            },
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <Box
            onClick={() => navigate("/")}
            sx={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            <Box
              sx={{
                width: {
                  xs: 38,
                  sm: 42,
                },
                height: {
                  xs: 38,
                  sm: 42,
                },
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: "#0B3B60",
                color: "#fff",
                borderRadius: "11px",
                fontFamily: "Georgia, serif",
                fontSize: {
                  xs: 19,
                  sm: 22,
                },
                fontWeight: 700,
                mr: 1,
              }}
            >
              C
            </Box>

            <Typography
              sx={{
                color: "#0B3B60",
                fontSize: {
                  xs: 19,
                  sm: 22,
                },
                fontWeight: 800,
                letterSpacing: "-0.5px",
              }}
            >
              CaspianEra
            </Typography>
          </Box>

          <LanguageSelector />
        </Box>
      </Container>

      {/* Main content */}
      <Container
        maxWidth="lg"
        sx={{
          position: "relative",
          zIndex: 1,
        }}
      >
        <Box
          sx={{
            minHeight: {
              xs: "calc(100dvh - 70px)",
              md: "calc(100dvh - 82px)",
            },
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pb: {
              xs: 6,
              md: 10,
            },
          }}
        >
          <Box
            sx={{
              width: "100%",
              maxWidth: 750,
              textAlign: "center",
            }}
          >
            {/* Icon */}
            <Box
              sx={{
                width: {
                  xs: 74,
                  md: 86,
                },
                height: {
                  xs: 74,
                  md: 86,
                },
                mx: "auto",
                mb: 2.5,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "50%",
                bgcolor: "#EAF1F6",
                color: "#0B3B60",
              }}
            >
              <LocationOffRoundedIcon
                sx={{
                  fontSize: {
                    xs: 36,
                    md: 42,
                  },
                }}
              />
            </Box>

            {/* 404 */}
            <Typography
              sx={{
                fontSize: {
                  xs: 90,
                  sm: 120,
                  md: 150,
                },
                lineHeight: 0.9,
                fontWeight: 900,
                letterSpacing: {
                  xs: "-6px",
                  md: "-10px",
                },
                color: "#0B3B60",
                userSelect: "none",
              }}
            >
              404
            </Typography>

            {/* Small label */}
            <Typography
              sx={{
                mt: 2.5,
                color: "#B28A4A",
                fontSize: {
                  xs: 11,
                  sm: 12,
                },
                fontWeight: 800,
                letterSpacing: 2.5,
                textTransform: "uppercase",
              }}
            >
              {t("notFound.label")}
            </Typography>

            {/* Title */}
            <Typography
              component="h1"
              sx={{
                mt: 1.5,
                color: "#102A43",
                fontSize: {
                  xs: 27,
                  sm: 34,
                  md: 40,
                },
                fontWeight: 800,
                lineHeight: 1.2,
              }}
            >
              {t("notFound.title")}
            </Typography>

            {/* Description */}
            <Typography
              sx={{
                maxWidth: 570,
                mx: "auto",
                mt: 1.5,
                color: "#64748B",
                fontSize: {
                  xs: 14,
                  sm: 16,
                },
                lineHeight: 1.8,
              }}
            >
              {t("notFound.description")}
            </Typography>

            {/* Buttons */}
            <Box
              sx={{
                mt: {
                  xs: 3.5,
                  md: 4,
                },
                display: "flex",
                justifyContent: "center",
                flexDirection: {
                  xs: "column",
                  sm: "row",
                },
                gap: 1.5,
              }}
            >
              <Button
                variant="contained"
                startIcon={<HomeRoundedIcon />}
                onClick={() => navigate("/")}
                sx={{
                  minHeight: 50,
                  px: 3,
                  bgcolor: "#0B3B60",
                  borderRadius: 2.5,
                  fontWeight: 700,
                  textTransform: "none",
                  boxShadow:
                    "0 8px 22px rgba(11,59,96,0.18)",

                  "&:hover": {
                    bgcolor: "#072D49",
                    boxShadow:
                      "0 10px 28px rgba(11,59,96,0.24)",
                  },
                }}
              >
                {t("notFound.home")}
              </Button>

              <Button
                variant="outlined"
                startIcon={<SearchRoundedIcon />}
                onClick={() => navigate("/hotels")}
                sx={{
                  minHeight: 50,
                  px: 3,
                  borderColor: "#CBD5E1",
                  color: "#334E68",
                  borderRadius: 2.5,
                  fontWeight: 700,
                  textTransform: "none",

                  "&:hover": {
                    borderColor: "#0B3B60",
                    bgcolor: "#F1F5F9",
                    color: "#0B3B60",
                  },
                }}
              >
                {t("notFound.hotels")}
              </Button>
            </Box>

            {/* Previous page */}
            <Button
              startIcon={<ArrowBackRoundedIcon />}
              onClick={() => navigate(-1)}
              sx={{
                mt: 2,
                color: "#64748B",
                fontSize: 13,
                fontWeight: 600,
                textTransform: "none",

                "&:hover": {
                  bgcolor: "transparent",
                  color: "#0B3B60",
                },
              }}
            >
              {t("notFound.back")}
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}