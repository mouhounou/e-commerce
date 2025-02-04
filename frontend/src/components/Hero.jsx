import React from 'react'
import { assets } from '../assets/frontend_assets/assets'

function Hero() {
    return (
        <div className='flex flex-col sm:flex-row border border-gray-400'>

            {/* left side */}
            <div className='w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0'>
                <div className="text-[#414141]">
                    <div className="flex items-center gap-2">
                        <p className='w-6 md:w-11 h-[2px] bg-[#414141]'></p>
                        <p className='uppercase  font-medium text-sm md:text-base'>Our bestsellers</p>
                    </div>
                    <h1 className='text-3xl prata-regular  sm:py-3 lg:text-5xl leading-relaxed'>Latest arrivals</h1>
                    <div className="flex items-center gap-2">
                        <p className='font-semibold text-sm md:text-base'>SHOP IN</p>
                        <p className='w-8 md:w-11 h-[1px] bg-[#414141]'></p>
                    </div>
                </div>
            </div>

            {/*hero right side  */}

            <img className='w-full sm:w-1/2' src={assets.hero_img} alt="" />
        </div>
    ) 
}

export default Hero
