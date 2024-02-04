import React, { useEffect, useState } from 'react'
import { BsFillPlusCircleFill } from 'react-icons/bs';
import { AiFillMinusCircle } from 'react-icons/ai';
import CartFunctions from '../CommonComponents/CartFunctions';
import { useSelector } from 'react-redux';
import Loader from '../CommonComponents/Loader';
import { toast } from 'react-toastify';
import Stripe from 'react-stripe-checkout';
import { postApiData } from '../CommonComponents/ApiFunctions';
import { useNavigate } from 'react-router-dom';
// import StripeCheckout from 'react-stripe-checkout';
const Checkout = () => {
  const [dataOfTheCart, setDataOfTheCart] = useState([]);
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate()
  const { user } = useSelector((state)=>state?.user)
  const {handleAddToCart,getAddToCartProducts, handleRemoveFromCart, handleClearCart} = CartFunctions()
  const handleAddToCartClick = async(product) =>{
    try {
      const  { productId, price } = product
      const data = {
  _id:productId,price
      }
      const res = await handleAddToCart(data)
      if(res?.success){
       const fetchedData = await  getAddToCartProducts()
       if(fetchedData?.success){
        setDataOfTheCart(fetchedData?.data)
       }
      }
    } catch (error) {
      toast.error(error?.response?.data?.message)
    }
  
   }
  const handleRemoveFromCartClick = async(product) =>{
    try {
      const  { productId, price } = product
      const data = {
  _id:productId,price
      }
      const res = await handleRemoveFromCart(data)
      if(res?.success){
       const fetchedData = await  getAddToCartProducts()
       if(fetchedData?.success){
        setDataOfTheCart(fetchedData?.data)
       }
      }
    } catch (error) {
      toast.error(error?.response?.data?.message)
    }
  
   }
  useEffect(()=>{

    const getData = async()=>{
      setLoader(true)
      const fetchedData = await  getAddToCartProducts()
      if(fetchedData?.success){
        setDataOfTheCart(fetchedData?.data)
        setLoader(false)
      }
    }
    getData()
    
    
      return () => {
        console.log('Cleanup function in second component');
        // Cleanup logic
      };
    },[user])
    const handlePayment  = () =>{
      toast.error("Under development")
    }
    const handlePaymentToken  = async(token)=>{
try {
  const amount = dataOfTheCart?.totalPrice
const data = {
  amount,token
}
const res = await postApiData(`products/pay`,data)
console.log("res pay", res)

if(res?.status === 200){
  const res = await handleClearCart()
  if (res?.success) {
    toast.success('Payment received successfully')
      navigate('/')
}
}
} catch (error) {
  toast.error(error.message)
}
    }
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
      

      {loader?<Loader/>:<div>

<ol className='list-decimal font-semibold'>
{dataOfTheCart?.products?.length ==  0 && <div>Your cart is empty</div>}
          {dataOfTheCart?.products?.map((k)=>{
            return    <li  key={k}>
              <div className='item flex my-3'>
            <div className='w-1/3 '>{k?.details?.title}  </div>
            <div className='w-1/3 '>${k?.details?.price}  </div>
            <div className='flex  justify-center align-items-center w-1/3 text-center'>
              <AiFillMinusCircle onClick={()=>handleRemoveFromCartClick(k)} color='pink' className='mx-2 cursor-pointer  rounded '/> <span className='mx-2'>{k?.quantity}</span> 
             <BsFillPlusCircleFill onClick={()=>handleAddToCartClick(k)} color='pink'  className='mx-2  cursor-pointer rounded '/> </div>
             </div>
          </li>
          })}
   
    
    

        
        </ol>
        <div className='mb-4'>Total Prices : ${dataOfTheCart?.totalPrice}</div>
        
<Stripe stripeKey={process.env.REACT_APP_STRIPE_PUBLIC_KEY} token={handlePaymentToken}  />

</div>}


      </div>
  )
}

export default Checkout