import React, { useState, useEffect } from 'react';
import { Award, Gift, Trophy, Star, Users, Target } from 'lucide-react';

const RewardsPage: React.FC = () => {
  const userPoints = 750;
  const nextTier = 1000;
  
  // Initial static data for demonstration
  const initialLeaderboard = [
    { name: 'Barsha Saha', points: 1200, donations: 12 },
    { name: 'Jane Smith', points: 1100, donations: 11 },
    { name: 'Robert Johnson', points: 950, donations: 9 },
    { name: 'Emily Brown', points: 900, donations: 9 },
    { name: 'Michael Wilson', points: 850, donations: 8 },
    { name: 'John Doe', points: 800, donations: 8 }, // Added Barsha Saha
    { name: 'Alex Turner', points: 780, donations: 7 },
    { name: 'Sarah Williams', points: 750, donations: 7 },
    { name: 'Raj Patel', points: 720, donations: 6 },
    { name: 'Linda Chen', points: 700, donations: 6 },
  ];

  const [leaderboard, setLeaderboard] = useState(initialLeaderboard);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Simulate live data updates
  useEffect(() => {
    const updateLeaderboard = () => {
      setLeaderboard(prev => {
        // Generate new data with random increments
        const updated = prev.map(donor => ({
          ...donor,
          points: donor.points + Math.floor(Math.random() * 50) + 10,
          donations: donor.donations + (Math.random() > 0.7 ? 1 : 0),
        }));
        
        // Sort by points descending
        return updated.sort((a, b) => b.points - a.points);
      });
      setLastUpdated(new Date());
    };

    // Update immediately on mount and then every 15 minutes
    updateLeaderboard();
    const interval = setInterval(updateLeaderboard, 900000); // 15 minutes in milliseconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* ... (other sections remain unchanged) */}

      {/* Live Leaderboard */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Live Top Donors Leaderboard
        </h2>
        <p className="text-gray-600 mb-6 text-sm">
          Updated every 15 minutes • Last updated at {lastUpdated.toLocaleTimeString()}
        </p>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4">Rank</th>
                <th className="text-left py-3 px-4">Donor</th>
                <th className="text-left py-3 px-4">Points</th>
                <th className="text-left py-3 px-4">Donations</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((donor, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">
                    {index === 0 && <Trophy className="w-5 h-5 text-yellow-500" />}
                    {index === 1 && <Trophy className="w-5 h-5 text-gray-400" />}
                    {index === 2 && <Trophy className="w-5 h-5 text-amber-700" />}
                    {index > 2 && `#${index + 1}`}
                  </td>
                  <td className="py-3 px-4 font-medium">{donor.name}</td>
                  <td className="py-3 px-4">{donor.points}</td>
                  <td className="py-3 px-4">{donor.donations} donations</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

     {/* How to Earn Points */}
      <div className="mt-12 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">How to Earn Points</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <Gift className="w-5 h-5 text-red-600" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Blood Donation</h3>
            <p className="text-gray-600">100 points per donation</p>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <Users className="w-5 h-5 text-red-600" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Referrals</h3>
            <p className="text-gray-600">50 points per successful referral</p>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <Target className="w-5 h-5 text-red-600" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Camp Participation</h3>
            <p className="text-gray-600">75 points per camp attendance</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RewardsPage;