import React from "react";
import "./Features.css";
import Box from "@mui/material/Box";

function Features() {
  return (
    <Box
      sx={{
        position: "absolute",
        width: 800,
        height: 211,
        left: 308,
        top: 400,
        backgroundColor: "white",
        "&:hover": {
          backgroundColor: "white.dark",
          opacity: [0.9, 0.8, 0.7],
        },
      }}
    />
  );
}

export default Features;
