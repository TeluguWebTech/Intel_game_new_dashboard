import React, { useState } from 'react';
import { customerData } from '../../../masterdata/customers/customerListData';


const FrequentCustomers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [selectedSubscription, setSelectedSubscription] = useState('All');

  // Get unique regions and subscription types
  const regions = ['All', ...new Set(customerData.map(customer => customer.region))];
  const subscriptionTypes = ['All', ...new Set(customerData.map(customer => customer.customer_subscription))];

  // Filter customers
  const filteredCustomers = customerData.filter(customer => {
    const matchesSearch = 
      customer.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.customer_id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRegion = selectedRegion === 'All' || customer.region === selectedRegion;
    const matchesSubscription = selectedSubscription === 'All' || customer.customer_subscription === selectedSubscription;
    
    return matchesSearch && matchesRegion && matchesSubscription;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Frequent Customers</h1>
      
      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          {/* Region Filter */}
          <div>
            <select
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
            >
              {regions.map(region => (
                <option key={region} value={region}>{region}</option>
              ))}
            </select>
          </div>
          
          {/* Subscription Filter */}
          <div>
            <select
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              value={selectedSubscription}
              onChange={(e) => setSelectedSubscription(e.target.value)}
            >
              {subscriptionTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          
          {/* Clear Filters */}
          <div className="flex items-end">
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedRegion('All');
                setSelectedSubscription('All');
              }}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {/* Customer Grid */}
      {filteredCustomers.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredCustomers.map(customer => (
            <div key={customer.customer_id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-4">
                <div className="flex items-center mb-4">
                  <img 
                    className="h-16 w-16 rounded-full object-cover" 
                    src={customer.customer_image} 
                    alt={customer.customer_name} 
                  />
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-800">{customer.customer_name}</h3>
                    <p className="text-sm text-gray-500">{customer.customer_id}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-sm mb-4">
                  <div>
                    <p className="text-gray-500">Visits</p>
                    <p className="font-medium">{customer.no_of_visits}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Games</p>
                    <p className="font-medium">{customer.total_games_played}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Hours</p>
                    <p className="font-medium">{customer.total_hours}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Spend</p>
                    <p className="font-medium">${customer.total_games_amount}</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    customer.subscription_status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {customer.subscription_status}
                  </span>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    customer.customer_subscription === 'Premium' ? 'bg-purple-100 text-purple-800' :
                    customer.customer_subscription === 'Gold' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {customer.customer_subscription}
                  </span>
                </div>
              </div>
              
              <div className="bg-gray-50 px-4 py-3 flex justify-between items-center border-t border-gray-200">
                <div className="flex items-center">
                  <svg className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="ml-1 text-sm font-medium text-gray-700">
                    {customer.customer_rating}
                  </span>
                </div>
                <div className="flex items-center">
                  <svg className="h-5 w-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  <span className="ml-1 text-sm font-medium text-gray-700">
                    {customer.region}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow p-8 text-center">
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

export default FrequentCustomers;