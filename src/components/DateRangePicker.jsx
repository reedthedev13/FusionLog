export default function DateRangePicker({ selectedRange, onChange }) {
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
          className={`px-4 py-2 rounded-lg border ${
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
