import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",

    admin: {
      navy: "#10263B",
      navyBorder: "#233B52",
      navyDivider: "#31485E",
      blue: "#397FEA",
      blueLight: "#8DB7FF",
      blueSoft: "#EAF1FE",
      blueBorder: "#D8E5FC",
      green: "#229B71",
      greenSoft: "#E8F6F0",
      orange: "#D9872F",
      orangeSoft: "#FFF3E5",
      purple: "#8067D8",
      purpleSoft: "#F0EDFF",
      background: "#F2F5F9",
      surface: "#FFFFFF",
      subtleSurface: "#F6F8FB",
      text: "#172A40",
      muted: "#687A90",
      border: "#E2E8F0",
      white: "#FFFFFF",
      whiteMuted: "rgba(255,255,255,.7)",
      whiteSecondary: "rgba(255,255,255,.72)",
      whiteBorder: "rgba(255,255,255,.32)",
      whiteHover: "rgba(255,255,255,.1)",
      error: "#B84040",
      errorSoft: "#FFF1F0",
    },

    // Dərin Xəzər mavisi — tam navy deyil
    primary: {
      main: "#183B4A",
      light: "#315866",
      dark: "#102B36",
      contrastText: "#F8F5EE",
    },

    // Parlaq "AI gold" əvəzinə köhnə bürünc / brass
    secondary: {
      main: "#B88A44",
      light: "#D0AD73",
      dark: "#8B6532",
      contrastText: "#172A32",
    },

    // Saf ağ əvəzinə isti təbii fon
    background: {
      default: "#F3F0E9",
      paper: "#FBF9F4",
    },

    // Qara/navy əvəzinə yumşaq mürəkkəb ton
    text: {
      primary: "#1D3138",
      secondary: "#6D7472",
    },

    // Soyuq boz deyil, isti stone
    divider: "#DDD7CC",

    success: {
      main: "#56705D",
    },

    error: {
      main: "#A84D43",
    },

    warning: {
      main: "#C18A3D",
    },
  },

  shape: {
    // hər şeyi həddindən artıq yumru etmə
    borderRadius: 8,
  },

  typography: {
    fontFamily: [
      "Inter",
      "Arial",
      "sans-serif",
    ].join(","),

    h1: {
      fontWeight: 600,
      lineHeight: 1.08,
      letterSpacing: "-0.025em",
    },

    h2: {
      fontWeight: 600,
      letterSpacing: "-0.02em",
    },

    h3: {
      fontWeight: 600,
    },

    button: {
      fontWeight: 600,
      textTransform: "none",
      letterSpacing: "0.01em",
    },
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 7,
          boxShadow: "none",
        },
      },
    },

    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
  },
});

export default theme;