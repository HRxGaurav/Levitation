import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import loginAPI from '../APIs/loginAPI';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { setLoggedIn } from '../actions/authActions';
import { useNavigate } from 'react-router-dom';
const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    // State for validation errors
    const [errors, setErrors] = useState({
        email: '',
        password: ''
    });
    // Event handler to update state on input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    const validateForm = () => {
        let isValid = true;
        const newErrors = {
            email: '',
            password: ''
        };
        if (!formData.email) {
            newErrors.email = 'Email is required';
            isValid = false;
        }
        else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Invalid email address';
            isValid = false;
        }
        if (!formData.password) {
            newErrors.password = 'Password is required';
            isValid = false;
        }
        setErrors(newErrors);
        return isValid;
    };
    const login = async () => {
        const isValid = validateForm();
        if (isValid) {
            try {
                const response = await loginAPI(formData);
                const data = await response.json();
                if (response.status === 200) {
                    Cookies.set('token', data.token);
                    Cookies.set('username', data.name);
                    Cookies.set('id', data.userID);
                    toast.success("Logged in successfully");
                    dispatch(setLoggedIn(true));
                    navigate('/');
                }
                else {
                    toast.error(data.message);
                }
            }
            catch (error) {
                console.error('Error logging in:', error);
            }
        }
    };
    return (_jsxs("div", { className: "max-w-md mx-auto my-32 bg-white rounded px-8 pt-10 pb-10 mb-4 border border-teal-500 shadow-lg", children: [_jsx("div", { className: "text-3xl font-medium", children: "Login" }), _jsx("div", { className: "text-gray-500 text-xs mb-6 mt-1", children: "Enter your credentials to login" }), _jsxs("div", { className: "mb-4", children: [_jsx("input", { className: "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline", type: "email", name: "email", placeholder: "Email", value: formData.email, onChange: handleInputChange }), errors.email && _jsx("p", { className: "text-red-500 text-xs italic", children: errors.email })] }), _jsxs("div", { className: "mb-4", children: [_jsx("input", { className: "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline", type: "password", name: "password", placeholder: "Password", value: formData.password, onChange: handleInputChange }), errors.password && _jsx("p", { className: "text-red-500 text-xs italic", children: errors.password })] }), _jsx("div", { className: "flex items-center justify-between", children: _jsx("button", { className: "bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline block mx-auto", type: "button", onClick: login, children: "Login" }) })] }));
};
export default Login;
