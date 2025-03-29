import { useState } from 'react';
import { clientData } from '../../masterdata/clientData';
import { FaHome, FaChevronRight, FaPlus } from "react-icons/fa";
import { Link } from 'react-router-dom';

const ClientLocationDetail = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [regionFilter, setRegionFilter] = useState('all');
  const [stateFilter, setStateFilter] = useState('all');
  const [sortConfig, setSortConfig] = useState({ key: 'client_name', direction: 'asc' });

  // Get unique regions and states for filters
  const regions = ['all', ...new Set(clientData.map(client => client.region))];
  const states = ['all', ...new Set(clientData.map(client => client.state))];

  // Sort clients
  const sortedClients = [...clientData].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  // Filter clients
  const filteredClients = sortedClients.filter(client => {
    const matchesSearch = 
      client.client_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.incharge.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRegion = regionFilter === 'all' || client.region === regionFilter;
    const matchesState = stateFilter === 'all' || client.state === stateFilter;
    
    return matchesSearch && matchesRegion && matchesState;
  });

  // Handle sort request
  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="container mx-auto px-4 py-8">
        <div className="flex items-center text-gray-600 text-sm pb-4">
                <FaHome className="mr-1 text-blue-500" />
                <Link to="/" className="hover:underline">Home</Link>
               
                <FaChevronRight className="mx-2 text-gray-400" />
                <span className="text-orange-500">Locations</span>
              </div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Client Locations</h1>
      
      {/* Filters */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Search */}
          <div className="md:col-span-2">
            <label htmlFor="search" className="block text-sm font-medium text-gray-600 mb-2">
              Search Locations
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                id="search"
                placeholder="Search by client, location, or in-charge..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          {/* Region Filter */}
          <div>
            <label htmlFor="region" className="block text-sm font-medium text-gray-600 mb-2">
              Filter by Region
            </label>
            <select
              id="region"
              className="block w-full px-3 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              value={regionFilter}
              onChange={(e) => setRegionFilter(e.target.value)}
            >
              {regions.map(region => (
                <option key={region} value={region}>
                  {region === 'all' ? 'All Regions' : region}
                </option>
              ))}
            </select>
          </div>
          
          {/* State Filter */}
          <div>
            <label htmlFor="state" className="block text-sm font-medium text-gray-600 mb-2">
              Filter by State
            </label>
            <select
              id="state"
              className="block w-full px-3 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              value={stateFilter}
              onChange={(e) => setStateFilter(e.target.value)}
            >
              {states.map(state => (
                <option key={state} value={state}>
                  {state === 'all' ? 'All States' : state}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      {/* Sort Options */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => requestSort('client_name')}
          className={`px-3 py-1 rounded-lg text-sm font-medium ${
            sortConfig.key === 'client_name'
              ? 'bg-indigo-100 text-indigo-800'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Sort by Name {sortConfig.key === 'client_name' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
        </button>
        <button
          onClick={() => requestSort('location')}
          className={`px-3 py-1 rounded-lg text-sm font-medium ${
            sortConfig.key === 'location'
              ? 'bg-indigo-100 text-indigo-800'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Sort by Location {sortConfig.key === 'location' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
        </button>
        <button
          onClick={() => requestSort('deposit_amount')}
          className={`px-3 py-1 rounded-lg text-sm font-medium ${
            sortConfig.key === 'deposit_amount'
              ? 'bg-indigo-100 text-indigo-800'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Sort by Deposit {sortConfig.key === 'deposit_amount' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
        </button>
      </div>
      
      {/* Results Count */}
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-700">
          {filteredClients.length} {filteredClients.length === 1 ? 'Location' : 'Locations'} Found
        </h2>
        <div className="text-sm text-gray-500">
          Showing {Math.min(filteredClients.length, 10)} of {filteredClients.length}
        </div>
      </div>
      
      {/* Locations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClients.length > 0 ? (
          filteredClients.map(client => (
            <div key={client.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-6">
                {/* Client Header */}
                <div className="flex items-start space-x-4 mb-4">
                  <img 
                    src={client.image} 
                    alt={client.client_name} 
                    className="w-14 h-14 rounded-full object-cover border-2 border-white shadow"
                  />
                  <div>
                    <h2 className="text-xl font-bold text-gray-800">{client.client_name}</h2>
                    <p className="text-gray-600">{client.game_station}</p>
                  </div>
                </div>
                
                {/* Location Info */}
                <div className="space-y-3">
                  <div className="flex items-center">
                    <div className="bg-gray-100 p-2 rounded-lg mr-3">
                      <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Location</p>
                      <p className="font-medium text-gray-800">
                        {client.location}, {client.state}
                      </p>
                      <p className="text-xs text-gray-500">{client.address}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="bg-gray-100 p-2 rounded-lg mr-3">
                      <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">In-Charge</p>
                      <p className="font-medium text-gray-800">{client.incharge}</p>
                      <p className="text-xs text-gray-500">{client.contact} • {client.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="bg-gray-100 p-2 rounded-lg mr-3">
                      <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Business Info</p>
                      <div className="flex flex-wrap gap-2 mt-1">
                        <span className="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-full">
                          {client.region}
                        </span>
                        <span className="px-2 py-0.5 bg-purple-100 text-purple-800 text-xs rounded-full">
                          {client.no_of_game_machines} Machines
                        </span>
                        <span className="px-2 py-0.5 bg-green-100 text-green-800 text-xs rounded-full">
                          {client.no_of_trts} TRTs
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Financial Info */}
                <div className="mt-6 pt-4 border-t border-gray-200 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Deposit Amount</p>
                    <p className="font-bold text-indigo-600">{formatCurrency(client.deposit_amount)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Commission</p>
                    <p className="font-bold text-purple-600">{client.commission_deal}</p>
                  </div>
                </div>
                
                {/* Business Hours */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-500 mb-1">Business Hours</p>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="font-medium">Weekdays:</p>
                      <p className="text-gray-600">{client.business_timings.weekdays}</p>
                    </div>
                    <div>
                      <p className="font-medium">Weekends:</p>
                      <p className="text-gray-600">{client.business_timings.weekends}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Footer */}
              <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">
                    Appointed by: <span className="font-medium">{client.appointed_by}</span>
                  </span>
                  <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded">
                    {client.id}
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full bg-white rounded-xl shadow-sm p-12 text-center">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">No locations found</h3>
            <p className="mt-1 text-gray-500">
              Try adjusting your search or filters to find what you're looking for.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientLocationDetail;