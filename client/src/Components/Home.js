import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import getProductsAPI from '../APIs/getProductsAPI';
const Home = () => {
    const [orders, setOrders] = useState([]);
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn); // Access isLoggedIn state from Redux store
    useEffect(() => {
        // Fetch orders only if the user is logged in
        const fetchOrders = async () => {
            try {
                if (!isLoggedIn) {
                    return; // If not logged in, do not fetch orders
                }
                const response = await getProductsAPI(); // Call the API function to fetch orders
                if (response.ok) {
                    const data = await response.json();
                    setOrders(data); // Assuming the response contains an array of orders
                    console.log('Orders:', data); // Log the fetched orders
                }
                else {
                    console.error('Error fetching orders:', response.statusText);
                }
            }
            catch (error) {
                console.error('Error fetching orders:', error);
            }
        };
        fetchOrders();
    }, [isLoggedIn]); // Add isLoggedIn to the dependency array
    return (_jsx("div", { className: "container mx-auto mt-6 px-24", children: isLoggedIn ? ( // Conditional rendering based on isLoggedIn state
        _jsxs(_Fragment, { children: [_jsx("h1", { className: "text-3xl font-bold mb-4", children: "Your Orders" }), _jsx("div", { className: "grid grid-cols-2 gap-4", children: orders.map(order => (_jsxs("div", { className: "bg-white rounded-lg shadow-lg p-4", children: [_jsxs("p", { className: "text-lg font-bold mb-2", children: ["Order ID: ", order._id] }), _jsx(Link, { to: `/invoice/${order._id}`, className: "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline", children: "Get Invoice" })] }, order.id))) })] })) : (_jsx("h1", { className: "text-6xl font-bold mb-4 text-center text-gray-300 mt-72 justify-center", children: "Login First" })) }));
};
export default Home;
