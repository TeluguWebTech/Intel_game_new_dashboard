import React, { useState } from 'react';
import { customerSessionsData } from '../../../masterdata/customers/sessionData';

// Expanded sample data including visits to multiple game stations
const expandedCustomerData = [
  {
    "customer_id": "CUST2001",
    "customer_name": "Jake Thompson",
    "customer_image": "https://randomuser.me/api/portraits/men/75.jpg",
    "membership_level": "Gold",
    "total_visits": 12,
    "total_spend": 480,
    "favorite_game": "Street Fighter",
    "visits": [
      {
        "vendor_id": "VND001",
        "vendor_name": "Gaming Zone Inc.",
        "branch": "Las Vegas",
        "region": "West Coast",
        "date": "2025-03-25",
        "duration": 90,
        "games_played": ["Street Fighter", "Pac-Man"],
        "spend": 40,
        "reward_points": 120
      },
      {
        "vendor_id": "VND003",
        "vendor_name": "Elite Gaming",
        "branch": "Los Angeles",
        "region": "West Coast",
        "date": "2025-03-20",
        "duration": 60,
        "games_played": ["Mortal Kombat", "Tekken"],
        "spend": 30,
        "reward_points": 90
      },
      {
        "vendor_id": "VND005",
        "vendor_name": "Arcade World",
        "branch": "San Diego",
        "region": "West Coast",
        "date": "2025-03-15",
        "duration": 120,
        "games_played": ["Street Fighter", "Mario Kart"],
        "spend": 50,
        "reward_points": 150
      }
    ]
  },
  {
    "customer_id": "CUST2002",
    "customer_name": "Emily Davis",
    "customer_image": "https://randomuser.me/api/portraits/women/45.jpg",
    "membership_level": "Platinum",
    "total_visits": 18,
    "total_spend": 720,
    "favorite_game": "Mortal Kombat",
    "visits": [
      {
        "vendor_id": "VND002",
        "vendor_name": "Game World LLC",
        "branch": "New York",
        "region": "East Coast",
        "date": "2025-03-26",
        "duration": 105,
        "games_played": ["Mortal Kombat", "Tetris", "Space Invaders"],
        "spend": 45,
        "reward_points": 180
      },
      {
        "vendor_id": "VND004",
        "vendor_name": "Fun Zone",
        "branch": "Boston",
        "region": "East Coast",
        "date": "2025-03-22",
        "duration": 75,
        "games_played": ["Mortal Kombat", "Street Fighter"],
        "spend": 35,
        "reward_points": 105
      },
      {
        "vendor_id": "VND006",
        "vendor_name": "Player's Paradise",
        "branch": "Miami",
        "region": "East Coast",
        "date": "2025-03-18",
        "duration": 90,
        "games_played": ["Tekken", "Pac-Man"],
        "spend": 40,
        "reward_points": 120
      }
    ]
  },
  {
    "customer_id": "CUST2003",
    "customer_name": "Michael Rodriguez",
    "customer_image": "https://randomuser.me/api/portraits/men/32.jpg",
    "membership_level": "Silver",
    "total_visits": 8,
    "total_spend": 320,
    "favorite_game": "Tekken",
    "visits": [
      {
        "vendor_id": "VND001",
        "vendor_name": "Gaming Zone Inc.",
        "branch": "Las Vegas",
        "region": "West Coast",
        "date": "2025-03-24",
        "duration": 60,
        "games_played": ["Tekken", "Street Fighter"],
        "spend": 30,
        "reward_points": 90
      },
      {
        "vendor_id": "VND003",
        "vendor_name": "Elite Gaming",
        "branch": "Los Angeles",
        "region": "West Coast",
        "date": "2025-03-19",
        "duration": 45,
        "games_played": ["Tekken"],
        "spend": 25,
        "reward_points": 75
      }
    ]
  }
];

const CustomerTracking = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  // Get unique regions
  const regions = ['All', ...new Set(expandedCustomerData.flatMap(customer => 
    customer.visits.map(visit => visit.region)
  ).filter(region => region))];

  // Filter customers
  const filteredCustomers = expandedCustomerData.filter(customer => {
    const matchesSearch = 
      customer.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.customer_id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRegion = selectedRegion === 'All' || 
      customer.visits.some(visit => visit.region === selectedRegion);
    
    return matchesSearch && matchesRegion;
  });

  // Calculate metrics
  const totalCustomers = filteredCustomers.length;
  const totalVisits = filteredCustomers.reduce((sum, customer) => sum + customer.total_visits, 0);
  const avgVisits = totalCustomers > 0 ? (totalVisits / totalCustomers).toFixed(1) : 0;
  const totalSpend = filteredCustomers.reduce((sum, customer) => sum + customer.total_spend, 0);

  // Get visit history for selected customer
  const customerVisits = selectedCustomer 
    ? expandedCustomerData.find(c => c.customer_id === selectedCustomer)?.visits || []
    : [];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Customer Tracking</h1>
      
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
          
          {/* Clear Filters */}
          <div className="flex items-end">
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedRegion('All');
                setSelectedCustomer(null);
              }}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow p-6 border-l-4 border-indigo-500">
          <h3 className="text-gray-500 text-sm font-medium">Total Customers</h3>
          <p className="text-2xl font-bold text-gray-800">{totalCustomers}</p>
          <p className="text-sm text-gray-500 mt-1">Active players</p>
        </div>
        
        <div className="bg-white rounded-xl shadow p-6 border-l-4 border-green-500">
          <h3 className="text-gray-500 text-sm font-medium">Total Visits</h3>
          <p className="text-2xl font-bold text-gray-800">{totalVisits}</p>
          <p className="text-sm text-gray-500 mt-1">Across all locations</p>
        </div>
        
        <div className="bg-white rounded-xl shadow p-6 border-l-4 border-yellow-500">
          <h3 className="text-gray-500 text-sm font-medium">Avg. Visits</h3>
          <p className="text-2xl font-bold text-gray-800">{avgVisits}</p>
          <p className="text-sm text-gray-500 mt-1">Per customer</p>
        </div>
        
        <div className="bg-white rounded-xl shadow p-6 border-l-4 border-purple-500">
          <h3 className="text-gray-500 text-sm font-medium">Total Spend</h3>
          <p className="text-2xl font-bold text-gray-800">${totalSpend}</p>
          <p className="text-sm text-gray-500 mt-1">All customers</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Customer List */}
        <div className="bg-white rounded-xl shadow overflow-hidden lg:col-span-1">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">Customers</h2>
          </div>
          <div className="divide-y divide-gray-200 max-h-[600px] overflow-y-auto">
            {filteredCustomers.length > 0 ? (
              filteredCustomers.map(customer => (
                <div 
                  key={customer.customer_id} 
                  className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${selectedCustomer === customer.customer_id ? 'bg-blue-50' : ''}`}
                  onClick={() => setSelectedCustomer(customer.customer_id)}
                >
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-12 w-12">
                      <img className="h-12 w-12 rounded-full" src={customer.customer_image} alt={customer.customer_name} />
                    </div>
                    <div className="ml-4 flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium text-gray-900">{customer.customer_name}</h3>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          customer.membership_level === 'Gold' ? 'bg-yellow-100 text-yellow-800' :
                          customer.membership_level === 'Platinum' ? 'bg-gray-100 text-gray-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {customer.membership_level}
                        </span>
                      </div>
                      <div className="text-sm text-gray-500">Visits: {customer.total_visits}</div>
                      <div className="text-sm text-gray-500">Favorite: {customer.favorite_game}</div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center">
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
        </div>

        {/* Customer Details */}
        <div className="bg-white rounded-xl shadow overflow-hidden lg:col-span-2">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">
              {selectedCustomer 
                ? `${expandedCustomerData.find(c => c.customer_id === selectedCustomer)?.customer_name}'s Visit History` 
                : "Select a customer to view details"}
            </h2>
          </div>
          <div className="divide-y divide-gray-200 max-h-[600px] overflow-y-auto">
            {selectedCustomer ? (
              customerVisits.length > 0 ? (
                customerVisits.map((visit, index) => (
                  <div key={index} className="p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">{visit.vendor_name}</h3>
                        <div className="text-sm text-gray-500">{visit.branch}, {visit.region}</div>
                        <div className="mt-2 text-sm text-gray-500">
                          <span className="font-medium">Date:</span> {visit.date} • {visit.duration} mins
                        </div>
                        <div className="mt-1 text-sm text-gray-500">
                          <span className="font-medium">Games:</span> {visit.games_played.join(', ')}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-gray-900">${visit.spend}</div>
                        <div className="text-sm text-green-600">+{visit.reward_points} pts</div>
                      </div>
                    </div>
                    <div className="mt-3 flex justify-between text-xs text-gray-500">
                      <span>Visit #{customerVisits.length - index}</span>
                      <span>{visit.vendor_id}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center">
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
                  <h3 className="mt-2 text-lg font-medium text-gray-900">No visit history</h3>
                  <p className="mt-1 text-gray-500">
                    This customer hasn't visited any locations yet
                  </p>
                </div>
              )
            ) : (
              <div className="p-8 text-center">
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
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
                <h3 className="mt-2 text-lg font-medium text-gray-900">Customer Details</h3>
                <p className="mt-1 text-gray-500">
                  Select a customer from the list to view their visit history
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerTracking;