/* eslint-disable no-unused-vars */
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { backendUrl } from '../components/Login'
import { toast } from 'react-toastify'
import { currency } from '../App'

function List() {

  const [list, setList] = useState([])

  const fetchList = async () => {
    try {
      
      const response = await axios.get(backendUrl + '/api/product/list')
      
      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message)
      }
      
    } catch (error) {
      toast.error(error.message)
      console.log(error)
    }
  }

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(backendUrl + "/api/product/remove", { id })
      
      if(response.data.success){
        toast.success(response.data.message)
        await fetchList()
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error);
      
    }
  }

  useEffect(() => {
    fetchList()
  },[])
  return (
    <>
      <p className='mb-2'>All product list</p>
      <div className='flex flex-col gap-2 '>
        {/* table */}
        <div  className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm'>
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className='text-center'>Action</b>
        </div>

        {/* list des produits */}

        {
          list.map((item, index) => (
            <div className='grid grid-cols-[1fr_3fr_1fr]  md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 text-sm' key={index}>
              <img className='w-12' src={item.image[0]} alt="" />
              <p>{ item.name}</p>
              <p>{item.category}</p>
              <p>{currency} {item.price}</p>
              <p onClick={() => removeProduct(item._id)} className='text-right md:text-center cursor-pointer text-lg'>X</p>
            </div>
          ))
        }
      </div>
    </>
  )
}

export default List