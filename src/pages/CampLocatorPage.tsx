import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import { MapPin, Loader2, Navigation } from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

type BloodBank = {
  id: number;
  name: string;
  lat: number;
  lon: number;
  address?: string;
  operator?: string;
  distance?: number;
};

const LocationMarker = ({ onLocationChange }: { onLocationChange: (lat: number, lon: number) => void }) => {
  useMapEvents({
    click(e) {
      onLocationChange(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
};

const CampLocatorPage = () => {
  const [bloodBanks, setBloodBanks] = useState<BloodBank[]>([]);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [radius, setRadius] = useState<number>(5); // Default to 5 km
  const [mapCenter, setMapCenter] = useState<[number, number]>([20.5937, 78.9629]);

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // Earth radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  };

  const fetchBloodBanks = async (lat: number, lon: number) => {
    setLoading(true);
    setError(null);
    try {
      const radiusMeters = radius * 1000;
      const overpassQuery = `[out:json][timeout:30];
        (
          node["amenity"="blood_bank"](around:${radiusMeters},${lat},${lon});
          node["healthcare"="blood_donation"](around:${radiusMeters},${lat},${lon});
          way["amenity"="blood_bank"](around:${radiusMeters},${lat},${lon});
          way["healthcare"="blood_donation"](around:${radiusMeters},${lat},${lon});
          relation["amenity"="blood_bank"](around:${radiusMeters},${lat},${lon});
          relation["healthcare"="blood_donation"](around:${radiusMeters},${lat},${lon});
        );
        out center;`;
      
      const response = await fetch(
        `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(overpassQuery)}`
      );
      
      if (!response.ok) throw new Error('Failed to fetch blood banks');
      
      const data = await response.json();
      
      const processElements = (elements: any[]) => elements
        .map((element) => ({
          id: element.id,
          name: element.tags?.name || 'Unnamed Blood Bank',
          lat: element.lat || element.center?.lat,
          lon: element.lon || element.center?.lon,
          address: element.tags?.['addr:full'] || element.tags?.['addr:street'],
          operator: element.tags?.operator,
          distance: userLocation ? calculateDistance(lat, lon, element.lat, element.lon) : undefined,
        }))
        .filter((bank) => 
          bank.lat && bank.lon &&
          Math.abs(bank.lat) <= 90 && 
          Math.abs(bank.lon) <= 180
        )
        .sort((a, b) => (a.distance || Infinity) - (b.distance || Infinity));

      const banks = processElements(data.elements);
      
      setBloodBanks(banks);
      setMapCenter([lat, lon]);
      
      if (banks.length === 0) {
        setError('No blood banks found within selected radius. Try increasing search distance.');
      }
    } catch (error) {
      setError('Unable to load data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setError('Please enter a location');
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&addressdetails=1`
      );
      
      const locationData = await response.json();
      const validResult = locationData.find((item: any) => 
        item.lat && item.lon && (item.type === 'city' || item.type === 'town' || item.class === 'boundary')
      );

      if (!validResult) {
        setError('Location not found. Try format: "City, State/Country"');
        return;
      }

      const newLocation: [number, number] = [
        parseFloat(validResult.lat),
        parseFloat(validResult.lon)
      ];
      
      setUserLocation(newLocation);
      await fetchBloodBanks(...newLocation);
    } catch (error) {
      setError('Search service unavailable. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleMapClick = async (lat: number, lon: number) => {
    setUserLocation([lat, lon]);
    await fetchBloodBanks(lat, lon);
  };

  useEffect(() => {
    if (userLocation) {
      fetchBloodBanks(...userLocation);
    }
  }, [radius]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <Navigation className="h-6 w-6 text-red-600" />
        <h1 className="text-3xl font-bold text-gray-900">Blood Bank Finder</h1>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Search Location</h2>
          <div className="flex flex-col gap-4 mb-4">
            <div className="flex gap-4">
              <input
                type="text"
                placeholder="Enter city or address (e.g., 'Haringhata, India')"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
              <select
                className="px-4 py-2 border border-gray-300 rounded-md"
                value={radius}
                onChange={(e) => setRadius(Number(e.target.value))}
              >
                <option value={1.5}>1.5 km</option>
                <option value={5}>5 km</option>
                <option value={10}>10 km</option>
                <option value={25}>25 km</option>
                <option value={50}>50 km</option>
              </select>
              <button 
                className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors disabled:bg-red-300"
                onClick={handleSearch}
                disabled={loading}
              >
                {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Search'}
              </button>
            </div>
            
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}
          </div>
        </div>

        {bloodBanks.length > 0 && (
          <div className="space-y-4">
            {bloodBanks.map((bank) => (
              <div
                key={bank.id}
                className="p-4 border border-gray-200 rounded-lg hover:border-red-500 transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{bank.name}</h3>
                    {bank.operator && <p className="text-sm text-gray-600 mt-1">{bank.operator}</p>}
                    {bank.address && <p className="text-gray-600 mt-2">{bank.address}</p>}
                  </div>
                  {bank.distance && (
                    <span className="text-sm bg-red-100 text-red-600 px-2 py-1 rounded">
                      {bank.distance.toFixed(1)} km
                    </span>
                  )}
                </div>
                <div className="mt-3 flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    {bank.lat.toFixed(4)}, {bank.lon.toFixed(4)}
                  </span>
                  <a
                    href={`https://www.openstreetmap.org/?mlat=${bank.lat}&mlon=${bank.lon}#map=16/${bank.lat}/${bank.lon}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-red-600 hover:text-red-700 font-medium"
                  >
                    View on Map
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Interactive Map</h2>
        <MapContainer 
          center={mapCenter}
          zoom={radius > 50 ? 10 : radius > 25 ? 12 : 14}
          style={{ height: '500px', width: '100%' }}
          key={`${mapCenter[0]}-${mapCenter[1]}-${bloodBanks.length}`}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LocationMarker onLocationChange={handleMapClick} />
          
          {userLocation && (
            <Marker position={userLocation}>
              <Popup className="font-semibold text-red-600">
                Search Center <br />
                ({userLocation[0].toFixed(4)}, {userLocation[1].toFixed(4)})
              </Popup>
            </Marker>
          )}

          {bloodBanks.map((bank) => (
            <Marker key={bank.id} position={[bank.lat, bank.lon]}>
              <Popup>
                <div className="space-y-1">
                  <h3 className="font-semibold">{bank.name}</h3>
                  {bank.operator && <p>{bank.operator}</p>}
                  {bank.address && <p className="text-sm">{bank.address}</p>}
                  {bank.distance && <p className="text-red-600">Distance: {bank.distance.toFixed(1)} km</p>}
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default CampLocatorPage;