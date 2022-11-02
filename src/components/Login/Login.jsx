import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./login.css";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import GoogleIcon from "@mui/icons-material/Google";
import { useState } from "react";
import axios from "axios";
// import { useAuth } from '../../hooks/useFirebase';
import { Link, useNavigate } from "react-router-dom";
// import { FacebookAuthProvider, signInWithPopup } from 'firebase/auth';
// import { auth } from '../../config/firebase';
import logo from "../../utils/img/logo.png";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function SignInSide() {
  const [errorMsg, setErrorMsg] = useState("");
  const [datos, setDatos] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  //  const [token,setToken] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const newDatos = { ...datos, [name]: value };
    setDatos(newDatos);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        "https://melodystream.herokuapp.com/user/login",
        {
          email: datos.email,
          password: datos.password,
        }
      );
      const { token } = result.data;
      localStorage.setItem("userToken", token);

      navigate("/home");
    } catch (error) {
      if (error.response) {
        setErrorMsg(error.response.data.msg);
        console.log(error.response.data.msg);
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid className="background" item xs={false} sm={4} md={7} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar className="avatar">
              <img src={logo} className="logoSignin" alt="logo" />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <div className="facebook">
              <button className="contained_btn">
                <FacebookRoundedIcon /> continue with facebook
              </button>
            </div>
            <div className="google">
              {" "}
              <button className="outline_btn">
                <GoogleIcon /> continue with google
              </button>
            </div>
            <h4>O</h4>
            <Box component="form" sx={{ mt: 1 }} onSubmit={handleSubmit}>
              <TextField
                margin="normal"
                required
                fullWidth
                
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={handleInputChange}
                value={datos.email}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                
                autoComplete="current-password"
                onChange={handleInputChange}
                value={datos.password}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <div className="error">{errorMsg}</div>
              <Grid container>
                <Grid item xs>
                  <Link to="/forgot">
                    <Button> Forgot password?</Button>
                  </Link>
                </Grid>
                <Grid item>
                  <Link to="/signup">
                    <Button>{"Don't have an account? Sign Up"}</Button>
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
