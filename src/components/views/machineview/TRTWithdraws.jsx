import React, { useState } from 'react';
import { trtWithdraws } from '../../../masterdata/trtWithdrawData';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const TRTWithdraws = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  const filteredWithdrawals = trtWithdraws.filter(withdrawal => {
    // Filter by search term
    const matchesSearch = 
      withdrawal.machine_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      withdrawal.machine_model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      withdrawal.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      withdrawal.withdrawn_by.emp_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      withdrawal.receipt_id.toLowerCase().includes(searchTerm.toLowerCase());

    // Filter by date range
    const withdrawalDate = new Date(withdrawal.date);
    const matchesDate = 
      (!startDate || withdrawalDate >= startDate) && 
      (!endDate || withdrawalDate <= endDate);

    return matchesSearch && matchesDate;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Withdrawal Overview</h1>
      
      {/* Search and Filter Section */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">Search</label>
          <input
            type="text"
            id="search"
            placeholder="Search by machine, location, employee..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="date-range" className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
          <DatePicker
            selectsRange={true}
            startDate={startDate}
            endDate={endDate}
            onChange={(update) => {
              setDateRange(update);
            }}
            isClearable={true}
            placeholderText="Filter by date range"
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-4 text-sm text-gray-600">
        Showing {filteredWithdrawals.length} of {trtWithdraws.length} withdrawals
      </div>
      
      {/* Withdrawals Grid */}
      {filteredWithdrawals.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredWithdrawals.map((withdrawal, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300">
              {/* Card Header */}
              <div className={`p-4 ${withdrawal.withdrawal_status === 'Completed' ? 'bg-green-100' : 'bg-yellow-100'}`}>
                <div className="flex justify-between items-center">
                  <h2 className="font-semibold text-gray-800 truncate">{withdrawal.machine_name}</h2>
                  <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                    withdrawal.withdrawal_status === 'Completed' 
                      ? 'bg-green-500 text-white' 
                      : 'bg-yellow-500 text-white'
                  }`}>
                    {withdrawal.withdrawal_status}
                  </span>
                </div>
                <p className="text-sm text-gray-600 truncate">{withdrawal.vendor_name}</p>
              </div>
              
              {/* Card Body */}
              <div className="p-4">
                <div className="mb-3">
                  <p className="text-xs text-gray-500 uppercase tracking-wider">Location</p>
                  <p className="font-medium truncate">{withdrawal.location}, {withdrawal.region}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-3">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">Withdrawal</p>
                    <p className="font-bold text-red-600">${withdrawal.withdrawal_amount.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">Balance</p>
                    <p className="font-medium">${withdrawal.machine_balance.toLocaleString()}</p>
                  </div>
                </div>
                
                <div className="mb-3">
                  <p className="text-xs text-gray-500 uppercase tracking-wider">Withdrawn By</p>
                  <p className="font-medium truncate">{withdrawal.withdrawn_by.emp_name}</p>
                </div>
              </div>
              
              {/* Card Footer */}
              <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">{new Date(withdrawal.date).toLocaleDateString()}</span>
                  <div className="flex space-x-2">
                    <button className="text-xs text-blue-600 hover:text-blue-800 hover:underline">View</button>
                    <button className="text-xs text-gray-600 hover:text-gray-800 hover:underline">Edit</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-gray-50 p-8 rounded-lg text-center">
          <p className="text-gray-500">No withdrawals found matching your criteria</p>
          <button 
            onClick={() => {
              setSearchTerm('');
              setDateRange([null, null]);
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

export default TRTWithdraws;