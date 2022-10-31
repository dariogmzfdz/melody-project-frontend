
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import "./createSong.css";
import { Box, Button, IconButton, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { MusicNoteOutlined } from "@mui/icons-material";
import axios from "axios";


const Songs = () => {
	const [open, setOpen] = useState(false);
	const handleOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};
	const style = {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		width: 400,
		bgcolor: 'background.paper',
		border: '2px solid #000',
		boxShadow: 24,
		pt: 2,
		px: 4,
		pb: 3,
	};



	const [name, setName] = useState("");
	const [artist, setArtist] = useState("");
		const [audio, setAudio ] = useState("");
		const [ url, setUrl ] = useState("");
		const [hasSong, setHasSong] = useState(false);
		const [song, setSong] = useState("");
		const changeHandler = (event) => {
			setAudio(event.target.files[0]);
			setUrl(true);
		  };
		
		  const handleSubmission = () => {
			const formData = new FormData();
			formData.append("song", audio);
		
			fetch("https://melodystream.herokuapp.com/cloud/uploadsong", {
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
		
		  const token = localStorage.getItem("userToken");
	
	
		  const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const data = await axios.post("https://melodystream.herokuapp.com/song",
				{
					title: name,
					artist: artist,
					genre: "Pop",
					url: song.url,
					duration:song.duration,
				}, 
				{	
					headers: {
					auth_token: token,
		  }  
		},)
			
			console.log(data);
		} catch (error) {
			console.log(error);
		}
	};
const [dataSong, setDataSong] = useState("")
	const getSongs = async (e) => {
		e.preventDefault();
		try {
			const dataSong = await axios.get("https://melodystream.herokuapp.com/all-users-songs",
			
				{	
					headers: {
					auth_token: token,
		  }  
		  	
			},)
	setDataSong();
			console.log(dataSong);
		} catch (error) {
			console.log(error);
		}
	};

	console.log(dataSong);


	return (
		<div className='container'>
			<div className='head'>
				<h1 style={{ color: "white" }}>
					Songs <MusicNoteIcon />
				</h1>

				<Button onClick={handleOpen} startIcon={<AddIcon style={{ color: "white" }} />} label="Add New Song" />
				<Modal
					open={open}
					onClose={handleClose}
					aria-labelledby="parent-modal-title"
					aria-describedby="parent-modal-description"
				>
					<Box sx={{ ...style, width: 400 }}>

						<Paper >

							<form style={{ width: '100%' }} onSubmit={handleSubmit}>
								<div className="inputText">
									<TextField
										name="name"
										onChange={(e) => setName(e.target.value)}
										label="Enter song name"
									// required={true}
									/>
								</div>
								<div className="inputArtist">
									<TextField
										name="artist"
										label="Artist name"
										// required={true}
										onChange={(e) => setArtist(e.target.value)}

									/>
								</div>
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



								<div className="inputSubmit">
									<Button
										variant='outlined'
										type="submit"
									>Submit
									</Button>
								</div>
							</form>
						</Paper>


					</Box>
				</Modal>
			</div>
			
			<TableContainer component={Paper} >
				<Table>
					<TableHead>
						<TableRow>

							<TableCell align="center">Song Name</TableCell>
							<TableCell align="center">Artist</TableCell>
							<TableCell align="center">Actions</TableCell>
						</TableRow>
					</TableHead>

					<TableBody>

						<TableRow >

							<TableCell align="center">{dataSong.name}</TableCell>
							<TableCell align="center">{dataSong.artist}</TableCell>
							<TableCell align="center">
								<Link to=''>
									<IconButton >
										<Edit />
									</IconButton>
								</Link>
								<IconButton>
									<Delete />
								</IconButton>
							</TableCell>
						</TableRow>


						<TableRow>
							<TableCell align="center"></TableCell>
							<TableCell align="center"></TableCell>

							<TableCell align="center"></TableCell>
						</TableRow>

					</TableBody>

				</Table>
			</TableContainer>
			
		</div>
	);
};

export default Songs;