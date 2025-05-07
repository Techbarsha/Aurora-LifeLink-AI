// src/pages/About.tsx
import React from 'react';

const About: React.FC = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-red-700">About Aurora: LifeLink AI</h1>
      <p className="text-gray-700 text-lg mb-4">
        <strong>Aurora: LifeLink AI</strong> is an AI-powered Blood Cancer Detection & Donation Platform designed to revolutionize healthcare and community-driven blood donation efforts. Our goal is to bridge the gap between donors, hospitals, blood banks, and recipients.
      </p>
      <p className="text-gray-700 text-lg mb-4">
        From intelligent blood inventory monitoring to predictive analytics for cancer detection, Aurora integrates real-time data, AI insights, and secure systems to ensure every drop counts.
      </p>
      <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-2">Key Features:</h2>
      <ul className="list-disc pl-6 text-gray-700 text-lg space-y-2">
        <li>AI-based blood cancer risk detection tool</li>
        <li>Real-time blood inventory monitoring</li>
        <li>Donation camp locator & appointment booking</li>
        <li>Hospital request management</li>
        <li>Secure admin dashboards for managing operations</li>
        <li>Instant alerts & notifications for urgent needs</li>
      </ul>
      <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-2">Our Mission:</h2>
      <p className="text-gray-700 text-lg">
        To save lives through technology, compassion, and innovation. We believe in a world where no life is lost due to the unavailability of blood or delayed diagnosis.
      </p>
    </div>
  );
};

export default About;
