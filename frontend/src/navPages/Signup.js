import React, { useState, useContext } from 'react'
import { Link } from "react-router-dom";
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';
import { RiLockPasswordLine } from 'react-icons/ri';
import { AiOutlineMail } from 'react-icons/ai';
import { FaUserAlt } from 'react-icons/fa';
import { RiShieldUserFill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios'
import { toast } from 'react-toastify';
const Signup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const apiUrl = process.env.REACT_APP_backend_url
  const validationSchema = Yup.object({
    name: Yup.string()
    .min(3, 'Must be at least 3 characters')
      .max(15, 'Must be 15 characters or less')
      .required('Required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        'Password must include at least one lowercase letter, one uppercase letter, one digit, and one special character'
      )
      .required('Required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Required'),
  })
  const { handleChange, handleSubmit, values, errors,touched } = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
confirmPassword: ''
    },
     validationSchema : validationSchema,
    onSubmit: async(values, {resetForm}) => {
      try {
        const  {name,email,password} = values
        setLoading(true);
        const url = `${apiUrl}/auth/register`
        const postData = {
         name, email,password
        }
        const res = await axios.post(url,postData)
        if(res.status === 200){
          setLoading(false);
          toast.success(res?.data?.message, {
            position: 'top-right', // 'top-right', 'bottom-right', 'bottom-center', 'bottom-left'
          })
          resetForm()
          navigate('/login')
        }else{
          setLoading(false);
          toast.error(res?.data?.message)
        }
      } catch (error) {
        setLoading(false);
        toast.error(error?.response?.data?.message)
      }






    },
  });
  const [open, setOpen] = useState(false);
  const [copen, setCOpen] = useState(false);
  const toggle = () => {
    setOpen(!open)
  }

  const ctoggle = () => {
    setCOpen(!copen)
  }
  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center  mx-auto my-2 lg:py-0">

        <div className="w-full bg-white rounded-lg shadow-sm dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6  sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
              Register YourSelf
            </h1>
            <form className="space-y-2 md:space-y-3" onSubmit={handleSubmit} >
              <div className='relative'>
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-secondary-600 focus:border-secondary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 pr-3 pl-10" placeholder="Name" onChange={handleChange}
                  value={values.name} />


                <div className='absolute  left-1 top-9 text-purple-700 text-2xl'>
                  {/* <RiShieldUserFill/> */}
                  <FaUserAlt />
                </div>
              </div>
              {touched.name && errors.name ? (
         <div className='text-red-600'>{errors.name}</div>
       ) : null}
              <div className='relative'>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-secondary-600 focus:border-secondary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 pr-3 pl-10" placeholder="name@company.com"  onChange={handleChange}
                  value={values.email}
                />
                {touched.email && errors.email ? (
         <div className='text-red-500'>{errors.email}</div>
       ) : null}
                <div className='absolute  left-1 top-10 text-purple-700 text-2xl '>
                  <AiOutlineMail />
                </div>

              </div>

              <div className='relative'>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                <input type={open ? 'text' : 'password'} name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 pr-3 pl-10" onChange={handleChange}
                  value={values.password} />
                    {touched.password && errors.password ? (
         <div className='text-red-500'>{errors.password}</div>
       ) : null}
                <div className='text-2xl absolute right-1 top-9 text-purple-500 cursor-pointer' >
                  {
                    open ? <AiFillEye onClick={toggle} /> : <AiFillEyeInvisible onClick={toggle} />
                  }


                </div>

                <div className=' absolute left-1 top-9  text-purple-700 text-2xl'>
                  <RiLockPasswordLine />
                </div>
              </div>

              <div className='relative'>
                <label htmlFor="cpassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm Password</label>
                <input type={copen ? 'text' : 'password'} name="confirmPassword" id="cpassword" placeholder="••••••••" className="bg-gray-50 border text-gray-900 sm:text-sm rounded-lg   block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white pr-3 pl-10 focus:border-purple-600 border-purple-300"  onChange={handleChange} value={values.confirmPassword} />
                {touched.confirmPassword && errors.confirmPassword ? (
         <div className='text-red-500'>{errors.confirmPassword}</div>
       ) : null}
                <div className='text-2xl absolute right-1 top-9 text-purple-500 cursor-pointer'>
                  {
                    copen ? <AiFillEye onClick={ctoggle} /> : <AiFillEyeInvisible onClick={ctoggle} />
                  }


                </div>
                <div className='absolute left-1 top-9  text-purple-700 text-2xl'>
                  <RiLockPasswordLine />
                </div>
              </div>
              <button type="submit" className="w-full text-white bg-purple-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" disabled={loading} >{loading ? 'Please wait ...' : 'Register'}</button>

              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                you have already account? <Link to='/login' className='hover:text-purple-500'> <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500"></a>Login </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>









  )
}

export default Signup