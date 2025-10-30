import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Checkout from "./pages/Checkout";
import Details from "./pages/Details";
import Result from "./pages/Result";

function App() {
  return (
    <Router>
      <nav className="p-4 bg-white shadow-md flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          HD Booking
        </Link>
        <div className="space-x-6 text-gray-600 font-medium">
          <Link to="/checkout" className="hover:text-blue-600">Checkout</Link>
          <Link to="/details" className="hover:text-blue-600">Details</Link>
          <Link to="/result" className="hover:text-blue-600">Result</Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} /> {/* 👈 this line shows your experiences */}
        <Route path="/checkout/:id" element={<Checkout />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </Router>
  );
}

export default App;
