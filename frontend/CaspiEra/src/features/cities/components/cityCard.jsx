import { Box, Typography } from "@mui/material";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export default function CityCard({ city }) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  if (!city) {
    return null;
  }

  const cityName = t(`citiesName.${city.cityName}`, {
    defaultValue: city.cityName,
  });

  return (
    <Box
      component="button"
      type="button"
      aria-label={cityName}
      onClick={() => navigate(`/cities/${city.cityId}`)}
      sx={{
        position: "relative",
        width: "100%",
        minWidth: 0,
        aspectRatio: { xs: "4 / 3", md: "5 / 4" },
        appearance: "none",
        border: 0,
        borderRadius: 2,
        p: 0,
        textAlign: "left",
        font: "inherit",
        backgroundColor: "background.paper",
        overflow: "hidden",
        cursor: "pointer",
        boxShadow: "0 5px 20px rgba(15, 23, 42, 0.08)",
        transition: "transform .25s ease, box-shadow .25s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 15px 35px rgba(15, 23, 42, 0.16)",
          "& .city-overlay": {
            background:
              "linear-gradient(to top, rgba(3,25,45,.9), rgba(3,25,45,.05))",
          },
          "& .city-image": {
            transform: "scale(1.05)",
          },
        },
        "&:focus-visible": {
          outline: "3px solid",
          outlineColor: "secondary.main",
          outlineOffset: 3,
        },
      }}
    >
      <Box
        className="city-image"
        component="img"
        src={city.imageUrls}
        alt={city.cityName}
        sx={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transition: "transform .4s ease",
        }}
      />
      <Box
        className="city-overlay"
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, rgba(3,25,45,.82), rgba(3,25,45,.03))",
          transition: "background .3s ease",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          left: 18,
          right: 18,
          bottom: 16,
          color: "#FFFFFF",
          zIndex: 2,
        }}
      >
        <Typography
          component="h2"
          sx={{ fontSize: { xs: 19, md: 22 }, fontWeight: 700 }}
        >
          {cityName}
        </Typography>
        {city.hotelCount !== undefined && (
          <Box
            sx={{
              mt: 0.75,
              display: "flex",
              alignItems: "center",
              gap: 0.5,
              color: "rgba(255,255,255,.85)",
            }}
          >
            <LocationOnOutlinedIcon sx={{ fontSize: 15 }} />
            <Typography sx={{ fontSize: 13 }}>
              {t("cities.hotelCount", { count: city.hotelCount })}
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}
