import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux'; 
import { RootState } from '../types';
import getProductsAPI from '../APIs/getProductsAPI';

interface Order {
  _id: string;
}

const Home: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn); 

  useEffect(() => {
    
    const fetchOrders = async () => {
      try {
        if (!isLoggedIn) {
          return; 
        }
  
        const response = await getProductsAPI(); 
        if (response.ok) {
          const data = await response.json();
          setOrders(data); 
          console.log('Orders:', data); 
        } else {
          console.error('Error fetching orders:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };
  
    fetchOrders();
  }, [isLoggedIn]); 
  
  return (
    <div className="container mx-auto mt-6 px-24">
      {isLoggedIn ? ( 
        <>
          <div className="text-center">
            { orders.length > 0 && <h1 className="text-3xl font-bold mb-4">Your Orders</h1>}
          </div>
          {orders.length > 0 ? (
            <div className="grid grid-cols-2 gap-4">
              {orders.map(order => (
                <div key={order._id} className="bg-white rounded-lg shadow-lg p-4">
                  <p className="text-lg font-bold mb-2">Order ID: {order._id}</p>
                  <Link to={`/invoice/${order._id}`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Get Invoice
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <h1 className="text-6xl font-bold mb-4 text-center text-gray-300 mt-72">Add an order to get Invoice</h1>
          )}
        </>
      ) : (
        <h1 className="text-6xl font-bold mb-4 text-center text-gray-300 mt-72">Login First</h1>
      )}
    </div>
  );
};

export default Home;
