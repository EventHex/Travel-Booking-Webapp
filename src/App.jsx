import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/login";
import HomePage from "./pages/home"; 
import DashboardPage from './pages/dashboard'
import SearchResultPage from './pages/searchResult'
import FormPage from './pages/form'
import Productpge from './pages/products'
import DetailsPage from './pages/details'
import ProflePage from "./pages/profile"
import Signup from './pages/signup'
import ResetPassword from './pages/resetPassword'
import Print from './pages/print/print'
// import NotFound from "./pages/NotFound";
import "./App.css";

function App() {
  return (
    
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/searchResult" element={<SearchResultPage />} />
          <Route path="/form" element={<FormPage />} />
        <Route path="/products" element={<Productpge />} /> 
        <Route path="/details" element={<DetailsPage />} />
        <Route path="/profle" element={<ProflePage />} />
        <Route path="/download" element={<Print />} />
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
