import React, { useContext, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'

function Login() {

  const {token, setToken, navigate, backendUrl} = useContext(ShopContext)
  const [currentState, setCurrentState] = useState('Sign Up')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')

  const onSubmitHandler = async(e) => {
    e.preventDefault()

    try {
      
      if (currentState === "Sign Up") {
        
        const response = await axios.post(backendUrl + '/api/user/register', { name, email, password })
        if (response.data.success) {
          setToken(response.data.token)
          localStorage.setItem('token', response.data.token)
        } else {
          alert(response.data.message)
        }
        
      } else {
        
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <form onSubmit={onSubmitHandler} className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-700">
        <div className="inline-flex items-center gap-2 mb-2 mt-10">
          <p className='prata-regular text-3xl'>{currentState}</p>
          <hr className='border-none h-[1.5px] w-8 bg-gray-800'/>
        </div>
        {currentState === 'Login'? "" : <input value={name} onChange={(e) => setName(e.target.value)} type="text" className='w-full  px-3 py-2 border border-gray-800' placeholder='Name' required/>}
        <input value={email} onChange={(e) =>{setEmail(e.target.value)}} type="email" className='w-full  px-3 py-2 border border-gray-800' placeholder='Email' required/>
        <input value={password}  onChange={(e) => setPassword(e.target.value)} type="password" className='w-full  px-3 py-2 border border-gray-800' placeholder='Password' required/>
        <div className='w-full flex justify-between text-sm mt-[-8px]'>
          <p className='cursor-pointer'>Forgot your password ?</p>
          {
            currentState === 'Login'?
            <p  onClick={()  =>setCurrentState('Sign Up')} className='cursor-pointer'>Create account</p>
            :
            <p onClick={()  =>setCurrentState('Login')} className='cursor-pointer'>Login here</p>
          }
        </div>
        <button className='bg-black text-white font-light px-8 py-2 mt-4'>{currentState === 'Login'? "Sign In" : "Sign Up"}</button>
      </form>
    </div>
  )
}

export default Login
