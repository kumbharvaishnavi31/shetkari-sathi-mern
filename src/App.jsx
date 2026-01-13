
import { Routes, Route } from "react-router-dom";

// Common Pages
import Home from "./Home.jsx";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import MarketPrice from "./pages/common/MarketPrice.jsx";
import CropSolutions from "./pages/farmer/CropSolutions.jsx";
import AgricultureSchemes from "./pages/farmer/AgricultureSchemes.jsx";
import LanguageSelector from "./components/LanguageSelector.jsx";

// Dashboards
import Dashboard from "./pages/admin/Dashboard.jsx";
import FarmerDashboard from "./pages/farmer/FarmerDashboard.jsx";
import BuyerDashboard from "./pages/buyer/BuyerDashboard.jsx";

// Admin Pages
import ManageUsers from "./pages/admin/ManageUsers.jsx";
import ManageCrops from "./pages/admin/ManageCrops.jsx";
import ManageRequests from "./pages/admin/ManageRequests.jsx";
import ManageContent from "./pages/admin/ManageContent.jsx";
import Transactions from "./pages/admin/Transactions.jsx";
import Settings from "./pages/admin/Settings.jsx";

// Protected Route
import ProtectedRoute from "./components/ProtectedRoute.jsx";

// Buyer Pages
import BrowseProduct from "./pages/buyer/BrowseProduct.jsx";
import Wishlist from "./pages/buyer/Wishlist.jsx";
import OrderHistory from "./pages/buyer/OrderHistory.jsx";
import PurchaseRequestForm from "./pages/buyer/PurchaseRequestForm.jsx";
import BuyerProfile from "./pages/buyer/Profile.jsx";
import MyPurchaseRequests from "./pages/buyer/MyPurchaseRequests.jsx";

// Farmer Pages
import AddProduct from "./pages/farmer/AddProduct.jsx";
import BuyerRequests from "./pages/farmer/BuyerRequests.jsx";
import MyProducts from "./pages/farmer/MyProducts.jsx";
import FeedbackForm from "./pages/farmer/FeedbackForm.jsx";
import FarmerProfile from "./pages/farmer/Profile.jsx";
import FMarketPrice from "./pages/farmer/MarketPrice.jsx";

function App() {
  return (
    <Routes>
      {/* ---------------- PUBLIC ROUTES ---------------- */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/common/marketprice" element={<MarketPrice />} />
      <Route path="/crop-solutions" element={<CropSolutions />} />
      <Route path="/agriculture-schemes" element={<AgricultureSchemes />} />
      <Route path="/language-selector" element={<LanguageSelector />} />

      {/* ---------------- FARMER ROUTES ---------------- */}
      <Route
        path="/farmer/dashboard"
        element={
          <ProtectedRoute role="farmer">
            <FarmerDashboard />
          </ProtectedRoute>
        }
      />
      {/* <Route
        path="/farmer/add-product"
        element={
          <ProtectedRoute role="farmer">
            <AddProduct />
          </ProtectedRoute>
        }
      />
      <Route
        path="/farmer/buyer-requests"
        element={
          <ProtectedRoute role="farmer">
            <BuyerRequests />
          </ProtectedRoute>
        }
      />
      <Route
        path="/farmer/my-products"
        element={
          <ProtectedRoute role="farmer">
            <MyProducts />
          </ProtectedRoute>
        }
      /> */}
      <Route path="/add-product" element={
        <ProtectedRoute role="farmer">
          <AddProduct />
        </ProtectedRoute>
      } />
      {/* <Route path="/comon/market-price" element={
        <ProtectedRoute role="farmer">
          <MarketPrice/>
        </ProtectedRoute>
      } /> */}
      <Route
        path="/buyer-requests"
        element={
          <ProtectedRoute role="farmer">
            <BuyerRequests />
          </ProtectedRoute>
        }
      />
      <Route
        path="/my-products"
        element={
          <ProtectedRoute role="farmer">
            <MyProducts />
          </ProtectedRoute>
        }
      />
      <Route
        path="/farmer/profile"
        element={
          <ProtectedRoute role="farmer">
            <FarmerProfile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/farmer/feedback"
        element={
          <ProtectedRoute role="farmer">
            <FeedbackForm />
          </ProtectedRoute>
        }
      />

      {/* ---------------- BUYER ROUTES ---------------- */}
      <Route
        path="/buyer/dashboard"
        element={
          <ProtectedRoute role="buyer">
            <BuyerDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/buyer/browseproduct"
        element={
          <ProtectedRoute role="buyer">
            <BrowseProduct />
          </ProtectedRoute>
        }
      />
      <Route
        path="/buyer/wishlist"
        element={
          <ProtectedRoute role="buyer">
            <Wishlist />
          </ProtectedRoute>
        }
      />
      <Route
        path="/buyer/orderhistory"
        element={
          <ProtectedRoute role="buyer">
            <OrderHistory />
          </ProtectedRoute>
        }
      />
      <Route
        path="/buyer/my-purchase-requests"
        element={
          <ProtectedRoute role="buyer">
            <MyPurchaseRequests />
          </ProtectedRoute>
        }
      />
      <Route
        path="/buyer/purchaserequest/:cropId"
        element={
          <ProtectedRoute role="buyer">
            <PurchaseRequestForm />
          </ProtectedRoute>
        }
      />
      <Route
        path="/buyer/profile"
        element={
          <ProtectedRoute role="buyer">
            <BuyerProfile />
          </ProtectedRoute>
        }
      />

      {/* ---------------- ADMIN ROUTES ---------------- */}
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute role="admin">
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/manage-users"
        element={
          <ProtectedRoute role="admin">
            <ManageUsers />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/manage-crops"
        element={
          <ProtectedRoute role="admin">
            <ManageCrops />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/manage-requests"
        element={
          <ProtectedRoute role="admin">
            <ManageRequests />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/manage-content"
        element={
          <ProtectedRoute role="admin">
            <ManageContent />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/transactions"
        element={
          <ProtectedRoute role="admin">
            <Transactions />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/settings"
        element={
          <ProtectedRoute role="admin">
            <Settings />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
