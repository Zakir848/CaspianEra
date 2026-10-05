import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",

    // CaspianEra Navy
    primary: {
      main: "#17324D",
      light: "#254D70",
      dark: "#0D2235",
      contrastText: "#FFFFFF",
    },

    // CaspianEra Gold
    secondary: {
      main: "#D6A94F",
      light: "#E7C58B",
      dark: "#A97B2F",
      contrastText: "#17324D",
    },

    background: {
      default: "#F7F9FC",
      paper: "#FFFFFF",
    },

    text: {
      primary: "#17324D",
      secondary: "#64748B",
    },

    divider: "#E8EDF2",

    success: {
      main: "#2E7D5B",
    },

    error: {
      main: "#D64545",
    },

    warning: {
      main: "#D6A94F",
    },
  },

  shape: {
    borderRadius: 12,
  },

  typography: {
    fontFamily: [
      "Inter",
      "Roboto",
      "Arial",
      "sans-serif",
    ].join(","),

    h1: {
      fontWeight: 700,
      lineHeight: 1.08,
    },

    h2: {
      fontWeight: 700,
    },

    h3: {
      fontWeight: 700,
    },

    button: {
      fontWeight: 700,
      textTransform: "none",
    },
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          boxShadow: "none",
        },
      },
    },

    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
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