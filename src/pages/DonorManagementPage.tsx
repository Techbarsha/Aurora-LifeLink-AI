import React, { useState } from 'react';
import { Users, UserPlus, Filter, Search, MoreVertical, Download, Trash2, Edit, Mail, Phone, Activity, Droplets } from 'lucide-react';

interface Donor {
  id: string;
  name: string;
  email: string;
  phone: string;
  bloodType: string;
  lastDonation: string;
  status: 'Active' | 'Inactive' | 'Pending';
  totalDonations: number;
  nextEligibleDate: string;
  address: string;
}

const DonorManagementPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDonor, setSelectedDonor] = useState<Donor | null>(null);
  const [showAddDonor, setShowAddDonor] = useState(false);
  const [filterBloodType, setFilterBloodType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  // Mock donor data
  const donors: Donor[] = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+1 234-567-8900',
      bloodType: 'O+',
      lastDonation: '2025-02-15',
      status: 'Active',
      totalDonations: 5,
      nextEligibleDate: '2025-05-15',
      address: '123 Main St, City, State'
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '+1 234-567-8901',
      bloodType: 'A-',
      lastDonation: '2025-01-20',
      status: 'Inactive',
      totalDonations: 3,
      nextEligibleDate: '2025-04-20',
      address: '456 Oak Ave, City, State'
    },
    {
      id: '3',
      name: 'Robert Johnson',
      email: 'robert@example.com',
      phone: '+1 234-567-8902',
      bloodType: 'B+',
      lastDonation: '2025-03-01',
      status: 'Pending',
      totalDonations: 0,
      nextEligibleDate: '2025-06-01',
      address: '789 Pine St, City, State'
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Inactive':
        return 'bg-red-100 text-red-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredDonors = donors.filter(donor => {
    const matchesSearch = donor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         donor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         donor.bloodType.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesBloodType = filterBloodType === 'all' || donor.bloodType === filterBloodType;
    const matchesStatus = filterStatus === 'all' || donor.status === filterStatus;

    return matchesSearch && matchesBloodType && matchesStatus;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Donor Management</h1>
          <p className="text-gray-600">Manage and track blood donors</p>
        </div>
        <div className="mt-4 md:mt-0">
          <button
            onClick={() => setShowAddDonor(true)}
            className="btn btn-primary"
          >
            <UserPlus className="w-5 h-5 mr-2" />
            Add New Donor
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">Total Donors</h3>
              <p className="text-2xl font-bold text-blue-600">156</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <Activity className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">Active Donors</h3>
              <p className="text-2xl font-bold text-green-600">89</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <Droplets className="w-6 h-6 text-red-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">This Month</h3>
              <p className="text-2xl font-bold text-red-600">24</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <Activity className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">Eligible Soon</h3>
              <p className="text-2xl font-bold text-purple-600">12</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search donors..."
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex flex-wrap gap-4">
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              value={filterBloodType}
              onChange={(e) => setFilterBloodType(e.target.value)}
            >
              <option value="all">All Blood Types</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>

            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Pending">Pending</option>
            </select>

            <button className="btn btn-outline">
              <Filter className="w-5 h-5 mr-2" />
              More Filters
            </button>

            <button className="btn btn-outline">
              <Download className="w-5 h-5 mr-2" />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Donors Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Donor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Blood Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Donation
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Donations
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Next Eligible
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredDonors.map((donor) => (
                <tr key={donor.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-red-100 rounded-full flex items-center justify-center">
                        <span className="text-red-600 font-medium">{donor.name.charAt(0)}</span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{donor.name}</div>
                        <div className="text-sm text-gray-500">{donor.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                      {donor.bloodType}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(donor.lastDonation).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(donor.status)}`}>
                      {donor.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {donor.totalDonations}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(donor.nextEligibleDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => setSelectedDonor(donor)}
                      className="text-red-600 hover:text-red-800 mr-4"
                    >
                      View Details
                    </button>
                    <button className="text-gray-600 hover:text-gray-800">
                      <MoreVertical size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Donor Details Modal */}
      {selectedDonor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-2xl mx-4">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Donor Details</h2>
                <button
                  onClick={() => setSelectedDonor(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <Trash2 className="w-6 h-6" />
                </button>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-center">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center text-red-600 text-2xl font-bold">
                    {selectedDonor.name.charAt(0)}
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-bold text-gray-900">{selectedDonor.name}</h3>
                    <p className="text-gray-600">ID: {selectedDonor.id}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Contact Information</h4>
                    <div className="mt-2 space-y-2">
                      <p className="flex items-center text-gray-800">
                        <Mail size={16} className="mr-2" />
                        {selectedDonor.email}
                      </p>
                      <p className="flex items-center text-gray-800">
                        <Phone size={16} className="mr-2" />
                        {selectedDonor.phone}
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Donation Status</h4>
                    <div className="mt-2">
                      <span className={`px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full ${getStatusColor(selectedDonor.status)}`}>
                        {selectedDonor.status}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Blood Type</h4>
                    <p className="mt-2 text-gray-800">{selectedDonor.bloodType}</p>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Total Donations</h4>
                    <p className="mt-2 text-gray-800">{selectedDonor.totalDonations}</p>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Last Donation</h4>
                    <p className="mt-2 text-gray-800">
                      {new Date(selectedDonor.lastDonation).toLocaleDateString()}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Next Eligible Date</h4>
                    <p className="mt-2 text-gray-800">
                      {new Date(selectedDonor.nextEligibleDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-500">Address</h4>
                  <p className="mt-2 text-gray-800">{selectedDonor.address}</p>
                </div>

                <div className="flex justify-end space-x-4 pt-6 border-t">
                  <button className="btn btn-outline">
                    <Edit size={16} className="mr-2" />
                    Edit
                  </button>
                  <button className="btn btn-primary">
                    Schedule Donation
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DonorManagementPage;