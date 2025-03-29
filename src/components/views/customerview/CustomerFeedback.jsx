import { useState } from 'react';
import { customerData } from '../../../masterdata/customers/customerListData';
import { FaHome, FaChevronRight, FaPlus } from "react-icons/fa";
import { Link } from 'react-router-dom';



 const CustomerFeedback = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [activeTab, setActiveTab] = useState('reviews');
  const [expandedCustomer, setExpandedCustomer] = useState(null);

  // Get unique regions and statuses for dropdowns
  const regions = ['All', ...new Set(customerData.map(customer => customer.region))];
  const statuses = ['All', 'Active', 'Inactive'];

  // Filter customers based on search, region, and status
  const filteredCustomers = customerData.filter(customer => {
    const matchesSearch = Object.values(customer).some(
      value => value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );
    const matchesRegion = selectedRegion === 'All' || customer.region === selectedRegion;
    const matchesStatus = selectedStatus === 'All' || customer.subscription_status === selectedStatus;
    
    return matchesSearch && matchesRegion && matchesStatus;
  });

  // Toggle customer details expansion
  const toggleCustomerDetails = (customerId) => {
    setExpandedCustomer(expandedCustomer === customerId ? null : customerId);
  };

  return (
    <div className="container mx-auto px-4 py-8">
           <div className="flex items-center text-gray-600 text-sm pb-4">
                          <FaHome className="mr-1 text-blue-500" />
                          <Link to="/" className="hover:underline">Home</Link>
                          <FaChevronRight className="mx-2 text-gray-400" />
                          <Link to="/customers" className="hover:underline">Customers</Link>
                          <FaChevronRight className="mx-2 text-gray-400" />
                          <span className="text-orange-500">Customer Feedback</span>
                        </div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Customer Feedback</h1>
      
      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="md:col-span-1">
          <input
            type="text"
            placeholder="Search customers..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
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
        
        <select
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
        >
          {statuses.map(status => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
        
        <div className="flex border border-gray-300 rounded-lg overflow-hidden">
          <button
            className={`flex-1 py-2 px-4 font-medium ${activeTab === 'reviews' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
            onClick={() => setActiveTab('reviews')}
          >
            Reviews
          </button>
          <button
            className={`flex-1 py-2 px-4 font-medium ${activeTab === 'support' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
            onClick={() => setActiveTab('support')}
          >
            Support
          </button>
        </div>
      </div>
      
      {/* Results count */}
      <div className="mb-4 text-sm text-gray-600">
        Showing {filteredCustomers.length} of {customerData.length} customers
      </div>
      
      {/* Customers List */}
      <div className="space-y-4">
        {filteredCustomers.length > 0 ? (
          filteredCustomers.map((customer) => (
            <div key={customer.customer_id} className="bg-white rounded-xl shadow overflow-hidden border border-gray-200">
              {/* Customer Summary */}
              <div 
                className="p-5 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => toggleCustomerDetails(customer.customer_id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <img 
                      src={customer.customer_image} 
                      alt={customer.customer_name} 
                      className="h-12 w-12 rounded-full object-cover border-2 border-gray-200"
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">{customer.customer_name}</h3>
                      <p className="text-sm text-gray-500">{customer.customer_id}</p>
                      <div className="flex flex-wrap gap-2 mt-1">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          customer.subscription_status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {customer.subscription_status}
                        </span>
                        <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                          {customer.region}
                        </span>
                        <span className="px-2 py-1 text-xs font-medium bg-purple-100 text-purple-800 rounded-full">
                          {customer.branch}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="flex items-center justify-end">
                      <svg 
                        className={`w-5 h-5 ${customer.customer_rating >= 1 ? 'text-yellow-400' : 'text-gray-300'}`} 
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="ml-1 font-medium">{customer.customer_rating.toFixed(1)}</span>
                    </div>
                    <p className="text-sm text-gray-500">{customer.no_of_visits} visits</p>
                  </div>
                </div>
                
                <div className="mt-4 flex justify-between items-center">
                  <div className="flex items-center">
                    <span className="mr-2 text-sm text-gray-500">View {activeTab === 'reviews' ? 'Reviews' : 'Support Tickets'}</span>
                    <svg
                      className={`h-5 w-5 text-gray-400 transform transition-transform ${expandedCustomer === customer.customer_id ? 'rotate-180' : ''}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-700">
                      {activeTab === 'reviews' ? (
                        `${customer.reviews.length} reviews`
                      ) : (
                        `${customer.support.length} tickets`
                      )}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Expanded Customer Details */}
              {expandedCustomer === customer.customer_id && (
                <div className="border-t border-gray-200 p-5 bg-gray-50">
                  <h4 className="text-md font-semibold text-gray-800 mb-3">
                    {activeTab === 'reviews' ? 'Customer Reviews' : 'Support Tickets'}
                  </h4>
                  
                  {activeTab === 'reviews' ? (
                    <div className="space-y-4">
                      {customer.reviews.length > 0 ? (
                        customer.reviews.map((review, index) => (
                          <div key={index} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                            <div className="flex justify-between items-start mb-2">
                              <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                  <svg
                                    key={i}
                                    className={`w-5 h-5 ${i < Math.floor(review.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                  >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                  </svg>
                                ))}
                                {review.rating % 1 !== 0 && (
                                  <svg
                                    className="w-5 h-5 text-yellow-400"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                  >
                                    <defs>
                                      <linearGradient id="half-star" x1="0" x2="100%" y1="0" y2="0">
                                        <stop offset="50%" stopColor="currentColor" />
                                        <stop offset="50%" stopColor="#D1D5DB" />
                                      </linearGradient>
                                    </defs>
                                    <path fill="url(#half-star)" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                  </svg>
                                )}
                                <span className="ml-1 text-sm font-medium">{review.rating.toFixed(1)}</span>
                              </div>
                              <span className="text-sm text-gray-500">{review.date}</span>
                            </div>
                            <p className="text-gray-700 mt-1">{review.comment}</p>
                            <div className="mt-3 flex justify-end">
                              <button className="text-sm text-blue-600 hover:text-blue-800">
                                Report
                              </button>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 text-center text-gray-500">
                          No reviews available
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {customer.support.length > 0 ? (
                        customer.support.map((ticket, index) => (
                          <div key={index} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h5 className="font-medium text-gray-800">{ticket.issue}</h5>
                                <p className="text-sm text-gray-500">Ticket ID: {ticket.ticket_id}</p>
                              </div>
                              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                ticket.status === 'Resolved' ? 'bg-green-100 text-green-800' :
                                ticket.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-blue-100 text-blue-800'
                              }`}>
                                {ticket.status}
                              </span>
                            </div>
                            <div className="mt-2 flex justify-between items-center">
                              <span className="text-sm text-gray-500">Raised on: {ticket.raised_on}</span>
                              <button className="text-sm text-blue-600 hover:text-blue-800">
                                View Details
                              </button>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 text-center text-gray-500">
                          No support tickets available
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))
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
            <h3 className="mt-2 text-lg font-medium text-gray-900">No customers found</h3>
            <p className="mt-1 text-gray-500">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
      
      {/* Summary Cards */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow border-l-4 border-blue-500">
          <h3 className="text-sm font-medium text-gray-500">Total Customers</h3>
          <p className="mt-1 text-2xl font-bold text-blue-600">
            {customerData.length}
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow border-l-4 border-yellow-500">
          <h3 className="text-sm font-medium text-gray-500">Avg Rating</h3>
          <p className="mt-1 text-2xl font-bold text-yellow-600">
            {(customerData.reduce((sum, customer) => sum + customer.customer_rating, 0) / customerData.length).toFixed(1)}
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow border-l-4 border-purple-500">
          <h3 className="text-sm font-medium text-gray-500">Total Reviews</h3>
          <p className="mt-1 text-2xl font-bold text-purple-600">
            {customerData.reduce((sum, customer) => sum + customer.reviews.length, 0)}
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow border-l-4 border-green-500">
          <h3 className="text-sm font-medium text-gray-500">Active Customers</h3>
          <p className="mt-1 text-2xl font-bold text-green-600">
            {customerData.filter(customer => customer.subscription_status === 'Active').length}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CustomerFeedback;