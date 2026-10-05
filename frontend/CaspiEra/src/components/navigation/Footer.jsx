import {
  Box,
  Container,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";

import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import HotelRoundedIcon from "@mui/icons-material/HotelRounded";

import { useTranslation } from "react-i18next";

const FooterLink = ({ children, onClick }) => {
  return (
    <Typography
      component="button"
      onClick={onClick}
      sx={{
        p: 0,
        border: 0,
        background: "none",
        color: "rgba(255,255,255,.65)",
        fontSize: 13,
        textAlign: "left",
        cursor: "pointer",
        transition: "all .2s ease",

        "&:hover": {
          color: "#FFFFFF",
          transform: "translateX(3px)",
        },
      }}
    >
      {children}
    </Typography>
  );
};

export default function Footer() {
  const { t } = useTranslation();

  return (
    <Box
      component="footer"
      sx={{
        mt: "auto",
        bgcolor: "#062B46",
        color: "#FFFFFF",
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          pt: {
            xs: 5,
            md: 7,
          },

          pb: 3,
        }}
      >
        {/* MAIN FOOTER */}

        <Box
          sx={{
            display: "grid",

            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "1.5fr 1fr 1fr 1.2fr",
            },

            gap: {
              xs: 4,
              md: 5,
            },
          }}
        >
          {/* =========================
              BRAND
          ========================= */}

          <Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.2,
                mb: 2,
              }}
            >
              <Box
                sx={{
                  width: 42,
                  height: 42,

                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",

                  bgcolor: "#FFFFFF",
                  color: "#0B3B60",

                  borderRadius: 2.5,
                }}
              >
                <HotelRoundedIcon />
              </Box>

              <Typography
                sx={{
                  fontSize: 24,
                  fontWeight: 800,
                  letterSpacing: "-0.7px",
                }}
              >
                CaspianEra
              </Typography>
            </Box>

            <Typography
              sx={{
                maxWidth: 320,

                color: "rgba(255,255,255,.65)",

                fontSize: 13,
                lineHeight: 1.8,
              }}
            >
              {t("footer.description")}
            </Typography>

            {/* SOCIAL MEDIA */}

            <Stack
              direction="row"
              spacing={1}
              sx={{
                mt: 2.5,
              }}
            >
              <IconButton
                aria-label="Instagram"
                sx={socialButtonStyle}
              >
                <InstagramIcon fontSize="small" />
              </IconButton>

              <IconButton
                aria-label="Facebook"
                sx={socialButtonStyle}
              >
                <FacebookRoundedIcon fontSize="small" />
              </IconButton>

              <IconButton
                aria-label="LinkedIn"
                sx={socialButtonStyle}
              >
                <LinkedInIcon fontSize="small" />
              </IconButton>
            </Stack>
          </Box>

          {/* =========================
              PLATFORM
          ========================= */}

          <Box>
            <FooterTitle>
              {t("footer.platform")}
            </FooterTitle>

            <Stack spacing={1.5}>
              <FooterLink>
                {t("navbar.hotels")}
              </FooterLink>

              <FooterLink>
                {t("navbar.cities")}
              </FooterLink>

              <FooterLink>
                {t("navbar.experiences")}
              </FooterLink>

              <FooterLink>
                {t("footer.partners")}
              </FooterLink>

              <FooterLink>
                {t("footer.advertising")}
              </FooterLink>
            </Stack>
          </Box>

          {/* =========================
              COMPANY / SUPPORT
          ========================= */}

          <Box>
            <FooterTitle>
              {t("footer.company")}
            </FooterTitle>

            <Stack spacing={1.5}>
              <FooterLink>
                {t("navbar.about")}
              </FooterLink>

              <FooterLink>
                {t("footer.helpCenter")}
              </FooterLink>

              <FooterLink>
                {t("footer.terms")}
              </FooterLink>

              <FooterLink>
                {t("footer.privacy")}
              </FooterLink>
            </Stack>
          </Box>

          {/* =========================
              CONTACT
          ========================= */}

          <Box>
            <FooterTitle>
              {t("footer.contact")}
            </FooterTitle>

            <Stack spacing={2}>
              <ContactItem
                icon={
                  <LocationOnOutlinedIcon />
                }
              >
                Bakı, Azərbaycan
              </ContactItem>

              <ContactItem
                icon={
                  <EmailOutlinedIcon />
                }
              >
                info@caspianera.az
              </ContactItem>

              <ContactItem
                icon={
                  <PhoneOutlinedIcon />
                }
              >
                +994 XX XXX XX XX
              </ContactItem>
            </Stack>
          </Box>
        </Box>

        {/* DIVIDER */}

        <Divider
          sx={{
            my: {
              xs: 4,
              md: 5,
            },

            borderColor:
              "rgba(255,255,255,.10)",
          }}
        />

        {/* =========================
            BOTTOM
        ========================= */}

        <Box
          sx={{
            display: "flex",

            flexDirection: {
              xs: "column",
              sm: "row",
            },

            justifyContent: "space-between",
            alignItems: {
              xs: "flex-start",
              sm: "center",
            },

            gap: 2,
          }}
        >
          <Typography
            sx={{
              color: "rgba(255,255,255,.50)",
              fontSize: 12,
            }}
          >
            © {new Date().getFullYear()} CaspianEra.{" "}
            {t("footer.rights")}
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",

              flexWrap: "wrap",

              gap: {
                xs: 2,
                sm: 3,
              },
            }}
          >
            <FooterBottomLink>
              {t("footer.terms")}
            </FooterBottomLink>

            <FooterBottomLink>
              {t("footer.privacy")}
            </FooterBottomLink>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

/* ===================================
   SMALL COMPONENTS
=================================== */

function FooterTitle({ children }) {
  return (
    <Typography
      sx={{
        mb: 2,

        color: "#FFFFFF",

        fontSize: 14,
        fontWeight: 700,
      }}
    >
      {children}
    </Typography>
  );
}

function ContactItem({ icon, children }) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",

        gap: 1.2,

        color: "rgba(255,255,255,.65)",
      }}
    >
      <Box
        sx={{
          display: "flex",

          color: "rgba(255,255,255,.85)",

          "& svg": {
            fontSize: 19,
          },
        }}
      >
        {icon}
      </Box>

      <Typography
        sx={{
          fontSize: 13,
        }}
      >
        {children}
      </Typography>
    </Box>
  );
}

function FooterBottomLink({ children }) {
  return (
    <Typography
      component="button"
      sx={{
        p: 0,

        border: 0,
        background: "none",

        color: "rgba(255,255,255,.50)",

        fontSize: 12,

        cursor: "pointer",

        "&:hover": {
          color: "#FFFFFF",
        },
      }}
    >
      {children}
    </Typography>
  );
}

const socialButtonStyle = {
  width: 38,
  height: 38,

  color: "#FFFFFF",

  bgcolor: "rgba(255,255,255,.08)",

  border: "1px solid rgba(255,255,255,.10)",

  transition: "all .2s ease",

  "&:hover": {
    bgcolor: "#FFFFFF",
    color: "#0B3B60",
    transform: "translateY(-2px)",
  },
};