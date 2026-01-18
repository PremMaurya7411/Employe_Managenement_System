const StatCard = ({ title, value, change, positive, progress }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <p className="text-gray-500">{title}</p>

      <h3 className="text-2xl font-bold mt-1">{value}</h3>

      {change && (
        <p
          className={`text-sm mt-2 ${
            positive ? "text-green-500" : "text-red-500"
          }`}
        >
          {change} since last month
        </p>
      )}

      {progress && (
        <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
          <div className="bg-indigo-600 h-2 rounded-full w-[75.5%]"></div>
        </div>
      )}
    </div>
  );
};

export default StatCard;
