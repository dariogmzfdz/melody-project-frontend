import AddIcon from "@mui/icons-material/Add";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import "./createSong.css";
import { Box, Button, IconButton, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { useState } from "react";
import { MusicNoteOutlined } from "@mui/icons-material";
import axios from "axios";
import { useGetUserSongsQuery } from "../../redux/services/melodyApi";




const Songs =  () => {
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
	const [audio, setAudio] = useState("");
	const [url, setUrl] = useState("");
	const [hasSong, setHasSong] = useState(false);
	const [song, setSong] = useState("");
	const [success, setSuccess] = useState("");
	const { data, isFetching, error } =  useGetUserSongsQuery();
	const [submitMsg, setsubmitMsg] = useState("");
	const token = localStorage.getItem("userToken");

	const changeHandler = (event) => {
		setAudio(event.target.files[0]);
		setUrl(true);
	};

	const handleSubmission = async() => {
		const formData = new FormData();
		formData.append("song", audio);

		await fetch("https://melodystream.herokuapp.com/cloud/uploadsong", {
			method: "POST",
			body: formData,

		},
		)
			.then((response) => response.json())
			.then((result) => {
				console.log("Success:", result);
				setSong(result);
				setHasSong(true);
				setSuccess("File successfully upload");
			})
			.catch((error) => {
				console.error("Error:", error);
			});
	};

	const handleSubmit = async(e) => {
			
			e.preventDefault();
		try {
			const data = await axios.post("https://melodystream.herokuapp.com/song",
				{
					title: name,
					artist: artist,
					genre: "Pop",
					url: song.url,
					duration: song.duration,
				},
				{
					headers: {
						auth_token: token,
					}
				},)
			

			handleClose();
			setsubmitMsg("Song successfully upload");
			console.log(data);
			window.location.reload()
		} catch (error) {
			console.log(error);
		}
	};


	const deleteSong = async(id) => {
		
		try {
			const response = await axios.delete(`https://melodystream.herokuapp.com/song/${id}`,
				{
					headers: {
						auth_token: token,
					},
				}
			)
			const result = await response.json;
			window.location.reload()
		}
		catch (error) {
			(console.log(error))
		}
	}



	if (isFetching) return <div>Loading...</div>;

	if (error) return <div>Error</div>;

	return (
		<div className='container'>
			<div className='head'>
				<h1 style={{ color: "white" }}>
					Songs <MusicNoteIcon />
				</h1>
				<h3>{submitMsg}</h3>
				<Button onClick={handleOpen} startIcon={<AddIcon style={{ color: "white" }} />} label="Add New Song" />
				<Modal
					open={open}
					onClose={handleClose}
					aria-labelledby="parent-modal-title"
					aria-describedby="parent-modal-description"
				>
					<Box sx={{ ...style, width: 400 }}>

						<Paper >

							<form style={{ width: '100%' }}  onSubmit={ handleSubmit}>
								<div className="inputText">
									<TextField
										name="name"
										onChange={(e) => setName(e.target.value)}
										label="Enter song name"
										required={true}
									/>
								</div>
								<div className="inputArtist">
									<TextField
										name="artist"
										label="Artist name"
										required={true}
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
											<div className="butDiv">
												<Button
													variant="outlined"

													onClick={handleSubmission}
												>
													Add song                    </Button>  <h4 style={{ textAlign: "center" }}>  {audio.name}</h4>
											</div>
										) : (
											<div></div>
										)}	</div>

								</div>

								<h3 style={{ textAlign: "center", color: "#25dc8b" }} >{success}</h3>



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



						{data.songs.map((song) => (
							<TableRow key={song._id}>

								<TableCell align="center">
									{song.title}
								</TableCell>
								<TableCell align="center">
									{song.artist}
								</TableCell>
								<TableCell align="center">
									
									<IconButton onClick={() => deleteSong(song._id)}>
										<Delete />
									</IconButton>
								</TableCell>
							</TableRow>
						))}




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