import React from "react";
import PageWrapper from "../components/PageWrapper";

export default function TradeHistory({ trades = [] }) {
  return (
    <PageWrapper>
      <div className="p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
          📜 Trade History
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-200 dark:border-gray-700">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-300">
                <th className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-left font-semibold">
                  Exit Date
                </th>
                <th className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-left font-semibold">
                  Symbol
                </th>
                <th className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-left font-semibold">
                  Entry Price
                </th>
                <th className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-left font-semibold">
                  Exit Price
                </th>
                <th className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-left font-semibold">
                  P&L
                </th>
              </tr>
            </thead>

            <tbody>
              {trades.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="text-center py-6 text-gray-500 dark:text-gray-400 italic"
                  >
                    No trades to display.
                  </td>
                </tr>
              ) : (
                trades.map((trade, i) => (
                  <tr
                    key={i}
                    className={`border border-gray-200 dark:border-gray-700 ${
                      i % 2 === 0
                        ? "bg-white dark:bg-gray-900"
                        : "bg-gray-50 dark:bg-gray-800"
                    }`}
                  >
                    <td className="px-4 py-3 text-gray-900 dark:text-gray-200">
                      {new Date(trade.exitDate).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-gray-900 dark:text-gray-200">
                      {trade.symbol}
                    </td>
                    <td className="px-4 py-3 text-gray-900 dark:text-gray-200">
                      ${trade.entryPrice.toFixed(2)}
                    </td>
                    <td className="px-4 py-3 text-gray-900 dark:text-gray-200">
                      ${trade.exitPrice.toFixed(2)}
                    </td>
                    <td
                      className={`px-4 py-3 font-semibold ${
                        trade.pnl >= 0
                          ? "text-green-500 dark:text-green-400"
                          : "text-red-500 dark:text-red-400"
                      }`}
                    >
                      ${trade.pnl.toFixed(2)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </PageWrapper>
  );
}
