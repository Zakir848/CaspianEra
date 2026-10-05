import { useState } from "react";

import {
  Box,
  Button,
} from "@mui/material";

import HotelOutlinedIcon from "@mui/icons-material/HotelOutlined";
import RestaurantOutlinedIcon from "@mui/icons-material/RestaurantOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import CardGiftcardOutlinedIcon from "@mui/icons-material/CardGiftcardOutlined";

import { useTranslation } from "react-i18next";

export default function HeroServiceTabs() {
  const { t } = useTranslation();

  const [selected, setSelected] =
    useState("hotel");

  const services = [
    {
      key: "hotel",
      label: t("hero.hotel"),
      icon: HotelOutlinedIcon,
    },
    {
      key: "restaurant",
      label: t("hero.restaurant"),
      icon: RestaurantOutlinedIcon,
    },
    {
      key: "experience",
      label: t("hero.experience"),
      icon: MapOutlinedIcon,
    },
    {
      key: "package",
      label: t("hero.packages"),
      icon: CardGiftcardOutlinedIcon,
    },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",

        gap: {
          xs: 0.5,
          sm: 1,
          md: 1.5,
        },

        overflowX: "auto",

        "&::-webkit-scrollbar": {
          display: "none",
        },
      }}
    >
      {services.map((service) => {
        const Icon = service.icon;

        const active =
          selected === service.key;

        return (
          <Button
            key={service.key}
            onClick={() =>
              setSelected(service.key)
            }
            startIcon={<Icon />}
            sx={{
              flexShrink: 0,

              px: {
                xs: 1.5,
                md: 2.2,
              },

              py: 1,

              color: active
                ? "primary.main"
                : "#FFFFFF",

              bgcolor: active
                ? "#FFFFFF"
                : "transparent",

              borderRadius: 2,

              fontSize: {
                xs: 12,
                md: 13,
              },

              "&:hover": {
                bgcolor: active
                  ? "#FFFFFF"
                  : "rgba(255,255,255,.10)",
              },
            }}
          >
            {service.label}
          </Button>
        );
      })}
    </Box>
  );
}