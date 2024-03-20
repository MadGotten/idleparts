import React from 'react';
import Product from '../components/Product'

const ProductCard = ({ items, addProduct }) => {
  return (
    <div className='flex flex-row gap-2'>
      <Product items={items}/>
      <div className="flex flex-col w-full p-4 gap-4 justify-between bg-slate-50 shadow-md drop-shadow-md rounded-lg">
        <div className="text-xl font-semibold">{items.price} $</div>
        <div className="text-sm font-normal text-center">{items.stock ? (<>{`only ${items.stock} in stock`}</>):( <>Out of stock</> )}</div>
        <button onClick={() => addProduct(items._id)} className="bg-blue-600 hover:bg-blue-700 rounded-lg text-center p-2 px-4 text-sm text-slate-200">Add to cart</button>
      </div>
    </div>
  );
};

export default ProductCard;