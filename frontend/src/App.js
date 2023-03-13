import './App.css';
import NavBar from './navComponent/Navbar';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
 import { useState, useEffect } from 'react';
import Item from './Component/Item';
import Footer from './navComponent/Footer';
import Checkout from './Component/Checkout';
import Sandwitch from './navComponent/Sandwitch';
import Pizza from './navComponent/Pizza';
import Cake from './navComponent/Cake';
import Bread from './navComponent/Bread';
import Home from './Component/Home';
function App() {
  const [cart, setCart] = useState({})
  const [subTotal, setSubTotal] = useState(0)
useEffect(() => {
  try {
    console.log("cart in napp", cart)
    if(localStorage.getItem('cart')){
      console.log("cart in local is", JSON.parse(localStorage.getItem('cart')))
      setCart(JSON.parse(localStorage.getItem('cart')))
     }
  } catch (error) {
    console.log(error)
    localStorage.clear()
  }
 
}, [ ])

  const saveCart = (myCart)=>{
    localStorage.setItem('cart', JSON.stringify(myCart))
    let subt =0
    let keys = Object.keys(myCart)
    console.log("keys is ", keys)
    for (let i = 0;   i< keys.length; i++) {
      subt += myCart[keys[i]].price * myCart[keys[i]].qty
      
    }
    setSubTotal(subt)

  }
  const addToCart = (itemCode,name, qty, price)=>{
    console.log("name is ",  itemCode, qty, price,  name)
    let newCart = cart
    console.log("name isnewCart ",  newCart)
if(itemCode in cart){
  newCart[itemCode].qty = cart[itemCode].qty + qty
}else{
  newCart[itemCode] = {qty:1, name,price}
}
console.log("New cart is ", newCart)
setCart(newCart)
saveCart(newCart)
  } 
  const removeFromCart = (itemCode, qty,name, price  )=>{
    console.log("name is ", name)
let newCart = cart
if(itemCode in cart){
  newCart[itemCode].qty = cart[itemCode].qty - qty
} 
if(newCart[itemCode]['qty']<=0){
  delete newCart[itemCode]
}

setCart(newCart)
saveCart(newCart)
  }
  const clearCart = ()=>{
    setCart({})
    saveCart({})
  }

  return (
   <>
   <BrowserRouter>
   <NavBar/>
    <Routes>
        <Route  exact path='/' element={<Home />} />
        <Route exact path='/sandwitch' element={<Sandwitch />} />
        <Route exact path='/pizza' element={<Pizza/>} />
        <Route exact path='/cake' element={<Cake/>} />
        <Route exact path='/bread' element={<Bread/>} />
        <Route exact path='/item/:itemId' element={<Item cart={cart} addToCart={addToCart} removeFromCart = {removeFromCart} clearCart ={clearCart}/>} />
        <Route exact path='/checkout/:checkOutId' element={<Checkout cart={cart} addToCart={addToCart} removeFromCart = {removeFromCart} clearCart ={clearCart} subTotal = {subTotal}/>} />
    </Routes>
     <Footer/>
  </BrowserRouter>
   </>
  );
}

export default App;
