import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import DeliveredOrders from './components/DeliveredOrders';
import UserDetails from './components/UserDetails';
import ChangePswd from './components/ChangePswd';
import Delivery from './components/Delivery';
import ViewOrderDetails from './components/ViewOrderDetails';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={ (localStorage.getItem('RiderJWT'))?<Home />:<Login /> } />
        <Route path="/home" element={ <Home /> } />
        <Route path="/login" element={ <Login /> } />
        <Route path="/signup" element={ <Signup /> } />
        <Route path="/delivered" element={ <DeliveredOrders/> } />
        <Route path="/userdetails" element={ <UserDetails/> } />
        <Route path="/changepswd" element={ <ChangePswd/> } />
        <Route path="/order-details" element={ <ViewOrderDetails/> } />
        <Route path="/delivery" element={ <Delivery/> } />
      </Routes>
    </div>
  );
}

export default App;