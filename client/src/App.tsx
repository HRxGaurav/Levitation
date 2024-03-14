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
  return (
    <Provider store={store}> 
      <>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/add_product" element={<AddProductPage />} />
          <Route path="/invoice/:id" element={<PDFGenerator/>} />
        </Routes>
        <Toaster
          position="top-center"
          toastOptions={{ style: { width: "300px ", fontSize: "20px" } }}
        />
      </>
    </Provider>
  );
}

export default App;
