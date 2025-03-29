import { useState } from 'react';
import { blockedCustomers } from '../../../masterdata/customers/blockedCustomers';
import { FaHome, FaChevronRight, FaPlus } from "react-icons/fa";
import { Link } from 'react-router-dom';

const BlockedCustomers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('All');
  
  // Get unique regions for dropdown
  const regions = ['All', ...new Set(blockedCustomers.map(customer => customer.region))];
  
  // Filter customers based on search and region
  const filteredCustomers = blockedCustomers.filter(customer => {
    const matchesSearch = Object.values(customer).some(
      value => value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );
    const matchesRegion = selectedRegion === 'All' || customer.region === selectedRegion;
    return matchesSearch && matchesRegion;
  });

  return (
    <div className="container mx-auto px-4 py-8">
       <div className="flex items-center text-gray-600 text-sm pb-4">
                    <FaHome className="mr-1 text-blue-500" />
                    <Link to="/" className="hover:underline">Home</Link>
                    <FaChevronRight className="mx-2 text-gray-400" />
                    <Link to="/customers" className="hover:underline">Customers</Link>
                    <FaChevronRight className="mx-2 text-gray-400" />
                    <span className="text-orange-500">Blocked Customers</span>
                  </div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Blocked Customers</h1>
      
      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search customers..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <svg
            className="absolute right-3 top-3 h-5 w-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        
        <select
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          value={selectedRegion}
          onChange={(e) => setSelectedRegion(e.target.value)}
        >
          {regions.map(region => (
            <option key={region} value={region}>{region}</option>
          ))}
        </select>
      </div>
      
      {/* Results count */}
      <div className="mb-4 text-sm text-gray-600">
        Showing {filteredCustomers.length} of {blockedCustomers.length} blocked customers
      </div>
      
      {/* Customers Grid */}
      {filteredCustomers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredCustomers.map((customer) => (
            <div key={customer.customer_id} className="bg-white rounded-xl shadow-md overflow-hidden border border-red-200 hover:shadow-lg transition-shadow">
              <div className="p-5">
                {/* Customer Header */}
                <div className="flex items-start gap-4 mb-4">
                  <img 
                    src={customer.customer_image} 
                    alt={customer.customer_name} 
                    className="h-14 w-14 rounded-full object-cover border-2 border-red-200"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{customer.customer_name}</h3>
                    <p className="text-sm text-gray-500">{customer.customer_id}</p>
                    <span className="mt-1 inline-block px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">
                      Blocked
                    </span>
                  </div>
                </div>
                
                {/* Customer Details */}
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-xs text-gray-500">Vendor</p>
                      <p className="font-medium">{customer.vendor_name}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">Branch</p>
                      <p className="font-medium">{customer.branch}</p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-xs text-gray-500">Block Reason</p>
                    <p className="font-medium text-red-600">{customer.block_reason}</p>
                  </div>
                  
                  <div className="flex justify-between">
                    <div>
                      <p className="text-xs text-gray-500">Rating</p>
                      <div className="flex items-center">
                        <svg 
                          className={`w-4 h-4 ${customer.customer_rating >= 1 ? 'text-yellow-400' : 'text-gray-300'}`} 
                          fill="currentColor" 
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="ml-1 text-sm font-medium">{customer.customer_rating.toFixed(1)}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">Visits</p>
                      <p className="font-medium">{customer.no_of_visits}</p>
                    </div>
                  </div>
                  
                  <div className="pt-3 border-t border-gray-100">
                    <div className="flex justify-between items-center">
                      <button className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition">
                        View Details
                      </button>
                      <button className="px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition">
                        Contact
                      </button>
                    </div>
                  </div>
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
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h3 className="mt-2 text-lg font-medium text-gray-900">No blocked customers found</h3>
          <p className="mt-1 text-gray-500">
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}
      

    </div>
  );
};

export default BlockedCustomers;