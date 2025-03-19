import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import ProductItem from './ProductItem'

function LatestCollection() {

    const {products} = useContext(ShopContext)
    const [latestProducts, SetLatestProducts] = useState([])


    useEffect (() =>{
        SetLatestProducts(products.slice(0, 10))
    },[products])
    

    return (
        <div className='my-10'>
            <div className='text-center py-8 text-3xl'>
                <Title text1='LATEST' text2={'COLLECTION'}  />
                <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse vero minus possimus ea facilis. Porro autem mollitia vero molestiae natus iure illum ratione? Culpa a officiis distinctio error soluta cumque!
                </p>
            </div>

            {/* {products} */}

            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-3'>
                {
                    latestProducts.map((item, index) => (
                        <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
                    ))
                }
            </div>
        </div>
    )
}

export default LatestCollection
