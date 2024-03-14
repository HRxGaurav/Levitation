import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import store from "./store/store";
import Login from "./Components/Login";
import Navbar from "./Components/Navbar";
import Register from "./Components/Register";
import AddProductPage from "./Components/AddProduct";
import PDFGenerator from "./Components/PDFGenerator";
import Home from "./Components/Home";
function App() {
    return (_jsx(Provider, { store: store, children: _jsxs(_Fragment, { children: [_jsx(Navbar, {}), _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(Home, {}) }), _jsx(Route, { path: "/login", element: _jsx(Login, {}) }), _jsx(Route, { path: "/register", element: _jsx(Register, {}) }), _jsx(Route, { path: "/add_product", element: _jsx(AddProductPage, {}) }), _jsx(Route, { path: "/invoice/:id", element: _jsx(PDFGenerator, {}) })] }), _jsx(Toaster, { position: "top-center", toastOptions: { style: { width: "300px ", fontSize: "20px" } } })] }) }));
}
export default App;
