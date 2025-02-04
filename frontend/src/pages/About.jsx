import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/frontend_assets/assets'
import NewLessterBox from '../components/NewLessterBox'

function About() {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={'ABOUT'} text2={'US'}/>
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img className='w-full max-w-[450px]' src={assets.about_img} alt="" />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600 ">
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolor sit culpa, quasi iusto dolorem sint doloremque distinctio, explicabo, facilis rerum quam? Error vel maiores non provident dolore quasi corrupti unde!</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero, voluptates suscipit. Velit reiciendis excepturi architecto quod recusandae natus porro quia corrupti. Atque esse corrupti laborum repellat. Atque magni doloribus aliquid.</p>
          <b className='text-gray-800'>Our Mission</b>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia fugit error ab, magnam nobis vero atque accusamus! Sequi odit vitae voluptate. Ipsam distinctio molestiae rem dicta, ex possimus saepe fuga!</p>
        </div>
      </div>

      <div className="text-xl py-4">
        <Title text1={'WHY'} text2={'CHOICE US'}/>
      </div>

      <div className="flex flex-col md:flex-row text-sm  mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-10 flex flex-col gap-5">
          <b>Quality Assurance</b>
          <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veritatis harum amet commodi, modi voluptates in, culpa ullam, perferendis qui voluptatem fugiat ipsum ducimus atque totam nemo consequatur nulla libero itaque?</p>
        </div>
        
        <div className="border px-10 md:px-16 py-8 sm:py-10 flex flex-col gap-5">
          <b>Convenience : </b>
          <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veritatis harum amet commodi, modi voluptates in, culpa ullam, perferendis qui voluptatem fugiat ipsum ducimus atque totam nemo consequatur nulla libero itaque?</p>
        </div>
        
        <div className="border px-10 md:px-16 py-8 sm:py-10 flex flex-col gap-5">
          <b>Exceptional customal service </b>
          <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veritatis harum amet commodi, modi voluptates in, culpa ullam, perferendis qui voluptatem fugiat ipsum ducimus atque totam nemo consequatur nulla libero itaque?</p>
        </div>
      </div>

      <NewLessterBox/>
    </div>
  )
}

export default About
