import { Clear, SearchRounded } from '@mui/icons-material';
import { CircularProgress, IconButton } from '@mui/material';
import React, { Fragment, useState } from 'react';
import  './SearchBar.css'

const Search = () => {
	const [search, setSearch] = useState({
    query: '',
    list: []
  });
	const [data, setData] = useState({});
  
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await fetch(
  //       "https://melodystream.herokuapp.com/song/all-songs"
  //     );
  //     const result = await response.json();
  //     console.log(result.songs);
  //     setData(result.songs);
  //   };

  //   fetchData().catch(console.error);
  // }, []);


	const handleSearch = async (e) => {
 
    const results = data.filter(result => {
      if (e.target.value === "") return result
      return result.title.toLowerCase().includes(e.target.value.toLowerCase())
  })
setSearch({
  query:e.target.value,
  list:results
})
  }
 
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
			
				<div className="progress_container">
					<CircularProgress  />
				</div>
			
	
				<div className="results_container">
					
						<div className="songs_container">
						
								<Fragment >
							
								</Fragment>
						
						</div>
				
			
						<div className="playlists_container">
						
						</div>
				
				</div>
			
		</div>
	);
};
export default Search;