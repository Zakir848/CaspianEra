import { useState } from "react";
import {
  Box,
  Button,
  Divider,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";

import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

import { useTranslation } from "react-i18next";

export default function HeroSearchBar() {
  const { t } = useTranslation();

  const [search, setSearch] = useState({
    destination: "",
    checkIn: "",
    checkOut: "",
    guests: 2,
    rooms: 1,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setSearch((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log("Hotel search:", search);

    // Sonra backend search endpoint-ə göndərəcəyik.
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        width: "100%",

        display: "grid",

        gridTemplateColumns: {
          xs: "1fr",
          sm: "1fr 1fr",
          md: "1.6fr 1fr 1fr 1.2fr auto",
        },

        bgcolor: "#FFFFFF",

        borderRadius: {
          xs: 3,
          md: 2.5,
        },

        overflow: "hidden",

        boxShadow:
          "0 18px 50px rgba(0,0,0,.20)",
      }}
    >
      {/* =====================================
          DESTINATION
      ===================================== */}

      <SearchField
        icon={<LocationOnOutlinedIcon />}
        label={t("search.destination")}
      >
        <TextField
          name="destination"
          value={search.destination}
          onChange={handleChange}
          placeholder={t(
            "search.destinationPlaceholder"
          )}
          variant="standard"
          fullWidth
          InputProps={{
            disableUnderline: true,
          }}
          sx={inputStyle}
        />
      </SearchField>

      {/* =====================================
          CHECK IN
      ===================================== */}

      <SearchField
        icon={<CalendarMonthOutlinedIcon />}
        label={t("search.checkIn")}
      >
        <TextField
          name="checkIn"
          type="date"
          value={search.checkIn}
          onChange={handleChange}
          variant="standard"
          fullWidth
          InputProps={{
            disableUnderline: true,
          }}
          inputProps={{
            min: new Date()
              .toISOString()
              .split("T")[0],
          }}
          sx={inputStyle}
        />
      </SearchField>

      {/* =====================================
          CHECK OUT
      ===================================== */}

      <SearchField
        icon={<CalendarMonthOutlinedIcon />}
        label={t("search.checkOut")}
      >
        <TextField
          name="checkOut"
          type="date"
          value={search.checkOut}
          onChange={handleChange}
          variant="standard"
          fullWidth
          disabled={!search.checkIn}
          InputProps={{
            disableUnderline: true,
          }}
          inputProps={{
            min:
              search.checkIn ||
              new Date()
                .toISOString()
                .split("T")[0],
          }}
          sx={inputStyle}
        />
      </SearchField>

      {/* =====================================
          GUESTS / ROOMS
      ===================================== */}

      <SearchField
        icon={<PeopleAltOutlinedIcon />}
        label={t("search.guests")}
      >
        <TextField
          select
          name="guests"
          value={search.guests}
          onChange={handleChange}
          variant="standard"
          fullWidth
          InputProps={{
            disableUnderline: true,
          }}
          sx={inputStyle}
        >
          {[1, 2, 3, 4, 5, 6].map(
            (count) => (
              <MenuItem
                key={count}
                value={count}
              >
                {t("search.guestCount", {
                  count,
                })}
              </MenuItem>
            )
          )}
        </TextField>
      </SearchField>

      {/* =====================================
          SEARCH BUTTON
      ===================================== */}

      <Box
        sx={{
          p: {
            xs: 1.2,
            md: 1,
          },

          gridColumn: {
            xs: "1 / -1",
            sm: "1 / -1",
            md: "auto",
          },

          display: "flex",
        }}
      >
        <Button
          type="submit"
          variant="contained"
          startIcon={<SearchRoundedIcon />}
          sx={{
            minWidth: {
              xs: "100%",
              md: 130,
            },

            minHeight: {
              xs: 52,
              md: 70,
            },

            px: 3,

            bgcolor: "secondary.main",

            color: "primary.dark",

            borderRadius: 2,

            fontSize: 14,
            fontWeight: 800,

            whiteSpace: "nowrap",

            "&:hover": {
              bgcolor: "secondary.dark",
              color: "#FFFFFF",
            },
          }}
        >
          {t("common.search")}
        </Button>
      </Box>
    </Box>
  );
}

/* ==========================================
   SEARCH FIELD
========================================== */

function SearchField({
  icon,
  label,
  children,
}) {
  return (
    <Box
      sx={{
        position: "relative",

        minWidth: 0,

        px: {
          xs: 2,
          md: 2,
        },

        py: {
          xs: 1.5,
          md: 1.4,
        },

        minHeight: {
          xs: 80,
          md: 88,
        },

        display: "flex",
        alignItems: "center",

        gap: 1.3,

        borderRight: {
          xs: "none",
          md: "1px solid",
        },

        borderBottom: {
          xs: "1px solid",
          sm: "1px solid",
          md: "none",
        },

        borderColor: "divider",

        "&:last-of-type": {
          borderRight: "none",
        },
      }}
    >
      {/* ICON */}

      <Box
        sx={{
          flexShrink: 0,

          display: "flex",
          alignItems: "center",
          justifyContent: "center",

          color: "secondary.dark",

          "& svg": {
            fontSize: {
              xs: 22,
              md: 24,
            },
          },
        }}
      >
        {icon}
      </Box>

      {/* CONTENT */}

      <Box
        sx={{
          minWidth: 0,
          flex: 1,
        }}
      >
        <Typography
          sx={{
            mb: 0.2,

            color: "text.secondary",

            fontSize: 10,
            fontWeight: 700,

            letterSpacing: 0.5,

            textTransform: "uppercase",
          }}
        >
          {label}
        </Typography>

        {children}
      </Box>
    </Box>
  );
}

/* ==========================================
   INPUT STYLE
========================================== */

const inputStyle = {
  "& .MuiInputBase-root": {
    color: "text.primary",
    fontSize: {
      xs: 14,
      md: 15,
    },
    fontWeight: 700,
  },

  "& input": {
    p: 0,
  },

  "& .MuiSelect-select": {
    p: "0 !important",
  },

  "& input::placeholder": {
    color: "text.secondary",
    opacity: 1,
    fontWeight: 500,
  },
};