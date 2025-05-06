import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Activity, Menu, X, LogOut, User, Bell } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface NavbarProps {
  toggleSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header
      className={`sticky top-0 z-30 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and brand name */}
          <div className="flex items-center">
            {isAuthenticated && (
              <button
                onClick={toggleSidebar}
                className="mr-2 p-2 rounded-full hover:bg-gray-100 md:hidden"
                aria-label="Toggle sidebar"
              >
                <Menu size={24} />
              </button>
            )}
            <Link to="/" className="flex items-center">
              <Activity className="h-8 w-8 text-red-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">
                Aurora<span className="text-red-600">: LifeLink AI</span>
              </span>
            </Link>
          </div>

          {/* Navigation links - show on larger screens */}
          <nav className="hidden md:flex items-center space-x-6">
            {!isAuthenticated ? (
              <>
                <Link
                  to="/"
                  className="text-gray-700 hover:text-red-600 font-medium transition-colors"
                >
                  Home
                </Link>
                <Link
                  to="/about"
                  className="text-gray-700 hover:text-red-600 font-medium transition-colors"
                >
                  About
                </Link>
                <Link
                  to="/services"
                  className="text-gray-700 hover:text-red-600 font-medium transition-colors"
                >
                  Services
                </Link>
                <Link
                  to="/contact"
                  className="text-gray-700 hover:text-red-600 font-medium transition-colors"
                >
                  Contact
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/dashboard"
                  className="text-gray-700 hover:text-red-600 font-medium transition-colors"
                >
                  Dashboard
                </Link>
              </>
            )}
          </nav>

          {/* Auth buttons or user menu */}
          <div className="flex items-center">
            {!isAuthenticated ? (
              <div className="flex space-x-3">
                <Link to="/login" className="btn btn-outline text-sm">
                  Login
                </Link>
                <Link to="/register" className="btn btn-primary text-sm">
                  Sign Up
                </Link>
              </div>
            ) : (
              <div className="flex items-center space-x-3 relative">
                <button className="relative p-2 rounded-full hover:bg-gray-100">
                  <Bell size={20} />
                  <span className="absolute top-0 right-0 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                    3
                  </span>
                </button>
                
                <div className="relative">
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center space-x-2 focus:outline-none"
                  >
                    <div className="w-9 h-9 rounded-full bg-red-100 flex items-center justify-center text-red-800 font-medium">
                      {user?.name?.charAt(0) || 'U'}
                    </div>
                    <span className="hidden md:block font-medium text-sm">
                      {user?.name}
                    </span>
                  </button>

                  {/* Dropdown menu */}
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                        onClick={() => setDropdownOpen(false)}
                      >
                        <User size={16} className="mr-2" />
                        Profile
                      </Link>
                      <button
                        onClick={() => {
                          setDropdownOpen(false);
                          handleLogout();
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                      >
                        <LogOut size={16} className="mr-2" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;