import React, { useState } from 'react';
import { commissionData } from '../../../masterdata/commissions/commissionData';
import { useNavigate } from 'react-router-dom';
import { Calendar } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { Link } from "react-router-dom";
import { FaHome, FaChevronRight, FaPlus } from "react-icons/fa";


const ClientCommissions = () => {
  const [date, setDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('All Regions');
  const [selectedLocation, setSelectedLocation] = useState('All Locations');

  const navigate = useNavigate();

  // Extract unique regions and locations from data
  const regions = ['All Regions', ...new Set(commissionData.map(item => item.commission_calculation.region))];
  const locations = ['All Locations', ...new Set(commissionData.map(item => item.commission_calculation.game_station))];

  // Filter function
  const filteredData = commissionData.filter(item => {
    const matchesSearch = 
      item.commission_calculation.client_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.commission_calculation.receipt_no.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.commission_calculation.game_details.customer_name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRegion = 
      selectedRegion === 'All Regions' || 
      item.commission_calculation.region === selectedRegion;
    
    const matchesLocation = 
      selectedLocation === 'All Locations' || 
      item.commission_calculation.game_station === selectedLocation;
    
    return matchesSearch && matchesRegion && matchesLocation;
  });

  const handleViewDetails = (record) => {
    navigate(`/commission-details/${record.commission_calculation.client_id}`, { 
      state: { commissionData: record } 
    });
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
           <div className="flex items-center text-gray-600 text-sm mb-4">
                          <FaHome className="mr-1 text-blue-500" />
                          <Link to="/" className="hover:underline">Home</Link>
                          <FaChevronRight className="mx-2 text-gray-400" />
                          <Link to="/clients" className="hover:underline">Clients</Link>
                          <FaChevronRight className="mx-2 text-gray-400" />
                          <span className="text-orange-500">Commissions</span>
                        </div>
      <div className="flex flex-col mb-6 gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Commission Reports</h1>
        
        {/* Filters Row */}
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search Input */}
          <div className="flex-1">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search clients, receipts, customers..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          {/* Region Dropdown */}
          <div className="w-full md:w-48">
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md shadow-sm"
            >
              {regions.map((region, index) => (
                <option key={index} value={region}>{region}</option>
              ))}
            </select>
          </div>
          
          {/* Location Dropdown */}
          <div className="w-full md:w-48">
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md shadow-sm"
            >
              {locations.map((location, index) => (
                <option key={index} value={location}>{location}</option>
              ))}
            </select>
          </div>
          
          {/* Date Picker */}
          <div className="relative">
            <button 
              onClick={() => setShowCalendar(!showCalendar)}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>{date.toLocaleDateString()}</span>
            </button>
            
            {showCalendar && (
              <div className="absolute right-0 mt-2 z-10 bg-white shadow-xl rounded-lg border border-gray-200">
                <Calendar
                  date={date}
                  onChange={(date) => {
                    setDate(date);
                    setShowCalendar(false);
                  }}
                  color="#3B82F6"
                />
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Results Count */}
      <div className="mb-4 text-sm text-gray-500">
        Showing {filteredData.length} of {commissionData.length} records
      </div>
      
      {/* Commission Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredData.map((item, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-200 border border-gray-100">
            {/* Client Header */}
            <div className="flex items-center p-4 bg-gradient-to-r from-blue-50 to-blue-100">
              <img 
                src={item.commission_calculation.client_image} 
                alt={item.commission_calculation.client_name}
                className="w-12 h-12 rounded-full object-cover mr-3 border-2 border-white shadow-sm"
              />
              <div>
                <h3 className="font-semibold text-gray-800">{item.commission_calculation.client_name}</h3>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500 font-medium">{item.commission_calculation.game_station}</span>
                  <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full">
                    {item.commission_calculation.region}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Commission Details */}
            <div className="p-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Date</span>
                <span className="text-sm font-medium text-gray-700">
                  {new Date(item.commission_calculation.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Receipt</span>
                <span className="text-sm font-medium text-gray-700 bg-gray-100 px-2 py-1 rounded">
                  {item.commission_calculation.receipt_no}
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Profit</span>
                <span className="text-sm font-medium text-green-600">
                  ${item.commission_calculation.game_details.game_profit.toFixed(2)}
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Vendor Share</span>
                <span className="text-sm font-medium text-blue-600">
                  ${item.commission_calculation.commission_calculation.vendor_commission.toFixed(2)}
                </span>
              </div>
              
              <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                <span className="text-sm text-gray-500">Status</span>
                <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                  item.commission_calculation.payout_information.payout_status === 'paid' 
                    ? 'bg-green-50 text-green-700' 
                    : 'bg-amber-50 text-amber-700'
                }`}>
                  {item.commission_calculation.payout_information.payout_status}
                </span>
              </div>
            </div>
            
            {/* Footer */}
            <div className="px-4 py-3 bg-gray-50 border-t border-gray-100 text-right">
              <button 
               onClick={() => handleViewDetails(item)}
              className="text-sm font-medium text-blue-600 hover:text-blue-800 flex items-center justify-end gap-1 w-full">
                View Details
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClientCommissions;