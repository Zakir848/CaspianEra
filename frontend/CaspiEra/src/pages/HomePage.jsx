import { useEffect, useState } from "react";
import { Box, Container } from "@mui/material";

import Header from "../components/navigation/Header";

import HeroSection from "../components/home/HeroSection";
import LeftAdBanner from "../components/home/LeftAdBanner";
import RightAdBanner from "../components/home/RightAdBanner";

import PopularCities from "../features/cities/components/PopularCities";
import HotelsList from "../features/hotels/components/HotelsList";

// import hero1 from "../assets/baku-hero-light.png";
import hero1 from "../assets/baku-hero.png";

export default function HomePage() {
  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: "background.default",
      }}
    >
      {/* =====================================
          HERO AREA
      ===================================== */}

      <Box
        sx={{
          position: "relative",

          width: "100%",

          minHeight: {
            xs: "100svh",
            sm: 800,
            md: 720,
            lg: 760,
            xl: 800,
          },

          overflow: "hidden",

          bgcolor: "primary.dark",
        }}
      >
        {/* =====================================
            BACKGROUND SLIDES
        ===================================== */}

        <Box
          sx={{
            position: "absolute",
            inset: 0,

            width: "100%",
            height: "100%",

            backgroundImage: `url(${hero1})`,

            backgroundSize: "cover",

            backgroundPosition: {
              xs: "58% center",
              sm: "55% center",
              md: "center center",
            },

            backgroundRepeat: "no-repeat",
            zIndex: 0,
          }}
        />

        {/* =====================================
            DARK OVERLAY
        ===================================== */}

        <Box
          sx={{
            position: "absolute",
            inset: 0,

            zIndex: 1,

            pointerEvents: "none",

            background: `
              linear-gradient(
                90deg,
                rgba(13, 34, 53, .72) 0%,
                rgba(13, 34, 53, .40) 45%,
                rgba(13, 34, 53, .24) 100%
              )
            `,
          }}
        />

        {/* =====================================
            HERO CONTENT
        ===================================== */}

        <Box
          sx={{
            position: "relative",
            zIndex: 2,
          }}
        >
          <Header />

          <Box
            sx={{
              width: "100%",
              maxWidth: "1920px",

              mx: "auto",

              px: {
                xs: 2,
                sm: 3,
                lg: 2,
                xl: 3,
              },

              pb: {
                xs: 4,
                md: 3,
              },

              display: "grid",

              gridTemplateColumns: {
                xs: "minmax(0, 1fr)",
                lg: "210px minmax(0, 1fr) 210px",
                xl: "230px minmax(0, 1fr) 230px",
              },

              gap: {
                xs: 0,
                lg: 2,
                xl: 2.5,
              },

              alignItems: "stretch",
            }}
          >
            {/* LEFT AD */}

            <Box
              component="aside"
              sx={{
                display: {
                  xs: "none",
                  lg: "block",
                },

                py: 2,
              }}
            >
              <LeftAdBanner />
            </Box>

            {/* CENTER HERO */}

            <HeroSection />

            {/* RIGHT AD */}

            <Box
              component="aside"
              sx={{
                display: {
                  xs: "none",
                  lg: "block",
                },

                py: 2,
              }}
            >
              <RightAdBanner />
            </Box>
          </Box>
        </Box>
      </Box>

      {/* =====================================
          POPULAR CITIES
      ===================================== */}

      <Box
        sx={{
          bgcolor: "background.paper",
          position: "relative",

          py: {
            xs: 4,
            sm: 5,
            md: 6,
          },
        }}
      >
        <Box
          component="img"
          src="src/assets/SiteBody.png"
          alt="Hero Background Shape"
          sx={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "fill"
          }}
        />
        <Container maxWidth="xl">
          <PopularCities />
          <HotelsList />
        </Container>
      </Box>
    </Box>
  );
}
