import React from 'react'
import { Link } from "react-router-dom"
import Rating from './Rating'

const Product = (props) => {
  const product = props.items
  return (
    <Link to={'../p/'+product._id} className="w-[9rem] h-[12rem] sm:w-[11rem] sm:h-[13rem] md:w-52 md:h-60 shrink-0 bg-slate-50 shadow-md drop-shadow-md rounded-lg flex items-center flex-col p-2">
      <div className="w-[5rem] h-[5rem] sm:w-[6rem] sm:h-[6rem] md:w-[7.5rem] md:h-[7.5rem]">
        <img src={`${process.env.REACT_APP_DOMAIN}/${product.img}`} alt={product.category} className="max-w-full md:max-w-[7rem] h-auto"></img>
      </div>
      <div className="h-full w-full flex flex-col justify-end px-4">
        <h2 className="font-semibold text-sm sm:text-base">{product.price}$</h2>
        <h3 className="text-sm truncate">{product.name}</h3>
        <Rating rating={product.rating}></Rating>
      </div>
    </Link>
  )
}
// <div className="w-[11rem] h-[13rem] md:w-52 md:h-60 shrink-0 shadow-md bg-slate-200 rounded-lg"></div>
export default Product