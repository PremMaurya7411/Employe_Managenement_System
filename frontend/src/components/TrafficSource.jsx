const TrafficSource = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h3 className="font-semibold mb-6">Traffic Source</h3>

      <div className="flex justify-center">
        <div
          className="w-40 h-40 rounded-full relative"
          style={{
            background:
              "conic-gradient(#7c3aed 0% 63%, #f59e0b 63% 78%, #10b981 78% 100%)",
          }}
        >
          <div className="absolute inset-6 bg-white rounded-full"></div>
        </div>
      </div>

      <div className="flex justify-around mt-6 text-sm">
        <div className="text-center">
          <span className="block w-3 h-3 bg-indigo-600 rounded-full mx-auto mb-1"></span>
          Desktop<br />63%
        </div>
        <div className="text-center">
          <span className="block w-3 h-3 bg-yellow-500 rounded-full mx-auto mb-1"></span>
          Tablet<br />15%
        </div>
        <div className="text-center">
          <span className="block w-3 h-3 bg-green-500 rounded-full mx-auto mb-1"></span>
          Phone<br />22%
        </div>
      </div>
    </div>
  );
};

export default TrafficSource;
