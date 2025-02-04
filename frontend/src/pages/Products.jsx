import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/frontend_assets/assets'
import RelativeProduct from '../components/RelativeProduct'

function Products() {

  const {productId} = useParams()
  const {products, currency, addToCard} = useContext(ShopContext)
  const [image, setImage] = useState('')
  const [productData, setProductData] = useState(false)
  const [size, setSize] = useState("")
  

  const fetchProductDara = async () => {

    products.map((item) =>{
      if (item._id == productId){
        setProductData(item)
        setImage(item.image[0])
        return null
      }
    })

  }

  useEffect(() =>{
    fetchProductDara()
  }, [productId])

  return  productData? (

    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      
      {/* product data */}
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
      
        {/*product images */}

        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row" >
          <div className="flex sm:flex-col overflow-x-auto overflow-y-scroll justify-between sm:justify-items-stretch sm:w-[18.7%] w-full">
            {
              productData.image.map((item, index) =>(
                <img onClick={() =>setImage(item)} key={index} src={item} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' />
              ))
            }
          </div>
          <div className="w-full vvvv">
            <img src={image} className='w-full h-auto' alt="" />
          </div>
        </div>

        {/* ================= info ================= */}
        
        <div className='flex-1'>
          <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
          <div className='flex items-center gap-1 mt-2'>
            <img src={assets.star_icon } alt="" className='w-3 5' />
            <img src={assets.star_icon } alt="" className='w-3 5' />
            <img src={assets.star_icon } alt="" className='w-3 5' />
            <img src={assets.star_icon } alt="" className='w-3 5' />
            <img src={assets.star_dull_icon } alt="" className='w-3 5' />
            <p className='pl-2'>(122)</p>
          </div>
          <p className='mt-5 text-3xl font-medium'>{currency}{productData.price}</p>
          <p className='text-gray-500 mt-5 md:w-4/5'>{productData.description}</p>
          <div className='flex flex-col gap-4 my-8 '>
            <p>Select Size : </p>
            <div className='flex gap-2'>
              {
                productData.sizes.map((item, index) => (
                  <button onClick={() => setSize(item)} className={`border py-2 px-4 bg-gray-100 ${item === size? 'border-orange-500':''}`} key={index}>{item}</button>
                ))
              }
            </div>
          </div>
          <button onClick={() => addToCard(productData._id, size)} className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700 '>ADD TO CARD</button>
          <hr  className='mt-8 sm:w-4/5'/>
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% original product </p>
            <p> cash on delivery available on this product</p>
            <p>easy return and exchange policy within 7 days </p>
          </div>
        </div>
      </div>

      {/* description */}

      <div className='mt-20'>
        <div className="flex">
          <b className=' border px-5 py-3 text-sm'> Description</b>
          <p className='border px-5 py-3 text-sm'>Reviws (122)</p>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus inventore illum omnis, sit delectus deleniti veniam impedit, optio maxime, vitae corporis mollitia veritatis ipsum aut minus quas sequi doloremque dolor!</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus inventore illum omnis, sit delectus deleniti veniam impedit, optio maxime, vitae corporis mollitia veritatis ipsum aut minus quas sequi doloremque dolor!</p>
        </div>
      </div>

      {/* relative product  */}
      <RelativeProduct category={productData.category} subcategory={productData.subCategory}/>
    </div>

  ) : <div className='opacity-0'></div>
}

export default Products
