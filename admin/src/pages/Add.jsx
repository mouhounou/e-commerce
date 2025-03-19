/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { assets } from '../assets/admin_assets/assets'
import axios from 'axios'
import { backendUrl } from '../components/Login'
import { toast } from 'react-toastify'

function Add({token}) {

  const [image1, setImage1] = useState(null)
  const [image2, setImage2] = useState(null)
  const [image3, setImage3] = useState(null)
  const [image4, setImage4] = useState(null)

  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('Men')
  const [subCategory, setSubCategory] = useState('Topwear')
  const [bestSeller, setBestseller] = useState(false)
  const [size, setSize] = useState([])

  const onSubmitHamdler = async (e) => {
    try {
      e.preventDefault();

      const formData = new FormData();

      formData.append("name", name);
      formData.append("price", price);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestseller", bestSeller);
      formData.append("size", JSON.stringify(size));

      if (image1) formData.append("image1", image1);
      if (image2) formData.append("image2", image2);
      if (image3) formData.append("image3", image3);
      if (image4) formData.append("image4", image4);

      console.log(formData);

      const response = await axios.post(backendUrl + "/api/product/add", formData, {
        headers: { token }
      });
      
      if (response.data.success) {
        toast.success(response.data.message)
        setName('')
        setPrice('')
        setDescription('')
        setCategory('Men')
        setSubCategory('Topwear') 
        setImage1(null)
        setImage2(null)
        setImage3(null)
        setImage4(null)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={onSubmitHamdler} className='flex flex-col w-full items-start gap-3 ' action="">
        <div>
          <p className='mb-2 '>Upload Image</p>
          <div className='flex gap-2'>

            <label htmlFor="image1">
              <img className='w-20 ' src={!image1? assets.upload_area : URL.createObjectURL(image1)} alt="" />
              <input onChange={(e) => setImage1(e.target.files[0])} type="file" id='image1' hidden />
            </label>
            

            <label htmlFor="image2">
              <img className='w-20 ' src={!image2? assets.upload_area : URL.createObjectURL(image2)} alt="" />
              <input onChange={(e) => setImage2(e.target.files[0])}  type="file" id='image2' hidden />
            </label>

            <label htmlFor="image3">
              <img className='w-20 ' src={!image3? assets.upload_area : URL.createObjectURL(image3)} alt="" />
              <input onChange={(e) => setImage3(e.target.files[0])}  type="file" id='image3' hidden />
            </label>

            <label htmlFor="image4">
              <img className='w-20 ' src={!image4? assets.upload_area : URL.createObjectURL(image4)} alt="" />
              <input onChange={(e) => setImage4(e.target.files[0])}  type="file" id='image4' hidden />
            </label>

          </div>
        </div>

        <div  className='w-full'>
          <p className='mb-2'>product name</p>
          <input  onChange={(e) => setName(e.target.value)} value={name} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Enter product name' />
        </div>
        

        <div  className='w-full'>
          <p className='mb-2'>product description</p>
          <textarea onChange={(e) => setDescription(e.target.value)} value={description} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Enter product description here' />
        </div>

        <div className='flex flex-col  sm:flex-row gap-2 w-full sm:gap-6'>
          
          <div>
            <p className='mb-2'>product categorie</p>
            <select onChange={(e) => setCategory(e.target.value)} value={category} className='w-full px-3 py-2 rounded-md' name="" id="">
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Kids">Kids</option>
            </select>
          </div>

          <div>
            <p className='mb-2'>Sub categorie</p>
            <select onChange={(e) => setSubCategory(e.target.value)} value={subCategory} className='w-full px-3 py-2 rounded-md' name="" id="">
              <option value="Topwear">Topwear</option>
              <option value="Bottomwear">Bottomwear</option>
              <option value="Winterwear">Winterwear</option>
            </select>
          </div>

          <div>
            <p className='mb-2'>product price</p>
            <input onChange={(e) => setPrice(e.target.value)} value={price} className='w-full px-3 py-2 sm:w-[120px]' type="number" placeholder='25 $' />
          </div>
        </div>

        <div>
          <p className='mb-2'>Product Sizes</p>
          <div className='flex   gap-3'>
            
            <div onClick={() => setSize(prev => prev.includes("S") ? prev.filter(item  => item !== "S") : [...prev,"S"])}>
              <p className ={`${size.includes("S")? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>S</p>
            </div>
            
            <div onClick={() => setSize(prev => prev.includes("M") ? prev.filter(item  => item !== "M") : [...prev,"M"])}>
              <p className ={`${size.includes("M")? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>M</p>
            </div>
            
            <div onClick={() => setSize(prev => prev.includes("L") ? prev.filter(item  => item !== "L") : [...prev,"L"])}>
              <p className ={`${size.includes("L")? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>L</p>
            </div>
            
            <div onClick={() => setSize(prev => prev.includes("XL") ? prev.filter(item  => item !== "XL") : [...prev,"XL"])}>
              <p className ={`${size.includes("XL")? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>XL</p>
            </div>
            
            <div onClick={() => setSize(prev => prev.includes("XXL") ? prev.filter(item  => item !== "XXL") : [...prev,"XXL"])}>
              <p className ={`${size.includes("XXL")? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>XXL</p>
            </div>

          </div>
        </div>

        <div className='flex gap-2 mt-2 items-center'>
          <input 
            onChange={() => setBestseller(prev => !prev)} 
            checked={bestSeller} 
            type="checkbox" 
            id='bestseller' 
          />
          <label className='cursor-pointer' htmlFor="bestseller">Add to bestseller</label>
        </div>


        <button type="submit" className='w-28 py-3 mt-4 bg-black text-white rounded-md'>Add</button>
      </form>
    </div>
  )
}

export default Add