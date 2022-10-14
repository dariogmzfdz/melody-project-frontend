import './App.css';
import SignInSide from '../src/Components/Login/Login.jsx';
import Logout from '../src/Components/Logout.jsx';
import { AuthProvider } from './hooks/useFirebase';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ForgotPassword from '../src/Components/Login/ForgotPassword.jsx';
import FormPassword from '../src/Components/Login/formPassword.jsx';
import Signup from '../src/Screens/SignIn/SignIn.jsx'
import EditUser from './Components/EditUser/EditUser';

function App() {

  return (
    <Router>
<AuthProvider> 
  
  <Routes>
  <Route path='/' element={ <SignInSide/>} />
  <Route path="/forgot" element={<ForgotPassword/>} />
  <Route path="/signup" element={<Signup/>} />
  <Route path='/logout' element={ <Logout/> }/>
  <Route path='/form' element={ <FormPassword />}/>
  <Route path='/edituser' element={ <EditUser /> }/>
  </Routes>
  </AuthProvider>
  </Router>
  );
}

export default App;
