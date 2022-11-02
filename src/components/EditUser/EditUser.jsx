import axios from "axios";
import React from "react";
import { useState } from "react";
import "./EditUser.css";
// import { toast } from "react-toastify";
import {
  Button,
  FormControl,
  FormControlLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
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
 const [image, setImage] = useState('');
  const [loading,setLoading] = useState(false)
  const token = localStorage.getItem("userToken");
  const navigate = useNavigate();
 


  const submitImg = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "images");
    setLoading(true);
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dgrk2p8p3/image/upload",{
          method: "POST",
          body:data,
      }
    )
    const file= await res.json();
    setImage(file.secure_url)
    console.log(file.secure_url)
    setLoading(false)
    }


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
        "https://melodystream.herokuapp.com/user",
        {
        
          name: name,
          lastName: lastName,
          email: email,
          password: newPassword,
          oldPassword: oldPassword,
          birthday: birthday,
          gender: gender,
          avatar:image,
        },
        {
          headers,
          "Access-Control-Allow-Origin": "*",
        }
      );
  
      console.log(birthday);
      console.log(data);
      navigate("/");
    } catch (data) {
      const { msg } = data.response.data;
      console.log(msg);
    }
  };
  return (
    <div>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <Grid className="background" item xs={false} sm={4} md={7} />
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          className="formBackground"
          elevation={6}
          square
        >
          <Box
            sx={{
              my: 8,
              mx: 6,
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
              <Typography component="h1" variant="h4">
                Edit User
              </Typography>
              <div className="profile">
            { <input type="file"  onChange={submitImg} className='inputFile' /> }
            {loading ? <h3>Loading images </h3> : (<img src={image} alt="userAvatar" className='profileImg'/>)}
        </div>
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
< Grid container spacing={2} columns={12}>
<Grid item xs={6}>
              <TextField
                label="Name"
                placeholder="ej: John"
                id="name"
                onChange={(e) => setName(e.target.value)}
                required
              ></TextField>
</Grid> <Grid item xs={6}>
              <TextField

                label="Last Name"
                placeholder="ej: Smith"
                id="lastName"
                onChange={(e) => setLastName(e.target.value)}
                required
              ></TextField>
              </Grid>
  </Grid>
  <Grid container spacing={6} columns={12}>
<Grid item xs={6}>
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
</Grid>
<Grid item xs={6}>
              <FormControl className="radio">
                <Typography>Gender</Typography>
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
</Grid>
</Grid>
< Grid container spacing={2} columns={12}>
<Grid item xs={12}>
              <TextField
                label="Old Password"
                type="password"
                placeholder="Enter Old Password"
                id="oldPassword"
                onChange={(e) => setOldPassword(e.target.value)}
                required
                fullWidth
              ></TextField>
</Grid>
<Grid item xs={12}>
              <TextField
                label="New Password"
                fullWidth
                type="password"
                placeholder="Password"
                id="newPassword"
                required
                onChange={(e) => setNewPassword(e.target.value)}
              ></TextField>
             
</Grid>
 <Grid item xs={12}>
              <TextField
                label="Confirm New Password"
                fullWidth
                type="password"
                placeholder="Password"
                id="confirmNewPassword"
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                required
              ></TextField>
</Grid>
</Grid>
              <Button className="registerButton" type="submit">
                Edit User
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default EditUser;
