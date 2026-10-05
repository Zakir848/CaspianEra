import { useState } from "react";
import { Box, Container } from "@mui/material";

import Header from "../components/navigation/Header";

import HeroSection from "../components/home/HeroSection";
import LeftAdBanner from "../components/home/LeftAdBanner";
import RightAdBanner from "../components/home/RightAdBanner";

import PopularCities from "../features/cities/components/PopularCities";

// HERO IMAGES
import hero1 from "../assets/baku-hero.png";
import hero2 from "../assets/baku-hero-light.png";
import { useAuthStore } from "../features/auth/store/useAuthStore";

export default function HomePage() {
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = [
    {
      id: 1,
      image: hero1,
      slogan: "SƏYAHƏTİNİZ BURADAN BAŞLAYIR",
      title: "Xüsusi anları",
      highlightedTitle: "CaspianEra ilə yaşayın",
      description:
        "Otellərdən xüsusi paketlərə qədər səyahətiniz üçün lazım olan hər şeyi bir yerdə tapın.",
    },
    {
      id: 2,
      image: hero2,
      slogan: "YENİ MƏKANLAR KƏŞF EDİN",
      title: "Yeni hekayələrə",
      highlightedTitle: "səyahət edin",
      description:
        "Azərbaycanın müxtəlif bölgələrində sizi gözləyən unikal məkanları və təcrübələri kəşf edin.",
    },
  ];

  const currentSlide = slides[activeSlide];

  const handleNext = () => {
    setActiveSlide((current) =>
      current === slides.length - 1 ? 0 : current + 1,
    );
  };

  const handlePrevious = () => {
    setActiveSlide((current) =>
      current === 0 ? slides.length - 1 : current - 1,
    );
  };

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

          backgroundImage: `
            linear-gradient(
              90deg,
              rgba(13, 34, 53, .72) 0%,
              rgba(13, 34, 53, .40) 45%,
              rgba(13, 34, 53, .24) 100%
            ),
            url(${currentSlide.image})
          `,

          backgroundSize: "cover",

          backgroundPosition: {
            xs: "58% center",
            sm: "55% center",
            md: "center center",
          },

          backgroundRepeat: "no-repeat",

          overflow: "hidden",

          transition: "background-image .5s ease",
        }}
      >
        {/* HEADER */}

        <Header />

        {/* =================================
            HERO BODY
        ================================= */}

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

          <HeroSection
            slide={currentSlide}
            activeSlide={activeSlide}
            totalSlides={slides.length}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />

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

      {/* =====================================
          POPULAR CITIES
      ===================================== */}

      <Box
        sx={{
          bgcolor: "background.paper",

          py: {
            xs: 4,
            sm: 5,
            md: 6,
          },
        }}
      >
        <Container maxWidth="xl">
          <PopularCities />
        </Container>
      </Box>
    </Box>
  );
}
