import { Link } from "react-router-dom";
import DarkModeToggle from "./DarkModeToggle";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm px-6 py-4 flex items-center justify-between">
      <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
        FusionLog
      </h1>

      <div className="flex items-center space-x-6 text-sm font-medium">
        <Link
          to="/"
          className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition"
        >
          Dashboard
        </Link>
        <Link
          to="/add-trade"
          className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition"
        >
          Add Trade
        </Link>
        <Link
          to="/history"
          className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition"
        >
          History
        </Link>
        <Link
          to="/journal"
          className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition"
        >
          Journal
        </Link>

        <DarkModeToggle />
      </div>
    </nav>
  );
}
