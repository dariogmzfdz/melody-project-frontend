import React from "react";
import "./MyPlaylists.css";
import Box from "@mui/material/Box";

function MyPlaylists() {
  return (
    <Box
      sx={{
        position: "absolute",
        width: 800,
        height: 211,
        left: 308,
        top: 120,
        backgroundColor: "white",
        "&:hover": {
          backgroundColor: "white.dark",
          opacity: [0.9, 0.8, 0.7],
        },
      }}
    />
  );
}

export default MyPlaylists;
