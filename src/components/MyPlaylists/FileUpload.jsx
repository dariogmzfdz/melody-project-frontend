import React from "react";
import ImageIcon from "@mui/icons-material/Image";
import "./playlists.css";
import PlaylistModal from "./PlaylistModal";

export default function Playlist() {
  const [selectedFile, setSelectedFile] = React.useState();
  const [isFileSelect, setIsFileSelect] = React.useState(false);
  const [hasImage, setHasImage] = React.useState(false);
  const [thumbnail, setThumbnail] = React.useState("");

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsFileSelect(true);
  };

  const handleSubmission = () => {
    const formData = new FormData();
    formData.append("thumbnail", selectedFile);

    fetch("http://localhost:3001/cloud/uploadthumbnail", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("Success:", result);
        setThumbnail(result);
        setHasImage(true);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
      <div></div>
      <div className="grid-container">
        <div className="newPlaylist">
          <div className="item">
            {hasImage ? (
              <img id="thumbnail-img" src={thumbnail.image} alt="thumbnail" />
            ) : null}
            <div className="addImg">
              <div className="fileUpload">
                <div className="image-upload">
                  <label className="image-label" htmlFor="file-input">
                    <ImageIcon sx={{ color: "blue" }} />
                  </label>
                  <input
                    id="file-input"
                    type="file"
                    name="thumbnail"
                    onChange={changeHandler}
                  />
                </div>
                {isFileSelect ? (
                  <div>
                    <button
                      className="form-submit-button"
                      onClick={handleSubmission}
                    >
                      Submit
                    </button>
                  </div>
                ) : (
                  <div className="add-image--text">ADD IMAGE</div>
                )}
              </div>
            </div>
          </div>
          <div>
            <PlaylistModal />
          </div>
        </div>
      </div>
    </>
  );
}
