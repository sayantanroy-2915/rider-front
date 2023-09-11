import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import UserDetails from './components/UserDetails';
import ChangePswd from './components/ChangePswd';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={ (localStorage.getItem('RiderJWT'))?<Home />:<Login /> } />
        <Route path="/home" element={ <Home /> } />
        <Route path="/login" element={ <Login /> } />
        <Route path="/signup" element={ <Signup /> } />
        <Route path="/userdetails" element={ <UserDetails/> } />
        <Route path="/changepswd" element={ <ChangePswd/> } />
      </Routes>
    </div>
  );
}

export default App;