import { useState } from "react";
import { useTranslation } from "react-i18next";

import { Button, Menu, MenuItem, ListItemText, Box } from "@mui/material";

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

export default function LanguageSelector() {
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
          color: "#102A43",
          textTransform: "none",
          fontWeight: 600,
          minWidth: 80,
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
        {currentLanguage.short}
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
              {language.label}
            </Box>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
