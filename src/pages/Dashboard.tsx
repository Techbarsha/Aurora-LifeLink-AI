import React, { useState } from 'react';
import { 
  Droplets, 
  Users, 
  CalendarCheck, 
  MapPin,
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

// Mock data for dashboard
const bloodInventory = [
  { type: 'A+', current: 25, target: 30 },
  { type: 'A-', current: 10, target: 20 },
  { type: 'B+', current: 15, target: 25 },
  { type: 'B-', current: 5, target: 15 },
  { type: 'AB+', current: 12, target: 15 },
  { type: 'AB-', current: 3, target: 10 },
  { type: 'O+', current: 30, target: 40 },
  { type: 'O-', current: 8, target: 20 },
];

const notifications = [
  { id: 1, message: 'Your donation appointment has been confirmed', time: '2 hours ago', read: false },
  { id: 2, message: 'New blood donation camp announced near you', time: '1 day ago', read: true },
  { id: 3, message: 'Urgent request for O- blood type in your area', time: '2 days ago', read: false },
];

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [showAllNotifications, setShowAllNotifications] = useState(false);
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user?.name}!</p>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Donations */}
        <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Donations</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">128</h3>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-600">
              <Droplets size={24} />
            </div>
          </div>
          <div className="mt-4 text-green-600 text-sm font-medium flex items-center">
            <span className="mr-1">↑</span>
            +12% from last month
          </div>
        </div>

        {/* Lives Impacted */}
        <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Lives Impacted</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">384</h3>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
              <Users size={24} />
            </div>
          </div>
          <div className="mt-4 text-green-600 text-sm font-medium flex items-center">
            <span className="mr-1">↑</span>
            +8% from last month
          </div>
        </div>

        {/* Appointments */}
        <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Upcoming Appointments</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">2</h3>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600">
              <CalendarCheck size={24} />
            </div>
          </div>
          <div className="mt-4 text-gray-600 text-sm font-medium">Next: Jun 12, 10:00 AM</div>
        </div>

        {/* Nearby Camps */}
        <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Nearby Camps</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">5</h3>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-600">
              <MapPin size={24} />
            </div>
          </div>
          <div className="mt-4 text-gray-600 text-sm font-medium">Within 10 miles</div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Blood Inventory Section */}
        <div className="lg:col-span-2 p-6 bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-gray-900">Blood Inventory Status</h2>
            <Link to="/blood-stock" className="text-sm text-red-600 hover:text-red-700 font-medium">
              View All
            </Link>
          </div>

          {/* Blood Type Progress Bars */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {bloodInventory.map((item) => (
              <div key={item.type} className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between mb-2">
                  <span className="font-semibold">{item.type}</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    item.current < item.target * 0.3
                      ? 'bg-red-100 text-red-800'
                      : item.current < item.target * 0.7
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {Math.round((item.current / item.target) * 100)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className={`h-2.5 rounded-full ${
                      item.current < item.target * 0.3
                        ? 'bg-red-600'
                        : item.current < item.target * 0.7
                        ? 'bg-yellow-500'
                        : 'bg-green-600'
                    }`}
                    style={{ width: `${(item.current / item.target) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Blood Inventory Chart */}
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={bloodInventory} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <XAxis 
                  dataKey="type" 
                  stroke="#6b7280" 
                  fontSize={12}
                />
                <YAxis 
                  stroke="#6b7280" 
                  fontSize={12}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '6px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                  }}
                />
                <Legend 
                  wrapperStyle={{ paddingTop: '10px' }}
                  formatter={(value) => (
                    <span className="text-gray-600 text-sm">{value}</span>
                  )}
                />
                <Bar 
                  dataKey="current" 
                  name="Current Units" 
                  fill="#ef4444"
                  radius={[4, 4, 0, 0]}
                />
                <Bar 
                  dataKey="target" 
                  name="Target Units" 
                  fill="#94a3b8"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Notifications Section */}
        <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-gray-900">Notifications</h2>
            <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs">
              {unreadCount} new
            </span>
          </div>
          
          <ul className="space-y-3 max-h-96 overflow-auto">
            {(showAllNotifications ? notifications : notifications.slice(0, 3)).map(n => (
              <li 
                key={n.id} 
                className={`p-3 rounded-lg transition-colors ${
                  n.read ? 'bg-gray-50' : 'bg-yellow-50 border border-yellow-200'
                }`}
              >
                <p className="text-sm text-gray-800 font-medium">{n.message}</p>
                <span className="text-xs text-gray-500 mt-1 block">{n.time}</span>
              </li>
            ))}
          </ul>
          
          <button
            className="w-full mt-4 text-center text-blue-600 hover:text-blue-700 text-sm font-medium"
            onClick={() => setShowAllNotifications(!showAllNotifications)}
          >
            {showAllNotifications ? 'Show Less' : 'Show All'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;