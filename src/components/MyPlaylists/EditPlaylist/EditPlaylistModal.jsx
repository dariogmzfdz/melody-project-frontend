import * as React from "react";
import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Typography from "@mui/material/Typography";
import NativeSelect from "@mui/material/NativeSelect";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";

import "../playlists.css";
import axios from "axios";

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

export default function PlaylistModal({
  playlist: { name, description, thumbnail, publicAccessible },
}) {
  const token = localStorage.getItem("userToken") || null;
  const [open, setOpen] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("");

  // console.log(name, description, thumbnail, publicAccessible);

  const [playlist, setPlaylist] = React.useState({
    name: name,
    description: description,
    publicAccessible: publicAccessible,
    thumbnail: thumbnail,
  });

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

  const editPlaylist = async (e) => {
    e.preventDefault();
    const options = {
      url: `https://melodystream.herokuapp.com/playlist/edit`,
      method: "PUT",
      headers: {
        Accept: "application/json",
        auth_token: token,
        "Content-Type": "application/json;charset=UTF-8",
      },
      data: playlist,
    };

    try {
      const result = await axios(options);
      const fetchData = async () => {
        const response = await fetch(
          "https://melodystream.herokuapp.com/user",
          {
            headers: {
              auth_token: token,
            },
          }
        );
        const data = await response.json();
        console.log(data);
      };

      fetchData().catch(console.error);
    } catch (error) {
      if (error.response) {
        setErrorMsg(error.response.data.msg);
      }
    }
  };

  return (
    <div>
      <Button
        variant="outlined"
        startIcon={<ModeEditOutlineIcon />}
        className="btn-newPlaylist"
        sx={{
          color: "white",
          borderColor: "white",
          m: 2,
          p: 1,
          pl: 3,
          pr: 3,
        }}
        onClick={handleOpen}
      >
        Edit Playlist
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
              Edit Playlist
            </Typography>
          </Box>
          <FormControl
            variant="standard"
            sx={{ backgroundColor: "white", width: "100%" }}
          >
            <Input
              id="title"
              aria-describedby="my-helper-text"
              placeholder="Title"
              value={playlist.name}
              name="name"
              onChange={handleChange}
              sx={{ mt: 4, mb: 4 }}
            />
            <Input
              id="description"
              aria-describedby="my-helper-text"
              placeholder="Description"
              value={playlist.description}
              name="description"
              onChange={handleChange}
              sx={{ mb: 4 }}
            />
          </FormControl>

          {/* Privacy */}
          <Box sx={{ maxWidth: 100 }}>
            <FormControl fullWidth>
              <InputLabel variant="standard" htmlFor="uncontrolled-native">
                Privacy
              </InputLabel>
              <NativeSelect
                onChange={handleChange}
                value={playlist.publicAccessible}
                name="publicAccessible"
              >
                <option value={false}>Private</option>
                <option value={true}>Public</option>
              </NativeSelect>
            </FormControl>
          </Box>
          <div className="buttons-container">
            <Button onClick={handleClose} sx={{ pr: 4 }}>
              CANCEL
            </Button>
            <Button
              onClick={editPlaylist}
              sx={{ backgroundColor: "blue", color: "white" }}
            >
              SAVE
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
