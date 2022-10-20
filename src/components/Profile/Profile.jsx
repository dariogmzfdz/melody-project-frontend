import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Container,
  Grid,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
  Table,
  
  
} from "@mui/material";
import AppBar from "../AppBar/AppBar";
import './Profile.css';
import axios from "axios";
import AvatarUpload from "../AppBar/Avatar";

function Profile() {
  const [data, setData] = useState([]);
  const token = localStorage.getItem("userToken");
 
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://melody-music-stream-ten.vercel.app/user",
        {
          headers: {
            auth_token: token,
          },
        }
      );
      const data = await response.json();
      const user = data.user;

      setData(user);
    };

    fetchData().catch(console.error);
  }, [token]);

  const deleteUser = async (e) => {
    e.preventDefault();
    try {
      const data = await axios.delete("https://melody-music-stream-ten.vercel.app/user",
      {
        headers: {
          auth_token: token,
        },
      }
    ); const response = await data.json();

  } 

  catch (error){ 
    (console.log (error))
   }
  };


  return (
    <div>
      <AppBar />
      {/* List with the user information */}
      <Container className="user-info">
         <div className="user-img-container">
          {/* INSERT USER PHOTO HERE! */}
          <img className="user-img" src={""} alt="" />
        </div> 
        <TableContainer className="user-data">
          <Table>
            <Typography color="common.white" component="h1" variant="h5">
              User Information
            </Typography>
           
<AvatarUpload/>
            <TableBody> 
             
              <TableRow className="user-name">
                <TableCell>Name: </TableCell>
                <TableCell>{data.name}</TableCell>
              </TableRow>
              <TableRow className="user-name">
                <TableCell>LastName:</TableCell>
                <TableCell> {data.lastName}</TableCell>
              </TableRow>
              <TableRow className="user-name">
                <TableCell>Gender: </TableCell>
                <TableCell>{data.gender}</TableCell>
              </TableRow>
              <TableRow className="user-email">
                <TableCell>Email:</TableCell>{" "}
                <TableCell>{data.email}</TableCell>
              </TableRow>
              <TableRow className="user-email">
                <TableCell>Date: </TableCell>
                <TableCell>{data.birthday}</TableCell>
              </TableRow>
             <Grid className="buttonProfile">
              <Link to={"/edit"}>
                <Button variant="contained">
                  Edit User Data
                </Button>
                </Link>
                <Button variant="outlined" onClick={deleteUser} className="buttonDelete">
                  Delete account
                </Button>
              
              </Grid>
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
}

export default Profile;
