
import  { useState } from 'react'
import { TextField, Typography } from '@mui/material';
import {Button} from '@mui/material';
import { Box } from '@mui/system';
import { Link } from 'react-router-dom';
import './forgot.css';
import axios from 'axios';
export default function ForgotPassword() {
    const [user,setUser] = useState({
        email: "",
      });
      const [error,setError] = useState();
      const [success,setSuccess] = useState();

const handleResetPassword = async (e) => {
        e.preventDefault();
        axios({
          method: "post",
          url: "http://localhost:3000/password-reset",
          data: user.email,
          headers: { "Content-Type": "multipart/form-data" },
        })
          .then(function (response) {
            //handle success
            console.log(response.data.msg);
          })
          .catch(function (error) {
            //handle error
            setError(error.response.data.msg);
          });
        }
      const handleChange = ({ target: { value, name } }) =>{
        setUser({ ...user, [name]: value });
      }
  return (
    <div className='back' >
       <Box 
          sx={{
            paddingTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
    <Box component="form" sx={{ mt: 1 }} onSubmit={handleResetPassword} >
   <Typography >Forgot Password</Typography>
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
    
    // value={datos.email}
  />
  <Typography color='#ff0000'>{error}</Typography>
  <Button
  type="submit"
  fullWidth
  variant="contained"
  sx={{ mt: 3, mb: 2 }}
>
Send
</Button>

<Link to='/'>
<Button
  sx={{ mt: 1, mb: 1 }}
>
Back
</Button>
</Link>
</Box>

</Box>
</div>
  )
}

