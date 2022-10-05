import { Button } from '@mui/material'
import { logout, selectUser } from '../feautures/userSlice';
import {useDispatch,useSelector} from 'react-redux';

const Logout = () => { 

    const user= useSelector(selectUser);

    const dispatch = useDispatch();
   
const handleLogout = (e) => {
    e.preventDefault();
 dispatch(logout(
 
    ))
  
}
  return (
    <>
    <h3> WELCOME {user.name || user.email}</h3>

    <Button onClick={(e) => handleLogout(e)}>LOGOUT</Button>
 </> 
 )
}

export default Logout