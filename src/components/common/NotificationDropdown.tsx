import React, { useState, useEffect, useRef } from 'react';
import { Bell } from 'lucide-react';
import { format } from 'date-fns';

interface Notification {
  id: number;
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  type: 'info' | 'success' | 'warning' | 'error';
}

const NotificationDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      title: 'New Blood Request',
      message: 'Memorial Hospital urgently needs A+ blood.',
      timestamp: new Date(),
      read: false,
      type: 'warning'
    },
    {
      id: 2,
      title: 'Blood Camp Update',
      message: 'Downtown camp has been scheduled for tomorrow.',
      timestamp: new Date(Date.now() - 3600000),
      read: false,
      type: 'info'
    },
    {
      id: 3,
      title: 'Donor Achievement',
      message: "Congratulations! You've earned Gold Donor badge.",
      timestamp: new Date(Date.now() - 7200000),
      read: false,
      type: 'success'
    },
    {
      id: 4,
      title: 'System Update',
      message: 'Aurora platform has new cancer detection features.',
      timestamp: new Date(Date.now() - 86400000),
      read: true,
      type: 'info'
    }
  ]);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(n =>
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const getTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - timestamp.getTime()) / 60000);

    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} hours ago`;
    return format(timestamp, 'MMM d, yyyy');
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return 'bg-yellow-100 text-yellow-800';
      case 'success':
        return 'bg-green-100 text-green-800';
      case 'error':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-full hover:bg-gray-100 focus:outline-none"
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg overflow-hidden z-50">
          <div className="p-4 border-b">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">Notifications</h3>
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-sm text-red-600 hover:text-red-700"
                >
                  Mark all as read
                </button>
              )}
            </div>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {notifications.map(notification => (
              <div
                key={notification.id}
                className={`p-4 border-b hover:bg-gray-50 cursor-pointer ${
                  !notification.read ? 'bg-gray-50' : ''
                }`}
                onClick={() => markAsRead(notification.id)}
              >
                <div className="flex items-start">
                  <div className={`w-2 h-2 mt-2 rounded-full ${getNotificationIcon(notification.type)}`} />
                  <div className="ml-3 flex-1">
                    <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                    <p className="text-sm text-gray-600">{notification.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{getTimeAgo(notification.timestamp)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t">
            <button
              onClick={() => setIsOpen(false)}
              className="text-sm text-center text-gray-600 hover:text-gray-900 w-full"
            >
              View all notifications
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;