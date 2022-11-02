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
  Table,
  Paper,
} from "@mui/material";
import "./Profile.css";
import axios from "axios";


function Profile() {
  const [data, setData] = useState([]);
  const token = localStorage.getItem("userToken");

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("https://melodystream.herokuapp.com/user", {
        headers: {
          auth_token: token,
        },
      });
      const data = await response.json();
      const user = data.user;

      setData(user);
    };

    fetchData().catch(console.error);
  }, [token]);

  const deleteUser = async (e) => {
    e.preventDefault();
    try {
      const data = await axios.delete("https://melodystream.herokuapp.com/user",
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
    <div className="flex items-center justify-center h-fit ml-[18%] text-white">
      {/* List with the user information */}
      <Container sx={{ width: 650 }}>
        <h1 className="not-italic text-6xl font-black whitespace-nowrap text-ellipsis leading-80 font-mon">
          User Information
        </h1>
        <TableContainer component={Paper}>
          <Table>
            <TableBody className="text-white">
              <TableRow>
                <TableCell>Name: </TableCell>
                <TableCell>{data.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>LastName:</TableCell>
                <TableCell> {data.lastName}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Gender: </TableCell>
                <TableCell>{data.gender}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Email:</TableCell>{" "}
                <TableCell>{data.email}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Date: </TableCell>
                <TableCell>{data.birthday}</TableCell>
              </TableRow>
              <Grid className="buttonProfile">
                <Link to={"/edit"}>
                  <Button variant="contained">Edit User Data</Button>
                </Link>
                <Button
                  variant="outlined"
                  onClick={deleteUser}
                  className="buttonDelete"
                >
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
