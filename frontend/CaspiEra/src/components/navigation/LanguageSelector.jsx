import { useState } from "react";
import { useTranslation } from "react-i18next";

import {
  Button,
  Menu,
  MenuItem,
  ListItemText,
  Box,
  Typography,
} from "@mui/material";

import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";

const languages = [
  {
    code: "az",
    label: "Azərbaycan",
    short: "AZ",
    flagImage: "/src/assets/Azerbaijan.png",
  },
  {
    code: "en",
    label: "English",
    short: "EN",
    flagImage: "/src/assets/English.png",
  },
  {
    code: "ru",
    label: "Русский",
    short: "RU",
    flagImage: "/src/assets/Russian.png",
  },
];

export default function LanguageSelector({ variant = "default" }) {
  const { i18n } = useTranslation();

  const [anchorEl, setAnchorEl] = useState(null);

  const currentLanguage =
    languages.find((language) => language.code === i18n.language) ??
    languages[0];

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageChange = async (language) => {
    await i18n.changeLanguage(language.code);

    localStorage.setItem("language", language.code);

    handleClose();
  };

  return (
    <>
      <Button
        onClick={handleOpen}
        endIcon={<KeyboardArrowDownRoundedIcon />}
        sx={{
          color:
            variant === "contrast"
              ? "primary.contrastText"
              : "primary.main",
          textTransform: "none",
          fontWeight: 600,
          minWidth: 80,
          "&:hover": {
            bgcolor:
              variant === "contrast" ? "rgba(255,255,255,.12)" : "action.hover",
          },
          "&:focus-visible": {
            outline: "2px solid",
            outlineColor:
              variant === "contrast" ? "secondary.light" : "secondary.dark",
          },
        }}
      >
        <Box
          component="img"
          src={currentLanguage.flagImage}
          alt={currentLanguage.label}
          sx={{
            width: 16,
            height: 16,
            objectFit: "cover",
            borderRadius: "2px",
            display: "block",
            flexShrink: 0,
            mr: 1,
          }}
        />{" "}
        <Typography sx={{ color: "inherit", fontSize: 14, fontWeight: 600 }}>
          {currentLanguage.short}
        </Typography>
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          sx: {
            mt: 1,
            minWidth: 180,
            borderRadius: 2.5,
            bgcolor: "background.paper",
            color: "text.primary",
            border: "1px solid",
            borderColor: "divider",
          },
        }}
      >
        {languages.map((language) => (
          <MenuItem
            key={language.code}
            selected={currentLanguage.code === language.code}
            onClick={() => handleLanguageChange(language)}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Box
                component="img"
                src={language.flagImage}
                alt={language.label}
                sx={{
                  width: 16,
                  height: 16,
                  objectFit: "cover",
                  borderRadius: "2px",
                  display: "block",
                  flexShrink: 0,
                }}
              />{" "}
              <Typography sx={{ fontSize: 14, fontWeight: 600 }}>
                {language.label}
              </Typography>
            </Box>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
