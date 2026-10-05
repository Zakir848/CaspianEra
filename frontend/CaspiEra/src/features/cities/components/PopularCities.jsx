import { useTranslation } from "react-i18next";
import { Box, Button, Container, Typography } from "@mui/material";

import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";

import Loading from "../../../components/common/Loading";
import ErrorMessage from "../../../components/common/ErrorMessage";
import EmptyState from "../../../components/common/EmptyState";
import useCities from "../hooks/useCities";
import CityCard from "./cityCard";

export default function PopularCities({ onCityClick, onViewAll }) {
  const { t } = useTranslation();

  const { data, isLoading, isError, error, refetch } = useCities({
    page: 1,
    pageSize: 6,
  });

  if (isLoading) {
    return <Loading text={t("common.loading")} />;
  }

  if (isError) {
    return (
      <ErrorMessage
        message={error?.message || t("common.error")}
        onRetry={refetch}
      />
    );
  }

  const cities = data?.items ?? [];

  if (cities.length === 0) {
    return (
      <EmptyState
        title={t("cities.emptyTitle")}
        description={t("cities.emptyDescription")}
      />
    );
  }

  return (
    <Box
      component="section"
      sx={{
        py: {
          xs: 4,
          md: 6,
        },
      }}
    >
      <Container maxWidth="xl">
        <Box
          sx={{
            mb: 2.5,

            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",

            gap: 2,
            position: "relative",
          }}
        >
          <Box>
            <Typography
              component="h2"
              sx={{
                color: "#102A43",

                fontSize: {
                  xs: 23,
                  md: 28,
                },

                fontWeight: 700,
              }}
            >
              {t("home.popularCities")}
            </Typography>

            <Typography
              sx={{
                mt: 0.5,

                display: {
                  xs: "none",
                  sm: "block",
                },

                color: "#64748B",
                fontSize: 14,
              }}
            >
              {t("cities.popularDescription")}
            </Typography>
          </Box>

          <Button
            onClick={onViewAll}
            endIcon={<ArrowForwardRoundedIcon />}
            sx={{
              color: "#0B3B60",
              textTransform: "none",
              fontWeight: 600,

              "&:hover": {
                bgcolor: "#EDF4F8",
              },
            }}
          >
            {t("common.viewAll")}
          </Button>
        </Box>

        <Box
          sx={{
            display: "grid",

            gridTemplateColumns: {
              xs: "repeat(2, 1fr)",
              sm: "repeat(3, 1fr)",
              lg: "repeat(6, 1fr)",
            },

            gap: {
              xs: 1.5,
              md: 2,
            },
          }}
        >
          {cities.map((city) => (
            <CityCard key={city.id} city={city} onClick={onCityClick} />
          ))}
        </Box>
      </Container>
    </Box>
  );
}
