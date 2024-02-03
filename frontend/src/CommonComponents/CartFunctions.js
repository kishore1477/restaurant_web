import React from 'react'
import { toast } from "react-toastify";
import { getApiData, postApiData } from "./ApiFunctions"
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { setTotalQuantity } from '../redux/slice/userSlice';


const CartFunctions = () => {
  const { user } = useSelector((state)=>state?.user)
  const {isAuthenticated} = useSelector((state) => state?.authentication)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const getAddToCartProducts = async() =>{
    try {
      const res = await getApiData(`products/getAddToCartProductsByUserId/${user?._id}`)
      if(res?.status === 200){
        const fetchedData = res?.data?.data
        dispatch(setTotalQuantity(fetchedData?.totalQuantity))
        return {success:true, data:fetchedData }
      }
    } catch (error) {
      return {success:false }
    }
  }
    const handleAddToCart = async(product) =>{

      try {
        if(!isAuthenticated){
          toast.error('Please  Login!')
           navigate('/login')
           return
        
        }
         
        const {_id: productId, price} = product
        const data = {
          userId:user?._id,
           products:[
            {
              productId, price, quantity:1
            }
           ]
        }
        const res = await postApiData('products/addToCart', data)
        if(res?.status  === 200){
          // setShow(true)
          return {success:true}
        }else{
          return {success:false}
        }
      } catch (error) {
        toast.error(error?.response?.data?.message)
        return {success:false}
      }
    
     }
    const handleRemoveFromCart= async(product) =>{
      try {
        if(!isAuthenticated){
          toast.error('Please  Login!')
           navigate('/login')
           return
        
        }
         
        const {_id: productId, price} = product
        const data = {
          userId:user?._id,
           products:[
            {
              productId, price, quantity:1
            }
           ]
        }
        const res = await postApiData('products/removeFromCart', data)
        if(res?.status  === 200){
          // setShow(true)
          return {success:true}
        }else{
          return {success:false}
        }
      } catch (error) {
        toast.error(error?.response?.data?.message)
        return {success:false}
      }
    
     }
     const handleClearCart = async()=>{
      
      try {
        if(!isAuthenticated){
          toast.error('Please  Login!')
           navigate('/login')
           return
        }
        // clearCart
        const  data = {
          userId : user?._id
        }
        const res = await postApiData('products/clearCart', data)
        if(res?.status === 200){
          return {
            success : true, message:res?.data?.msg
          }
        }
      } catch (error) {
        console.log(error)
      }

     }
  return {
    handleAddToCart, getAddToCartProducts, handleRemoveFromCart, handleClearCart

  }
}

export default CartFunctions