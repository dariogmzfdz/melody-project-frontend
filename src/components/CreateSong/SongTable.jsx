
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import "./createSong.css";
import { Box, Button,IconButton, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { MusicNoteOutlined } from "@mui/icons-material";


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

	const [selectedAudio, setSelectedAudio] = useState(null);
	const [audioUrl, setAudioUrl] = useState(null);

	useEffect(() => {
		if (selectedAudio) {
			setAudioUrl(URL.createObjectURL(selectedAudio));
		}
	}, [selectedAudio]);

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

								<form style={{width:'100%'}} >
									<div className="inputText">
										<TextField
											name="name"
											label="Enter song name"
										// required={true}
										/>
									</div>
									<div className="inputArtist">
										<TextField
											name="artist"
											label="Artist name"
										// required={true}

										/>
									</div>
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
												name="song"
												onChange={(e) => setSelectedAudio(e.target.files[0])}

											/>
										</Button>
									</div>
									{audioUrl && selectedAudio && (
										<Box  mt={2} textAlign="center">

											<Typography >{selectedAudio.name} </Typography>
										</Box>
									)}
									



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

							<TableCell align="center">Song Name</TableCell>
							<TableCell align="center">Artist</TableCell>
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