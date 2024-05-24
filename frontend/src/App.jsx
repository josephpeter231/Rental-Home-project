import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login'
import SignUp from './components/SignUp';
import Dashboard from './components/Buyer/Dashboard';
import SellDashboard from './components/Seller/SellerDashboard';
import Allproperties from './components/Seller/Allproperties';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/sellerdashboard" element={<SellDashboard/>} />
        <Route path="/add-property" element={<SellDashboard/>} />
        <Route path="/all-properties" element={<Allproperties />} />
      </Routes>
    </Router>
  );
};

export default App;
