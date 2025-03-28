import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaSearch, FaFilter, FaEye, FaEdit, FaTrash, FaChevronDown } from "react-icons/fa";
import { trtMachines } from '../../../masterdata/trtMachine';
import { trtDeposits } from '../../../masterdata/trtDepositsData';
import { trtWithdraws } from '../../../masterdata/trtWithdrawData';

// Define available regions (you might want to get this from your data)
const regions = [
  "All Regions",
  "North",
  "South",
  "East",
  "West",
  "Central"
];

const TRTManagement = () => {
  const [activeTab, setActiveTab] = useState("machines");
  const [search, setSearch] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState("All Regions");
  const [isRegionDropdownOpen, setIsRegionDropdownOpen] = useState(false);

  const filterData = (data) => {
    return data.filter((item) => {
      const matchesSearch = search
        ? JSON.stringify(item).toLowerCase().includes(search.toLowerCase())
        : true;
      const matchesDate = selectedDate
        ? item.date === selectedDate.toISOString().split("T")[0]
        : true;
      const matchesRegion = selectedRegion !== "All Regions"
        ? item.region?.toLowerCase() === selectedRegion.toLowerCase()
        : true;
      return matchesSearch && matchesDate && matchesRegion;
    });
  };

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto bg-white rounded-xl shadow-md">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">TRT Management</h1>
        <p className="text-gray-600 mt-1">Manage machines, deposits, and withdrawals</p>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 md:space-x-2 border-b border-gray-200 pb-1">
        {["machines", "deposits", "withdrawals"].map((tab) => (
          <button
            key={tab}
            className={`px-3 py-2 text-sm font-medium rounded-t-lg transition-all duration-200 ${
              activeTab === tab 
                ? "bg-blue-50 text-blue-600 border-b-2 border-blue-500 font-semibold" 
                : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row items-center justify-between mt-4 gap-4">
        {/* Search Input */}
        <div className="relative w-full md:w-1/3">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search by any field..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-200 focus:border-blue-500 focus:outline-none transition"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Region Dropdown */}
        <div className="relative w-full md:w-1/3">
          <button
            onClick={() => setIsRegionDropdownOpen(!isRegionDropdownOpen)}
            className="flex items-center justify-between w-full pl-3 pr-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-200 focus:border-blue-500 focus:outline-none transition"
          >
            <span className="flex items-center">
              <FaFilter className="text-gray-400 mr-2" />
              {selectedRegion}
            </span>
            <FaChevronDown className={`text-gray-400 transition-transform ${isRegionDropdownOpen ? 'transform rotate-180' : ''}`} />
          </button>
          
          {isRegionDropdownOpen && (
            <div className="absolute z-10 mt-1 w-full bg-white rounded-md shadow-lg border border-gray-200 max-h-60 overflow-auto">
              {regions.map((region) => (
                <button
                  key={region}
                  className={`block w-full text-left px-4 py-2 text-sm hover:bg-blue-50 ${selectedRegion === region ? 'bg-blue-100 text-blue-800' : 'text-gray-700'}`}
                  onClick={() => {
                    setSelectedRegion(region);
                    setIsRegionDropdownOpen(false);
                  }}
                >
                  {region}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Date Picker */}
        <div className="relative w-full md:w-1/3">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaFilter className="text-gray-400" />
          </div>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-200 focus:border-blue-500 focus:outline-none transition"
            placeholderText="Filter by date"
            dateFormat="MMMM d, yyyy"
          />
        </div>
      </div>

      {/* Table Sections */}
      <div className="mt-6">
        {activeTab === "machines" && <Table data={filterData(trtMachines)} type="machines" />}
        {activeTab === "deposits" && <Table data={filterData(trtDeposits)} type="deposits" />}
        {activeTab === "withdrawals" && <Table data={filterData(trtWithdraws)} type="withdrawals" />}
      </div>
    </div>
  );
};

const Table = ({ data, type }) => {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gradient-to-r from-blue-600 to-blue-500">
          <tr>
            {type === "machines" ? (
              <>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Machine ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Model</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Region</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Balance</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-white uppercase tracking-wider">Actions</th>
              </>
            ) : (
              <>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Vendor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Machine</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-white uppercase tracking-wider">Actions</th>
              </>
            )}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.length > 0 ? (
            data.map((item, index) => (
              <tr key={index} className="hover:bg-blue-50 transition-colors duration-150">
                {type === "machines" ? (
                  <>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.trtMachine_id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.trtMachine_model}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.installed_location}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.region}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-blue-600">${item.carrying_amount.toLocaleString()}</td>
                  </>
                ) : (
                  <>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.vendor_name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.machine_name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-600">
                      ${(item.deposit_amount || item.withdrawal_amount).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${(item.deposit_status || item.withdrawal_status) === 'completed' ? 'bg-green-100 text-green-800' : 
                          (item.deposit_status || item.withdrawal_status) === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-red-100 text-red-800'}`}>
                        {item.deposit_status || item.withdrawal_status}
                      </span>
                    </td>
                  </>
                )}
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end space-x-3">
                    <button className="text-blue-500 hover:text-blue-700 transition" title="View">
                      <FaEye className="w-4 h-4" />
                    </button>
                    <button className="text-green-500 hover:text-green-700 transition" title="Edit">
                      <FaEdit className="w-4 h-4" />
                    </button>
                    <button className="text-red-500 hover:text-red-700 transition" title="Delete">
                      <FaTrash className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={type === "machines" ? 6 : 6} className="px-6 py-4 text-center text-sm text-gray-500">
                <div className="flex flex-col items-center justify-center py-8">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="mt-2 text-gray-600">No records found</p>
                  <p className="text-xs text-gray-400">Try adjusting your search or filters</p>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TRTManagement;