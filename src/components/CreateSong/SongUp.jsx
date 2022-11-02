import {  MusicNoteOutlined } from '@mui/icons-material';
import { Button } from '@mui/material';
import React, { useState } from 'react'
import '../MyPlaylists/playlists.css'

const SongUp = () => {
const [audio, setAudio ] = useState("");
const [ url, setUrl ] = useState("");
const [hasSong, setHasSong] = React.useState(false);
const [song, setSong] = React.useState("");
const changeHandler = (event) => {
    setAudio(event.target.files[0]);
    setUrl(true);
  };

  const handleSubmission = () => {
    const formData = new FormData();
    formData.append("song", audio);

    fetch("http://localhost:4000/cloud/uploadsong", {
      method: "POST",
      body: formData,
 
    },
      )
      .then((response) => response.json())
      .then((result) => {
        console.log("Success:", result);
        setSong(result);
        setHasSong(true);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
return (
<div>
 
<div className="inputDiv">
									<Button
										variant="contained"
										component="label"
										className="buttonFile"
									> {<MusicNoteOutlined />}
<input 
											className="inputs"
											label="Choose song"
											type="file"
											accept="audio/*"
											name="song" onChange={changeHandler}>
	</input>
	</Button>

</div>
<div>

						{url ? (
                  <div className='inputDiv'>
                    <Button
                     variant= "outlined"
                    
                      onClick={handleSubmission}
                    >
                      Add song                    </Button>
                  </div>
                ) : (
                  <div></div>
               )}	</div>
             <h3 style={{textAlign:"center"}}>  {audio.name}</h3>
</div>
)
}
export default SongUp;