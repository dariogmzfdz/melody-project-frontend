import './App.css';
import SignInSide from './components/Login/Login';
import Logout from './components/Logout';
import { AuthProvider } from './hooks/useFirebase';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ForgotPassword from './components/Login/ForgotPassword';
import FormPassword from './components/Login/formPassword';


function App() {

  return (
    <>
    <Router>
<AuthProvider> 
  
  <Routes>
    <Route path='/' element={ <SignInSide/>} />
  <Route path="/forgot" element={<ForgotPassword/>} />
  <Route path='/logout' element={ <Logout/> }/>
  <Route path='/form' element={ <FormPassword />}/>
  </Routes>
  </AuthProvider>
  </Router>
  </>
  );
}

export default App;
