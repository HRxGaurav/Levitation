import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import addProductAPI from '../APIs/addProductAPI';
import toast from 'react-hot-toast';
const AddProductPage = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([{ name: '', quantity: '', rate: '' }]);
    const [error, setError] = useState(false);
    const handleInputChange = (index, event) => {
        const { name, value } = event.target;
        const newProducts = [...products];
        newProducts[index][name] = value;
        // Calculate total whenever quantity or rate changes
        if (name === 'quantity' || name === 'rate') {
            newProducts[index]['total'] = calculateTotal(newProducts[index]);
        }
        setProducts(newProducts);
    };
    const addProductRow = () => {
        const newProduct = { name: '', quantity: '', rate: '' };
        setProducts([...products, newProduct]);
        setError(false);
    };
    const deleteProductRow = (index) => {
        if (products.length === 1) {
            alert("Cannot delete the first product.");
            return;
        }
        const newProducts = [...products];
        newProducts.splice(index, 1);
        setProducts(newProducts);
    };
    const calculateTotal = (product) => {
        const quantity = parseFloat(product.quantity);
        const rate = parseFloat(product.rate);
        return isNaN(quantity) || isNaN(rate) ? '' : quantity * rate;
    };
    const grossTotal = products.reduce((acc, product) => acc + parseFloat(product.total), 0);
    const totalGST = grossTotal * 0.18;
    const grandTotalWithGST = grossTotal + totalGST;
    const next = async () => {
        if (products.some(product => Object.values(product).some(value => value === ''))) {
            setError(true);
        }
        else {
            setError(false);
            try {
                const response = await addProductAPI(products);
                const data = await response.json();
                if (response.status === 200) {
                    toast.success("Products added successfully");
                    navigate(`/invoice/${data.product._id}`);
                }
                else {
                    toast.error("Failed to add products");
                }
            }
            catch (error) {
                console.error('Error adding products:', error);
            }
        }
    };
    return (_jsxs("div", { className: "container mx-auto flex flex-col justify-center items-center", children: [_jsx("h1", { className: "text-3xl font-bold text-center mb-4 mt-6", children: "Add Product Page" }), _jsxs("div", { children: [products.map((product, index) => (_jsxs("div", { className: "mb-4", children: [_jsx("input", { type: "text", name: "name", value: product.name, onChange: (e) => handleInputChange(index, e), placeholder: "Product Name", className: "border rounded p-2 ml-2" }), _jsx("input", { type: "number", name: "rate", value: product.rate, onChange: (e) => handleInputChange(index, e), placeholder: "Rate", className: "border rounded p-2  mt-2 ml-2" }), _jsx("input", { type: "number", name: "quantity", value: product.quantity, onChange: (e) => handleInputChange(index, e), placeholder: "Quantity", className: "border rounded p-2  mt-2 ml-2" }), _jsxs("span", { className: "mt-2 ml-2", children: ["Total: ", product.total] }), index !== 0 && (_jsx("button", { type: "button", onClick: () => deleteProductRow(index), className: "mt-2 ml-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline", children: "Delete" }))] }, index))), _jsxs("div", { className: "mb-4", children: [error && _jsx("p", { className: "text-red-500", children: "All fields must be filled!" }), _jsxs("p", { children: ["Total: ", isNaN(grossTotal) ? '' : grossTotal.toFixed(2)] }), _jsxs("p", { children: ["GST: ", isNaN(totalGST) ? '' : totalGST.toFixed(2)] }), _jsxs("p", { children: ["Grand Total: ", isNaN(grandTotalWithGST) ? '' : grandTotalWithGST.toFixed(2)] })] }), _jsx("button", { type: "button", onClick: addProductRow, className: "bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline", children: "Add Product" }), _jsx("button", { onClick: next, className: "mt-4 ml-5 bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline", children: "Next" })] })] }));
};
export default AddProductPage;
