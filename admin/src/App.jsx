import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { Route, Routes } from 'react-router-dom'
import Add from './pages/Add'
import List from './pages/List'
import Order from './pages/Order'
import Login from './components/Login'
import { ToastContainer } from 'react-toastify';

export const currency = '$'




function App() {
  const [token, setToken] = useState(localStorage.getItem('token')? localStorage.getItem('token') :"")
  
  useEffect(() => {
    localStorage.setItem('token', token)
  },[token])
  return (
    <div className='bg-gray-50 min-h-screen'>
      <ToastContainer/>
      {
        token === "" ?
          <Login setToken ={setToken} />
          :
          <>
            <Navbar setToken ={setToken} />
            <hr />
            <div className="flex w-full ">
              <Sidebar />
              <div className='w-[70%] ml-[max(5vw, 25)] pl-[5vw] my-8  text-gray-600 text-base'>
                <Routes>
                  <Route path='/add' element ={<Add token = {setToken} />}/>
                  <Route path='/list' element = {<List token = {setToken} />}/>
                  <Route path='/orders' element = {<Order token = {setToken} />}/>
                </Routes>
              </div>
            </div>
          </>
      }
      
    </div>
  )
}

export default App