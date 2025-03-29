import { useState } from 'react';
import { gameMachines } from '../../../masterdata/gameMachine'; 
import { trtMachines } from '../../../masterdata/trtMachine';
import { FaHome, FaChevronRight, FaPlus } from "react-icons/fa";
import { Link } from 'react-router-dom';

const MachineLocations = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [regionFilter, setRegionFilter] = useState('all');
  const [machineTypeFilter, setMachineTypeFilter] = useState('all');
  const [activeTab, setActiveTab] = useState('all');

  // Combine both machine types for display
  const allMachines = [
    ...gameMachines.map(machine => ({ ...machine, type: 'Game Machine' })),
    ...trtMachines.map(machine => ({ ...machine, type: 'TRT Machine' }))
  ];

  const regions = ['all', ...new Set(allMachines.map(machine => machine.region))];
  const machineTypes = ['all', 'Game Machine', 'TRT Machine'];

  const filteredMachines = allMachines
    .filter(machine => {
      const matchesSearch = 
        machine.installed_location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        machine.installed_client_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        machine.location_incharge.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesRegion = regionFilter === 'all' || machine.region === regionFilter;
      const matchesMachineType = machineTypeFilter === 'all' || machine.type === machineTypeFilter;
      const matchesTab = 
        activeTab === 'all' || 
        (activeTab === 'game' && machine.type === 'Game Machine') || 
        (activeTab === 'trt' && machine.type === 'TRT Machine');
      
      return matchesSearch && matchesRegion && matchesMachineType && matchesTab;
    })
    .sort((a, b) => a.installed_location.localeCompare(b.installed_location));

  return (
    <div className="container mx-auto px-4 py-8">
                 <div className="flex items-center text-gray-600 text-sm pb-4">
                          <FaHome className="mr-1 text-blue-500" />
                          <Link to="/" className="hover:underline">Home</Link>
                          <FaChevronRight className="mx-2 text-gray-400" />
                          <Link to="/machines" className="hover:underline">Machines</Link>
                          <FaChevronRight className="mx-2 text-gray-400" />
                          <span className="text-orange-500">Locations</span>
                        </div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Machine Locations </h1>
      
      {/* Tabs */}
      <div className="flex space-x-4 mb-6">
        <button
          className={`px-6 py-2 rounded-lg font-medium transition-colors ${
            activeTab === 'all' 
              ? 'bg-indigo-600 text-white shadow-md' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
          onClick={() => setActiveTab('all')}
        >
          All Machines
        </button>
        <button
          className={`px-6 py-2 rounded-lg font-medium transition-colors ${
            activeTab === 'game' 
              ? 'bg-purple-600 text-white shadow-md' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
          onClick={() => setActiveTab('game')}
        >
          Game Machines
        </button>
        <button
          className={`px-6 py-2 rounded-lg font-medium transition-colors ${
            activeTab === 'trt' 
              ? 'bg-teal-600 text-white shadow-md' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
          onClick={() => setActiveTab('trt')}
        >
          TRT Machines
        </button>
      </div>
      
      {/* Filters */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl shadow-sm p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Filter Machines</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Search */}
          <div>
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
                placeholder="Search by location, client, or in-charge..."
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
            <div className="relative">
              <select
                id="region"
                className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none"
                value={regionFilter}
                onChange={(e) => setRegionFilter(e.target.value)}
              >
                {regions.map(region => (
                  <option key={region} value={region}>
                    {region === 'all' ? 'All Regions' : region}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
          
          {/* Machine Type Filter */}
          <div>
            <label htmlFor="machineType" className="block text-sm font-medium text-gray-600 mb-2">
              Filter by Machine Type
            </label>
            <div className="relative">
              <select
                id="machineType"
                className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none"
                value={machineTypeFilter}
                onChange={(e) => setMachineTypeFilter(e.target.value)}
              >
                {machineTypes.map(type => (
                  <option key={type} value={type}>
                    {type === 'all' ? 'All Types' : type}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Results Count */}
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-700">
          {filteredMachines.length} {filteredMachines.length === 1 ? 'Machine' : 'Machines'} Found
        </h2>
        <div className="text-sm text-gray-500">
          Sorted by: <span className="font-medium">Location (A-Z)</span>
        </div>
      </div>
      
      {/* Machines Grid */}
      {filteredMachines.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMachines.map(machine => (
            <div 
              key={machine.machine_id || machine.trtMachine_id} 
              className={`rounded-xl shadow-md overflow-hidden transition-transform hover:scale-[1.02] ${
                machine.type === 'Game Machine' ? 'border-t-4 border-purple-500' : 'border-t-4 border-teal-500'
              }`}
            >
              <div className="bg-white p-6 h-full flex flex-col">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-xl font-bold text-gray-800">
                      {machine.installed_location}
                    </h2>
                    <p className="text-sm text-gray-500">
                      {machine.installed_client_name}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    machine.type === 'Game Machine' 
                      ? 'bg-purple-100 text-purple-800' 
                      : 'bg-teal-100 text-teal-800'
                  }`}>
                    {machine.type}
                  </span>
                </div>
                
                {/* Position and Region */}
                <div className="flex items-center space-x-2 mb-4">
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                    {machine.position}
                  </span>
                  <span className="px-2 py-1 bg-indigo-100 text-indigo-800 text-xs font-medium rounded-full">
                    {machine.region}
                  </span>
                </div>
                
                {/* Machine Details */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-center">
                    <div className="bg-gray-100 p-2 rounded-lg mr-3">
                      <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">In-Charge</p>
                      <p className="text-sm font-medium text-gray-800">{machine.location_incharge}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="bg-gray-100 p-2 rounded-lg mr-3">
                      <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Installed On</p>
                      <p className="text-sm font-medium text-gray-800">{machine.installed_date}</p>
                    </div>
                  </div>
                  
                  {machine.type === 'Game Machine' ? (
                    <div className="flex items-center">
                      <div className="bg-gray-100 p-2 rounded-lg mr-3">
                        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Model & Games</p>
                        <p className="text-sm font-medium text-gray-800">
                          {machine.machine_model} • {machine.no_of_games} games
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <div className="bg-gray-100 p-2 rounded-lg mr-3">
                        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Model & Type</p>
                        <p className="text-sm font-medium text-gray-800">
                          {machine.trtMachine_model} • {machine.type}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Features */}
                <div className="mb-4">
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Features</h3>
                  <div className="flex flex-wrap gap-2">
                    {(machine.features || machine.trt_features || []).map((feature, index) => (
                      <span 
                        key={index} 
                        className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-medium"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Maintenance Info */}
                <div className="mt-auto pt-4 border-t border-gray-200">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-500">Last Serviced</p>
                      <p className="text-sm font-medium text-gray-800">{machine.serviced_on}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Next Maintenance</p>
                      <p className={`text-sm font-medium ${
                        new Date(machine.maintenance_date) < new Date() 
                          ? 'text-red-600' 
                          : 'text-gray-800'
                      }`}>
                        {machine.maintenance_date}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm p-12 text-center">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="mt-2 text-lg font-medium text-gray-900">No machines found</h3>
          <p className="mt-1 text-gray-500">
            Try adjusting your search or filter to find what you're looking for.
          </p>
        </div>
      )}
    </div>
  );
};

export default MachineLocations;