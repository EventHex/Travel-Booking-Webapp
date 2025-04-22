import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Dashboard from "./pages/dashboard";
import Home from "./pages/home";
import SearchResultPage from './pages/searchResult'
import FormPage from './pages/form'
import Productpge from './pages/products'
import DetailsPage from './pages/details'
import ProflePage from "./pages/profile"
import ResetPassword from './pages/resetPassword'
import Print from './pages/print/print'
// import NotFound from "./pages/NotFound";
import "./App.css";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          
          {/* Protected routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/searchResult"
            element={
              <ProtectedRoute>
                <SearchResultPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/form"
            element={
              <ProtectedRoute>
                <FormPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/details"
            element={
              <ProtectedRoute>
                <DetailsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/products"
            element={
              <ProtectedRoute>
                <Productpge />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profle"
            element={
              <ProtectedRoute>
                <ProflePage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/download"
            element={
              <ProtectedRoute>
                <Print />
              </ProtectedRoute>
            }
          />
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
