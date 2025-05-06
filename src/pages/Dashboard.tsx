import React, { useState } from 'react';
import { 
  BarChart3, 
  Droplets, 
  Users, 
  CalendarCheck, 
  MapPin, 
  Activity, 
  FileHeart, 
  Bell, 
  Clock,
  Plus
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

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

const recentRequests = [
  { id: 'REQ001', patientName: 'John Smith', bloodType: 'O+', hospital: 'City Hospital', urgency: 'High', status: 'Pending' },
  { id: 'REQ002', patientName: 'Emily Johnson', bloodType: 'AB-', hospital: 'Metro Medical', urgency: 'Medium', status: 'Fulfilled' },
  { id: 'REQ003', patientName: 'Robert Brown', bloodType: 'B+', hospital: 'Central Clinic', urgency: 'Low', status: 'Fulfilled' },
  { id: 'REQ004', patientName: 'Sarah Wilson', bloodType: 'A+', hospital: 'City Hospital', urgency: 'High', status: 'Pending' },
];

const upcomingCamps = [
  { id: 'CAMP001', name: 'City Blood Drive', location: 'Central Park', date: '2025-06-15', slots: 50, registered: 32 },
  { id: 'CAMP002', name: 'University Donation Camp', location: 'State University', date: '2025-06-20', slots: 100, registered: 78 },
  { id: 'CAMP003', name: 'Corporate Blood Drive', location: 'Tech Park', date: '2025-06-25', slots: 80, registered: 45 },
];

const upcomingAppointments = [
  { id: 'APT001', center: 'City Blood Bank', date: '2025-06-12', time: '10:00 AM', status: 'Confirmed' },
  { id: 'APT002', center: 'Central Hospital', date: '2025-06-18', time: '2:30 PM', status: 'Pending' },
];

const notifications = [
  { id: 1, message: 'Your donation appointment has been confirmed', time: '2 hours ago', read: false },
  { id: 2, message: 'New blood donation camp announced near you', time: '1 day ago', read: true },
  { id: 3, message: 'Urgent request for O- blood type in your area', time: '2 days ago', read: false },
];

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [showAllNotifications, setShowAllNotifications] = useState(false);

  // Calculate the number of unread notifications
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="space-y-6">
      {/* Page heading */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user?.name}!</p>
        </div>
        <div className="relative">
          <button className="relative p-2 rounded-full hover:bg-gray-100">
            <Bell size={24} />
            {unreadCount > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total donations */}
        <div className="card bg-gradient-to-br from-red-50 to-white border border-red-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Donations</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">128</h3>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-600">
              <Droplets size={24} />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-green-600 text-sm font-medium flex items-center">
              <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 15l-6-6-6 6" />
              </svg>
              +12% from last month
            </span>
          </div>
        </div>

        {/* Lives impacted */}
        <div className="card bg-gradient-to-br from-blue-50 to-white border border-blue-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Lives Impacted</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">384</h3>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
              <Users size={24} />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-green-600 text-sm font-medium flex items-center">
              <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 15l-6-6-6 6" />
              </svg>
              +8% from last month
            </span>
          </div>
        </div>

        {/* Upcoming appointments */}
        <div className="card bg-gradient-to-br from-green-50 to-white border border-green-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Upcoming Appointments</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">2</h3>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600">
              <CalendarCheck size={24} />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-gray-600 text-sm font-medium">Next: Jun 12, 10:00 AM</span>
          </div>
        </div>

        {/* Nearby camps */}
        <div className="card bg-gradient-to-br from-purple-50 to-white border border-purple-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Nearby Camps</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">5</h3>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-600">
              <MapPin size={24} />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-gray-600 text-sm font-medium">Within 10 miles</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Blood inventory */}
        <div className="lg:col-span-2 card">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-gray-900">Blood Inventory Status</h2>
            <Link to="/blood-stock" className="text-sm text-red-600 hover:text-red-700 font-medium">View All</Link>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {bloodInventory.map((item) => (
              <div key={item.type} className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-lg font-bold text-gray-900">{item.type}</span>
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
                    style={{ width: `${Math.min(100, Math.round((item.current / item.target) * 100))}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  {item.current} of {item.target} units
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Notifications */}
        <div className="card">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-gray-900">Notifications</h2>
            <button 
              className="text-sm text-red-600 hover:text-red-700 font-medium"
              onClick={() => setShowAllNotifications(!showAllNotifications)}
            >
              {showAllNotifications ? 'Show Less' : 'View All'}
            </button>
          </div>
          <div className="space-y-4">
            {(showAllNotifications ? notifications : notifications.slice(0, 3)).map((notification) => (
              <div 
                key={notification.id} 
                className={`p-3 rounded-lg border ${notification.read ? 'border-gray-200 bg-white' : 'border-red-100 bg-red-50'}`}
              >
                <div className="flex items-start">
                  <div className={`p-1 mt-0.5 rounded-full ${notification.read ? 'bg-gray-100' : 'bg-red-100'}`}>
                    <Bell size={16} className={notification.read ? 'text-gray-500' : 'text-red-600'} />
                  </div>
                  <div className="ml-3">
                    <p className={`text-sm ${notification.read ? 'text-gray-600' : 'text-gray-900 font-medium'}`}>
                      {notification.message}
                    </p>
                    <span className="text-xs text-gray-500 flex items-center mt-1">
                      <Clock size={12} className="inline mr-1" />
                      {notification.time}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Blood requests */}
        <div className="card">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-gray-900">Recent Blood Requests</h2>
            <Link to="/blood-request" className="text-sm text-red-600 hover:text-red-700 font-medium">View All</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Blood</th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {recentRequests.slice(0, 4).map((request) => (
                  <tr key={request.id}>
                    <td className="px-3 py-2 whitespace-nowrap text-sm">
                      <span className="font-medium text-gray-900">{request.id}</span>
                      <div className="text-gray-500">{request.hospital}</div>
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">
                        {request.bloodType}
                      </span>
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        request.status === 'Pending' 
                          ? 'bg-yellow-100 text-yellow-800' 
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {request.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4">
            <button className="w-full btn btn-outline text-sm flex items-center justify-center">
              <Plus size={16} className="mr-1" />
              New Request
            </button>
          </div>
        </div>

        {/* Upcoming camps */}
        <div className="card">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-gray-900">Upcoming Camps</h2>
            <Link to="/camp-locator" className="text-sm text-red-600 hover:text-red-700 font-medium">View Map</Link>
          </div>
          <div className="space-y-3">
            {upcomingCamps.map((camp) => {
              const campDate = new Date(camp.date);
              const formattedDate = campDate.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              });
              
              return (
                <div key={camp.id} className="flex border border-gray-200 rounded-lg overflow-hidden">
                  <div className="w-16 bg-red-600 text-white flex flex-col items-center justify-center">
                    <span className="text-sm font-medium">{campDate.toLocaleDateString('en-US', { month: 'short' })}</span>
                    <span className="text-xl font-bold">{campDate.getDate()}</span>
                  </div>
                  <div className="p-3 flex-1">
                    <h3 className="font-medium text-gray-900">{camp.name}</h3>
                    <p className="text-sm text-gray-500 flex items-center">
                      <MapPin size={14} className="mr-1" />
                      {camp.location}
                    </p>
                    <div className="mt-2 flex justify-between items-center">
                      <span className="text-xs text-gray-500">{camp.registered}/{camp.slots} registered</span>
                      <button className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full font-medium">
                        Register
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Health insights */}
        <div className="card bg-gradient-to-br from-blue-50 to-white">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-gray-900">Health Insights</h2>
            <Link to="/cancer-detection" className="text-sm text-red-600 hover:text-red-700 font-medium">Check Now</Link>
          </div>
          <div className="mb-4">
            <div className="flex items-center justify-center h-48">
              <Activity size={64} className="text-blue-600" />
            </div>
            <div className="text-center">
              <h3 className="text-lg font-medium text-gray-900">AI Health Detection</h3>
              <p className="text-sm text-gray-600 mt-1">
                Upload your blood test reports for an AI-powered analysis that can detect early signs of blood-related conditions.
              </p>
            </div>
          </div>
          <div className="mt-4">
            <button className="w-full btn btn-secondary text-sm">Upload Health Report</button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper component for links
const Link = ({ to, className, children }: { to: string; className?: string; children: React.ReactNode }) => {
  return (
    <a href={to} className={className}>
      {children}
    </a>
  );
};

export default Dashboard;