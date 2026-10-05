import {
  Box,
  Typography,
} from "@mui/material";

import HeroServiceTabs from "./HeroServiceTabs";
import HeroSearchBar from "./HeroSearchBar";
import HeroBenefits from "./HeroBenefits";
import HeroSliderControls from "./HeroSliderControls";

export default function HeroSection({
  slide,
  activeSlide,
  totalSlides,
  onNext,
  onPrevious,
}) {
  return (
    <Box
      sx={{
        position: "relative",

        minWidth: 0,

        minHeight: {
          xs: 650,
          md: 600,
          lg: 630,
        },

        display: "flex",
        flexDirection: "column",

        justifyContent: "center",

        px: {
          xs: 0,
          sm: 2,
          md: 3,
          lg: 2,
          xl: 4,
        },

        py: {
          xs: 4,
          md: 5,
        },

        color: "#FFFFFF",
      }}
    >
      {/* =================================
          HERO TEXT
      ================================= */}

      <Box
        sx={{
          width: "100%",

          maxWidth: {
            xs: "100%",
            md: 760,
          },

          mx: "auto",
        }}
      >
        {/* SLOGAN */}

        <Typography
          sx={{
            mb: 1.5,

            color:
              "rgba(255,255,255,.78)",

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
          {slide.slogan}
        </Typography>

        {/* TITLE */}

        <Typography
          component="h1"
          sx={{
            color: "#FFFFFF",

            fontFamily:
              "Georgia, 'Times New Roman', serif",

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
          }}
        >
          {slide.title}

          <br />

          <Box
            component="span"
            sx={{
              color: "#FFFFFF",
            }}
          >
            {slide.highlightedTitle}
          </Box>
        </Typography>

        {/* DESCRIPTION */}

        <Typography
          sx={{
            mt: 2,

            maxWidth: 570,

            color:
              "rgba(255,255,255,.80)",

            fontSize: {
              xs: 14,
              sm: 15,
              md: 17,
            },

            lineHeight: 1.7,
          }}
        >
          {slide.description}
        </Typography>

        {/* =================================
            OTEL / RESTORAN / TƏCRÜBƏ / PAKET
        ================================= */}

        <Box
          sx={{
            mt: {
              xs: 3.5,
              md: 4,
            },
          }}
        >
          <HeroServiceTabs />
        </Box>

        {/* =================================
            SEARCH
        ================================= */}

        <Box
          sx={{
            mt: 1.5,
          }}
        >
          <HeroSearchBar />
        </Box>
      </Box>

      {/* PUSH BOTTOM */}

      <Box
        sx={{
          flex: 1,
          minHeight: {
            xs: 40,
            md: 50,
          },
        }}
      />

      {/* =================================
          BENEFITS + SLIDER
      ================================= */}

      <Box
        sx={{
          width: "100%",

          display: "flex",

          flexDirection: {
            xs: "column",
            lg: "row",
          },

          alignItems: {
            xs: "stretch",
            lg: "flex-end",
          },

          justifyContent:
            "space-between",

          gap: 3,
        }}
      >
        <Box
          sx={{
            flex: 1,
            minWidth: 0,
          }}
        >
          <HeroBenefits />
        </Box>

        <Box
          sx={{
            flexShrink: 0,

            alignSelf: {
              xs: "flex-end",
              lg: "flex-end",
            },
          }}
        >
          <HeroSliderControls
            activeSlide={activeSlide}
            totalSlides={totalSlides}
            onNext={onNext}
            onPrevious={onPrevious}
          />
        </Box>
      </Box>
    </Box>
  );
}