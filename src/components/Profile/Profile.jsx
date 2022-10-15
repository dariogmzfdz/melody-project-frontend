import React from "react";
import { useState, useEffect } from "react";
import Account from "../../assets/account.png";
import { Link } from "react-router-dom";
import {
  Button,
  Container,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import { Table } from "react-bootstrap";
import AppBar from "../AppBar/AppBar";

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
              <Link to={"/edit"}>
                <Button variant="contained" LinkComponent={Link} to={"/edit"}>
                  Edit User Data
                </Button>
              </Link>
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
}

export default Profile;
