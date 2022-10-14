import { Button } from '@mui/material'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useFirebase';

export default function Logout() { 

  const [datos] = useState({
    email: "",
   });

const {logout } = useAuth();
    
   
    const handleLogout = async () => {
      try {
        await logout();
        localStorage.clear();
      } catch (error) {
        console.error(error.message);
      }  }
  return (
    <>
    <h3> WELCOME {datos.email}</h3>

    <Link to="/"><Button onClick={handleLogout}>{logout ? "Sign Out" : "Login"}</Button>
</Link> </> 
 )
}

