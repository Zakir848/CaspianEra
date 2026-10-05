import {
  Box,
  Typography,
} from "@mui/material";

import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";

export default function CityCard({
  city,
  onClick,
}) {
  if (!city) {
    return null;
  }

  return (
    <Box
      onClick={() => onClick?.(city.id)}
      sx={{
        position: "relative",
        height: {
          xs: 180,
          sm: 200,
          md: 220,
        },

        borderRadius: 3,

        overflow: "hidden",

        cursor: "pointer",

        backgroundImage: `url(${city.imageUrls || city.cityName})`,

        objectFit: "cover",

        boxShadow:
          "0 5px 20px rgba(15, 23, 42, 0.08)",

        transition:
          "transform .25s ease, box-shadow .25s ease",

        "&:hover": {
          transform: "translateY(-6px)",

          boxShadow:
            "0 15px 35px rgba(15, 23, 42, 0.16)",

          "& .city-overlay": {
            background:
              "linear-gradient(to top, rgba(3,25,45,.9), rgba(3,25,45,.05))",
          },

          "& .city-image": {
            transform: "scale(1.05)",
          },
        },
      }}
    >
      {/* IMAGE */}

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

          objectFit: "fill",

          transition: "transform .4s ease",
        }}
      />

      {/* OVERLAY */}

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

      {/* CONTENT */}

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
          sx={{
            fontSize: {
              xs: 18,
              md: 20,
            },

            fontWeight: 700,

            textShadow:
              "0 2px 8px rgba(0,0,0,.3)",
          }}
        >
          {city.name}
        </Typography>

        {city.hotelCount !== undefined && (
          <Box
            sx={{
              mt: 0.5,

              display: "flex",
              alignItems: " ",

              gap: 0.5,

              color:
                "rgba(255,255,255,.85)",
            }}
          >

            <LocationOnOutlinedIcon
              sx={{
                fontSize: 15,
              }}
            />
            <Box>

              <Typography
                sx={{
                  fontSize: 12,
                }}
              >
                Hotels: {city.hotelCount}
              </Typography>
              <Typography
                sx={{
                  fontSize: 12,
                }}
              >
                {city.cityName}
              </Typography>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
}