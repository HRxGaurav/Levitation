import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import registerAPI from '../APIs/registerAPI';
import toast from 'react-hot-toast';
const Register = () => {
    const navigate = useNavigate();
    // State for input values
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    // State for validation errors
    const [errors, setErrors] = useState({
        name: '',
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
    // Validation function
    const validateForm = () => {
        let isValid = true;
        const newErrors = {
            name: '',
            email: '',
            password: ''
        };
        if (!formData.name) {
            newErrors.name = 'Name is required';
            isValid = false;
        }
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
    // Register function
    const register = async () => {
        const isValid = validateForm();
        if (isValid) {
            try {
                const response = await registerAPI(formData);
                const data = await response.json();
                if (response.status === 201) {
                    toast.success(data.message);
                    navigate('/login');
                }
                else if (response.status === 400) {
                    toast.error(data.message);
                }
                else {
                    console.error('Registration failed:', response.statusText);
                }
            }
            catch (error) {
                console.error('Error registering user:', error);
            }
        }
    };
    return (_jsxs("div", { className: "max-w-md mx-auto my-20 bg-white rounded px-8 pt-10 pb-10 mb-4 border border-teal-500 shadow-lg", children: [_jsx("div", { className: "text-3xl font-medium ", children: "Create an account" }), _jsx("div", { className: "text-gray-500 text-xs mb-6 mt-1 ", children: "Your personal invoice generator is here" }), _jsxs("div", { className: "mb-4", children: [_jsx("input", { className: "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline", type: "text", name: "name", placeholder: "Name", value: formData.name, onChange: handleInputChange }), errors.name && _jsx("p", { className: "text-red-500 text-xs italic", children: errors.name })] }), _jsxs("div", { className: "mb-4", children: [_jsx("input", { className: "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline", type: "email", name: "email", placeholder: "Email", value: formData.email, onChange: handleInputChange }), errors.email && _jsx("p", { className: "text-red-500 text-xs italic", children: errors.email })] }), _jsxs("div", { className: "mb-4", children: [_jsx("input", { className: "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline", type: "password", name: "password", placeholder: "Password", value: formData.password, onChange: handleInputChange }), errors.password && _jsx("p", { className: "text-red-500 text-xs italic", children: errors.password })] }), _jsx("div", { className: "flex items-center justify-between", children: _jsx("button", { className: "bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline block mx-auto", type: "button", onClick: register, children: "Register" }) })] }));
};
export default Register;
