import * as React from "react";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

import { AiFillLock } from "react-icons/ai";
import { BiWorld } from "react-icons/bi";
import "./playlists.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function PlaylistModal() {
  const [open, setOpen] = React.useState(false);

  const [playlist, setPlaylist] = React.useState({
    title: "",
    description: "",
    privacy: false,
    thumbnail: "",
  });

  console.log(playlist);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPlaylist((prevText) => {
      return {
        ...prevText,
        [name]: value,
      };
    });
  };

  return (
    <div>
      <Button
        className="btn-newPlaylist"
        sx={{ color: "white", pb: 0 }}
        onClick={handleOpen}
      >
        New Playlist
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box component="form" noValidate autoComplete="off" sx={style}>
          <Box sx={{ display: "flex" }}>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              sx={{ width: "30%" }}
            >
              New Playlist
            </Typography>
          </Box>

          {/* Title */}
          <FormControl sx={{ backgroundColor: "white", width: "100%" }}>
            <OutlinedInput placeholder="Title" />
          </FormControl>

          {/* Description */}
          <FormControl sx={{ backgroundColor: "white", width: "100%" }}>
            <OutlinedInput placeholder="Description" />
          </FormControl>

          {/* Privacy */}
          <Box sx={{ display: "flex", width: "25%", ml: "1rem" }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Privacy</InputLabel>
              <Select
                sx={{ display: "flex", width: "100%" }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Privacy"
                value={true}
                onChange={handleChange}
              >
                <MenuItem value={true}>
                  <AiFillLock />
                  <Typography id="modal-modal-title" sx={{ pl: 2 }}>
                    Private
                  </Typography>
                </MenuItem>
                <MenuItem value={false}>
                  <BiWorld />
                  <Typography id="modal-modal-title" sx={{ pl: 2 }}>
                    Public
                  </Typography>
                </MenuItem>
              </Select>
            </FormControl>
          </Box>
          <div className="buttons-container">
            <Button sx={{ pr: 4 }}>CANCELAR</Button>
            <Button sx={{ backgroundColor: "blue", color: "white" }}>
              CREATE
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
