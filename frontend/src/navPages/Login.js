import React, { useState, useContext } from 'react'
import { Link } from "react-router-dom";
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';
import { AiOutlineMail } from 'react-icons/ai';
import { RiLockPasswordLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios'
import {  useDispatch } from 'react-redux'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { setToken } from '../redux/slice/authenticationSlice';
// import { decrement, increment } from './counterSlice'
const Login = () => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
const apiUrl = process.env.REACT_APP_backend_url
  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Required'),
    password: Yup.string()
      .min(7, 'Password must be at least 8 characters')
      .required('Required'),
  })
  const { handleChange, handleSubmit, values, errors, touched } = useFormik({
    initialValues: {
      email: 'test@gmail.com',
      password: 'Test@123',
    },
    validationSchema: validationSchema,
    onSubmit: async(values, { resetForm }) => {
      try {
        const  {email,password} = values
        setLoading(true);
        const url = `${apiUrl}/auth/login`
        const postData = {
          email,password
        }
        const res = await axios.post(url,postData)
        if(res.status === 200){
          setLoading(false);
          toast.success(res.data.message, {
            position: 'top-right', // 'top-right', 'bottom-right', 'bottom-center', 'bottom-left'
          })
          const jwtToken  = res?.data?.loginToken
          localStorage.setItem('jwtToken', jwtToken);
          dispatch(setToken(jwtToken));
          resetForm()
          navigate('/')
        }else{
          setLoading(false);
          toast.error(res.data.message)
        }
      } catch (error) {
        setLoading(false);
        toast.error(error.response.data.message)
      }
    
    },
  });
  const toggle = () => {
    setOpen(!open)
  }
  return (
    <div>
    <section className="bg-gray-50 dark:bg-gray-900  mt-9 px-2">
      <div className="flex flex-col items-center justify-center mx-auto  lg:py-0">

        <div className="w-full  bg-white rounded-lg shadow-sm dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
              Login to your account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div className='relative'>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                <input type="email" name="email" id="logEmail" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-secondary-600 focus:border-secondary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 pr-3 pl-10" placeholder="name@company.com"  onChange={handleChange}
                  value={values.email} />
                {touched.email && errors.email ? (
                  <div className='text-red-500'>{errors.email}</div>
                ) : null}
                <div className='absolute  left-1 top-9 text-purple-700 text-2xl'>
                  <AiOutlineMail />
                </div>
              </div>
              <div className='relative'>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                <input type={open ? 'text' : 'password'} name="password" id="logPass" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 pr-3 pl-10"  onChange={handleChange}
                  value={values.password} />
                {touched.password && errors.password ? (
                  <div className='text-red-500'>{errors.password}</div>
                ) : null}
                <div className='text-2xl absolute right-1 top-9 text-purple-500 cursor-pointer'>
                  {
                    open ? <AiFillEye onClick={toggle} /> : <AiFillEyeInvisible onClick={toggle} />
                  }

                </div>
                <div className=' absolute left-1 top-9  text-purple-700 text-2xl'>
                  <RiLockPasswordLine />
                </div>
              </div>
              <div className="flex items-center justify-between">

                <Link to='/forgotPassword'>
                  <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                </Link>

              </div>
              <button type="submit" className="w-full text-white bg-purple-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" disabled={loading}> {loading ? 'Signing in ...' : 'Sign in'}</button>
          
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet? <Link to='/register'> <a href="#" className="font-medium text-yellow-600 hover:underline dark:text-primary-500 ">Register</a> </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
    </div>
  )
}

export default Login