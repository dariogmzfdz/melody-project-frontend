import './App.css';
import SignInSide from './components/Login/Login';
import  {useSelector} from 'react-redux';
import {selectUser} from './feautures/userSlice';
import Logout from './components/Logout';


function App() {
const user = useSelector(selectUser)

  return (
    <>

  {user ? <Logout/> : <SignInSide/>}
  
  </>
  );
}

export default App;
