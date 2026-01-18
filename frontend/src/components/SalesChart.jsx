const SalesChart = () => {
  const bars = [40, 28, 20, 24, 14, 36, 32, 40, 44, 38, 48, 42];

  return (
    <div className="bg-white p-6 rounded-xl shadow lg:col-span-2">
      <div className="flex justify-between mb-4">
        <h3 className="font-semibold">Sales</h3>
        <button className="text-sm text-indigo-600">Sync</button>
      </div>

      <div className="flex items-end space-x-3 h-48">
        {bars.map((height, i) => (
          <div
            key={i}
            className={`w-4 rounded ${
              i % 2 === 0 ? "bg-indigo-500" : "bg-indigo-300"
            }`}
            style={{ height: `${height * 4}px` }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default SalesChart;
