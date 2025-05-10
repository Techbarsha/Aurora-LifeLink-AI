import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { MapPin } from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const CampLocatorPage = () => {
  const bloodBanks = [
    {
      name: 'City General Hospital Blood Bank',
      address: '123 Healthcare Avenue, Downtown',
      time: 'Open: 9:00 AM - 5:00 PM',
      lat: 21.84,
      lng: 82.79,
    },
    {
      name: 'Community Blood Center',
      address: '456 Medical Park, Uptown',
      time: 'Open: 8:00 AM - 6:00 PM',
      lat: 21.50,
      lng: 82.60,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <MapPin className="h-6 w-6 text-red-600" />
        <h1 className="text-3xl font-bold text-gray-900">Blood Donation Camp Locator</h1>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
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
          {bloodBanks.map((bank, index) => (
            <div
              key={index}
              className="p-4 border border-gray-200 rounded-lg hover:border-red-500 transition-colors"
            >
              <h3 className="text-lg font-semibold text-gray-800">{bank.name}</h3>
              <p className="text-gray-600 mt-2">{bank.address}</p>
              <div className="mt-3 flex justify-between items-center">
                <span className="text-sm text-gray-500">{bank.time}</span>
                <a
                  href={`https://www.openstreetmap.org/?mlat=${bank.lat}&mlon=${bank.lng}#map=16/${bank.lat}/${bank.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-600 hover:text-red-700 font-medium"
                >
                  Get Directions
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Map View</h2>
        <MapContainer center={[21.84, 82.79]} zoom={6} style={{ height: '400px', width: '100%' }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {bloodBanks.map((bank, index) => (
            <Marker key={index} position={[bank.lat, bank.lng]}>
              <Popup>
                <strong>{bank.name}</strong><br />
                {bank.address}<br />
                {bank.time}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default CampLocatorPage;
