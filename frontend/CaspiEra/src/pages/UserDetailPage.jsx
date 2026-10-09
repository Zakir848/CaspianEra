import { useNavigate, Navigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Avatar,
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import CalendarTodayRoundedIcon from "@mui/icons-material/CalendarTodayRounded";
import HotelRoundedIcon from "@mui/icons-material/HotelRounded";
import EventAvailableRoundedIcon from "@mui/icons-material/EventAvailableRounded";

import { useAuthStore } from "../features/auth/store/useAuthStore";

export default function UserDetailPage() {
  const { t } = useTranslation();
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const reservations = Array.isArray(user?.reservations) ? user.reservations : [];
  const bookedHotels = Array.isArray(user?.bookedHotels) ? user.bookedHotels : [];

  const infoRows = [
    {
      label: t("profile.info.email"),
      value: user?.email || "",
      icon: <EmailRoundedIcon fontSize="small" />,
    },
    {
      label: t("profile.info.phone"),
      value: user?.phoneNumber || user?.phone || "",
      icon: <PhoneRoundedIcon fontSize="small" />,
    },
    {
      label: t("profile.info.address"),
      value: user?.address || user?.city || "",
      icon: <LocationOnRoundedIcon fontSize="small" />,
    },
    {
      label: t("profile.info.createdAt"),
      value: user?.createdAt
        ? new Date(user.createdAt).toLocaleDateString("az-AZ", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })
        : "",
      icon: <CalendarTodayRoundedIcon fontSize="small" />,
    },
  ];

  const fullName =
    [user?.firstName, user?.lastName].filter(Boolean).join(" ") ||
    user?.email ||
    "User";

  const primaryText = user?.firstName || user?.email || "User";
  const initial = primaryText.charAt(0).toUpperCase();

  const stats = [
    {
      label: t("profile.stats.reservations"),
      value: user?.stats?.reservationCount ?? user?.reservationCount ?? "",
    },
    {
      label: t("profile.stats.hotels"),
      value: user?.stats?.hotelCount ?? user?.hotelCount ?? "",
    },
    {
      label: t("profile.stats.reviews"),
      value: user?.stats?.reviewCount ?? user?.reviewCount ?? "",
    },
  ];

  const preferences = [
    t("profile.preferences.family"),
    t("profile.preferences.baku"),
    t("profile.preferences.fiveStar"),
    t("profile.preferences.airportTransfer"),
  ];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#edf3fa",
        py: { xs: 4, md: 6 },
      }}
    >
      <Container maxWidth="lg">
        <Paper
          elevation={0}
          sx={{
            borderRadius: 4,
            overflow: "hidden",
            border: "1px solid rgba(15, 52, 85, 0.12)",
            boxShadow: "0 18px 45px rgba(9, 32, 53, 0.10)",
            background: "linear-gradient(135deg, #ffffff 0%, #f4f8ff 100%)",
          }}
        >
          <Box
            sx={{
              px: { xs: 2, md: 4 },
              py: { xs: 2.5, md: 3 },
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 2,
              background: "linear-gradient(90deg, #0d2f4d 0%, #123d5f 0%, #1a4b74 100%)",
              color: "#fff",
            }}
          >
            <Box>
              <Typography variant="overline" sx={{ opacity: 0.8, letterSpacing: 1.2 }}>
                {t("profile.label")}
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 700 }}>
                {t("profile.title")}
              </Typography>
            </Box>

            <Button
              variant="outlined"
              startIcon={<ArrowBackRoundedIcon />}
              onClick={() => navigate("/")}
              sx={{
                color: "#fff",
                borderColor: "rgba(255,255,255,0.4)",
                textTransform: "none",
                borderRadius: 999,
                px: 2,
                "&:hover": {
                  borderColor: "rgba(255,255,255,0.8)",
                  background: "rgba(255,255,255,0.06)",
                },
              }}
            >
              {t("profile.home")}
            </Button>
          </Box>

          <Box sx={{ p: { xs: 2, md: 4 } }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                alignItems: { xs: "flex-start", sm: "center" },
                justifyContent: "space-between",
                gap: 2,
                mb: 3,
              }}
            >
              <Stack direction="row" spacing={2.5} alignItems="center">
                <Avatar
                  src={user?.profileImageUrl || undefined}
                  alt={fullName}
                  sx={{
                    width: 88,
                    height: 88,
                    bgcolor: "secondary.main",
                    color: "primary.dark",
                    fontSize: 30,
                    fontWeight: 800,
                    border: "3px solid #fff",
                    boxShadow: "0 12px 28px rgba(13, 47, 77, 0.18)",
                  }}
                >
                  {!user?.profileImageUrl && initial}
                </Avatar>

                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
                    {fullName}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {user?.role || t("profile.member")}
                  </Typography>
                  <Box sx={{ mt: 1 }}>
                    <Chip label={t("profile.activeUser")} color="success" size="small" />
                  </Box>
                </Box>
              </Stack>

              <Button
                variant="contained"
                sx={{
                  borderRadius: 999,
                  px: 2.5,
                  textTransform: "none",
                  background: "linear-gradient(135deg, #123d5f 0%, #1d5f8a 100%)",
                  "&:hover": {
                    background: "linear-gradient(135deg, #123d5f 0%, #174d75 100%)",
                  },
                }}
              >
                {t("profile.edit")}
              </Button>
            </Box>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  md: "1.5fr 0.9fr",
                },
                gap: 3,
              }}
            >
              <Box>
                <Paper
                  elevation={0}
                  sx={{
                    p: 2.5,
                    border: "1px solid rgba(15, 52, 85, 0.12)",
                    borderRadius: 3,
                    mb: 3,
                    background: "#ffffff",
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                    {t("profile.personalInfo")}
                  </Typography>

                  <Stack spacing={2}>
                    {infoRows.map((item) => (
                      <Box key={item.label}>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1.5,
                            color: "text.secondary",
                            mb: 0.5,
                          }}
                        >
                          {item.icon}
                          <Typography variant="caption" sx={{ textTransform: "uppercase", letterSpacing: 0.6 }}>
                            {item.label}
                          </Typography>
                        </Box>
                        <Typography variant="body1" sx={{ fontWeight: 500, ml: 3.7 }}>
                          {item.value || ""}
                        </Typography>
                      </Box>
                    ))}
                  </Stack>
                </Paper>

                <Paper
                  elevation={0}
                  sx={{
                    p: 2.5,
                    border: "1px solid rgba(15, 52, 85, 0.12)",
                    borderRadius: 3,
                    background: "#ffffff",
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                    {t("profile.preferences.title")}
                  </Typography>

                  <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                    {preferences.map((item) => (
                      <Chip key={item} label={item} variant="outlined" sx={{ borderColor: "#C9D9EA", color: "#0F3B5E" }} />
                    ))}
                  </Stack>
                </Paper>
              </Box>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                {stats.map((item) => (
                  <Paper
                    key={item.label}
                    elevation={0}
                    sx={{
                      p: 2.5,
                      border: "1px solid rgba(15, 52, 85, 0.12)",
                      borderRadius: 3,
                      background: "linear-gradient(180deg, #ffffff 0%, #eef5ff 100%)",
                    }}
                  >
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      {item.label}
                    </Typography>
                    <Typography variant="h3" sx={{ fontWeight: 800, lineHeight: 1, color: "#0F3B5E" }}>
                      {item.value ?? ""}
                    </Typography>
                  </Paper>
                ))}

                <Paper
                  elevation={0}
                  sx={{
                    p: 2.5,
                    border: "1px solid rgba(15, 52, 85, 0.12)",
                    borderRadius: 3,
                    background: "#ffffff",
                  }}
                >
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
                    {t("profile.status.title")}
                  </Typography>
                  <Divider sx={{ my: 1.5 }} />
                  <Typography variant="body2" color="text.secondary">
                    {t("profile.status.description")}
                  </Typography>
                </Paper>

                <Paper
                  elevation={0}
                  sx={{
                    p: 2.5,
                    border: "1px solid rgba(15, 52, 85, 0.12)",
                    borderRadius: 3,
                    background: "#ffffff",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                    <EventAvailableRoundedIcon sx={{ color: "#0F3B5E" }} />
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                      {t("profile.reservations.title")}
                    </Typography>
                  </Box>

                  {reservations.length === 0 ? null : (
                    <Stack spacing={1.5}>
                      {reservations.map((reservation) => (
                        <Box
                          key={reservation.id || reservation.hotelName || reservation.checkIn || Math.random()}
                          sx={{
                            p: 1.5,
                            borderRadius: 2,
                            border: "1px solid rgba(15, 52, 85, 0.10)",
                            background: "#f6f9ff",
                          }}
                        >
                          <Box sx={{ display: "flex", justifyContent: "space-between", gap: 1, mb: 0.5 }}>
                            <Typography sx={{ fontWeight: 700 }}>{reservation.hotelName || t("profile.reservations.hotel")}</Typography>
                            <Chip
                              label={reservation.status || t("profile.reservations.pending")}
                              size="small"
                              color={reservation.status === "Confirmed" ? "success" : "default"}
                              variant={reservation.status ? "filled" : "outlined"}
                            />
                          </Box>
                          <Typography variant="body2" color="text.secondary">
                            {reservation.checkIn || ""} - {reservation.checkOut || ""}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {reservation.guests ? `${reservation.guests} ${t("profile.reservations.guests")}` : ""}
                          </Typography>
                        </Box>
                      ))}
                    </Stack>
                  )}
                </Paper>

                <Paper
                  elevation={0}
                  sx={{
                    p: 2.5,
                    border: "1px solid rgba(15, 52, 85, 0.12)",
                    borderRadius: 3,
                    background: "#ffffff",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                    <HotelRoundedIcon sx={{ color: "#0F3B5E" }} />
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                      {t("profile.hotels.title")}
                    </Typography>
                  </Box>

                  {bookedHotels.length === 0 ? null : (
                    <Stack spacing={1.5}>
                      {bookedHotels.map((hotel) => (
                        <Box
                          key={hotel.id || hotel.name || hotel.city || Math.random()}
                          sx={{
                            p: 1.5,
                            borderRadius: 2,
                            border: "1px solid rgba(15, 52, 85, 0.10)",
                            background: "#f8fafc",
                          }}
                        >
                          <Typography sx={{ fontWeight: 700 }}>{hotel.name || ""}</Typography>
                          <Typography variant="body2" color="text.secondary">
                            {hotel.city || ""}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {hotel.rating ? `${hotel.rating}/5` : ""}
                          </Typography>
                        </Box>
                      ))}
                    </Stack>
                  )}
                </Paper>
              </Box>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
