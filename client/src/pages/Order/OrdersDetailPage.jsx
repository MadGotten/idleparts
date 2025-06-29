import { useQuery } from 'react-query';
import { Link, useParams } from 'react-router-dom';

const getOrderDetails = async (id) => {
  const response = await fetch(`${import.meta.env.VITE_APP_DOMAIN}/account/orders/` + id, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    mode: 'cors',
    credentials: 'include',
  });
  const data = await response?.json();

  return data.order;
};

function OrdersDetailPage() {
  const { id } = useParams();
  const { isLoading, data, status } = useQuery(['orderDetails', id], () => getOrderDetails(id));

  return (
    <div>
      <div className="flex flex-col items-start gap-4">
        <h1 className="text-2xl font-semibold break-all">Order #{id}</h1>
        <div className="flex flex-col w-full">
          {status === 'error' || isLoading ? (
            <></>
          ) : (
            <>
              {data ? (
                <div className="flex flex-col gap-4 w-full">
                  <div className="space-y-">
                    <p>{new Date(data.created_at).toLocaleString()}</p>
                    {data.price && <p>Price: {data.price}$</p>}
                  </div>
                  {data.products.map((product) => {
                    return (
                      <div
                        className="flex w-full min-w-[260px] max-w-[400px] gap-4 p-4 bg-slate-50 shadow-md drop-shadow-md rounded-lg"
                        key={product.product_id._id}
                      >
                        <Link to={'/p/' + product.product_id._id}>
                          <div className="w-[5rem] h-[5rem] flex items-center">
                            <img
                              src={`${import.meta.env.VITE_APP_DOMAIN}/static/${product.product_id.img}`}
                              alt={product.product_id.name}
                              className="w-full max-h-full object-contain mix-blend-multiply"
                            ></img>
                          </div>
                        </Link>
                        <div className="flex flex-col items-end w-full text-end justify-between">
                          <p>{product.product_id.name}</p>
                          <p>Quantity: {product.quantity}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p>Order was not found</p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default OrdersDetailPage;
