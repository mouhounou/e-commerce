/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import ProductItem from './ProductItem'

function RelativeProduct({category, subcategory}) {

    const {products} = useContext(ShopContext)
    const [related, setrelated] = useState([])


    useEffect(() => {
        if (products.length > 0) {
            let productCopy = products.slice()
            productCopy = productCopy.filter(product => product.category === category && product.subCategory ===subcategory )
            setrelated(productCopy.slice(0, 5))
            console.log('====================================');
            console.log(related);
            console.log('====================================');
        }
    }, [products])
    

    return (
        <div className='my-24'>
            <div className="text-center text-3xl py-2">
                <Title text1="RELATED" text2={'PRODUCTS'} />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-6">
                {
                    related.map((item, index) =>(
                        <ProductItem key={index} id={item._id} name={item.name} price={item.price} image={item.image}/>
                    ))
                }
            </div>
        </div>
    )
}

export default RelativeProduct
