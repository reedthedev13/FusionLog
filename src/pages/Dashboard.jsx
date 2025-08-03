import { useState, useMemo, useEffect } from "react";
import PageWrapper from "../components/PageWrapper";
import TradePerformanceChart from "../components/TradePerformanceChart";
import {
  ChartBarIcon,
  CurrencyDollarIcon,
  ArrowTrendingUpIcon,
  DocumentChartBarIcon,
} from "@heroicons/react/24/outline";

export default function Dashboard() {
  const [selectedRange, setSelectedRange] = useState("7d");
  const [trades, setTrades] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/api/trades")
      .then((res) => res.json())
      .then((data) => setTrades(data));
  }, []);

  const stats = [
    {
      id: 1,
      name: "Total Trades",
      stat: 128,
      icon: DocumentChartBarIcon,
      color: "bg-blue-500",
    },
    {
      id: 2,
      name: "Win Rate",
      stat: "35%",
      icon: ArrowTrendingUpIcon,
      color: "bg-green-500",
    },
    {
      id: 3,
      name: "Total PnL",
      stat: "$12,240",
      icon: CurrencyDollarIcon,
      color: "bg-purple-500",
    },
    {
      id: 4,
      name: "Best Setup",
      stat: "HTF Breakout",
      icon: ChartBarIcon,
      color: "bg-pink-500",
    },
  ];

  function DateRangePicker({ selectedRange, onChange }) {
    const ranges = [
      { label: "Last 7 Days", value: "7d" },
      { label: "Last Month", value: "1m" },
      { label: "Year to Date", value: "ytd" },
    ];

    return (
      <div className="flex space-x-4 mb-6">
        {ranges.map(({ label, value }) => (
          <button
            key={value}
            onClick={() => onChange(value)}
            className={`px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm ${
              selectedRange === value
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
            } transition`}
          >
            {label}
          </button>
        ))}
      </div>
    );
  }

  // Example dummy trade data — replace with your backend API data

  // Filter trades based on selected date range
  const filteredTrades = useMemo(() => {
    const now = new Date();
    let startDate = new Date();

    if (selectedRange === "7d") {
      startDate.setDate(now.getDate() - 7);
    } else if (selectedRange === "1m") {
      startDate.setMonth(now.getMonth() - 1);
    } else if (selectedRange === "ytd") {
      startDate = new Date(now.getFullYear(), 0, 1);
    }

    return trades.filter((trade) => {
      const tradeDate = new Date(trade.exitDate);
      return tradeDate >= startDate && tradeDate <= now;
    });
  }, [selectedRange, trades]);

  return (
    <PageWrapper>
      <div className="mb-8">
        <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-1">
          📊 Performance Dashboard
        </h2>
        <p className="text-lg text-gray-500 dark:text-gray-400 mt-2">
          Your trading stats & performance at a glance
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map(({ id, name, stat, icon: Icon, color }) => (
          <div
            key={id}
            className="flex items-center p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-2xl hover:scale-[1.03] transition-all duration-200 cursor-pointer"
          >
            <div
              className={`${color} p-3 rounded-full text-white mr-5 shadow-lg`}
            >
              <Icon className="h-8 w-8" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {stat}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-300">{name}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Date Range Picker */}
      <DateRangePicker
        selectedRange={selectedRange}
        onChange={setSelectedRange}
      />

      {/* Charts */}
      <TradePerformanceChart trades={filteredTrades} />
    </PageWrapper>
  );
}
