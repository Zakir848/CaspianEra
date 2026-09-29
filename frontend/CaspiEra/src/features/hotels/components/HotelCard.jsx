import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Button,
  Chip,
  Rating,
  IconButton,
  Stack,
} from "@mui/material";

import {
  LocationOnOutlined,
  FavoriteBorder,
  ArrowForward,
} from "@mui/icons-material";

import { useNavigate } from "react-router-dom";

export default function HotelCard({ hotel }) {
  const navigate = useNavigate();

  if (!hotel) return null;

  const {
    id,
    name,
    description,
    cityName,
    starCount,
    price,
    hotelImages,
  } = hotel;

  const imageUrl =
    hotelImages?.[0]?.imageUrl ||
    "https://placehold.co/800x500?text=CaspianEra";

  return (
    <Card
      sx={{
        width: "100%",
        maxWidth: 380,
        borderRadius: 4,
        overflow: "hidden",
        border: "1px solid #E8EDF2",
        boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",

        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: "0 16px 40px rgba(0,0,0,0.12)",
        },

        "&:hover .hotel-image": {
          transform: "scale(1.06)",
        },
      }}
    >
      <Box
        sx={{
          position: "relative",
          height: 230,
          overflow: "hidden",
        }}
      >
        <CardMedia
          className="hotel-image"
          component="img"
          image={imageUrl}
          alt={name}
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform 0.4s ease",
          }}
        />

        {starCount > 0 && (
          <Chip
            label={`${starCount} ulduzlu`}
            size="small"
            sx={{
              position: "absolute",
              top: 16,
              left: 16,
              bgcolor: "rgba(255,255,255,0.95)",
              color: "#17324D",
              fontWeight: 700,
              backdropFilter: "blur(8px)",
            }}
          />
        )}

        <IconButton
          aria-label="Add to favorites"
          sx={{
            position: "absolute",
            top: 12,
            right: 12,
            bgcolor: "#FFFFFF",
            color: "#17324D",
            width: 38,
            height: 38,

            "&:hover": {
              bgcolor: "#F1F5F9",
            },
          }}
        >
          <FavoriteBorder />
        </IconButton>
      </Box>

      <CardContent
        sx={{
          px: 2.5,
          pt: 2.5,
          pb: 1,
        }}
      >
        <Stack
          sx={{
            gap: 1.2,
          }}
        >
          <Typography
            sx={{
              fontSize: 20,
              fontWeight: 700,
              color: "#17324D",
              lineHeight: 1.3,
            }}
          >
            {name}
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.5,
              color: "#64748B",
            }}
          >
            <LocationOnOutlined
              sx={{
                fontSize: 18,
              }}
            />

            <Typography
              sx={{
                fontSize: 14,
              }}
            >
              {cityName || "Azərbaycan"}
            </Typography>
          </Box>

          {starCount > 0 && (
            <Rating
              value={starCount}
              readOnly
              sx={{
                fontSize: 19,
                color: "#F5B301",
              }}
            />
          )}

          <Typography
            sx={{
              fontSize: 14,
              color: "#64748B",
              lineHeight: 1.6,
              minHeight: 44,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {description || "Rahat və unudulmaz istirahət."}
          </Typography>
        </Stack>
      </CardContent>

      <Box
        sx={{
          px: 2.5,
          pb: 2.5,
          pt: 1.5,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 1,
        }}
      >
        <Box>
          {price != null ? (
            <>
              <Typography
                sx={{
                  fontSize: 22,
                  fontWeight: 800,
                  color: "#17324D",
                }}
              >
                {price} AZN
              </Typography>

              <Typography
                sx={{
                  fontSize: 12,
                  color: "#94A3B8",
                }}
              >
                Gecəlik başlanğıc qiymət
              </Typography>
            </>
          ) : (
            <Typography
              sx={{
                fontSize: 14,
                color: "#64748B",
              }}
            >
              Qiymətə bax
            </Typography>
          )}
        </Box>

        <Button
          variant="contained"
          endIcon={<ArrowForward />}
          onClick={() => navigate(`/hotels/${id}`)}
          sx={{
            bgcolor: "#17324D",
            color: "#FFFFFF",
            borderRadius: 2,
            px: 2,
            py: 1.1,
            fontSize: 14,
            fontWeight: 600,
            textTransform: "none",
            boxShadow: "none",
            whiteSpace: "nowrap",

            "&:hover": {
              bgcolor: "#254D70",
              boxShadow: "none",
            },
          }}
        >
          Ətraflı
        </Button>
      </Box>
    </Card>
  );
}