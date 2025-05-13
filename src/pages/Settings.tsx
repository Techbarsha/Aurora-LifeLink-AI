import React, { useState } from 'react';

const Settings: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [email, setEmail] = useState('user@example.com');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      alert('Settings saved successfully!');
    }, 1500);
  };

  return (
    <div className={`min-h-screen p-6 max-w-4xl mx-auto transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className={`text-4xl font-bold mb-2 transition-colors duration-300 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
            Account Settings
          </h1>
          <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Manage your preferences and account details
          </p>
        </div>

        {/* Theme Section */}
        <div className={`p-6 rounded-xl shadow-lg transition-colors duration-300 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="flex items-center mb-4">
            <svg className={`w-6 h-6 mr-2 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707" />
            </svg>
            <h2 className={`text-xl font-semibold ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>Theme Preferences</h2>
          </div>
          <div className="flex items-center justify-between">
            <span className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {darkMode ? 'Dark Mode' : 'Light Mode'}
            </span>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`w-14 h-8 flex items-center rounded-full p-1 transition-colors duration-300 ${
                darkMode ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            >
              <div className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 ${
                darkMode ? 'translate-x-6' : 'translate-x-0'
              }`} />
            </button>
          </div>
        </div>

        {/* Notifications Section */}
        <div className={`p-6 rounded-xl shadow-lg transition-colors duration-300 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="flex items-center mb-4">
            <svg className={`w-6 h-6 mr-2 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <h2 className={`text-xl font-semibold ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>Notifications</h2>
          </div>
          <div className="flex items-center justify-between">
            <span className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Enable notifications
            </span>
            <button
              onClick={() => setNotifications(!notifications)}
              className={`w-14 h-8 flex items-center rounded-full p-1 transition-colors duration-300 ${
                notifications ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            >
              <div className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 ${
                notifications ? 'translate-x-6' : 'translate-x-0'
              }`} />
            </button>
          </div>
        </div>

        {/* Profile Section */}
        <div className={`p-6 rounded-xl shadow-lg transition-colors duration-300 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="flex items-center mb-4">
            <svg className={`w-6 h-6 mr-2 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <h2 className={`text-xl font-semibold ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>Profile Information</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Email Address
              </label>
              <input
                type="email"
                className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-colors duration-300 ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 focus:ring-blue-500 focus:border-blue-500 text-gray-100'
                    : 'bg-gray-50 border-gray-300 focus:ring-blue-500 focus:border-blue-500 text-gray-800'
                }`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className={`px-6 py-2.5 rounded-lg font-medium flex items-center transition-colors duration-300 ${
              isSaving 
                ? 'bg-blue-400 cursor-not-allowed'
                : darkMode 
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {isSaving && (
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            )}
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;