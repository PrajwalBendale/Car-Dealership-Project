import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Orders from "./pages/Orders";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import CustomerReqinfo from "./pages/customerReqinfo";
import Sales from "./pages/Sales";

function App() {
  return (
    <div className="container-fluid">
      <Routes>
        <Route index element={<Signin />} />
        <Route path="/" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/cart" element={<Cart />} />
        <Route
          path="/customerReqinfo/:customerId/:CarID"
          element={<CustomerReqinfo />}
        />
        <Route path="/sales" element={<Sales />} />
      </Routes>

      <ToastContainer />
    </div>
  );
}

export default App;
