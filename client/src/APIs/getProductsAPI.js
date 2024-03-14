import Cookies from "js-cookie";
const getProductsAPI = async () => {
    try {
        const response = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND}/get_products`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                'Authorization': `${Cookies.get('token')}`
            }
        });
        return response;
    }
    catch (error) {
        console.error('Error fetching products:', error);
        return new Response(null, { status: 500 });
    }
};
export default getProductsAPI;
