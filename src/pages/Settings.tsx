import React, { useState } from 'react';

const Settings: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [email, setEmail] = useState('user@example.com');

  const handleSave = () => {
    alert('Settings saved!');
    // Ideally, send this data to backend or localStorage
  };

  return (
    <div className="p-6 max-w-4xl mx-auto text-gray-800 dark:text-gray-200">
      <h1 className="text-3xl font-bold mb-4 text-blue-700 dark:text-blue-300">Settings</h1>

      {/* Theme Section */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold mb-2">Theme Preferences</h2>
        <label className="flex items-center space-x-3">
          <input
            type="checkbox"
            className="toggle-checkbox"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
          />
          <span>{darkMode ? 'Dark Mode Enabled' : 'Light Mode Enabled'}</span>
        </label>
      </div>

      {/* Notifications Section */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold mb-2">Notifications</h2>
        <label className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={notifications}
            onChange={() => setNotifications(!notifications)}
            className="toggle-checkbox"
          />
          <span>{notifications ? 'Notifications On' : 'Notifications Off'}</span>
        </label>
      </div>

      {/* Profile Section */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold mb-2">Profile Settings</h2>
        <label className="block mb-2">
          <span className="text-sm">Email:</span>
          <input
            type="email"
            className="w-full p-2 mt-1 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
      </div>

      <button
        onClick={handleSave}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow"
      >
        Save Changes
      </button>
    </div>
  );
};

export default Settings;
