import { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useQuery } from 'react-query';
import Categories from '../../components/Categories';
import CartContext from '../../context/CartContext';
import ProductCard from '../../components/ProductCard';
import Spinner from '../../components/Spinner';

const SearchPage = () => {
  const { addProduct } = useContext(CartContext);
  const { search } = useLocation();
  const [fetchStart, setFetchStart] = useState(Date.now());
  const { isLoading, data, status, refetch } = useQuery(
    ['products_search', decodeURI(search.slice(8).toLowerCase()).trim().split(/\s+/)],
    () => {
      return getProducts();
    }
  );
  const ShowSpinner = isLoading && fetchStart && Date.now() - fetchStart > 1000;

  useEffect(() => {
    refetch();
    setFetchStart(Date.now());
  }, [search, refetch]);

  async function getProducts() {
    const response = await fetch(`${import.meta.env.VITE_APP_DOMAIN}/products/search` + search, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      mode: 'cors',
    });
    const data = await response?.json();
    return data.items;
  }

  return (
    <div className="flex flex-row justify-start gap-12">
      <Categories />
      <div className="flex flex-col pl-4 flex-nowrap mt-4 gap-6 sm:gap-8">
        {ShowSpinner && <Spinner />}

        {status === 'error' && <div>Error fetching products</div>}

        {status === 'success' &&
          data &&
          data.length > 0 &&
          data.map((items, i) => <ProductCard key={i} items={items} addProduct={addProduct} />)}

        {status === 'success' && (!data || data.length === 0) && (
          <p>There are no products named: "{decodeURI(search.slice(8))}"</p>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
