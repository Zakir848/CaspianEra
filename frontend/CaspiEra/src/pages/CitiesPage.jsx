import { useState } from "react";
import {
  Box,
  Container,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { useTranslation } from "react-i18next";

import Header from "../components/navigation/Header";
import ErrorMessage from "../components/common/ErrorMessage";
import Loading from "../components/common/Loading";
import CityCard from "../features/cities/components/CityCard";
import useCities from "../features/cities/hooks/useCities";
import citiesHero from "../assets/cities-hero.png";

export default function CitiesPage() {
  const { t } = useTranslation();
  const [search, setSearch] = useState("");
  const { data, isLoading, isError, error, refetch } = useCities({
    page: 1,
    pageSize: 100,
  });

  const normalizedSearch = search.trim().toLocaleLowerCase();
  const cities = (data?.items ?? []).filter((city) => {
    const localizedName = t(`citiesName.${city.cityName}`, {
      defaultValue: city.cityName,
    });

    return `${city.cityName} ${localizedName}`
      .toLocaleLowerCase()
      .includes(normalizedSearch);
  });

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      <Box
        component="main"
        sx={{
          position: "relative",
          overflow: "hidden",
          color: "primary.contrastText",
          bgcolor: "primary.dark",
          minHeight: { xs: 540, md: 610 },
        }}
      >
        <Box
          component="img"
          src={citiesHero}
          alt=""
          sx={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: { xs: "62% center", md: "center 48%" },
          }}
        />
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(90deg, rgba(16,43,54,.9) 0%, rgba(16,43,54,.68) 48%, rgba(16,43,54,.12) 100%), linear-gradient(0deg, rgba(16,43,54,.58), transparent 62%)",
          }}
        />

        <Box sx={{ position: "relative", zIndex: 1 }}>
          <Header />
          <Container maxWidth="xl">
            <Box
              sx={{
                maxWidth: 720,
                pt: { xs: 5, md: 8 },
                pb: { xs: 6, md: 10 },
                animation: "cities-intro .65s ease-out both",
                "@keyframes cities-intro": {
                  from: { opacity: 0, transform: "translateY(16px)" },
                  to: { opacity: 1, transform: "translateY(0)" },
                },
              }}
            >
              <Typography
                component="p"
                variant="overline"
                sx={{
                  color: "secondary.light",
                  fontWeight: 700,
                  letterSpacing: 1.2,
                }}
              >
                {t("cities.azerbaijan")}
              </Typography>
              <Typography
                component="h1"
                sx={{
                  mt: 1,
                  color: "common.white",
                  fontSize: { xs: 38, sm: 48, md: 60 },
                  fontWeight: 700,
                  lineHeight: 1.08,
                  maxWidth: 650,
                }}
              >
                {t("cities.title")}
              </Typography>
              <Typography
                sx={{
                  mt: 2,
                  mb: 3.5,
                  color: "rgba(255,255,255,.84)",
                  fontSize: { xs: 16, md: 18 },
                  maxWidth: 560,
                }}
              >
                {t("cities.popularDescription")}
              </Typography>
              <TextField
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder={t("cities.searchPlaceholder")}
                aria-label={t("cities.searchPlaceholder")}
                fullWidth
                sx={{
                  maxWidth: 560,
                  bgcolor: "background.paper",
                  borderRadius: 2,
                  boxShadow: "0 12px 32px rgba(0,0,0,.16)",
                  "& .MuiOutlinedInput-root": {
                    minHeight: 58,
                    borderRadius: 2,
                  },
                }}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchRoundedIcon color="action" />
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </Box>
          </Container>
        </Box>
      </Box>

      <Box
        component="section"
        sx={{
          py: { xs: 5, md: 7 },
          bgcolor: "background.paper",
        }}
      >
        <Container maxWidth="xl">
          <Box
            sx={{
              display: "flex",
              alignItems: { xs: "flex-start", sm: "end" },
              justifyContent: "space-between",
              flexDirection: { xs: "column", sm: "row" },
              gap: 1.5,
              mb: 3,
            }}
          >
            <Box>
              <Typography
                component="h2"
                sx={{
                  color: "text.primary",
                  fontSize: { xs: 25, md: 32 },
                  fontWeight: 700,
                }}
              >
                {t("home.popularCities")}
              </Typography>
              <Typography sx={{ mt: 0.5 }} color="text.secondary">
                {t("cities.popularDescription")}
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary">
              {t("cities.resultCount", { count: cities.length })}
            </Typography>
          </Box>

          {isLoading ? (
            <Loading text={t("common.loading")} />
          ) : isError ? (
            <ErrorMessage
              message={error?.message || t("cities.loadError")}
              onRetry={refetch}
            />
          ) : cities.length === 0 ? (
            <Box role="status" sx={{ py: 8, textAlign: "center" }}>
              <Typography variant="h6" color="text.primary">
                {search ? t("cities.noSearchResults") : t("cities.emptyTitle")}
              </Typography>
              {!search && (
                <Typography sx={{ mt: 1 }} color="text.secondary">
                  {t("cities.emptyDescription")}
                </Typography>
              )}
            </Box>
          ) : (
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "repeat(2, minmax(0, 1fr))",
                  sm: "repeat(2, minmax(0, 1fr))",
                  md: "repeat(3, minmax(0, 1fr))",
                  lg: "repeat(4, minmax(0, 1fr))",
                },
                gap: { xs: 2, md: 2.5 },
              }}
            >
              {cities.map((city) => (
                <CityCard key={city.cityId} city={city} />
              ))}
            </Box>
          )}
        </Container>
      </Box>
    </Box>
  );
}
