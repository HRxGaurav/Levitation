import Cookies from "js-cookie";
const getProductByIdAPI = async (productId) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND}/get_product_by_id/${productId}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                'Authorization': `${Cookies.get('token')}`
            }
        });
        return response;
    }
    catch (error) {
        console.error('Error fetching product by ID:', error);
        return new Response(null, { status: 500 });
    }
};
export default getProductByIdAPI;
