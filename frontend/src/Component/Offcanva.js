import React from 'react'
import Offcanvas from 'react-bootstrap/Offcanvas';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import { AiFillMinusCircle } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const Offcanva = (props) => {
  const { show, handleClose, price, title, addToCart, cart, removeFromCart, clearCart } = props
  // console.log(addToCart, cart, removeFromCart, clearCart)
  console.log("cart in offcan", cart )
  console.log("item in offscanva", title)
  cart &&  console.log("objectt",Object.keys(cart) )
 
  return (
    <div>  <Offcanvas show={show} onHide={handleClose} placement='end'>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Shoping Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
   
        <ol className='list-decimal font-semibold'>
{cart && Object.keys(cart).length ==  0 && <div>Your cart is empty</div>}
          {cart && Object.keys(cart) && Object.keys(cart).map((k)=>{
            return    <li  key={k}>
              <div className='item flex my-3'>
            <div className='w-2/3 '> {cart[k].name}  </div>
            <div className='flex  justify-center align-items-center w-1/3 text-center'>
              <AiFillMinusCircle onClick={()=>removeFromCart(k, 1, cart[k].name, cart[k].price)} color='pink' className='mx-2 cursor-pointer  rounded '/> <span className='mx-2'>{cart[k].qty}</span> 
             <BsFillPlusCircleFill onClick={()=>addToCart(k,cart[k].name, 1,  cart[k].price)} color='pink'  className='mx-2  cursor-pointer rounded '/> </div>
             </div>
          </li>
          })}
   
    
    

        
        </ol>
        <div className='flex'>
        <Link  to ={`/checkout/1`} className ="text-decoration-none text-dark">

<button className="flex ml-auto text-white  bg-red-500 border-0 py-2 px-6 mx-2 focus:outline-none hover:bg-indigo-600 rounded" style={{userSelect: 'auto'}}>Checkout</button>
</Link>
          <button  className='mx-2  text-white focus:outline-none hover:bg-indigo-600 rounded  bg-red-500 border-0 py-2 px-6 ' onClick={clearCart}>Clear Cart</button>

        </div>
      </Offcanvas.Body>
    </Offcanvas></div>
  )
}

export default Offcanva