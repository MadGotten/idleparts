import React from 'react'

const ImgSlider = () => {
  return (
    <div className="w-full min-w-[20rem] relative grid bg-slate-400  h-40 sm:h-64 lg:h-96 p-2 rounded-lg bg-cover bg-center" style={{ backgroundImage: `url(${require('../assets/images/big_image_2699.png')}` }}>
      <div className="m-4 absolute border self-center justify-self-start border-blue-600 flex items-center justify-center text-sm sm:text-base md:text-lg lg:text-xl text-blue-600 rounded-full w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 hover:cursor-pointer hover:bg-blue-600 hover:text-white"><i className="fa-solid fa-arrow-left"></i></div>
      <div className="m-4 absolute border self-center justify-self-end border-blue-600 flex items-center justify-center text-sm sm:text-base md:text-lg lg:text-xl text-blue-600 rounded-full w-6 h-6  sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 hover:cursor-pointer hover:bg-blue-600 hover:text-white"><i className="fa-solid fa-arrow-right"></i></div>
    </div>
  )
}

export default ImgSlider