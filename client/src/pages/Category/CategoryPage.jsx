import { useContext, useEffect } from 'react';
import { useQuery } from 'react-query';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import Categories from '../../components/Categories';
import CartContext from '../../context/CartContext';
import ProductCard from '../../components/ProductCard';
import Pagination from '../../components/Pagination';
import Skeleton from '../../components/Skeletons/CategoriesCards';

const CategoryPage = () => {
  const navigate = useNavigate();
  const { addProduct } = useContext(CartContext);
  const { search } = useLocation();
  const { category } = useParams();

  const { isLoading, data, status, refetch } = useQuery(
    ['products_paginate', category, search],
    () => getProducts()
  );

  useEffect(() => {
    if (!search) {
      return navigate('?page=0', { replace: true });
    }
    refetch();
  }, [search, refetch]);

  async function getProducts() {
    const response = await fetch(
      `${import.meta.env.VITE_APP_DOMAIN}/category/` + category + search,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        mode: 'cors',
      }
    );
    const data = await response?.json();

    return data;
  }

  return (
    <div className="flex flex-row justify-start gap-12">
      <Categories />
      <div className="flex flex-col pl-4 flex-nowrap mt-4 gap-6 sm:gap-8">
        {status === 'error' || isLoading ? (
          <Skeleton />
        ) : (
          <>
            {data &&
              data.items.map((items, i) => {
                return <ProductCard key={i} items={items} addProduct={addProduct} />;
              })}
            <Pagination currentPage={data.currentPage} totalPages={data.totalPages} />
          </>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
