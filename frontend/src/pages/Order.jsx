import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'

function Order() {
  const {products, currency } = useContext(ShopContext)
  return (
    <div>
      <div className="border-t pt-16">
        <div className="text-2xl">
          <Title text1={'MY'} text2={'ORDERS'}/>
        </div>

        <div className="">
          {
            products.slice(1,4).map((item, index) =>(
              <div key={index} className='py-4 border-b text-gray-700 flex flex-col md:flex-row md:items-center justify-between'>

              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Order
