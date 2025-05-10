import React from 'react';
import { Activity, Heart, Droplets, Map, Calendar, FileHeart, Award, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const services = [
  {
    icon: <Activity className="h-8 w-8 text-red-600" />,
    title: 'AI Cancer Detection',
    description: 'Early detection of blood-related cancers using advanced machine learning algorithms.',
    link: '/cancer-detection',
    features: [
      'Blood test analysis',
      'Risk assessment',
      'Early warning detection',
      'Detailed health reports'
    ]
  },
  {
    icon: <Heart className="h-8 w-8 text-red-600" />,
    title: 'Donor Management',
    description: 'Comprehensive donor tracking and management system for hospitals and blood banks.',
    link: '/donor-management',
    features: [
      'Donor profiles',
      'Donation history',
      'Health tracking',
      'Automated scheduling'
    ]
  },
  {
    icon: <Map className="h-8 w-8 text-red-600" />,
    title: 'Camp Locator',
    description: 'Find and organize blood donation camps in your area.',
    link: '/camp-locator',
    features: [
      'Interactive maps',
      'Real-time updates',
      'Registration system',
      'Camp analytics'
    ]
  },
  {
    icon: <Droplets className="h-8 w-8 text-red-600" />,
    title: 'Blood Request Management',
    description: 'Streamlined process for hospitals and patients to request blood.',
    link: '/blood-request',
    features: [
      'Emergency requests',
      'Priority management',
      'Status tracking',
      'Automated matching'
    ]
  },
  {
    icon: <Calendar className="h-8 w-8 text-red-600" />,
    title: 'Appointment Scheduling',
    description: 'Easy appointment booking system for donors and hospitals.',
    link: '/appointments',
    features: [
      'Online booking',
      'Reminders',
      'Calendar integration',
      'Flexible scheduling'
    ]
  },
  {
    icon: <FileHeart className="h-8 w-8 text-red-600" />,
    title: 'Blood Stock Management',
    description: 'Real-time inventory tracking and management for blood banks.',
    link: '/blood-stock',
    features: [
      'Inventory tracking',
      'Expiry management',
      'Usage analytics',
      'Demand forecasting'
    ]
  }
];

const ServicesPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Comprehensive solutions for blood donation management and early cancer detection
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {services.map((service, index) => (
          <div key={index} className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
            <div className="mb-6">{service.icon}</div>
            <h3 className="text-xl font-bold mb-3">{service.title}</h3>
            <p className="text-gray-600 mb-6">{service.description}</p>
            <ul className="space-y-3 mb-6">
              {service.features.map((feature, idx) => (
                <li key={idx} className="flex items-center text-gray-600">
                  <span className="w-2 h-2 bg-red-600 rounded-full mr-3"></span>
                  {feature}
                </li>
              ))}
            </ul>
            <Link
              to={service.link}
              className="inline-flex items-center text-red-600 font-medium hover:text-red-700"
            >
              Learn more
              <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>
        ))}
      </div>

      {/* Statistics Section */}
      <div className="bg-gradient-to-r from-red-600 to-red-800 rounded-xl p-12 text-white mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-4xl font-bold mb-2">10,000+</div>
            <div className="text-red-100">Blood Donations</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold mb-2">500+</div>
            <div className="text-red-100">Hospitals Connected</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold mb-2">200+</div>
            <div className="text-red-100">Blood Camps</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold mb-2">95%</div>
            <div className="text-red-100">Detection Accuracy</div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-600 font-bold">
                JD
              </div>
              <div className="ml-4">
                <h4 className="font-bold">John Doe</h4>
                <p className="text-gray-500">Regular Donor</p>
              </div>
            </div>
            <p className="text-gray-600 italic">
              "The app makes it incredibly easy to find donation camps and schedule appointments. I've been donating regularly thanks to Aurora!"
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                SM
              </div>
              <div className="ml-4">
                <h4 className="font-bold">Dr. Sarah Miller</h4>
                <p className="text-gray-500">Hospital Admin</p>
              </div>
            </div>
            <p className="text-gray-600 italic">
              "The blood stock management system has revolutionized how we handle inventory. Real-time tracking has improved our efficiency significantly."
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold">
                RK
              </div>
              <div className="ml-4">
                <h4 className="font-bold">Raj Kumar</h4>
                <p className="text-gray-500">Blood Bank Manager</p>
              </div>
            </div>
            <p className="text-gray-600 italic">
              "The AI-based cancer detection has been a game-changer. We've been able to identify early signs in several patients."
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
        <p className="text-gray-600 mb-8">Join our platform and be part of the life-saving community</p>
        <div className="flex justify-center space-x-4">
          <Link to="/register" className="btn btn-primary">
            Register Now
          </Link>
          <Link to="/contact" className="btn btn-outline">
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;