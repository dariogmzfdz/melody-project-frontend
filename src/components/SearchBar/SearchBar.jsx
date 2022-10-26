import { Clear, SearchRounded } from '@mui/icons-material';
import { CircularProgress, IconButton } from '@mui/material';
import axios from 'axios';
import React, { Fragment, useState } from 'react';
import  './SearchBar.css'

const Search = () => {
	const [search, setSearch] = useState("");
	const [results, setResults] = useState({});
	const [isFetching, setIsFetching] = useState(false);

	const handleSearch = async ({ currentTarget: input }) => {
		setSearch(input.value);
		setResults({});
		try {
			setIsFetching(true);
			const url = "https://melodystream.herokuapp.com/all-songs" + `/${input.value}`;
			const { data } = await axios.get(url);
			setResults(data);
			setIsFetching(false);
		} catch (error) {
			console.log(error);
			setIsFetching(false);
		}
	};

	return (
		<div className="container">
			<div className="search_input_container">
				<IconButton>
					<SearchRounded />
				</IconButton>
				<input
					type="text"
					placeholder="Search for songs and playlists"
					onChange={handleSearch}
					value={search}
				/>
				<IconButton onClick={() => setSearch("")}>
					<Clear />
				</IconButton>
			</div>
			{isFetching && (
				<div className="progress_container">
					<CircularProgress  />
				</div>
			)}
			{Object.keys(results).length !== 0 && (
				<div className="results_container">
					{results.songs.length !== 0 && (
						<div className="songs_container">
							{results.songs.map((song) => (
								<Fragment key={song._id} title={song.url}>
								<h2 song={song}>hol</h2>
								</Fragment>
							))}
						</div>
					)}
					{results.playlists.length !== 0 && (
						<div className="playlists_container">
						
						</div>
					)}
				</div>
			)}
		</div>
	);
};
export default Search;