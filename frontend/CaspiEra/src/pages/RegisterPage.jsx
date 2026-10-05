import React, { useState } from "react";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";

import {
  EmailOutlined,
  LockOutlined,
  Person2Outlined,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";

import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageSelector from "../components/navigation/LanguageSelector";
import { useAuthStore } from "../features/auth/store/useAuthStore";
import { register } from "../features/auth/api/authApi";

export default function RegisterPage() {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    console.log(form);

    if (form.password !== form.confirmPassword) {
      setError(t("register.passwordMismatch"));
      return;
    }

    setLoading(true);
    setError("");

    try {
      const result = await register(form);

      setAuth({
        accessToken: result.userId,
        refreshToken: result.refreshToken,
        user: {
          userId: result.userId,
          email: result.email,
          firstName: result.firstName,
          lastName: result.lastName,
          password: result.password,
        },
      });
      navigate("/");
    } catch (err) {
      const data = err.response?.data;

      if (data?.errors) {
        setError(data.errors.join(" "));
        console.log(data?.errors.join(" "));
      } else {
        console.log(data?.message);
        setError(data?.message || "Registration failed.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <Box
      sx={{
        minHeight: "100dvh",
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          md: "1.1fr 0.9fr",
        },
        bgcolor: "background.default",
      }}
    >
      {/* Brand image */}
      <Box
        sx={{
          display: {
            xs: "none",
            md: "flex",
          },
          position: "relative",
          minHeight: "100dvh",
          overflow: "hidden",
          backgroundImage:
            "linear-gradient(180deg, rgba(13,34,53,0.25), rgba(13,34,53,0.9)), url('/src/assets/baku-hero.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          alignItems: "flex-end",
          p: {
            md: 5,
            lg: 8,
          },
        }}
      >
        <Box
          sx={{
            maxWidth: 600,
          }}
        >
          <Typography
            sx={{
              color: "secondary.main",
              fontSize: 14,
              fontWeight: 700,
              letterSpacing: 3,
              mb: 2,
            }}
          >
            CASPIANERA
          </Typography>

          <Typography
            sx={{
              color: "common.white",
              fontSize: {
                md: 38,
                lg: 48,
              },
              fontWeight: 800,
              lineHeight: 1.15,
              mb: 2,
            }}
          >
            Səyahətiniz CaspianEra ilə başlayır.
          </Typography>

          <Typography
            sx={{
              color: "rgba(255,255,255,0.78)",
              fontSize: {
                md: 15,
                lg: 17,
              },
              lineHeight: 1.8,
            }}
          >
            Hesabınızı yaradın, sevdiyiniz otelləri kəşf edin və
            rezervasiyalarınızı rahatlıqla idarə edin.
          </Typography>
        </Box>
      </Box>

      {/* Register form */}
      <Box
        sx={{
          minHeight: {
            xs: "100dvh",
            md: "auto",
          },
          display: "flex",
          flexDirection: "column",
          bgcolor: "background.paper",
          px: {
            xs: 2.5,
            sm: 5,
            md: 6,
            lg: 10,
          },
          py: {
            xs: 2.5,
            sm: 4,
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box
            component={Link}
            to="/"
            sx={{
              color: "primary.main",
              fontWeight: 700,
              textDecoration: "none",
            }}
          >
            {t("common.back")}
          </Box>

          <Box sx={{ ml: "auto" }}>
            <LanguageSelector />
          </Box>
        </Box>

        <Box
          sx={{
            width: "100%",
            maxWidth: 500,
            m: "auto",
            py: {
              xs: 4,
              sm: 6,
            },
          }}
        >
          <Typography
            component="h1"
            sx={{
              color: "text.primary",
              fontSize: {
                xs: 30,
                sm: 36,
              },
              fontWeight: 800,
              mb: 1,
            }}
          >
            {t("register.title")}
          </Typography>

          <Typography
            sx={{
              color: "text.secondary",
              fontSize: {
                xs: 14,
                sm: 15,
              },
              lineHeight: 1.7,
              mb: 4,
            }}
          >
            {t("register.subtitle")}
          </Typography>

          <Box
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
            onSubmit={handleSubmit}
          >
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "repeat(2, minmax(0, 1fr))",
                },
                gap: 2,
              }}
            >
              <TextField
                fullWidth
                name="firstname"
                label={t("auth.firstName")}
                value={form.firstname}
                onChange={handleChange}
                required
              />

              <TextField
                fullWidth
                name="lastname"
                value={form.lastname}
                onChange={handleChange}
                label={t("auth.lastName")}
                required
              />
            </Box>

            <TextField
              fullWidth
              name="email"
              label={t("auth.email")}
              value={form.email}
              onChange={handleChange}
              type="email"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailOutlined />
                    </InputAdornment>
                  ),
                },
              }}
              sx={{ textAlign: "center" }}
              required
            />

            <TextField
              fullWidth
              name="password"
              label={t("auth.password")}
              value={form.password}
              onChange={handleChange}
              type={showPassword ? "text" : "password"}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlined />
                    </InputAdornment>
                  ),

                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword((prev) => !prev)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />

            <TextField
              fullWidth
              name="confirmPassword"
              label={t("auth.confirmPassword")}
              value={form.confirmPassword}
              onChange={handleChange}
              type={showConfirmPassword ? "text" : "password"}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                        edge="end"
                      >
                        {showConfirmPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />

            <Typography sx={{ color: "red" }}>{error}</Typography>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{
                minHeight: 52,
                mt: 1,
                borderRadius: 2,
                fontSize: 15,
                fontWeight: 700,
                boxShadow: "none",

                "&:hover": {
                  boxShadow: "none",
                },
              }}
            >
              {loading ? t("register.loading") : t("register.button")}
            </Button>
          </Box>

          <Typography
            sx={{
              mt: 4,
              textAlign: "center",
              color: "text.secondary",
              fontSize: 14,
            }}
          >
            {t("register.hasAccount")}{" "}
            <Box
              component={Link}
              to="/login"
              sx={{
                color: "primary.main",
                fontWeight: 700,
                textDecoration: "none",

                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              {t("register.signIn")}
            </Box>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
