// import { useState, useEffect } from "react";
// import { toast } from "react-toastify";
// import { Button, FilledInput, IconButton, TextField } from "@mui/material";
// import CloseIcon from "@mui/icons-material/Close";
// import axios from "axios";
// // import defaultImg from "../../utils/img/music.png";

// const PlaylistModel = ({ closeModel, playlist }) => {
// 	const [data, setData] = useState({
// 		title: "",
// 		description: "",
// 		img: "",
// 	});

// 	useEffect(() => {
// 	// 	setData({ title: playlist.title, description: playlist.description, img: playlist.img });
// 	// }, [playlist]);
// console.log(setData.title);
// 	// const handleInputState = (name, value) => {
// 	// 	setData((prev) => ({ ...prev, [name]: value }));
// 	// };

// 	const handleSubmit = async (e) => {
// 		e.preventDefault();
// 		try {
			
// 			const url =
//             "https://melodystream.herokuapp.com/song/all-songs";
// 			const { data: res } = await axios.put(url, data);
// 			toast.success(res.message);
// 			;
// 			window.location.reload();
// 		} catch (error) {
		
// 			console.log(error);
// 		}
// 	};

// 	return (
// 		<div className='model_container'>
// 			<IconButton className='close_btn' onClick={closeModel}>
// 				<CloseIcon />
// 			</IconButton>
// 			<div className='form_container'>
// 				<h1>Edit Details</h1>
// 				<div className='input_container'>
// 					<TextField
// 						label="Name"
// 						name="name"
// 						// value={data.title}
// 						// handleInputState={handleInputState}
// 					/>
// 				</div>
// 				<div className='input_container'>
// 					<TextField
// 						label="Description"
// 						name="desc"
// 						// value={data.description}
// 						// handleInputState={handleInputState}
// 					/>
// 				</div>
// 				<div className='input_container'>
// 					<FilledInput
// 						label="Choose Image"
// 						type="image"
// 						name="img"
// 						// value={data.img === "" ? defaultImg : data.img}
// 						// handleInputState={handleInputState}
// 					/>
// 				</div>
// 				<Button
// 					label="Submit"
// 					onClick={handleSubmit}
// 					style={{
// 						position: "absolute",
// 						bottom: "0",
// 						right: "0",
// 						margin: "1rem",
// 					}}
// 				/>
// 			</div>
// 		</div>
// 	);
// };

// export default PlaylistModel;