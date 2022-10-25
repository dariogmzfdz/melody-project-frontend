import axios from "axios";
import React from "react";
import "./SignIn.css";
import { useState } from "react";
import { Box, Button, FormControl, FormControlLabel, Grid, Paper, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";


const SignIn = () => {


  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  let [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [birthday, setDate] = useState("");
  const [gender, setGender] = useState("");
  const navigate = useNavigate();
  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      console.log("Passwords do not match");
      return;
    }

    try {
      const data = await axios.post("https://melodystream.herokuapp.com/user/register",
        {
          name: name,
          lastName: lastName,
          email: email,
          password: password,
          birthday: birthday,
          gender: gender,
        })
      navigate("/home")
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>

      <Grid container component="main" sx={{ height: '100vh' }}>
        <Grid className="background"
          item
          xs={false}
          sm={4}
          md={7}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} className="formBackground" elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '1em',
              margin: '3em',
            }}
          >
            <Box className="formSign" onSubmit={submitHandler} component="form" sx={{ mt: 1 }} >
              <Typography component="h1" variant="h4" className="register" >Register</Typography>

              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value.toLowerCase())}
              ></TextField>

              <TextField
                label="Password"
                className="label"
                type="password"
                fullWidth
                placeholder="Password"
                id="password"
                required
                onChange={(e) => setPassword(e.target.value)}
              ></TextField>

              <TextField
                label="Confirm Password"
                className="label"
                fullWidth
                type="password"
                placeholder="Password"
                id="confirmPassword"
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              ></TextField>
              <Grid item xs={12} sm={12} className="labels">
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  className="form-label"
                  fullWidth
                  id="firstName"
                  label="First Name"
                  onChange={(e) => setName(e.target.value)}
                  autoFocus
                />

                <TextField
                  label="Last Name"
                  className="form-label"
                  placeholder="ej: Smith"
                  id="lastName"
                  fullWidth
                  onChange={(e) => setLastName(e.target.value)}
                  required
                ></TextField>
              </Grid>
              <TextField
                required
                className="birthDate"
                id="birthday"
                label="Birthday"
                type="date"
                onChange={(e) => setDate(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              />


              <FormControl className="radio">
                <Typography >Gender</Typography>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                >
                  <FormControlLabel
                    control={<Radio />}
                    id="gender"
                    name="gender-selector"
                    value="female"
                    onChange={(e) => setGender(e.target.value)}
                    required
                    label="Female"
                  />

                  <FormControlLabel
                    control={<Radio />}
                    id="gender"
                    name="gender-selector"
                    value="male"
                    onChange={(e) => setGender(e.target.value)}
                    required
                    label="Male"
                  />


                  <FormControlLabel
                    control={<Radio />}
                    id="gender"
                    name="gender-selector"
                    value="no-binary"
                    onChange={(e) => setGender(e.target.value)}
                    required
                    label="No-Binary"
                  />
                </RadioGroup>
              </FormControl>

              <Button className="registerButton" type="submit">
                Register
              </Button>

            </Box>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default SignIn;
