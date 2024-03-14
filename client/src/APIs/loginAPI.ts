
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const loginAPI = async (userData: any): Promise<Response> => {
    try {
        const response = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        // Return the response directly
        return response;
    } catch (error) {
        console.error('Error logging in:', error);
        return Promise.reject(new Error('Internal server error'));
    }
};

export default loginAPI;

