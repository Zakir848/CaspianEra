import { useState } from "react";
import { useTranslation } from "react-i18next";

import {
  AppBar,
  Box,
  Button,
  Container,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";

import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

import CaspianEraLogo from "../../assets/CaspianEra_Logo.png";

import LanguageSelector from "./LanguageSelector";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../features/auth/store/useAuthStore";
import UserMenu from "../../features/auth/components/UserMenu";

export default function Header() {
  const { t } = useTranslation();

  const { user, refreshToken, logout } = useAuthStore();
  console.log(user, logout);

  const navigate = useNavigate();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogOut = async () => {
    try {
      await logout(refreshToken);

      logout();
    } catch (error) {
      console.error(error);
    }
  };

  const navItems = [
    {
      key: "home",
      label: t("navbar.home"),
    },
    {
      key: "hotels",
      label: t("navbar.hotels"),
    },
    {
      key: "cities",
      label: t("navbar.cities"),
    },
    {
      key: "experiences",
      label: t("navbar.experiences"),
    },
    {
      key: "about",
      label: t("navbar.about"),
    },
    {
      key: "business",
      label: t("navbar.business"),
    },
  ];

  return (
    <>
      {/* =====================================
          HEADER
      ===================================== */}

      <AppBar
        position="relative"
        elevation={0}
        sx={{
          bgcolor: "transparent",
          color: "#FFFFFF",

          boxShadow: "none",
          borderBottom: "none",

          zIndex: (theme) => theme.zIndex.drawer ,
        }}
      >
        <Container
          maxWidth="xl"
          sx={{
            px: {
              xs: 2,
              sm: 3,
              lg: 4,
            },
          }}
        >
          <Toolbar
            disableGutters
            sx={{
              minHeight: {
                xs: "68px !important",
                md: "82px !important",
              },
            }}
          >
            {/* =================================
                LOGO
            ================================= */}

            <Box
              sx={{
                display: "flex",
                alignItems: "center",

                flexShrink: 0,

                cursor: "pointer",

                mr: {
                  xs: "auto",
                  lg: 4,
                },
              }}
            >
              <Box
                component="img"
                src={CaspianEraLogo}
                alt="CaspianEra"
                sx={{
                  width: {
                    xs: 48,
                    sm: 55,
                    md: 62,
                  },

                  height: "auto",
                  objectFit: "contain",

                  mr: 1.2,
                }}
              />

              <Box>
                <Typography
                  sx={{
                    color: "#FFFFFF",

                    fontFamily: "Georgia, 'Times New Roman', serif",

                    fontSize: {
                      xs: 20,
                      sm: 24,
                      md: 27,
                    },

                    fontWeight: 600,

                    lineHeight: 1,

                    letterSpacing: "-0.4px",
                  }}
                >
                  Caspian
                  <Box
                    component="span"
                    sx={{
                      color: "#D8AC54",
                    }}
                  >
                    Era
                  </Box>
                </Typography>

                <Typography
                  sx={{
                    display: {
                      xs: "none",
                      sm: "block",
                    },

                    mt: 0.7,

                    color: "rgba(255,255,255,.72)",

                    fontSize: 8,

                    fontWeight: 500,

                    letterSpacing: 2.1,

                    textTransform: "uppercase",
                  }}
                >
                  {t("hero.titleSecond")}
                </Typography>
              </Box>
            </Box>

            {/* =================================
                DESKTOP NAV
            ================================= */}

            <Box
              component="nav"
              sx={{
                display: {
                  xs: "none",
                  lg: "flex",
                },

                flex: 1,

                justifyContent: "center",
                alignItems: "center",

                gap: {
                  lg: 0,
                  xl: 0.4,
                },
              }}
            >
              {navItems.map((item, index) => (
                <Button
                  key={item.key}
                  sx={{
                    position: "relative",

                    px: {
                      lg: 1.3,
                      xl: 1.7,
                    },

                    py: 1,

                    color: index === 0 ? "#FFFFFF" : "rgba(255,255,255,.82)",

                    fontSize: {
                      lg: 12,
                      xl: 13,
                    },

                    fontWeight: index === 0 ? 700 : 500,

                    textTransform: "none",

                    borderRadius: 0,

                    "&::after":
                      index === 0
                        ? {
                            content: '""',

                            position: "absolute",

                            left: 14,
                            right: 14,
                            bottom: 1,

                            height: 2,

                            bgcolor: "#D8AC54",

                            borderRadius: "10px",
                          }
                        : {},

                    "&:hover": {
                      color: "#FFFFFF",

                      bgcolor: "rgba(255,255,255,.06)",
                    },
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </Box>

            {/* =================================
                ACTIONS
            ================================= */}

            <Box
              sx={{
                display: "flex",
                alignItems: "center",

                gap: {
                  xs: 0.2,
                  sm: 0.5,
                },

                ml: {
                  xs: 0,
                  lg: 2,
                },
              }}
            >
              {/* SEARCH */}

              <IconButton
                aria-label={t("common.search")}
                sx={{
                  display: {
                    xs: "none",
                    sm: "inline-flex",
                  },

                  color: "#FFFFFF",

                  "&:hover": {
                    bgcolor: "rgba(255,255,255,.10)",
                  },
                }}
              >
                <SearchRoundedIcon />
              </IconButton>

              {/* LANGUAGE */}

              <LanguageSelector />

              {/* WISHLIST */}

              <IconButton
                aria-label="wishlist"
                sx={{
                  display: {
                    xs: "none",
                    md: "inline-flex",
                  },

                  color: "#FFFFFF",

                  "&:hover": {
                    bgcolor: "rgba(255,255,255,.10)",

                    color: "#FFDFE6",
                  },
                }}
              >
                <FavoriteRoundedIcon />
              </IconButton>

              {/* LOGIN / REGISTER */}

              {user ? (
                <UserMenu user={user} onLogout={handleLogOut} />
              ) : (
                <Button
                  variant="contained"
                  onClick={() => navigate("/login")}
                  sx={{
                    display: {
                      xs: "none",
                      lg: "inline-flex",
                    },

                    ml: 0.7,

                    px: {
                      lg: 2,
                      xl: 2.8,
                    },

                    py: 1.05,

                    bgcolor: "#FFFFFF",
                    color: "#0B2F55",

                    borderRadius: "50px",

                    fontSize: 12,
                    fontWeight: 700,

                    whiteSpace: "nowrap",

                    textTransform: "none",

                    boxShadow: "0 4px 15px rgba(0,0,0,.08)",

                    "&:hover": {
                      bgcolor: "#F8FAFC",

                      transform: "translateY(-1px)",

                      boxShadow: "0 6px 18px rgba(0,0,0,.12)",
                    },
                  }}
                >
                  {t("navbar.loginRegister")}
                </Button>
              )}

              {/* MOBILE MENU */}

              <IconButton
                onClick={() => setMobileMenuOpen(true)}
                aria-label="menu"
                sx={{
                  display: {
                    xs: "inline-flex",
                    lg: "none",
                  },

                  ml: 0.5,

                  color: "#FFFFFF",

                  "&:hover": {
                    bgcolor: "rgba(255,255,255,.10)",
                  },
                }}
              >
                <MenuRoundedIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* =====================================
          MOBILE DRAWER
      ===================================== */}

      <Drawer
        anchor="right"
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        PaperProps={{
          sx: {
            width: {
              xs: "85%",
              sm: 350,
            },

            maxWidth: 350,

            bgcolor: "#FFFFFF",
            position: "relative",
          },
        }}
      >
        {/* DRAWER HEADER */}

        <Box
          sx={{
            minHeight: 75,

            px: 2.5,

            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "absalute",
            zIndex: 10,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Box
              component="img"
              src={CaspianEraLogo}
              alt="CaspianEra"
              sx={{
                width: 45,
                height: "auto",

                mr: 1,
              }}
            />

            <Typography
              sx={{
                color: "#0B3B60",

                fontFamily: "Georgia, serif",

                fontSize: 21,
                fontWeight: 700,
              }}
            >
              Caspian
              <Box
                component="span"
                sx={{
                  color: "#C6973D",
                }}
              >
                Era
              </Box>
            </Typography>
          </Box>

          <IconButton onClick={() => setMobileMenuOpen(false)}>
            <CloseRoundedIcon />
          </IconButton>
        </Box>

        <Divider />

        {/* MOBILE ACTIONS */}

        <Box
          sx={{
            p: 2.5,
          }}
        >
          <Box
            sx={{
              mb: 2,

              display: "flex",
              justifyContent: "center",
            }}
          >
            <LanguageSelector />
          </Box>

          <Button
            fullWidth
            variant="outlined"
            startIcon={<FavoriteRoundedIcon />}
            sx={{
              mb: 1.5,
              py: 1.2,

              borderColor: "#CBD5E1",
              color: "#334E68",

              borderRadius: 2.5,

              textTransform: "none",
            }}
          >
            Wishlist
          </Button>

          <Button
            fullWidth
            variant="contained"
            onClick={() => navigate("/login")}
            sx={{
              py: 1.3,

              bgcolor: "#0B3B60",

              borderRadius: 2.5,

              textTransform: "none",

              boxShadow: "none",

              "&:hover": {
                bgcolor: "#072D49",
                boxShadow: "none",
              },
            }}
          >
            {t("navbar.loginRegister")}
          </Button>
        </Box>

        {/* MOBILE NAVIGATION */}

        <Divider />

        <List
          sx={{
            px: 1.5,
            py: 2,
          }}
        >
          {navItems.map((item) => (
            <ListItemButton
              key={item.key}
              onClick={() => setMobileMenuOpen(false)}
              sx={{
                py: 1.3,
                px: 2,

                mb: 0.5,

                borderRadius: 2,

                color: "#334E68",

                "&:hover": {
                  bgcolor: "#F1F5F9",
                  color: "#0B3B60",
                },
              }}
            >
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  fontSize: 15,
                  fontWeight: 500,
                }}
              />
            </ListItemButton>
          ))}
        </List>
      </Drawer>
    </>
  );
}
