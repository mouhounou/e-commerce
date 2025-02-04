import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/frontend_assets/assets'
import NewLessterBox from '../components/NewLessterBox'

function Contact() {
  return (
    <div>

      <div className="text-center text-2xl pt-10 border-t">
        <Title text1={'CONTACT'} text2={'US'} />
      </div>

      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28">
        <img className='w-full max-w-[480px]' src={assets.contact_img} alt="" />
        <div className="flex flex-col justify-center items-start gap-6">
          <p className='font-semibold text-xl text-gray-600'>Our Store</p>
          <p className='text-gray-500 '>533 ngoyo station <br />Pointe-noire, congo-brazzaville</p>
          <p className='text-gray-500'>Tel : (242) 555-333-33 <br /> Email : topo@gmail.com</p>
          <p className='font-bold text-xl text-gray-600'>careers at forever</p>
          <p className='text-gray-500'>Lear more about our team and job opening</p>
          <button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500'>Learn more</button>
        </div>
      </div>

      <NewLessterBox/>
    </div>
  )
}

export default Contact
