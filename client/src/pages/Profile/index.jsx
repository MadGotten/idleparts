import React from 'react'
import Navbar from '../../components/Navbar'
import Categories from '../../components/Categories'
import ImgSlider from '../../components/ImgSlider'
import HomeProducts from '../../components/Product'


const App = () => {
  return (
    <div>
      <Navbar />
      <div className="flex flex-row w-full gap-4">
        <Categories/>
        <ImgSlider/>
      </div>
      <HomeProducts/>
      <HomeProducts/>
    </div>
  )
}

export default App