import React from 'react'
import { BsFillPlusCircleFill } from 'react-icons/bs';
import { AiFillMinusCircle } from 'react-icons/ai';
const Checkout = (props) => {
  const {addToCart, cart, removeFromCart, clearCart, subTotal} = props
  return (
    <div className='container mx-auto'>
      <h1 className='my-8 text-center font-bold text-3xl'>Checkout</h1>
      <h2 className='text-bold text-xl'>1. Delivery Detials</h2>
      <div className='mx-auto flex '>
        <div className='px-2 w-1/2'>
        <div className="relative mb-4">
  <label htmlFor="email" className="leading-7 text-sm text-gray-600">
    Name
  </label>
  <input
    type="text"
    id="name"
    name="name"
    className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
  />
</div>

        </div>
        <div className='px-2 w-1/2'>
        <div className="relative mb-4">
  <label htmlFor="email" className="leading-7 text-sm text-gray-600">
    Email
  </label>
  <input
    type="email"
    id="email"
    name="email"
    className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
  />
</div>

        </div>
       
      </div>
      <div className='px-2 w-full'>
        <div className="relative mb-4">
  <label htmlFor="email" className="leading-7 text-sm text-gray-600">
    Address
  </label>
  <textarea
    type="text"
rows={2}
col ={10}
    id="address"
    name="address"
    className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
  />
</div>

        </div>

        <div className='mx-auto flex '>
        <div className='px-2 w-1/2'>
        <div className="relative mb-4">
  <label htmlFor="email" className="leading-7 text-sm text-gray-600">
    Phone
  </label>
  <input
    type="phone"
    id="phone"
    name="phone"
    className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
  />
</div>

        </div>
        <div className='px-2 w-1/2'>
        <div className="relative mb-4">
  <label htmlFor="email" className="leading-7 text-sm text-gray-600">
    City
  </label>
  <input
    type="text"
    id="city"
    name="city"
    className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
  />
</div>

        </div>
       
      </div>
        <div className='mx-auto flex '>
        <div className='px-2 w-1/2'>
        <div className="relative mb-4">
  <label htmlFor="email" className="leading-7 text-sm text-gray-600">
    Province
  </label>
  <input
    type="text"
    id="province"
    name="province"
    className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
  />
</div>

        </div>
        <div className='px-2 w-1/2'>
        <div className="relative mb-4">
  <label htmlFor="email" className="leading-7 text-sm text-gray-600">
   Postal Code
  </label>
  <input
    type="text"
    id="pcode"
    name="pcode"
    className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
  />
</div>

        </div>
       
      </div>
      <h2 className='text-bold text-xl'>2.  Review Cart Items .</h2>
      
<div>
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
        <span>Total Prices : ${subTotal}</span>
        
<button className="flex ml-auto text-white  bg-red-500 border-0 py-2 px-6 mx-2 focus:outline-none hover:bg-indigo-600 rounded" style={{userSelect: 'auto'}}>Pay ${subTotal}</button>
</div>

      </div>
  )
}

export default Checkout