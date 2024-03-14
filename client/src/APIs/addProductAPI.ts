
import Cookies from "js-cookie";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const addProductAPI = async (productsData: any): Promise<Response> => {
    
    try {
        const response = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND}/add_product`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                'Authorization': `${Cookies.get('token')}`
            },
            body: JSON.stringify(productsData)
        });        

        return response;
    } catch (error) {
        console.error('Error adding product:', error);
        return new Response(null, { status: 500 }); // Internal server error
    }
};

export default addProductAPI;
