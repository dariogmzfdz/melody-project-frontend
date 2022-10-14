import axios from "axios";
import React from "react";
import { useState } from "react";
import "./EditUser.css";
// import { toast } from "react-toastify";
import { Button, FormControl, FormControlLabel, FormLabel, Grid, Paper, Radio, RadioGroup, Select, Stack, TextField, Typography } from "@mui/material";
import Box from '@mui/material/Box';
import { useNavigate } from "react-router-dom";

const EditUser = () => {
    let newYear = new Date().getFullYear();
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [birthday, setDate] = useState("");
    const [gender, setGender] = useState("");
  const token = localStorage.getItem("userToken");
const navigate = useNavigate()
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
        "https://melody-music-stream-ten.vercel.app/user",
        {
            name:name,
            lastName: lastName,
            email: email,
            newPassword: newPassword,
            oldPassword: oldPassword,
            birthday: birthday,
            gender: gender,
        },
        {
          headers,
          "Access-Control-Allow-Origin": "*",
        }
      );
      console.log(birthday)
      console.log(data);
navigate('/')
    } catch (data) {
      const { msg } = data.response.data;
      console.log(msg);
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
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
        <Box className="formSign" component="form" sx={{ mt: 1 }}  onSubmit={submitHandler}>
          <Typography component="h1" variant="h4" >Edit User</Typography>

      
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
         
            label="Name"
          placeholder="ej: John"
          id="name"
          onChange={(e) => setName(e.target.value)}
          required
        >
        </TextField>

        <TextField
            label="Last Name"
          placeholder="ej: Smith"
          id="lastName"
          onChange={(e) => setLastName(e.target.value)}
          required
        >
        </TextField>

       
      
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

    <TextField
        label="Old Password"
          
          type="password"
          placeholder="Enter Old Password"
          id="oldPassword"
          onChange={(e) => setOldPassword(e.target.value)}
          required
          fullWidth
        ></TextField>

        <TextField
        label="New Password"
        fullWidth
          
          type="password"
          placeholder="Password"
          id="newPassword"
          required
          onChange={(e) => setNewPassword(e.target.value)}
        ></TextField>
     
        <TextField
        label="Confirm New Password"
        fullWidth
          type="password"
          placeholder="Password"
          id="confirmNewPassword"
          onChange={(e) => setConfirmNewPassword(e.target.value)}
          required
        ></TextField>
       
    
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

export default EditUser;
