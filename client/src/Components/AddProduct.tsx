import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import addProductAPI from '../APIs/addProductAPI'; 
import toast from 'react-hot-toast';

interface Product {
  [key: string]: string | number | '';
  name: string;
  quantity: number | '';
  rate: number | '';
}

const AddProductPage: React.FC = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([{ name: '', quantity: '', rate: '' }]);
  const [error, setError] = useState(false);
  
  const handleInputChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
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
    const newProduct: Product = { name: '', quantity: '', rate: '', total: '' };
    setProducts([...products, newProduct]);
    setError(false);
  };

  const deleteProductRow = (index: number) => {
    if (products.length === 1) {
      alert("Cannot delete the first product.");
      return;
    }
    const newProducts = [...products];
    newProducts.splice(index, 1);
    setProducts(newProducts);
  };

  const calculateTotal = (product: Product) => {
    const quantity = parseFloat(product.quantity as string);
    const rate = parseFloat(product.rate as string);
    return isNaN(quantity) || isNaN(rate) ? '' : quantity * rate;
  };

  const grossTotal = products.reduce((acc, product) => acc + parseFloat(product.total as string), 0);
  const totalGST = grossTotal * 0.18;
  const grandTotalWithGST = grossTotal + totalGST;

  const next = async () => {
    if (products.some(product => Object.values(product).some(value => value === ''))) {
      setError(true);
    } else {
      setError(false);
      try {
        const response = await addProductAPI(products);
        const data = await response.json();

        if (response.status === 200) {
          toast.success("Products added successfully");
          navigate(`/invoice/${data.product._id}`);
        } else {
          toast.error("Failed to add products");
        }
      } catch (error) {
        console.error('Error adding products:', error);
      }
    }
  };

  return (
    <div className="container mx-auto flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold text-center mb-4 mt-6">Add Product Page</h1>
      <div>
        {products.map((product, index) => (
          <div key={index} className="mb-4">
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={(e) => handleInputChange(index, e)}
              placeholder="Product Name"
              className="border rounded p-2 ml-2"
            />
            <input
              type="number"
              name="rate"
              value={product.rate}
              onChange={(e) => handleInputChange(index, e)}
              placeholder="Rate"
              className="border rounded p-2 mt-2 ml-2"
            />
            <input
              type="number"
              name="quantity"
              value={product.quantity}
              onChange={(e) => handleInputChange(index, e)}
              placeholder="Quantity"
              className="border rounded p-2 mt-2 ml-2"
            />
            <span className="mt-2 ml-2">Total: {product.total}</span>
            {index !== 0 && (
              <button
                type="button"
                onClick={() => deleteProductRow(index)}
                className="mt-2 ml-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Delete
              </button>
            )}
          </div>
        ))}
        <div className="mb-4">
          {error && <p className="text-red-500">All fields must be filled!</p>}
          <p>Total: {isNaN(grossTotal) ? '' : grossTotal.toFixed(2)}</p>
          <p>GST: {isNaN(totalGST) ? '' : totalGST.toFixed(2)}</p>
          <p>Grand Total: {isNaN(grandTotalWithGST) ? '' : grandTotalWithGST.toFixed(2)}</p>
        </div>
        <button
          type="button"
          onClick={addProductRow}
          className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Add Product
        </button>
        <button
          onClick={next}
          className="mt-4 ml-5 bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AddProductPage;
