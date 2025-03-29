import { useState } from 'react';
import { clientData } from '../../../masterdata/clientData';
import { FaHome, FaChevronRight, FaPlus, FaSearch, FaMapMarkerAlt, FaEnvelope, FaPhone, FaUser, FaMoneyBillWave, FaBuilding } from "react-icons/fa";
import { Link } from 'react-router-dom';

const ClientContacts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [regionFilter, setRegionFilter] = useState('all');
  const [sortBy, setSortBy] = useState('client_name');

  const regions = ['all', ...new Set(clientData.map(client => client.region))];
  
  const filteredClients = clientData
    .filter(client => {
      const matchesSearch = 
        client.client_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.incharge.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.email.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesRegion = regionFilter === 'all' || client.region === regionFilter;
      
      return matchesSearch && matchesRegion;
    })
    .sort((a, b) => {
      if (sortBy === 'client_name') {
        return a.client_name.localeCompare(b.client_name);
      } else if (sortBy === 'location') {
        return a.location.localeCompare(b.location);
      } else if (sortBy === 'deposit_amount') {
        return b.deposit_amount - a.deposit_amount;
      }
      return 0;
    });

  // Color mapping for regions
  const regionColors = {
    'North': 'bg-blue-100 text-blue-800',
    'South': 'bg-green-100 text-green-800',
    'East': 'bg-purple-100 text-purple-800',
    'West': 'bg-amber-100 text-amber-800',
    'Central': 'bg-pink-100 text-pink-800',
    'default': 'bg-gray-100 text-gray-800'
  };

  const getRegionColor = (region) => {
    return regionColors[region] || regionColors.default;
  };

  return (
    <div className="container mx-auto px-4 py-6 min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Breadcrumb */}
      <div className="flex items-center text-gray-600 text-sm mb-6">
        <FaHome className="mr-2 text-indigo-500" />
        <Link to="/" className="hover:underline text-indigo-600 hover:text-indigo-800">Home</Link>
        <FaChevronRight className="mx-2 text-gray-400" />
        <span className="text-orange-600 font-medium">Client Contacts</span>
      </div>
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4 md:mb-0">
          Client Contacts
          <span className="block text-lg font-normal text-gray-500 mt-1">Manage your client relationships</span>
        </h1>
        <button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center">
          <FaPlus className="mr-2" />
          Add New Client
        </button>
      </div>
      
      {/* Filters */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Search & Filter</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Search */}
          <div>
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
              Search Clients
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                id="search"
                placeholder="Search by name, location, email..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          {/* Region Filter */}
          <div>
            <label htmlFor="region" className="block text-sm font-medium text-gray-700 mb-2">
              Filter by Region
            </label>
            <div className="relative">
              <select
                id="region"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white pr-8 transition-colors"
                value={regionFilter}
                onChange={(e) => setRegionFilter(e.target.value)}
              >
                {regions.map(region => (
                  <option key={region} value={region}>
                    {region === 'all' ? 'All Regions' : `${region} Region`}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
          
          {/* Sort By */}
          <div>
            <label htmlFor="sort" className="block text-sm font-medium text-gray-700 mb-2">
              Sort By
            </label>
            <div className="relative">
              <select
                id="sort"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white pr-8 transition-colors"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="client_name">Client Name (A-Z)</option>
                <option value="location">Location (A-Z)</option>
                <option value="deposit_amount">Deposit Amount (High to Low)</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Results Count */}
      <div className="mb-4 flex justify-between items-center">
        <p className="text-gray-600">
          Showing <span className="font-semibold">{filteredClients.length}</span> {filteredClients.length === 1 ? 'client' : 'clients'}
        </p>
      </div>
      
      {/* Client Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClients.length > 0 ? (
          filteredClients.map(client => (
            <div 
              key={client.id} 
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-indigo-100"
            >
              {/* Client Header */}
              <div className="p-6 pb-0">
                <div className="flex items-center mb-4">
                  <div className="relative">
                    <img 
                      src={client.image} 
                      alt={client.client_name} 
                      className="w-16 h-16 rounded-full object-cover mr-4 border-2 border-white shadow-sm"
                    />
                    <span className={`absolute bottom-0 right-4 px-2 py-1 text-xs rounded-full ${getRegionColor(client.region)}`}>
                      {client.region}
                    </span>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-800">{client.client_name}</h2>
                    <p className="text-indigo-600 font-medium">{client.game_station}</p>
                  </div>
                </div>
              </div>
              
              {/* Client Details */}
              <div className="p-6 pt-0">
                <div className="space-y-3">
                  <div className="flex items-start">
                    <FaUser className="w-5 h-5 text-gray-400 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-500">In Charge</p>
                      <p className="text-gray-700">{client.incharge}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <FaPhone className="w-5 h-5 text-gray-400 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-500">Contact</p>
                      <p className="text-gray-700">{client.contact}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <FaEnvelope className="w-5 h-5 text-gray-400 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <a href={`mailto:${client.email}`} className="text-blue-600 hover:underline">{client.email}</a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <FaMapMarkerAlt className="w-5 h-5 text-gray-400 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-500">Location</p>
                      <p className="text-gray-700">{client.location}, {client.state}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <FaMoneyBillWave className="w-5 h-5 text-gray-400 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-500">Deposit Amount</p>
                      <p className="text-gray-700 font-medium">${client.deposit_amount.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Client Footer */}
              <div className="bg-gray-50 px-6 py-4 border-t border-gray-100">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <FaBuilding className="text-gray-400 mr-2" />
                    <span className="text-sm font-medium text-gray-600">
                      {client.no_of_game_machines} {client.no_of_game_machines === 1 ? 'Machine' : 'Machines'}
                    </span>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${client.commission_deal === 'Standard' ? 'bg-green-100 text-green-800' : 'bg-purple-100 text-purple-800'}`}>
                    {client.commission_deal}
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-16 bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="max-w-md mx-auto">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="mt-2 text-lg font-medium text-gray-900">No clients found</h3>
              <p className="mt-1 text-gray-500">Try adjusting your search or filter criteria</p>
              <div className="mt-6">
                <button 
                  onClick={() => {
                    setSearchTerm('');
                    setRegionFilter('all');
                    setSortBy('client_name');
                  }}
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Reset filters
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientContacts;