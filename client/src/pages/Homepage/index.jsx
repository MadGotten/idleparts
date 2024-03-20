import React,{useState, useRef} from 'react'
import {useQuery} from 'react-query'
import Navbar from '../../components/Navbar'
import Categories from '../../components/Categories'
import ImgSlider from '../../components/ImgSlider'
import Product from '../../components/Product'
import Skeleton from '../../components/Skeleton'

async function getProducts(){
  const response = await fetch(`${process.env.REACT_APP_DOMAIN}/products`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', },
      mode: 'cors',
  })
  const data = await response?.json()

  return data.items
}


const App = () => {
  const {isLoading, data, status} = useQuery('products', () => getProducts(), { refetchOnWindowFocus: false })

  const [translateXpBest, setTranslateXpBest] = useState(0) 
  const innerWidthBest = useRef(null)
  const outerWidthBest = useRef(null)

  const [translateXpNewest, setTranslateXpNewest] = useState(0)
  const innerWidthNewest = useRef(null)
  const outerWidthNewest = useRef(null)


  function swipeNext(innerWidth, outerWidth, translateXp, setTranslateXp){
    const calcWidth = innerWidth.current.offsetWidth+translateXp-200
    if(calcWidth >= outerWidth.current.offsetWidth){
      setTranslateXp(translateXp + -200)
      if(calcWidth -outerWidth.current.offsetWidth < 200){
        setTranslateXp(translateXp-200-(calcWidth -outerWidth.current.offsetWidth))
      }
    }
  }
  function swipePrev(translateXp, setTranslateXp){
    if (translateXp <= 0) {
      if(translateXp+200 >= -50){
        return setTranslateXp(0)
      }
      return setTranslateXp(translateXp + 200)
    }
  }

  return (
    <div className="py-4 px-4 sm:px-8 flex flex-col gap-8 mb-24">
      <Navbar/>
      <div className="flex flex-row w-full gap-4">
        <Categories/>
        <ImgSlider/>
      </div>
      <div className="mt-4 overflow-hidden">
        <h1 className="text-lg sm:text-xl font-medium">Bestsellers</h1>
        <div ref={outerWidthBest} className="flex flex-row relative justify-start items-center">
          <button onClick={() => swipePrev(translateXpBest, setTranslateXpBest)} className="absolute border z-10 border-blue-600 flex items-center justify-center text-sm sm:text-base md:text-lg lg:text-xl text-blue-600 rounded-full w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 hover:cursor-pointer hover:bg-blue-600 hover:text-white"><i className="fa-solid fa-arrow-left"></i></button>
          <button onClick={() => swipeNext(innerWidthBest, outerWidthBest, translateXpBest, setTranslateXpBest)} className="absolute border z-10 right-0 border-blue-600 flex items-center justify-center text-sm sm:text-base md:text-lg lg:text-xl text-blue-600 rounded-full w-6 h-6  sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 hover:cursor-pointer hover:bg-blue-600 hover:text-white"><i className="fa-solid fa-arrow-right"></i></button>
          <div ref={innerWidthBest} style={{transform: `translateX(${translateXpBest}px)`}} className="flex flex-row pl-4 pr-4 transition-transform duration-300 ease-in-out flex-nowrap mt-4 pb-1 gap-6 sm:gap-8">
          {status==='error' || isLoading ? 
            <Skeleton/>
          :
          data && data.filter(item => item.filter === "Bestseller").map((items, i) => {
            return(
              <Product items={items} id={i} key={i}/>
            )
          })}
          </div>
        </div>
      </div>
      <div className="mt-4 overflow-hidden">
        <h1 className="text-lg sm:text-xl font-medium">Newest</h1>
        <div ref={outerWidthNewest} className="flex flex-row relative justify-start items-center">
          <button onClick={() => swipePrev(translateXpNewest, setTranslateXpNewest)} className="absolute border z-10 border-blue-600 flex items-center justify-center text-sm sm:text-base md:text-lg lg:text-xl text-blue-600 rounded-full w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 hover:cursor-pointer hover:bg-blue-600 hover:text-white"><i className="fa-solid fa-arrow-left"></i></button>
          <button onClick={() => swipeNext(innerWidthNewest, outerWidthNewest, translateXpNewest, setTranslateXpNewest)} className="absolute border z-10 right-0 border-blue-600 flex items-center justify-center text-sm sm:text-base md:text-lg lg:text-xl text-blue-600 rounded-full w-6 h-6  sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 hover:cursor-pointer hover:bg-blue-600 hover:text-white"><i className="fa-solid fa-arrow-right"></i></button>
          <div ref={innerWidthNewest} style={{transform: `translateX(${translateXpNewest}px)`}} className="flex flex-row pl-4 pr-4 transition-transform duration-300 ease-in-out flex-nowrap mt-4 pb-1 gap-6 sm:gap-8">
          {status==='error' || isLoading ? 
            <Skeleton/>
          :
          data && data.filter(item => item.filter === "Newest").map((items, i) => {
            return(
              <Product items={items} id={i} key={i}/>
            )
          })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App