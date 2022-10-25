import { Box, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const { token } = useParams();
  const navigate = useNavigate();
  const submitHandler = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      console.log("Passwords do not match");
      return;
    }
    try {
      const headers = {
        auth_token: token,
      };

      const data = await axios.put(
        "https://melodystream.herokuapp.com/user/password-reset",
        {
          password: newPassword,
        },
        {
          headers,
          "Access-Control-Allow-Origin": "*",
        }
      );
      console.log(data);
      navigate("/");
    } catch (error) {
      console.log(error.response.data);
      setErrorMsg(error.response.data.msg);
    }
  };
  return (
    <Grid
      item
      xs={12}
      sm={8}
      md={5}
      component={Paper}
      elevation={6}
      square
      sx={{ height: "100vh" }}
    >
      <Box
        sx={{
          my: 8,
          mx: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          className="formSign"
          component="form"
          sx={{ mt: 1 }}
          onSubmit={submitHandler}
        >
          {" "}
          <TextField
            label="New Password"
            type="password"
            placeholder="Password"
            id="newPassword"
            required
            onChange={(e) => setNewPassword(e.target.value)}
          ></TextField>
          <TextField
            label="Confirm New Password"
            type="password"
            placeholder="Password"
            id="confirmNewPassword"
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            required
          ></TextField>
          <Button className="registerButton" type="submit">
            Reset Password
          </Button>
          {errorMsg && <Typography color="#ff0000">{errorMsg}</Typography>}
          <Link to="/forgot">
            <Button sx={{ mt: 1, mb: 1 }}>
              <p>Forgot password</p>
            </Button>
          </Link>
        </Box>
      </Box>
    </Grid>
  );
}

export default ResetPassword;
