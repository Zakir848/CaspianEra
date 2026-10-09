import { useTranslation } from "react-i18next";
import { Box, Button, Typography } from "@mui/material";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import { useNavigate } from "react-router-dom";

import Loading from "../../../components/common/Loading";
import ErrorMessage from "../../../components/common/ErrorMessage";
import EmptyState from "../../../components/common/EmptyState";
import HotelCard from "./HotelCard";
import { useHotels } from "../hooks/useHotels";

export default function HotelsList() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { data, isLoading, isError, error, refetch } = useHotels({
    page: 1,
    pageSize: 10,
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

  const hotels = data?.items ?? [];

  if (hotels.length === 0) {
    return (
      <EmptyState
        title={t("home.featuredHotels")}
        description={t("cities.emptyDescription")}
      />
    );
  }

  return (
    <Box component="section" sx={{ py: { xs: 4, md: 6 } }}>
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
              fontSize: { xs: 23, md: 28 },
              fontWeight: 700,
            }}
          >
            {t("home.featuredHotels")}
          </Typography>

          <Typography
            sx={{
              mt: 0.5,
              display: { xs: "none", sm: "block" },
              color: "#64748B",
              fontSize: 14,
            }}
          >
            {t("cities.popularDescription")}
          </Typography>
        </Box>

        <Button
          onClick={() => navigate("/hotels")}
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
            xs: "1fr",
            sm: "repeat(2, minmax(0, 1fr))",
            lg: "repeat(3, minmax(0, 1fr))",
          },
          gap: 3,
          width: "100%",
        }}
      >
        {hotels.map((hotel) => (
          <HotelCard key={hotel.id} hotel={hotel} />
        ))}
      </Box>
    </Box>
  );
}
