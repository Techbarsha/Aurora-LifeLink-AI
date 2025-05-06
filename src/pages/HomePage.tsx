import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, Heart, Droplets, Map, Calendar, FilePlus, Award } from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col space-y-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-800 transform -skew-y-6 -translate-y-20 z-0"></div>
        <div className="relative z-10 pt-20 pb-24 md:pt-28 md:pb-32">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-10 md:mb-0">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                  Empowering Lives Through AI-Driven Health
                </h1>
                <p className="text-xl text-red-100 mb-8">
                  Revolutionizing blood donation and early blood cancer detection with artificial intelligence.
                </p>
                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                  <Link to="/register" className="btn bg-white text-red-600 hover:bg-gray-100 font-bold">
                    Get Started
                  </Link>
                  <Link to="/learn-more" className="btn bg-transparent border-2 border-white text-white hover:bg-white hover:text-red-600 transition-colors">
                    Learn More
                  </Link>
                </div>
              </div>
              <div className="md:w-1/2 flex justify-center">
                <img 
                  src="https://images.pexels.com/photos/6823615/pexels-photo-6823615.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260" 
                  alt="Medical technology visualization" 
                  className="rounded-lg shadow-xl max-w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Key Features</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Aurora: LifeLink AI offers a comprehensive suite of tools to transform blood donation and health monitoring.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="card hover:shadow-lg group">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-red-600 transition-colors duration-300">
                <Activity className="text-red-600 group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-bold mb-3">AI Cancer Detection</h3>
              <p className="text-gray-600 mb-4">
                Early detection of blood-related cancers using machine learning algorithms on standard blood tests.
              </p>
              <Link to="/cancer-detection" className="text-red-600 font-medium hover:text-red-700 inline-flex items-center">
                Learn more
                <svg className="w-4 h-4 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {/* Feature 2 */}
            <div className="card hover:shadow-lg group">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-red-600 transition-colors duration-300">
                <Heart className="text-red-600 group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-bold mb-3">Donor Management</h3>
              <p className="text-gray-600 mb-4">
                Smart matching algorithm connects donors with recipients based on blood type, location, and urgency.
              </p>
              <Link to="/donor-management" className="text-red-600 font-medium hover:text-red-700 inline-flex items-center">
                Learn more
                <svg className="w-4 h-4 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {/* Feature 3 */}
            <div className="card hover:shadow-lg group">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-red-600 transition-colors duration-300">
                <Map className="text-red-600 group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-bold mb-3">Camp Locator</h3>
              <p className="text-gray-600 mb-4">
                Find nearby blood donation camps with interactive maps, filtering options, and real-time availability.
              </p>
              <Link to="/camp-locator" className="text-red-600 font-medium hover:text-red-700 inline-flex items-center">
                Learn more
                <svg className="w-4 h-4 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {/* Feature 4 */}
            <div className="card hover:shadow-lg group">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-red-600 transition-colors duration-300">
                <Calendar className="text-red-600 group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-bold mb-3">Appointment Scheduling</h3>
              <p className="text-gray-600 mb-4">
                Book donation slots at nearest blood banks or camps with automated reminders and confirmations.
              </p>
              <Link to="/appointments" className="text-red-600 font-medium hover:text-red-700 inline-flex items-center">
                Learn more
                <svg className="w-4 h-4 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {/* Feature 5 */}
            <div className="card hover:shadow-lg group">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-red-600 transition-colors duration-300">
                <Droplets className="text-red-600 group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-bold mb-3">Blood Request Management</h3>
              <p className="text-gray-600 mb-4">
                Hospitals and patients can request blood with automated matching to available donors and inventory.
              </p>
              <Link to="/blood-request" className="text-red-600 font-medium hover:text-red-700 inline-flex items-center">
                Learn more
                <svg className="w-4 h-4 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {/* Feature 6 */}
            <div className="card hover:shadow-lg group">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-red-600 transition-colors duration-300">
                <FilePlus className="text-red-600 group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-bold mb-3">Blood Stock Management</h3>
              <p className="text-gray-600 mb-4">
                Real-time inventory tracking with alerts for low stock, expiring units, and donation requirements.
              </p>
              <Link to="/blood-stock" className="text-red-600 font-medium hover:text-red-700 inline-flex items-center">
                Learn more
                <svg className="w-4 h-4 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Making a Difference</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform has helped save lives and improve blood donation efficiency across the country.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-md text-center">
              <div className="text-4xl font-bold text-red-600 mb-2">10,000+</div>
              <p className="text-gray-600">Blood Donations</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-md text-center">
              <div className="text-4xl font-bold text-red-600 mb-2">500+</div>
              <p className="text-gray-600">Hospitals Connected</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-md text-center">
              <div className="text-4xl font-bold text-red-600 mb-2">200+</div>
              <p className="text-gray-600">Blood Camps Organized</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-md text-center">
              <div className="text-4xl font-bold text-red-600 mb-2">95%</div>
              <p className="text-gray-600">AI Detection Accuracy</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What People Say</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear from our users, hospitals, and donation centers about the impact of Aurora: LifeLink AI.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="card">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-800 font-bold">
                  JD
                </div>
                <div className="ml-4">
                  <h4 className="font-bold">John Doe</h4>
                  <p className="text-gray-500 text-sm">Regular Donor</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "The app makes it so easy to find donation camps near me and schedule appointments. I've been donating regularly for the past year thanks to Aurora!"
              </p>
              <div className="mt-4 flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="card">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 font-bold">
                  SM
                </div>
                <div className="ml-4">
                  <h4 className="font-bold">Dr. Sarah Miller</h4>
                  <p className="text-gray-500 text-sm">City Hospital</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "The AI-based cancer detection has been revolutionary. We've been able to identify early signs in several patients who otherwise might have gone undiagnosed."
              </p>
              <div className="mt-4 flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="card">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-800 font-bold">
                  RP
                </div>
                <div className="ml-4">
                  <h4 className="font-bold">Robert Patel</h4>
                  <p className="text-gray-500 text-sm">Blood Bank Director</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "The inventory management system has streamlined our operations. We've reduced waste by 40% and improved our ability to respond to emergencies."
              </p>
              <div className="mt-4 flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-red-600 to-red-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Make a Difference?</h2>
          <p className="text-xl text-red-100 mb-8 max-w-3xl mx-auto">
            Join our platform today and be part of a revolution in blood donation and health monitoring. Every donation can save up to three lives.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
            <Link to="/register" className="btn bg-white text-red-600 hover:bg-gray-100 font-bold">
              Register Now
            </Link>
            <Link to="/learn-more" className="btn bg-transparent border-2 border-white hover:bg-white hover:text-red-600 transition-colors">
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;