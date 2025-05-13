import React from 'react';
import { Award, Gift, Trophy, Star, Users, Target } from 'lucide-react';

const RewardsPage: React.FC = () => {
  const userPoints = 750; // This would come from the user's data
  const nextTier = 1000;
  
  const rewards = [
    {
      id: 1,
      title: 'First Time Donor',
      description: 'Complete your first blood donation',
      points: 100,
      icon: <Gift className="w-6 h-6 text-red-600" />,
      achieved: true,
    },
    {
      id: 2,
      title: 'Regular Donor',
      description: 'Donate blood 3 times in 6 months',
      points: 300,
      icon: <Trophy className="w-6 h-6 text-red-600" />,
      achieved: true,
    },
    {
      id: 3,
      title: 'Life Saver',
      description: 'Help save 10 lives through donations',
      points: 500,
      icon: <Award className="w-6 h-6 text-red-600" />,
      achieved: false,
    },
    {
      id: 4,
      title: 'Community Champion',
      description: 'Refer 5 new donors',
      points: 250,
      icon: <Users className="w-6 h-6 text-red-600" />,
      achieved: true,
    },
  ];

  const leaderboard = [
    { name: 'John Doe', points: 1200, donations: 12 },
    { name: 'Jane Smith', points: 1100, donations: 11 },
    { name: 'Robert Johnson', points: 950, donations: 9 },
    { name: 'Emily Brown', points: 900, donations: 9 },
    { name: 'Michael Wilson', points: 850, donations: 8 },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Rewards & Recognition</h1>
        <p className="text-gray-600">Earn points and recognition for your contributions to the community.</p>
      </div>

      {/* Points Overview */}
      <div className="bg-gradient-to-r from-red-600 to-red-800 rounded-xl p-6 text-white mb-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold mb-2">Your Points: {userPoints}</h2>
            <p className="text-red-100">Next tier at {nextTier} points</p>
          </div>
          <div className="mt-4 md:mt-0">
            <div className="w-64 h-3 bg-red-900 rounded-full">
              <div 
                className="h-3 bg-white rounded-full"
                style={{ width: `${(userPoints / nextTier) * 100}%` }}
              ></div>
            </div>
            <p className="text-sm text-red-100 mt-2 text-center">
              {nextTier - userPoints} points to next tier
            </p>
          </div>
        </div>
      </div>

      {/* Achievements Grid */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Achievements</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {rewards.map((reward) => (
            <div
              key={reward.id}
              className={`p-6 rounded-lg border-2 ${
                reward.achieved
                  ? 'border-red-500 bg-red-50'
                  : 'border-gray-200 bg-white'
              }`}
            >
              <div className="flex items-center mb-4">
                {reward.icon}
                <span className="ml-2 font-semibold">{reward.points} pts</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">{reward.title}</h3>
              <p className="text-sm text-gray-600">{reward.description}</p>
              {reward.achieved && (
                <div className="mt-4 flex items-center text-green-600">
                  <Star className="w-4 h-4 mr-1" />
                  <span className="text-sm font-medium">Achieved</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Leaderboard */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Top Donors Leaderboard</h2>
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