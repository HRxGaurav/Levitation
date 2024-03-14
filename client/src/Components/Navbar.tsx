import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setLoggedIn } from '../actions/authActions';
import checkLoggedin from '../APIs/checkLoggedin';
import levitation from '../assets/Icons/levitation.svg';
import { RootState } from '../types';
import Cookies from 'js-cookie';

const Navbar: React.FC = () => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

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


    return (
        <>
            <nav className="flex items-center justify-between bg-teal-500 px-20 py-3">
                <div className="flex items-center flex-shrink-0 text-white mr-6">
                <Link to="/" className="homepage-link cursor-pointer">
                     <img src={levitation} alt='leviation' className="homepage-image" />
                    </Link>
                </div>
                
                <div className="flex">
                    <div className="text-sm lg:flex-grow"></div>
                    <div>
                        {!isLoggedIn && <Link to="/login" className="mr-6 inline-block text-sm px-4 py-2 border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0">Login</Link>}
                    </div>
                    <div>
                        {!isLoggedIn && <Link to="/register" className="inline-block text-sm px-4 py-2 border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0">Register</Link>}
                    </div>
                    
                    <div>
                        {isLoggedIn && <h1  className="inline-block  px-4 py-2 font-medium  text-white border-white  mt-4 lg:mt-0">{`Hi! ${Cookies.get( 'username')}`}</h1>}
                    </div>
                    <div>
                        {isLoggedIn && <Link to="/add_product" className="inline-block text-sm mr-4 px-4 py-2 border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0">Add Product</Link>}
                    </div>
                    <div>
                        {isLoggedIn && <button onClick={handleLogout} className="inline-block text-sm px-4 py-2 border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0">Logout</button>}
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
