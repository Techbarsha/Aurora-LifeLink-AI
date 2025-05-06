import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  X, 
  Activity, 
  LayoutDashboard, 
  Droplets, 
  Users, 
  MapPin, 
  CalendarCheck, 
  FileHeart, 
  BarChart3, 
  Settings 
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface SidebarProps {
  isOpen: boolean;
  closeSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, closeSidebar }) => {
  const location = useLocation();
  const { user } = useAuth();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const menuItems = [
    {
      title: 'Dashboard',
      path: '/dashboard',
      icon: <LayoutDashboard size={20} />,
      roles: ['admin', 'donor', 'hospital', 'organizer']
    },
    {
      title: 'Cancer Detection',
      path: '/cancer-detection',
      icon: <Activity size={20} />,
      roles: ['admin', 'donor', 'hospital']
    },
    {
      title: 'Donor Management',
      path: '/donor-management',
      icon: <Users size={20} />,
      roles: ['admin', 'hospital']
    },
    {
      title: 'Blood Request',
      path: '/blood-request',
      icon: <Droplets size={20} />,
      roles: ['admin', 'donor', 'hospital']
    },
    {
      title: 'Camp Locator',
      path: '/camp-locator',
      icon: <MapPin size={20} />,
      roles: ['admin', 'donor', 'organizer']
    },
    {
      title: 'Appointments',
      path: '/appointments',
      icon: <CalendarCheck size={20} />,
      roles: ['admin', 'donor', 'hospital']
    },
    {
      title: 'Blood Stock',
      path: '/blood-stock',
      icon: <FileHeart size={20} />,
      roles: ['admin', 'hospital']
    },
    {
      title: 'Analytics',
      path: '/analytics',
      icon: <BarChart3 size={20} />,
      roles: ['admin', 'hospital', 'organizer']
    },
    {
      title: 'Settings',
      path: '/settings',
      icon: <Settings size={20} />,
      roles: ['admin', 'donor', 'hospital', 'organizer']
    }
  ];

  // Filter menu items based on user role
  const filteredMenuItems = menuItems.filter(item => 
    user && item.roles.includes(user.role)
  );

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={closeSidebar}
        ></div>
      )}
      
      {/* Sidebar */}
      <aside 
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-40 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0`}
      >
        {/* Sidebar header */}
        <div className="h-16 flex items-center justify-between px-4 border-b">
          <Link to="/" className="flex items-center">
            <Activity className="h-6 w-6 text-red-600" />
            <span className="ml-2 font-bold text-gray-900">Aurora LifeLink</span>
          </Link>
          <button 
            onClick={closeSidebar}
            className="p-1 rounded-full hover:bg-gray-100 md:hidden"
          >
            <X size={20} />
          </button>
        </div>
        
        {/* User info */}
        <div className="p-4 border-b">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-800 font-medium">
              {user?.name?.charAt(0) || 'U'}
            </div>
            <div className="ml-3">
              <p className="font-medium text-sm">{user?.name}</p>
              <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
            </div>
          </div>
        </div>
        
        {/* Menu items */}
        <nav className="mt-4 px-2">
          <ul className="space-y-1">
            {filteredMenuItems.map((item, index) => (
              <li key={index}>
                <Link
                  to={item.path}
                  className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                    isActive(item.path)
                      ? 'bg-red-100 text-red-800'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => {
                    if (window.innerWidth < 768) {
                      closeSidebar();
                    }
                  }}
                >
                  <span className="mr-3">{item.icon}</span>
                  <span>{item.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        
        {/* Version info */}
        <div className="absolute bottom-4 left-0 right-0 px-4">
          <p className="text-xs text-gray-500 text-center">Aurora: LifeLink AI v1.0.0</p>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;