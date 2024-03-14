// eslint-disable-next-line @typescript-eslint/no-explicit-any
const registerAPI = async (userData) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND}/register`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData)
        });
        return response;
    }
    catch (error) {
        console.error('Error registering user:', error);
        return new Response(null, { status: 500 });
    }
};
export default registerAPI;
