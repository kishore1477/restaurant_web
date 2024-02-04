import React, { useEffect, useState } from 'react'
import Offcanvas from 'react-bootstrap/Offcanvas';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import { AiFillMinusCircle } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import CartFunctions from '../CommonComponents/CartFunctions';
const Offcanva = (props) => {
  const { show, handleClose } = props
  const { isAuthenticated } = useSelector((state) => state?.authentication)
  const { user } = useSelector((state) => state?.user)
  const [dataOfTheCart, setDataOfTheCart] = useState([]);
  const { handleAddToCart, getAddToCartProducts, handleRemoveFromCart, handleClearCart } = CartFunctions()
  const navigate = useNavigate()
  const handleAddToCartClick = async (product) => {
    try {
      const { productId, price } = product
      const data = {
        _id: productId, price
      }
      const res = await handleAddToCart(data)
      if (res?.success) {
        const fetchedData = await getAddToCartProducts()
        if (fetchedData?.success) {
          setDataOfTheCart(fetchedData?.data)
        }
      }
    } catch (error) {
      toast.error(error?.response?.data?.message)
    }
  }
  const handleRemoveFromCartClick = async (product) => {
    try {
      const { productId, price } = product
      const data = {
        _id: productId, price
      }
      const res = await handleRemoveFromCart(data)
      if (res?.success) {
        const fetchedData = await getAddToCartProducts()
        if (fetchedData?.success) {
          setDataOfTheCart(fetchedData?.data)
        }
      }
    } catch (error) {
      toast.error(error?.response?.data?.message)
    }
  }
  useEffect(() => {
    if (isAuthenticated) {
      const getData = async () => {
        const fetchedData = await getAddToCartProducts();
        if (fetchedData?.success) {
          setDataOfTheCart(fetchedData?.data);
        }
      };
      getData();
    }


    return () => {
      console.log('Cleanup function in second component');
      // Cleanup logic
    };
  }, [user, show, isAuthenticated])
  const handleClearCartClick = async () => {
    const res = await handleClearCart()
    if (res?.success) {
      const fetchedData = await getAddToCartProducts()
      if (fetchedData?.success) {
        setDataOfTheCart(fetchedData?.data)
      }
      toast.success(res?.message)
    }
  }
  const handleCheckoutRedirect = () => {
    handleClose()
    navigate('/checkout')
  }
  return (
    <div>  <Offcanvas show={show} onHide={handleClose} placement='end'>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Shoping Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        {
          dataOfTheCart?.products?.length == 0 ? <div>Your cart is empty</div> : <>

            <ol className='list-decimal font-semibold'>
              {dataOfTheCart?.products?.map((k, i) => {
                return <li key={i}>
                  <div className='item flex my-3'>
                    <div className='w-2/3 '> {k?.details?.title}  </div>
                    <div className='flex  justify-center align-items-center w-1/3 text-center'>
                      <AiFillMinusCircle onClick={() => handleRemoveFromCartClick(k)} color='pink' className='mx-2 cursor-pointer  rounded ' /> <span className='mx-2'>{k?.quantity}</span>
                      <BsFillPlusCircleFill onClick={() => handleAddToCartClick(k)} color='pink' className='mx-2  cursor-pointer rounded ' />
                    </div>
                  </div>
                </li>
              })}





            </ol>
            <div className='flex'>
              {

              }
              {/* <Link  to ={`/checkout/1`} className ="text-decoration-none text-dark"> */}

              <button className="flex ml-auto text-white  bg-red-500 border-0 py-2 px-6 mx-2 focus:outline-none hover:bg-indigo-600 rounded" onClick={handleCheckoutRedirect}>Checkout</button>
              {/* </Link> */}
              <button className='mx-2  text-white focus:outline-none hover:bg-indigo-600 rounded  bg-red-500 border-0 py-2 px-6 ' onClick={handleClearCartClick}>Clear Cart</button>

            </div>
          </>
        }
      </Offcanvas.Body>
    </Offcanvas></div>
  )
}

export default Offcanva