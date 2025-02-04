// import React from 'react'

import BestSeller from "../components/BestSeller"
import Hro from "../components/Hero"
import LatestCollection from "../components/LatestCollection"
import NewLessterBox from "../components/NewLessterBox"
import OurPolicy from "../components/OurPolicy"

function Home() {
    return (
        <div className="">
            <Hro/>
            <LatestCollection/>
            <BestSeller/>
            <OurPolicy/>
            <NewLessterBox/>
        </div>
    )
}

export default Home
