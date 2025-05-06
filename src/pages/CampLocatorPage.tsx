import React from 'react';
import { MapPin } from 'lucide-react';

const CampLocatorPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <MapPin className="h-6 w-6 text-red-600" />
        <h1 className="text-3xl font-bold text-gray-900">Blood Donation Camp Locator</h1>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Find Blood Donation Camps Near You</h2>
          <div className="flex gap-4 mb-4">
            <input
              type="text"
              placeholder="Enter your location"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
            <button className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors">
              Search
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <div className="p-4 border border-gray-200 rounded-lg hover:border-red-500 transition-colors">
            <h3 className="text-lg font-semibold text-gray-800">City General Hospital Blood Bank</h3>
            <p className="text-gray-600 mt-2">123 Healthcare Avenue, Downtown</p>
            <div className="mt-3 flex justify-between items-center">
              <span className="text-sm text-gray-500">Open: 9:00 AM - 5:00 PM</span>
              <button className="text-red-600 hover:text-red-700 font-medium">
                Get Directions
              </button>
            </div>
          </div>

          <div className="p-4 border border-gray-200 rounded-lg hover:border-red-500 transition-colors">
            <h3 className="text-lg font-semibold text-gray-800">Community Blood Center</h3>
            <p className="text-gray-600 mt-2">456 Medical Park, Uptown</p>
            <div className="mt-3 flex justify-between items-center">
              <span className="text-sm text-gray-500">Open: 8:00 AM - 6:00 PM</span>
              <button className="text-red-600 hover:text-red-700 font-medium">
                Get Directions
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampLocatorPage;