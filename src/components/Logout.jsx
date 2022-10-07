import { Button } from '@mui/material'
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useFirebase';

export default function Logout() { 

const {user} = useAuth();

const {logout } = useAuth();
    
   
    const handleLogout = async () => {
      try {
        await logout();
       
      } catch (error) {
        console.error(error.message);
      }  }
  return (
    <>
    <h3> WELCOME {user.displayName || user.email}</h3>

    <Link to="/"><Button onClick={handleLogout}>{logout ? "Sign Out" : "Login"}</Button>
</Link> </> 
 )
}

