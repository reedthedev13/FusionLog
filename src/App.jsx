import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import AddTrade from "./pages/AddTrade";
import TradeHistory from "./pages/TradeHistory";
import Journal from "./pages/Journal";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/add-trade" element={<AddTrade />} />
        <Route path="/history" element={<TradeHistory />} />
        <Route path="/journal" element={<Journal />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 pt-20 p-6 transition-colors">
        <Navbar />
        <AnimatedRoutes />
      </div>
    </Router>
  );
}
