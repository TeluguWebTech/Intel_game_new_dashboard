import React, { useState } from 'react';
import { trtDeposits } from '../../../masterdata/trtDepositsData';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaHome, FaChevronRight, FaPlus } from "react-icons/fa";
import { Link } from 'react-router-dom';

const TRTDeposits = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  const filteredDeposits = trtDeposits.filter(deposit => {
    // Filter by search term
    const matchesSearch = 
      deposit.machine_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      deposit.machine_model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      deposit.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      deposit.deposited_by.emp_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      deposit.receipt_id.toLowerCase().includes(searchTerm.toLowerCase());

    // Filter by date range
    const depositDate = new Date(deposit.date);
    const matchesDate = 
      (!startDate || depositDate >= startDate) && 
      (!endDate || depositDate <= endDate);

    return matchesSearch && matchesDate;
  });

  return (
    <div className="container mx-auto px-4 py-8">
                 <div className="flex items-center text-gray-600 text-sm pb-4">
                          <FaHome className="mr-1 text-blue-500" />
                          <Link to="/" className="hover:underline">Home</Link>
                          <FaChevronRight className="mx-2 text-gray-400" />
                          <Link to="/machines" className="hover:underline">Machines</Link>
                          <FaChevronRight className="mx-2 text-gray-400" />
                          <span className="text-orange-500">TRT Deposits</span>
                        </div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Deposit Overview</h1>
      
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
        Showing {filteredDeposits.length} of {trtDeposits.length} deposits
      </div>
      
      {/* Deposits Grid */}
      {filteredDeposits.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredDeposits.map((deposit, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300">
              {/* Card Header */}
              <div className={`p-4 ${deposit.deposit_status === 'Completed' ? 'bg-green-100' : 'bg-yellow-100'}`}>
                <div className="flex justify-between items-center">
                  <h2 className="font-semibold text-gray-800">{deposit.machine_name}</h2>
                  <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                    deposit.deposit_status === 'Completed' 
                      ? 'bg-green-500 text-white' 
                      : 'bg-yellow-500 text-white'
                  }`}>
                    {deposit.deposit_status}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{deposit.machine_model}</p>
              </div>
              
              {/* Card Body */}
              <div className="p-4">
                <div className="mb-3">
                  <p className="text-xs text-gray-500 uppercase tracking-wider">Location</p>
                  <p className="font-medium">{deposit.location}, {deposit.region}</p>
                </div>
                
                <div className="mb-3">
                  <p className="text-xs text-gray-500 uppercase tracking-wider">Deposit Amount</p>
                  <p className="font-bold text-lg text-blue-600">${deposit.deposit_amount.toLocaleString()}</p>
                </div>
                
                <div className="mb-3">
                  <p className="text-xs text-gray-500 uppercase tracking-wider">Machine Balance</p>
                  <p className="font-medium">${deposit.machine_balance.toLocaleString()}</p>
                </div>
                
                <div className="mb-3">
                  <p className="text-xs text-gray-500 uppercase tracking-wider">Deposited By</p>
                  <p className="font-medium">{deposit.deposited_by.emp_name}</p>
                </div>
              </div>
              
              {/* Card Footer */}
              <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">{deposit.date}</span>
                  <div className="flex space-x-2">
                    {/* <button className="text-xs text-blue-600 hover:text-blue-800">View</button>
                     */}
<Link 
  to={`/machines/trt-deposits/${deposit.receipt_id}`}
  className="text-xs text-blue-600 hover:text-blue-800"
>
  View
</Link>
                    <button className="text-xs text-gray-600 hover:text-gray-800">Edit</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-gray-50 p-8 rounded-lg text-center">
          <p className="text-gray-500">No deposits found matching your criteria</p>
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

export default TRTDeposits;