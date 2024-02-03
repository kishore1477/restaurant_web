import './App.css';
import NavBar from './navPages/Navbar';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
 import { useState, useEffect } from 'react';
import Item from './Pages/Item';
import Footer from './navPages/Footer';
import Checkout from './Pages/Checkout';
import Home from './Pages/Home';
import Login from './navPages/Login';
import Signup from './navPages/Signup';
import { ToastContainer } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setToken } from './redux/slice/authenticationSlice';
import ForgotPassword from './navPages/ForgotPassword';
import ProductsByCategory from './navPages/ProductsByCategory';
import Profile from './navPages/Profile';
function App() {
  const dispatch = useDispatch();
// Example App component or a component that loads on every page
useEffect(() => {
  // Check if there's a token in browser storage
  const storedToken = localStorage.getItem('jwtToken');
  // If there is a stored token, dispatch the setToken action
  if (storedToken) {
    dispatch(setToken(storedToken));
  }
}, [dispatch]);
  return (
   <div className='flex flex-col min-h-screen'>
    <ToastContainer />
   <BrowserRouter>
   <NavBar />
    <Routes>
        <Route  exact path='/' element={<Home />} />
        <Route exact path='/login' element={<Login/>} />
        <Route exact path='/forgotPassword' element={<ForgotPassword/>} />
        <Route exact path='/register' element={<Signup/>} />
        <Route exact path='/profile' element={<Profile/>} />
        <Route exact path='/productsByCategory' element={<ProductsByCategory/>} />
        <Route exact path='/itemDetails' element={<Item />} />
        <Route exact path='/checkout' element={<Checkout />} />
    </Routes>
     <Footer/>
  </BrowserRouter>
   </div>
  );
}

export default App;
