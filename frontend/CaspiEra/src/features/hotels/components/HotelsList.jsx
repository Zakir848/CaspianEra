import React from "react";
import { Box } from "@mui/material";
import HotelCard from "./TestHotel"

export default function HotelsList({ hotels = [] }) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          sm: "repeat(2, minmax(0, 1fr))",
          lg: "repeat(3, minmax(0, 1fr))",
        },
        gap: 3,
        width: "100%",
      }}
    >
      {hotels.map((hotel) => (
        <HotelCard key={hotel.id} hotel={hotel} />
      ))}
    </Box>
  );
}