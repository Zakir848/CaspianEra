import React, { useState } from "react";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  LinearProgress,
  TextField,
  Typography,
} from "@mui/material";

import {
  CheckCircleRounded,
  EmailOutlined,
  LockOutlined,
  Person2Outlined,
  RadioButtonUncheckedRounded,
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

  const passwordChecks = [
    { id: "uppercase", example: "A", valid: /[A-Z]/.test(form.password) },
    { id: "lowercase", example: "a", valid: /[a-z]/.test(form.password) },
    { id: "number", example: "7", valid: /\d/.test(form.password) },
    {
      id: "special",
      example: "!@#",
      valid: /[^A-Za-z0-9]/.test(form.password),
    },
    {
      id: "maxLength",
      valid: form.password.length > 0 && form.password.length <= 20,
    },
    {
      id: "minLength",
      valid: form.password.length >= 8,
    },
  ];

  const completedPasswordChecks = passwordChecks.filter(
    (check) => check.valid,
  ).length;

  const hasPassword = form.password.length > 0;

  const passwordIsValid = completedPasswordChecks === passwordChecks.length;

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
    setError("");
  }

  async function handleSubmit(e) {
    e.preventDefault();

    console.log(form);

    if (!form.password || !form.confirmPassword) {
      setError(t("register.requiredPasswords"));
      return;
    }

    if (form.password.length < 8) {
      setError(t("register.passwordMinLength"));
      return;
    }

    if (form.password.length > 20) {
      setError(t("register.passwordMaxLength"));
      return;
    }

    const passwordPattern =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,20}$/;

    if (!passwordPattern.test(form.password)) {
      setError(t("register.passwordRequirements"));
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError(t("register.passwordMismatch"));
      return;
    }

    setLoading(true);
    setError("");

    try {
      const result = await register(form);

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
              required
              type={showPassword ? "text" : "password"}
              slotProps={{
                htmlInput: { minLength: 8, maxLength: 20 },
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
              required
              type={showConfirmPassword ? "text" : "password"}
              inputProps={{ maxLength: 20 }}
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

            <Box
              component="section"
              aria-label={t("register.passwordChecklist")}
              sx={{
                mt: -1,
                p: { xs: 1.5, sm: 1.75 },
                bgcolor: !hasPassword
                  ? "rgba(24,59,74,.035)"
                  : passwordIsValid
                    ? "rgba(86,112,93,.12)"
                    : "rgba(168,77,67,.09)",
                border: "1px solid",
                borderColor: !hasPassword
                  ? "divider"
                  : passwordIsValid
                    ? "success.main"
                    : "error.main",
                borderRadius: 1,
                transition: "background-color .2s ease, border-color .2s ease",
              }}
            >
              <Box
                sx={{
                  mb: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 1,
                }}
              >
                <Typography sx={{ fontSize: 13, fontWeight: 700 }}>
                  {t("register.passwordChecklist")}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {t("register.passwordProgress", {
                    completed: completedPasswordChecks,
                    total: passwordChecks.length,
                  })}
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={(completedPasswordChecks / passwordChecks.length) * 100}
                color={
                  passwordIsValid
                    ? "success"
                    : hasPassword
                      ? "error"
                      : "primary"
                }
                sx={{
                  mb: 1.5,
                  height: 5,
                  borderRadius: 3,
                  bgcolor: "rgba(24,59,74,.1)",
                }}
              />
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "1fr",
                    sm: "repeat(2, minmax(0, 1fr))",
                  },
                  columnGap: 2,
                  rowGap: 0.75,
                }}
              >
                {passwordChecks.map((check) => (
                  <Box
                    key={check.id}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 0.65,
                      px: 0.75,
                      py: 0.65,
                      borderRadius: 0.75,
                      color: check.valid
                        ? "success.main"
                        : hasPassword
                          ? "error.main"
                          : "text.secondary",
                      bgcolor: check.valid
                        ? "rgba(86,112,93,.1)"
                        : hasPassword
                          ? "rgba(168,77,67,.07)"
                          : "rgba(24,59,74,.025)",
                    }}
                  >
                    {check.valid ? (
                      <CheckCircleRounded sx={{ fontSize: 16 }} />
                    ) : (
                      <RadioButtonUncheckedRounded sx={{ fontSize: 16 }} />
                    )}
                    {check.example && (
                      <Typography
                        component="code"
                        sx={{
                          minWidth: 34,
                          px: 0.5,
                          py: 0.15,
                          bgcolor: "background.paper",
                          borderRadius: 0.5,
                          color: "primary.dark",
                          fontSize: 11,
                          fontWeight: 700,
                          textAlign: "center",
                        }}
                      >
                        {check.example}
                      </Typography>
                    )}
                    <Typography sx={{ fontSize: 12, lineHeight: 1.4 }}>
                      {t(`register.passwordRules.${check.id}`)}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>

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
