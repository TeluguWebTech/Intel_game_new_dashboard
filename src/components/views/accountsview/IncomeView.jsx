import React, { useState } from 'react';
import { incomeData } from '../../../masterdata/accounts/incomeData';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const IncomeView = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedDate, setSelectedDate] = useState(null);
  
  // Get unique regions for filter dropdown
  const regions = [...new Set(incomeData.map(item => item.region))];

  // Filter data based on search term, region, and date
  const filteredData = incomeData.filter(income => {
    const matchesSearch = 
      income.vendor_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      income.branch.toLowerCase().includes(searchTerm.toLowerCase()) ||
      income.purpose.toLowerCase().includes(searchTerm.toLowerCase()) ||
      income.mode_of_payment.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRegion = selectedRegion === 'all' || income.region === selectedRegion;
    
    const incomeDate = new Date(income.date);
    const matchesDate = !selectedDate || 
      (incomeDate.getDate() === selectedDate.getDate() &&
       incomeDate.getMonth() === selectedDate.getMonth() &&
       incomeDate.getFullYear() === selectedDate.getFullYear());
    
    return matchesSearch && matchesRegion && matchesDate;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Income Records</h1>
      
      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        {/* Search Input */}
        <div className="flex-1 min-w-[200px]">
          <label htmlFor="search" className="sr-only">Search</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </div>
            <input
              type="text"
              id="search"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Search income records..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        {/* Region Filter */}
        <div className="w-full sm:w-auto">
          <label htmlFor="region" className="sr-only">Region</label>
          <select
            id="region"
            className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
          >
            <option value="all">All Regions</option>
            {regions.map(region => (
              <option key={region} value={region}>{region}</option>
            ))}
          </select>
        </div>
        
        {/* Date Filter */}
        <div className="w-full sm:w-auto">
          <label htmlFor="date-filter" className="sr-only">Date</label>
          <DatePicker
            id="date-filter"
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            placeholderText="Filter by date"
            className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            isClearable
          />
        </div>
        
        {/* Results Count */}
        <div className="text-sm text-gray-600 whitespace-nowrap">
          {filteredData.length} records found
        </div>
      </div>
      
      {/* Income Cards Grid */}
      {filteredData.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredData.map((income, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300">
              {/* Card Header */}
              <div className="bg-blue-600 p-4">
                <h2 className="text-lg font-semibold text-white truncate">{income.vendor_name}</h2>
                <p className="text-blue-100 text-sm">{income.branch}</p>
              </div>
              
              {/* Card Body */}
              <div className="p-4">
                <div className="mb-3">
                  <p className="text-xs text-gray-500 uppercase tracking-wider">Amount Received</p>
                  <p className="text-xl font-bold text-gray-800">${income.received_amount.toLocaleString()}</p>
                </div>
                
                <div className="space-y-2">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">Purpose</p>
                    <p className="text-sm font-medium text-gray-800">{income.purpose}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">Payment Mode</p>
                    <p className="text-sm font-medium text-gray-800">{income.mode_of_payment}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">Received By</p>
                    <p className="text-sm font-medium text-gray-800">{income.received_by}</p>
                  </div>
                </div>
              </div>
              
              {/* Card Footer */}
              <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">{income.date}</span>
                  <span className="text-xs font-medium text-blue-600">{income.region}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-gray-50 p-8 rounded-lg text-center">
          <p className="text-gray-500">No income records found matching your criteria</p>
          <button 
            onClick={() => {
              setSearchTerm('');
              setSelectedRegion('all');
              setSelectedDate(null);
            }}
            className="mt-2 text-blue-600 hover:text-blue-800 text-sm"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
};

export default IncomeView;