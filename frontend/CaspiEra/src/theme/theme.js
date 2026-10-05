import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",

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