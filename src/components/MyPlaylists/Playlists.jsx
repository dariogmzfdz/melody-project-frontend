import React from "react";
import ResponsiveAppBar from "../AppBar/AppBar";
import Typography from "@mui/material/Typography";
import FileUpload from "./FileUpload";

function Playlists() {
  return (
    <div>
      <ResponsiveAppBar />
      <Typography variant="h4" color="white">
        Playlists
      </Typography>
      <FileUpload />
    </div>
  );
}

export default Playlists;
