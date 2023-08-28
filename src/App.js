import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import SignupComplete from './components/SignupComplete';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={ (localStorage.getItem('RiderJWT'))?<Home />:<Login /> } />
        <Route path="/home" element={ <Home /> } />
        <Route path="/login" element={ <Login /> } />
        <Route path="/signup" element={ <Signup /> } />
        <Route path="/signupcomplete" element={ <SignupComplete /> } />
      </Routes>
    </div>
  );
}

export default App;