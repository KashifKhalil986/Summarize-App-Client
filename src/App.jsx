import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ComponentLayout from './page/ComponentLayout/ComponentLayout';
import Login from './component/auth/login/Login';
import Signup from './component/auth/signup/Signup';
import Profile from './page/Profile/profile';
import ProtectedRoute from './component/auth/Protected/ProtectedRoute';


function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element= {<Login  />} />
        <Route path="/signup" element={<Signup /> } />

        <Route path="/home" element={<ProtectedRoute><ComponentLayout /></ProtectedRoute>}/>
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute> }/>
      </Routes>
    </Router>
  );
}

export default App;

