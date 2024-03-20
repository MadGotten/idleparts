import React, {useContext, useEffect} from 'react'
import { useQuery } from 'react-query'
import { useLocation } from "react-router-dom"
import { useParams } from 'react-router'
import Navbar from '../../components/Navbar'
import Categories from '../../components/Categories'
import CartContext from '../../context/CartContext'
import ProductCard from '../../components/ProductCard'
import Pagination from '../../components/Pagination'

const App = () => {
  const {addProduct} = useContext(CartContext)
  const {search} = useLocation()
  const {category} = useParams()

  const {isLoading, data, status, refetch} = useQuery(['products_paginate', category, search], () => getProducts(), { refetchOnWindowFocus: false, keepPreviousData : true })

  useEffect(() => {
    refetch();
  }, [search, refetch])

  async function getProducts(){
    const response = await fetch(`${process.env.REACT_APP_DOMAIN}/category/`+category+search, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', },
        mode: 'cors',
    })
    const data = await response?.json()
  
    return data
  }

  return (
    <div className="py-4 px-4 sm:px-8 flex flex-col gap-8 mb-24">
      <Navbar/>
      <div className="flex flex-row justify-start mt-4 gap-12">
        <Categories/>
        <div className="flex flex-col pl-4 flex-nowrap mt-4 gap-6 sm:gap-8">
          {status==='error' || isLoading ? 
            <></>
          :
          <>
          {data && data.items.map((items, i) => {
            return(
              <ProductCard key={i} items={items} addProduct={addProduct}/>
            )
          })}
          <Pagination currentPage={data.currentPage} totalPages={data.totalPages} />
          </>
          }
        </div>
      </div>
    </div>
  )
}

export default App