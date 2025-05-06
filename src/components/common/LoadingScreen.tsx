import React from 'react';
import { ActivitySquare } from 'lucide-react';

const LoadingScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-90 z-50">
      <div className="flex flex-col items-center">
        <ActivitySquare size={48} className="text-red-600 animate-pulse" />
        <h2 className="mt-4 text-xl font-medium text-gray-700">Loading...</h2>
      </div>
    </div>
  );
};

export default LoadingScreen;