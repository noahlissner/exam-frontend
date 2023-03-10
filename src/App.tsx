import { Routes, Route } from "react-router-dom";

// Admin ROUTES
import Dashboard from "./routes/Admin";
import Customers from "./routes/Admin/Customers";
import Login from "./routes/Admin/Login";
import Orders from "./routes/Admin/Orders";
import Products from "./routes/Admin/Products";
import EditProduct from "./routes/Admin/Products/EditProduct";
import ProtectedRoute from "./routes/ProtectedRoute";
import Checkout from "./routes/Public/Checkout";
import Confirmation from "./routes/Public/Confirmation";
import Store from "./routes/Public/Store";

const App = () => {
  return (
    <Routes>
      {/* Public/Store Pages */}
      <Route path="/" element={<Store />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/confirmation/:id" element={<Confirmation />} />

      {/* ADMIN PAGES */}
      <Route path="/admin/login" element={<Login />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/products"
        element={
          <ProtectedRoute>
            <Products />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/products/edit/:id"
        element={
          <ProtectedRoute>
            <EditProduct />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/orders"
        element={
          <ProtectedRoute>
            <Orders />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/customers"
        element={
          <ProtectedRoute>
            <Customers />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default App;
