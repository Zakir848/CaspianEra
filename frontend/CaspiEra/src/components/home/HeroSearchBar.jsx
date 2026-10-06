import { useEffect, useState } from "react";
import {
  Autocomplete,
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

import { getCities } from "../../features/cities/api/citiesApi";
import { useTranslation } from "react-i18next";

export default function HeroSearchBar() {
  const { t } = useTranslation();

  const [cities, setCities] = useState([]);

  useEffect(() => {
    let isMounted = true;

    const loadCities = async () => {
      try {
        const result = await getCities({ page: 1, pageSize: 20 });

        if (isMounted) {
          setCities(Array.isArray(result?.items) ? result.items : []);
        }
      } catch (error) {
        console.error("Failed to load cities:", error);
      }
    };

    loadCities();

    return () => {
      isMounted = false;
    };
  }, []);

  const [search, setSearch] = useState({
    destination: "",
    checkIn: "",
    checkOut: "",
    guests: 1,
  });
  const today = toDateInputValue(new Date());
  const minCheckOut = search.checkIn
    ? addDaysToDateInputValue(search.checkIn, 1)
    : addDaysToDateInputValue(today, 1);

  const [error, setError] = useState("");
  const [cityMenuOpen, setCityMenuOpen] = useState(false);
  const destinationQuery = search.destination.trim().toLocaleLowerCase();
  const selectedCity = cities.find(
    (city) =>
      t(`citiesName.${city.cityName}`, { defaultValue: city.cityName }) ===
      search.destination
  ) ?? null;

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "checkIn") {
      setSearch((prev) => ({ ...prev, checkIn: value, checkOut: "" }));
      return;
    }

    setSearch((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log("Hotel search:", search);

    if (!search.destination.trim()) {
      setError(t("searchRequired.destinationRequired"));
      return;
    }

    if (!search.checkIn) {
      setError(t("searchRequired.checkInRequired"));
      return;
    }

    if (!search.checkOut) {
      setError(t("searchRequired.checkOutRequired"));
      return;
    }

    if (search.checkOut < minCheckOut) {
      setError(t("searchRequired.invalidDateRange"));
      return;
    }

    if (search.guests < 1) {
      setError(t("searchRequired.guestsRequired"));
      return;
    }

    setError("");
    // Sonra backend search endpoint-ə göndərəcəyik.
  };

  return (
    <Box sx={{ width: "100%" }}>
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

          boxShadow: "0 18px 50px rgba(0,0,0,.20)",
        }}
      >
        {/* DESTINATION */}
        <SearchField
          icon={<LocationOnOutlinedIcon />}
          label={t("search.destination")}
        >
          <Autocomplete
            freeSolo
            options={cities}
            value={selectedCity}
            inputValue={search.destination}
            open={cityMenuOpen && Boolean(destinationQuery)}
            onOpen={() => setCityMenuOpen(true)}
            onClose={() => setCityMenuOpen(false)}
            onInputChange={(_, value, reason) => {
              setSearch((prev) => ({ ...prev, destination: value }));
              if (reason === "input") {
                setCityMenuOpen(Boolean(value.trim()));
              }
            }}
            onChange={(_, city) => {
              const cityName =
                typeof city === "string"
                  ? city
                  : city
                    ? t(`citiesName.${city.cityName}`, {
                        defaultValue: city.cityName,
                      })
                    : "";

              setSearch((prev) => ({ ...prev, destination: cityName }));
              setError("");
              setCityMenuOpen(false);
            }}
            getOptionLabel={(city) =>
              typeof city === "string"
                ? city
                : t(`citiesName.${city.cityName}`, {
                    defaultValue: city.cityName,
                  })
            }
            filterOptions={(options, { inputValue }) => {
              const query = inputValue.trim().toLocaleLowerCase();

              return options.filter((city) => {
                const localizedName = t(`citiesName.${city.cityName}`, {
                  defaultValue: city.cityName,
                });

                return `${city.cityName} ${localizedName}`
                  .toLocaleLowerCase()
                  .includes(query);
              });
            }}
            noOptionsText={t("search.noCities")}
            renderOption={(props, city) => (
              <Box component="li" {...props} key={city.cityId}>
                <LocationOnOutlinedIcon
                  sx={{ mr: 1, color: "secondary.dark", fontSize: 18 }}
                />
                {t(`citiesName.${city.cityName}`, {
                  defaultValue: city.cityName,
                })}
              </Box>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                name="destination"
                placeholder={t("search.destinationPlaceholder")}
                variant="standard"
                fullWidth
                InputProps={{
                  ...params.InputProps,
                  disableUnderline: true,
                }}
                sx={inputStyle}
              />
            )}
            slotProps={{
              paper: {
                sx: {
                  mt: 0.75,
                  border: "1px solid",
                  borderColor: "divider",
                  boxShadow: "0 12px 28px rgba(16,43,54,.18)",
                },
              },
              listbox: {
                sx: { maxHeight: 240, py: 0.5 },
              },
            }}
            sx={{
              width: "100%",
              "& .MuiAutocomplete-inputRoot": { p: 0 },
              "& .MuiAutocomplete-endAdornment": { right: 0 },
            }}
          />
        </SearchField>

        {/* CHECK IN */}
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
            slotProps={{
              htmlInput: { min: today },
            }}
            sx={inputStyle}
          />
        </SearchField>

        {/* CHECK OUT */}
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
            slotProps={{
              htmlInput: { min: minCheckOut },
            }}
            sx={inputStyle}
          />
        </SearchField>

        {/* GUESTS */}
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
            {[1, 2, 3, 4, 5, 6].map((count) => (
              <MenuItem key={count} value={count}>
                {t("search.guestCount", { count })}
              </MenuItem>
            ))}
          </TextField>
        </SearchField>

        {/* SEARCH */}
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
      <Box
        sx={{
          mt: 0.7,
          px: 1,
        }}
      >
        {error && (
          <Typography
            sx={{
              color: "#FFCDD2",
              fontSize: 13,
              fontWeight: 600,
            }}
          >
            {error}
          </Typography>
        )}
      </Box>
    </Box>
  );
}

function toDateInputValue(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function addDaysToDateInputValue(value, days) {
  const date = new Date(`${value}T00:00:00`);
  date.setDate(date.getDate() + days);

  return toDateInputValue(date);
}

/* ==========================================
   SEARCH FIELD
========================================== */

function SearchField({ icon, label, children }) {
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
