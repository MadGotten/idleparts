import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';

const getOrders = async () => {
  const response = await fetch(`${import.meta.env.VITE_APP_DOMAIN}/account/orders`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    mode: 'cors',
    credentials: 'include',
  });
  const data = await response?.json();
  const uniqueDates = [
    ...new Set(
      data.orders.map((order) =>
        new Date(order.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })
      )
    ),
  ];

  return [data.orders, uniqueDates];
};

function OrdersPage() {
  const { isLoading, data, status } = useQuery('orders', getOrders);

  return (
    <div>
      <div className="flex flex-col items-start gap-4">
        <h1 className="text-2xl font-semibold">Your orders</h1>
        <div className="flex flex-col gap-4  w-[400px]">
          {status === 'error' || isLoading ? (
            <></>
          ) : data && data[1].length > 0 ? (
            data[1].map((date) => (
              <div className="flex flex-col gap-1" key={date}>
                <p>{date}</p>
                {data[0]
                  .filter(
                    (order) =>
                      new Date(order.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                      }) === date
                  )
                  .map((order) => {
                    return (
                      <div className="flex flex-row justify-between" key={order._id}>
                        <Link to={'/account/orders/' + order._id} className="text-blue-600">
                          Order #{order._id}
                        </Link>
                        <p className="w-20">
                          <span className="mr-2">|</span>
                          <span>{new Date(order.created_at).toLocaleTimeString()}</span>
                        </p>
                      </div>
                    );
                  })}
              </div>
            ))
          ) : (
            <p>No orders</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default OrdersPage;
