import './App.css';
import SignInSide from '../src/components/Login/Login.jsx';
import Logout from '../src/components/Logout.jsx';
import { AuthProvider } from './hooks/useFirebase';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ForgotPassword from '../src/components/Login/ForgotPassword.jsx';
import FormPassword from '../src/components/Login/formPassword.jsx';
import Signup from './components/SignIn/SignIn.jsx'
import EditUser from './components/EditUser/EditUser';
// import EditUser from './components/EditUser/EditUser';

function App() {

  return (
    
    <>
     <Router>
<AuthProvider> 
  
  <Routes>
    <Route path='/' element={ <SignInSide/>} />
  <Route path="/forgot" element={<ForgotPassword/>} />
  <Route path="/signup" element={<Signup/>} />
  <Route path='/logout' element={ <Logout/> }/>
  <Route path='/edit' element={ <EditUser/> }/>
  <Route path='/form' element={ <FormPassword />}/>
  </Routes>
  </AuthProvider>
  </Router>
</>
  );
  }

export default App;
