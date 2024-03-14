import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setLoggedIn } from '../actions/authActions';
import checkLoggedin from '../APIs/checkLoggedin';
import levitation from '../assets/Icons/levitation.svg';
import Cookies from 'js-cookie';
const Navbar = () => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    useEffect(() => {
        const checkLoggedIn = async () => {
            const status = await checkLoggedin();
            dispatch(setLoggedIn(status === 200 ? true : false));
        };
        checkLoggedIn();
    }, [dispatch]);
    const handleLogout = () => {
        Cookies.remove('token');
        Cookies.remove('username');
        Cookies.remove('id');
        dispatch(setLoggedIn(false));
    };
    return (_jsx(_Fragment, { children: _jsxs("nav", { className: "flex items-center justify-between bg-teal-500 px-20 py-3", children: [_jsx("div", { className: "flex items-center flex-shrink-0 text-white mr-6", children: _jsx(Link, { to: "/", className: "homepage-link cursor-pointer", children: _jsx("img", { src: levitation, alt: 'leviation', className: "homepage-image" }) }) }), _jsxs("div", { className: "flex", children: [_jsx("div", { className: "text-sm lg:flex-grow" }), _jsx("div", { children: !isLoggedIn && _jsx(Link, { to: "/login", className: "mr-6 inline-block text-sm px-4 py-2 border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0", children: "Login" }) }), _jsx("div", { children: !isLoggedIn && _jsx(Link, { to: "/register", className: "inline-block text-sm px-4 py-2 border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0", children: "Register" }) }), _jsx("div", { children: isLoggedIn && _jsx("h1", { className: "inline-block  px-4 py-2 font-medium  text-white border-white  mt-4 lg:mt-0", children: `Hi! ${Cookies.get('username')}` }) }), _jsx("div", { children: isLoggedIn && _jsx(Link, { to: "/add_product", className: "inline-block text-sm mr-4 px-4 py-2 border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0", children: "Add Product" }) }), _jsx("div", { children: isLoggedIn && _jsx("button", { onClick: handleLogout, className: "inline-block text-sm px-4 py-2 border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0", children: "Logout" }) })] })] }) }));
};
export default Navbar;
