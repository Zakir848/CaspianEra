import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Box, Button, Typography } from "@mui/material";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { useNavigate } from "react-router-dom";

import Loading from "../../../components/common/Loading";
import ErrorMessage from "../../../components/common/ErrorMessage";
import EmptyState from "../../../components/common/EmptyState";
import HotelCard from "./HotelCard";
import { useHotels } from "../hooks/useHotels";

const PAGE_SIZE = 12;

export default function HotelsList() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, error, refetch } = useHotels({
    page,
    pageSize: PAGE_SIZE,
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
  const totalItems =
    data?.totalCount ?? data?.totalItems ?? data?.totalRecords ?? hotels.length;
  const pageCount = Math.max(
    1,
    Number(data?.totalPages ?? data?.pageCount ?? Math.ceil(totalItems / PAGE_SIZE)),
  );

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

      {hotels.length > 0 && (
        <Box
          component="nav"
          aria-label={t("common.pages")}
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "center",
            alignItems: "center",
            gap: 1,
            mt: 3,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            {t("common.pageOf", { page, total: pageCount })}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Button
            aria-label={t("common.previousPage")}
            disabled={page <= 1}
            onClick={() => setPage((currentPage) => currentPage - 1)}
            sx={{ minWidth: 40, width: 40, height: 40, p: 0 }}
          >
            <ArrowBackRoundedIcon fontSize="small" />
          </Button>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(3, minmax(40px, 40px))",
              gap: 0.75,
            }}
          >
            {Array.from({ length: pageCount }, (_, index) => index + 1).map(
              (pageNumber) => (
                <Button
                  key={pageNumber}
                  aria-label={t("common.pageNumber", { page: pageNumber })}
                  aria-current={pageNumber === page ? "page" : undefined}
                  variant={pageNumber === page ? "contained" : "outlined"}
                  onClick={() => setPage(pageNumber)}
                  sx={{ minWidth: 40, width: 40, height: 40, p: 0 }}
                >
                  {pageNumber}
                </Button>
              ),
            )}
          </Box>
          <Button
            aria-label={t("common.nextPage")}
            disabled={page >= pageCount}
            onClick={() => setPage((currentPage) => currentPage + 1)}
            sx={{ minWidth: 40, width: 40, height: 40, p: 0 }}
          >
            <ArrowForwardRoundedIcon fontSize="small" />
          </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
}
