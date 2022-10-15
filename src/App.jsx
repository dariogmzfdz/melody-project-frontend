import "./App.css";
import RouterApp from "./Routes/Routes";

function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<SignInSide />} />
            <Route path="/home" element={<Home />} />
            <Route path="/admin" element={<AdminView />} />
            <Route path="/forgot" element={<ForgotPassword />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/edit" element={<EditUser />} />
            <Route path="/form" element={<FormPassword />} />
          </Routes>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
