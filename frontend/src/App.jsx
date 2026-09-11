import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import "./App.css";
import Profile from "./pages/Profile";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import ProductList from "./pages/ProductList";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
function App() {
    return (
        <BrowserRouter>
            <Routes>

                <Route path="/" element={<Home />} />

                <Route path="/login" element={<Login />} />
                <Route
    path="/forgot-password"
    element={<ForgotPassword />}
/> 
<Route
    path="/reset-password/:token"
    element={<ResetPassword />}
/>
<Route
    path="/products"
    element={<ProductList />}
/>

                <Route path="/register" element={<Register />} />
<Route
    path="/dashboard"
    element={
        <ProtectedRoute>
            <Dashboard />
        </ProtectedRoute>
    }
/>
<Route
    path="/profile"
    element={
        <ProtectedRoute>
            <Profile />
        </ProtectedRoute>
    }
/>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route
    path="/add-product"
    element={<AddProduct />}
/>
<Route
    path="/edit-product/:id"
    element={<EditProduct />}
/>

            </Routes>
        </BrowserRouter>
    );
}

export default App;