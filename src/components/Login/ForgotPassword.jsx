import { useState } from "react";
import { TextField, Typography } from "@mui/material";
import { Button } from "@mui/material";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import "./forgot.css";
import axios from "axios";
export default function ForgotPassword() {
  const [user, setUser] = useState({
    email: "",
  });
  const [error, setError] = useState();
  const [success, setSuccess] = useState();
  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      const data = await axios
        .post(
          "https://melodystream.herokuapp.com/user/password-reset",
          {
            email: user.email,
          },
          {
            "Access-Control-Allow-Origin": "*",
          }
        )
        .then((success) => {
          setSuccess(success.data.message);
        });
    } catch (error) {
      //handle error
      setError(error.response.data.msg);
    }
  };
  const handleChange = ({ target: { value, name } }) => {
    setUser({ ...user, [name]: value });
  };
  return (
    <div className="back">
      <Box
        sx={{
          paddingTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box component="form" sx={{ mt: 1 }} onSubmit={handleResetPassword}>
          <Typography>Forgot Password</Typography>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={handleChange}
          />
          <Typography color="#ff0000">{error}</Typography>
          <Typography color="#02c660">{success}</Typography>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Send
          </Button>

          <Link to="/">
            <Button sx={{ mt: 1, mb: 1 }}>Back</Button>
          </Link>
        </Box>
      </Box>
    </div>
  );
}
