import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/frontend_assets/assets'
import { ShopContext } from '../context/ShopContext'

function PlaceOrder() {

  const [method, setMethod ] = useState('cod')
  const {navigate } = useContext(ShopContext)
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: ''
  })

  const onchangeHandler = (e) => {
    const name = e.target.name
    const value = e.target.value

    setFormData( data => ({...data, [name]:value}))
  }

  return (
    <form className='flex flex-col sm:flex-row justify-between gap-4 pt-5 min-h-[80vh]  border-t'>
      {/* =============== left =============  */}
      <div className=' flex flex-col gap-4 w-full sm:max-w-[480px]'>

        <div className='text-xl sm:'>
          <Title text1={'DELIVERY' } text2={'INFORMATION'} />
        </div>

        <div className='flex gap-3'>
          <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='First name' />
          <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Last name' />
        </div>
        <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="email" placeholder=' Email address' />
        <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Street' />
        <div className='flex gap-3'>
          <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='City' />
          <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='State' />
        </div>
        <div className='flex gap-3'>
          <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="number" placeholder='Zipcode' />
          <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Country' />
        </div>
        <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="number" placeholder='Phone' />

      </div>

      {/* ============ right ============== */}

      <div className="mt-8">

        <div className="mt-8 min-w-80">
          <CartTotal/>
        </div>

        <div className="mt-12">
          <Title text1={'PAYEMENT' } text2={'METHOD'} /> 
          <div className="flex gap-3 flex-col lg:flex-row">

            <div onClick={() => setMethod('stripe')} className="flex items-center gap-3 border p-2 px-2 cursor-pointer">
              <div className={`w-3.5 h-3.5 border rounded-full ${method === 'stripe'? 'bg-green-500' : ''}`}></div>
              <img className='h-5 mx-4' src={assets.stripe_logo} alt="" />
            </div>
            

            <div onClick={() => setMethod('razorpay')} className="flex items-center gap-3 border p-2 px-2 cursor-pointer">
              <div className={`w-3.5 h-3.5 border rounded-full ${method === 'razorpay'? 'bg-green-500' : ''}`}> </div>
              <img className='h-5 mx-4' src={assets.razorpay_logo} alt="" />
            </div>

            <div onClick={() => setMethod('cod')} className="flex items-center gap-3 border p-2 px-2 cursor-pointer">
              <div className={`w-3.5 h-3.5 border rounded-full ${method === 'cod'? 'bg-green-500' : ''}`}></div>
              <p className='text-gray-500 text-sm mx-4 font-medium'> CASH ON DELIERY</p>
            </div>
          </div>
          <div className="w-full text-end mt-8">
            <button onClick={() => navigate('/order')} className='bg-black text-white px-16 py-3 text-sm'>PLACE ORDER</button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder

