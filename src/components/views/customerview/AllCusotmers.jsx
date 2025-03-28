import React, { useState } from 'react';
import { customerData } from '../../../masterdata/customers/customerListData';

const AllCustomers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');

  // Get unique regions and statuses for filters
  const regions = ['All', ...new Set(customerData.map(customer => customer.region))];
  const statuses = ['All', 'Active', 'Inactive'];

  // Filter customers based on search term, region, and status
  const filteredCustomers = customerData.filter(customer => {
    const matchesSearch = 
      customer.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.customer_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.client_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRegion = selectedRegion === 'All' || customer.region === selectedRegion;
    const matchesStatus = selectedStatus === 'All' || customer.subscription_status === selectedStatus;
    
    return matchesSearch && matchesRegion && matchesStatus;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Customer Dashboard</h1>
      
      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search Input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search customers..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          {/* Region Filter */}
          <div>
            <select
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
            >
              {regions.map(region => (
                <option key={region} value={region}>{region}</option>
              ))}
            </select>
          </div>
          
          {/* Status Filter */}
          <div>
            <select
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              {statuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
        </div>
        
        {/* Clear Filters */}
        {(searchTerm || selectedRegion !== 'All' || selectedStatus !== 'All') && (
          <div className="mt-3 text-right">
            <button 
              onClick={() => {
                setSearchTerm('');
                setSelectedRegion('All');
                setSelectedStatus('All');
              }}
              className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>

      {/* Results Count */}
      <div className="mb-4 text-sm text-gray-600">
        Showing {filteredCustomers.length} of {customerData.length} customers
      </div>
      
      {/* Customers Grid */}
      {filteredCustomers.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredCustomers.map((customer) => (
            <div key={customer.customer_id} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300">
              {/* Customer Header */}
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 flex items-center">
                <img 
                  src={customer.customer_image} 
                  alt={customer.customer_name}
                  className="w-12 h-12 rounded-full border-2 border-white mr-3"
                />
                <div>
                  <h2 className="text-lg font-semibold text-white truncate">{customer.customer_name}</h2>
                  <p className="text-blue-100 text-sm">{customer.client_name}</p>
                </div>
              </div>
              
              {/* Customer Details */}
              <div className="p-4">
                <div className="flex justify-between items-center mb-3">
                  <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                    customer.subscription_status === 'Active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {customer.subscription_status}
                  </span>
                  <span className="text-sm font-medium text-gray-500">{customer.region}</span>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">Customer ID</p>
                    <p className="text-sm font-medium">{customer.customer_id}</p>
                  </div>
                  
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">Location</p>
                    <p className="text-sm font-medium">{customer.location}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider">Visits</p>
                      <p className="text-sm font-medium">{customer.no_of_visits}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider">Rating</p>
                      <div className="flex items-center">
                        <span className="text-sm font-medium mr-1">{customer.customer_rating}</span>
                        <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider">Games Played</p>
                      <p className="text-sm font-medium">{customer.total_games_played}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider">Reward Points</p>
                      <p className="text-sm font-medium text-blue-600">{customer.reward_points}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Customer Footer */}
              <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">
                    {customer.support.filter(s => s.status === 'Pending').length} pending tickets
                  </span>
                  <button className="text-xs text-blue-600 hover:text-blue-800 hover:underline">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-gray-50 p-8 rounded-lg text-center">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h3 className="mt-2 text-lg font-medium text-gray-900">No customers found</h3>
          <p className="mt-1 text-gray-500">
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}
    </div>
  );
};

export default AllCustomers;