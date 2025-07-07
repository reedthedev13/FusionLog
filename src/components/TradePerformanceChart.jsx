import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useMemo } from "react";

const COLORS = ["#10B981", "#EF4444"]; // green, red for wins/losses

export default function PerformanceDashboardCharts({ trades }) {
  // 1) Monthly PnL aggregation
  const monthlyPnL = useMemo(() => {
    const map = {};
    trades.forEach(({ exitDate, pnl }) => {
      const date = new Date(exitDate);
      if (isNaN(date)) return;
      const month = date.toLocaleString("default", {
        month: "short",
        year: "numeric",
      });
      map[month] = (map[month] || 0) + pnl;
    });
    return Object.entries(map)
      .map(([month, pnl]) => ({ month, pnl }))
      .sort((a, b) => new Date(a.month) - new Date(b.month));
  }, [trades]);

  // 2) Win/Loss Pie Chart data
  const winLossData = useMemo(() => {
    let wins = 0;
    let losses = 0;
    trades.forEach(({ pnl }) => {
      if (pnl > 0) wins++;
      else if (pnl < 0) losses++;
    });
    return [
      { name: "Wins", value: wins },
      { name: "Losses", value: losses },
    ];
  }, [trades]);

  // 3) Equity Curve (cumulative PnL)
  const equityCurve = useMemo(() => {
    const sorted = [...trades]
      .filter(
        (t) =>
          new Date(t.exitDate) instanceof Date && !isNaN(new Date(t.exitDate))
      )
      .sort((a, b) => new Date(a.exitDate) - new Date(b.exitDate));
    let cumulative = 0;
    return sorted.map(({ exitDate, pnl }) => {
      cumulative += pnl;
      return {
        date: new Date(exitDate).toLocaleDateString(),
        equity: cumulative,
      };
    });
  }, [trades]);

  return (
    <div className="space-y-12">
      {/* Monthly PnL Bar Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
        <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
          Monthly PnL
        </h3>
        <BarChart width={600} height={250} data={monthlyPnL}>
          <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.1} />
          <XAxis dataKey="month" stroke="#aaa" />
          <YAxis stroke="#aaa" />
          <Tooltip />
          <Bar dataKey="pnl" fill="#3b82f6" />
        </BarChart>
      </div>

      {/* Win/Loss Pie Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 flex flex-col items-center">
        <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
          Win / Loss Ratio
        </h3>

        <div style={{ width: 250, height: 250 }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={winLossData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
              >
                {winLossData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
              <Legend verticalAlign="bottom" layout="horizontal" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Equity Curve Line Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
        <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
          Equity Curve
        </h3>
        <LineChart width={600} height={250} data={equityCurve}>
          <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.1} />
          <XAxis dataKey="date" stroke="#aaa" />
          <YAxis stroke="#aaa" />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="equity"
            stroke="#3b82f6"
            strokeWidth={3}
            dot={false}
          />
        </LineChart>
      </div>
    </div>
  );
}
