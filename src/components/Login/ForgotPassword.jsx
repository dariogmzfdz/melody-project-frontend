
import  { useState } from 'react'
import { useAuth } from '../../hooks/useFirebase';
import { TextField, Typography } from '@mui/material';
import {Button} from '@mui/material';
import { Box } from '@mui/system';
import { Link } from 'react-router-dom';
import './forgot.css';
export default function ForgotPassword() {
    const [user,setUser] = useState({
        email: "",
     
      });
    const [error,setError] = useState("");
    const {resetPassword} = useAuth();

    const handleResetPassword = async (e) => {
        e.preventDefault();
        if(!user.email) return setError("Write an email to reset password");
        try {
        await resetPassword(user.email);
        setError('We sent you an email. Check your inbox')
        } catch(error) {
        console.log(error.code)
        if (error.code === "auth/missing-email") return setError("Introduce email");
        if (error.code === "auth/invalid-email") return setError("Email no existe");
        if (error.code === "auth/weak-password") return setError("La contraseña debe tener 6 carácteres");
        if (error.code === "auth/user-not-found") return setError("Usuario no registrado");
        if (error.code === "auth/too-many-requests") return setError("Demasiados intentos. Intente cambiar la contraseña");
        if (error.code === "auth/wrong-password" ) return setError("Contraseña errónea");
        if (error.code === "auth/email-already-in-use" ) return setError("en uso ");

            };
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
{error &&  <h3 className='errTitle'>{error}</h3>}
</Box>

</Box>
</div>
  )
}

