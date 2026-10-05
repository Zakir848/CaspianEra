import { Box, IconButton, Typography } from "@mui/material";

import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";

export default function HeroSliderControls({
  activeSlide,
  totalSlides,
  onNext,
  onPrevious,
}) {
  const current = String(activeSlide + 1).padStart(2, "0");

  const total = String(totalSlides).padStart(2, "0");

  return (
    <Box>
      <Typography
        sx={{
          mb: 1.2,

          color: "rgba(255,255,255,.75)",

          fontSize: 11,

          textAlign: "center",
        }}
      >
        Hər səyahət yeni hekayədir!
      </Typography>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",

          gap: 1.5,
        }}
      >
        <IconButton
          onClick={onPrevious}
          sx={{
            width: 38,
            height: 38,

            color: "#FFFFFF",

            border: "1px solid rgba(255,255,255,.50)",

            "&:hover": {
              bgcolor: "rgba(255,255,255,.10)",
            },
          }}
        >
          <ArrowBackRoundedIcon fontSize="small" />
        </IconButton>

        <Typography
          sx={{
            minWidth: 52,

            color: "#FFFFFF",

            fontSize: 12,
            fontWeight: 600,

            textAlign: "center",
          }}
        >
          {current}

          <Box
            component="span"
            sx={{
              mx: 0.7,

              color: "rgba(255,255,255,.45)",
            }}
          >
            /
          </Box>

          {total}
        </Typography>

        <IconButton
          onClick={onNext}
          sx={{
            width: 38,
            height: 38,

            bgcolor: "secondary.main",

            color: "#FFFFFF",

            "&:hover": {
              bgcolor: "secondary.dark",
            },
          }}
        >
          <ArrowForwardRoundedIcon fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  );
}
