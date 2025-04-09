const Overview = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-4 p-4">
      {/* Left Side - Calendar and Stats */}
      <div className="w-full lg:w-2/3 space-y-4">
        {/* Calendar Section */}
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
            <h2 className="text-lg font-semibold">Calendar</h2>
            <div className="flex gap-2 w-full sm:w-auto">
              <button className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm w-full sm:w-auto">
                Add Event
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded-md text-sm w-full sm:w-auto">
                View All
              </button>
            </div>
          </div>
          <div className="h-[400px]">
            <FullCalendar />
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-sm font-medium text-gray-500">Total Applications</h3>
            <p className="text-2xl font-bold">1,234</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-sm font-medium text-gray-500">Pending Applications</h3>
            <p className="text-2xl font-bold">56</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-sm font-medium text-gray-500">Approved Applications</h3>
            <p className="text-2xl font-bold">1,178</p>
          </div>
        </div>
      </div>

      {/* Right Side - Recent Activity */}
      <div className="w-full lg:w-1/3">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Recent Activity</h2>
            <button className="text-blue-600 text-sm">View All</button>
          </div>
          <div className="space-y-4">
            {/* Activity Items */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium">New application submitted</p>
                <p className="text-xs text-gray-500">2 hours ago</p>
              </div>
            </div>
            {/* ... more activity items ... */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview; 