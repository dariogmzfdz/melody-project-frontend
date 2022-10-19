import React from "react";
import "./Top.css";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

function Top() {
  const song = (
    <Box
      sx={{
        flex: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 5,
        padding: 5,
        color: "black",
        background: "white",
        borderRadius: "10px 0px 10px 0px",
      }}
    ></Box>
  );
  return (
    <Container
      sx={{
        position: "absolute",
        width: 315.96,
        height: 254,
        right: 30,
        top: 120,
        color: "white",
      }}
    >
      <h1>Top Songs</h1>
      {song}
      {song}
      {song}
      {song}
      {song}
      {song}
    </Container>
    /*     <div className="top-container">
      <h1>Top Songs</h1>

        <div className="top-song">
          <img
            src=""
            alt="song"
          />
            <h3>song name</h3>
            <h4>artist name</h4>
        </div>
        <div className="top-song">
          <img
            src=""
            alt="song"
          />
            <h3>song name</h3>
            <h4>artist name</h4>
        </div>
        <div className="top-song">
          <img
            src=""
            alt="song"
          />
            <h3>song name</h3>
            <h4>artist name</h4>
        </div>
        <div className="top-song">
          <img
            src=""
            alt="song"
          />
            <h3>song name</h3>
            <h4>artist name</h4>
        </div>
        <div className="top-song">
          <img
            src=""
            alt="song"
          />
            <h3>song name</h3>
            <h4>artist name</h4>
        </div>
        <div className="top-song">
          <img
            src=""
            alt="song"
          />
            <h3>song name</h3>
            <h4>artist name</h4>
        </div>
        <div className="top-song">
          <img
            src=""
            alt="song"
          />
            <h3>song name</h3>
            <h4>artist name</h4>
        </div>
        <div className="top-song">
          <img
            src=""
            alt="song"
          />
            <h3>song name</h3>
            <h4>artist name</h4>
        </div>
        <div className="top-song">
          <img
            src=""
            alt="song"
          />
            <h3>song name</h3>
            <h4>artist name</h4>
        </div>
        <div className="top-song">
          <img
            src=""
            alt="song"
          />
            <h3>song name</h3>
            <h4>artist name</h4>
        </div>
    </div> */
  );
}

export default Top;
