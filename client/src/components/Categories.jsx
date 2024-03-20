import React from 'react';
import { categories } from '../assets/constants';

const Categories = () => {
  return (
    <div className="hidden md:flex md:flex-col md:flex-shrink-0 md:w-48 h-96">
      <h2 className="text-blue-600 uppercase text-base font-semibold tracking-tight flex justify-center items-center p-2">Categories</h2>
      <ul className="flex flex-col font-medium justify-between py-2 h-full">
        {categories.map((category) => 
          <a href={'/c/'+category.value} key={category.value}><li className="category-link">{category.title}<i className="fa-solid fa-chevron-right text-xs"></i></li></a>
        )}
      </ul>
    </div>
  )
}

export default Categories