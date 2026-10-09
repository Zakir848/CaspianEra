import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";

import {
  EmailOutlined,
  LockOutlined,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";

import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageSelector from "../components/navigation/LanguageSelector";
import { login } from "../features/auth/api/authApi";
import { useAuthStore } from "../features/auth/store/useAuthStore";

export default function LoginPage() {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const setAuth = useAuthStore((state) => state.setAuth);

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({
      ...current,
      [name]: value,
    }));
    setError("");
  };

  async function handleSubmit(e) {
    e.preventDefault();

    if (!form.email.trim() || !form.password) {
      setError(t("login.requiredFields"));
      return;
    }

    if (!e.currentTarget.checkValidity()) {
      e.currentTarget.reportValidity();
      return;
    }

    try {
      setLoading(true);
      setError("");

      const result = await login({ ...form, email: form.email.trim() });

      setAuth({
        accessToken: result.accessToken,
        refreshToken: result.refreshToken,
        user: {
          userId: result.userId,
          email: result.email,
          firstName: result.firstName,
          lastName: result.lastName,
          role: result.role,
        },
        rememberMe,
      });

      if (result.role === "AppAdmin") {
        navigate("/AppAdmin");
      } else {
        navigate("/");
      }
    } catch (err) {
      console.log(err.response?.data);

      const data = err.response?.data;
      console.log(data);

      if (data?.errors) {
        setError(data.errors.join(" "));
        console.log(data?.errors.join(" "));
      } else {
        console.log(data?.message);
        setError(data?.message || "Login failed.");
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
      {/* Left side */}
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
            "linear-gradient(180deg, rgba(13,34,53,0.25), rgba(13,34,53,0.88)), url('/src/assets/baku-hero.png')",
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
            position: "relative",
            zIndex: 1,
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
              lineHeight: 1.15,
              fontWeight: 800,
              mb: 2,
            }}
          >
            Azərbaycanı bizimlə kəşf edin.
          </Typography>

          <Typography
            sx={{
              color: "rgba(255,255,255,0.78)",
              fontSize: {
                md: 15,
                lg: 17,
              },
              lineHeight: 1.8,
              maxWidth: 520,
            }}
          >
            Seçilmiş otellər, rahat rezervasiya və Azərbaycanın ən gözəl
            istiqamətləri bir platformada.
          </Typography>
        </Box>
      </Box>

      {/* Form side */}
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
        {/* Top */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Typography
            component={Link}
            to="/"
            sx={{
              display: {
                xs: "block",
                md: "none",
              },
              color: "primary.main",
              fontSize: 22,
              fontWeight: 800,
              textDecoration: "none",
            }}
          >
            Caspian
            <Box
              component="span"
              sx={{
                color: "secondary.dark",
              }}
            >
              Era
            </Box>
          </Typography>

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

          <Box
            sx={{
              ml: "auto",
            }}
          >
            <LanguageSelector />
          </Box>
        </Box>

        {/* Login */}
        <Box
          sx={{
            width: "100%",
            maxWidth: 470,
            m: "auto",
            py: {
              xs: 5,
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
              lineHeight: 1.2,
              mb: 1,
            }}
          >
            {t("login.title")}
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
            {t("login.subtitle")}
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2.2,
            }}
            noValidate
          >
            <TextField
              fullWidth
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              label={t("auth.email")}
              type="email"
              autoComplete="email"
              slotProps={{
                htmlInput: { "aria-required": true },
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailOutlined
                        sx={{
                          color: "text.secondary",
                        }}
                      />
                    </InputAdornment>
                  ),
                },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                },
              }}
            />

            <TextField
              fullWidth
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              label={t("auth.password")}
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlined
                        sx={{
                          color: "text.secondary",
                        }}
                      />
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
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                },
              }}
            />
            {error && (
              <Typography
                role="alert"
                sx={{ color: "error.main", fontSize: 14 }}
              >
                {error}
              </Typography>
            )}

            <Box
              sx={{
                display: "flex",
                flexDirection: {
                  xs: "column",
                  sm: "row",
                },
                alignItems: {
                  xs: "flex-start",
                  sm: "center",
                },
                justifyContent: "space-between",
                gap: 1,
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    checked={rememberMe}
                    onChange={(event) => setRememberMe(event.target.checked)}
                  />
                }
                label={
                  <Typography
                    sx={{
                      fontSize: 14,
                      color: "text.secondary",
                    }}
                  >
                    {t("login.rememberMe")}
                  </Typography>
                }
              />

              <Typography
                component={Link}
                to="/forgot-password"
                sx={{
                  color: "primary.main",
                  fontSize: 14,
                  fontWeight: 700,
                  textDecoration: "none",

                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
              >
                {t("login.forgotPassword")}
              </Typography>
            </Box>

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
              {t("login.button")}
            </Button>
          </Box>

          <Typography
            sx={{
              mt: 4,
              color: "text.secondary",
              fontSize: 14,
              textAlign: "center",
            }}
          >
            {t("login.noAccount")}{" "}
            <Box
              component={Link}
              to="/register"
              sx={{
                color: "primary.main",
                fontWeight: 700,
                textDecoration: "none",

                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              {t("login.signUp")}
            </Box>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
