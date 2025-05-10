import React, { useState } from 'react';
import { Droplets, MapPin, Clock, AlertCircle, CheckCircle, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface BloodRequest {
  id: string;
  patientName: string;
  bloodType: string;
  units: number;
  urgency: 'High' | 'Medium' | 'Low';
  hospital: string;
  location: string;
  requiredBy: string;
  status: 'Pending' | 'Fulfilled' | 'Cancelled';
  notes?: string;
  createdAt: string;
}

const BloodRequestPage: React.FC = () => {
  const { user } = useAuth();
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<BloodRequest | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    patientName: '',
    bloodType: '',
    units: 1,
    urgency: 'Medium',
    hospital: '',
    location: '',
    requiredBy: '',
    notes: '',
  });

  // Mock data for blood requests
  const [requests] = useState<BloodRequest[]>([
    {
      id: 'REQ001',
      patientName: 'John Smith',
      bloodType: 'O+',
      units: 2,
      urgency: 'High',
      hospital: 'City Hospital',
      location: 'Downtown Medical District',
      requiredBy: '2025-03-15',
      status: 'Pending',
      createdAt: '2025-03-12T10:30:00Z',
    },
    {
      id: 'REQ002',
      patientName: 'Emily Johnson',
      bloodType: 'A-',
      units: 1,
      urgency: 'Medium',
      hospital: 'Metro Medical Center',
      location: 'Westside Healthcare Complex',
      requiredBy: '2025-03-16',
      status: 'Fulfilled',
      createdAt: '2025-03-12T11:45:00Z',
    },
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    setShowRequestForm(false);
    // Reset form
    setFormData({
      patientName: '',
      bloodType: '',
      units: 1,
      urgency: 'Medium',
      hospital: '',
      location: '',
      requiredBy: '',
      notes: '',
    });
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'High':
        return 'bg-red-100 text-red-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'Low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Fulfilled':
        return 'bg-green-100 text-green-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Blood Requests</h1>
          <p className="text-gray-600">Manage and track blood donation requests</p>
        </div>
        <button
          onClick={() => setShowRequestForm(true)}
          className="mt-4 md:mt-0 btn btn-primary"
        >
          <Droplets className="w-5 h-5 mr-2" />
          New Request
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <Droplets className="w-6 h-6 text-red-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">Active Requests</h3>
              <p className="text-2xl font-bold text-red-600">12</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">Fulfilled</h3>
              <p className="text-2xl font-bold text-green-600">45</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">Urgent Needs</h3>
              <p className="text-2xl font-bold text-yellow-600">3</p>
            </div>
          </div>
        </div>
      </div>

      {/* Request List */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Requests</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Request Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Blood Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Urgency
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {requests.map((request) => (
                  <tr key={request.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{request.patientName}</div>
                      <div className="text-sm text-gray-500">
                        {request.units} unit(s) needed by {new Date(request.requiredBy).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                        {request.bloodType}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{request.hospital}</div>
                      <div className="text-sm text-gray-500">{request.location}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getUrgencyColor(request.urgency)}`}>
                        {request.urgency}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(request.status)}`}>
                        {request.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => setSelectedRequest(request)}
                        className="text-red-600 hover:text-red-800 font-medium"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* New Request Modal */}
      {showRequestForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-2xl mx-4">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">New Blood Request</h2>
                <button
                  onClick={() => setShowRequestForm(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="label" htmlFor="patientName">
                      Patient Name
                    </label>
                    <input
                      type="text"
                      id="patientName"
                      className="input-field"
                      value={formData.patientName}
                      onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="label" htmlFor="bloodType">
                      Blood Type
                    </label>
                    <select
                      id="bloodType"
                      className="input-field"
                      value={formData.bloodType}
                      onChange={(e) => setFormData({ ...formData, bloodType: e.target.value })}
                      required
                    >
                      <option value="">Select blood type</option>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="label" htmlFor="units">
                      Units Required
                    </label>
                    <input
                      type="number"
                      id="units"
                      min="1"
                      className="input-field"
                      value={formData.units}
                      onChange={(e) => setFormData({ ...formData, units: parseInt(e.target.value) })}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="label" htmlFor="urgency">
                      Urgency Level
                    </label>
                    <select
                      id="urgency"
                      className="input-field"
                      value={formData.urgency}
                      onChange={(e) => setFormData({ ...formData, urgency: e.target.value as 'High' | 'Medium' | 'Low' })}
                      required
                    >
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="label" htmlFor="hospital">
                      Hospital
                    </label>
                    <input
                      type="text"
                      id="hospital"
                      className="input-field"
                      value={formData.hospital}
                      onChange={(e) => setFormData({ ...formData, hospital: e.target.value })}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="label" htmlFor="location">
                      Location
                    </label>
                    <input
                      type="text"
                      id="location"
                      className="input-field"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="label" htmlFor="requiredBy">
                      Required By
                    </label>
                    <input
                      type="date"
                      id="requiredBy"
                      className="input-field"
                      value={formData.requiredBy}
                      onChange={(e) => setFormData({ ...formData, requiredBy: e.target.value })}
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="label" htmlFor="notes">
                    Additional Notes
                  </label>
                  <textarea
                    id="notes"
                    rows={3}
                    className="input-field"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  ></textarea>
                </div>
                
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setShowRequestForm(false)}
                    className="btn btn-outline"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Submit Request
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Request Details Modal */}
      {selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-2xl mx-4">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Request Details</h2>
                <button
                  onClick={() => setSelectedRequest(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Request ID</h3>
                    <p className="mt-1 text-lg text-gray-900">{selectedRequest.id}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Status</h3>
                    <p className={`mt-1 inline-flex px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(selectedRequest.status)}`}>
                      {selectedRequest.status}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Patient Name</h3>
                    <p className="mt-1 text-lg text-gray-900">{selectedRequest.patientName}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Blood Type</h3>
                    <p className="mt-1 text-lg text-gray-900">{selectedRequest.bloodType}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Units Required</h3>
                    <p className="mt-1 text-lg text-gray-900">{selectedRequest.units}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Urgency</h3>
                    <p className={`mt-1 inline-flex px-3 py-1 rounded-full text-sm font-semibold ${getUrgencyColor(selectedRequest.urgency)}`}>
                      {selectedRequest.urgency}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Hospital</h3>
                    <p className="mt-1 text-lg text-gray-900">{selectedRequest.hospital}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Location</h3>
                    <p className="mt-1 text-lg text-gray-900">{selectedRequest.location}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Required By</h3>
                    <p className="mt-1 text-lg text-gray-900">
                      {new Date(selectedRequest.requiredBy).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Created At</h3>
                    <p className="mt-1 text-lg text-gray-900">
                      {new Date(selectedRequest.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-4">
                  <button
                    onClick={() => setSelectedRequest(null)}
                    className="btn btn-outline"
                  >
                    Close
                  </button>
                  {selectedRequest.status === 'Pending' && (
                    <button className="btn btn-primary">
                      Fulfill Request
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BloodRequestPage;