/* eslint-disable no-unused-vars */
import axios from 'axios'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
export const backendUrl =  import.meta.env.VITE_BACKEND_URL


function Login({ setToken }) {
   
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')

   const onSubmitHandler = async (e) => {
      try {
         e.preventDefault();
         const response = await axios.post(backendUrl + '/api/user/admin/login', { email, password })
         
         if (response.data.success) {
            setToken(response.data.token)
         } else {
            toast.error(response.data.message)
         }
      } catch (error) {
         console.log(error)
      }
   }


   return (
      <div className='min-h-screen flex items-center justify-center'>
         <div className='bg-white shadow-md rounded-lg px-8 py-6 max-w-md'>
            <h1 className='text-2xl font-bold mb-4'>Admin  Panel</h1>
            <form onSubmit={onSubmitHandler}>
               
               <div className='mb-3 min-w-72'>
                  <p className='text-sm font-medium text-gray-800 mb-2'>Email Address</p>
                  <input value={email} onChange={(e) => setEmail(e.target.value)} className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none font-semibold text-gray-700' type="email" placeholder='Your@eMAIL.com' />
               </div>
               
               <div className='mb-3 min-w-72'>
                  <p className='text-sm font-medium text-gray-800 mb-2'>Enter your password</p>
                  <input value={password} onChange={(e) => setPassword(e.target.value)} className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none font-semibold text-gray-700' type="epasswordmail" placeholder='Your password' />
               </div>

               <button className='mt-2 w-full py-2 px-4 rounded-md text-white bg-black' type='submit'>Login </button>
            </form>
         </div>
      </div>
   )
}

export default Login