import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { trtWithdraws } from '../../../masterdata/trtWithdrawData';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaHome, FaChevronRight, FaPlus, FaArrowLeft, FaFileImage, FaPrint, FaDownload } from "react-icons/fa";
import { Link } from 'react-router-dom';

// Withdrawal List Component
const TRTWithdraws = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const navigate = useNavigate();

  const filteredWithdrawals = trtWithdraws.filter(withdrawal => {
    const matchesSearch = 
      withdrawal.machine_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      withdrawal.machine_model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      withdrawal.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      withdrawal.withdrawn_by.emp_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      withdrawal.receipt_id.toLowerCase().includes(searchTerm.toLowerCase());

    const withdrawalDate = new Date(withdrawal.date);
    const matchesDate = 
      (!startDate || withdrawalDate >= startDate) && 
      (!endDate || withdrawalDate <= endDate);

    return matchesSearch && matchesDate;
  });

  const handleViewClick = (receiptId) => {
    navigate(`/machines/withdrawals/${receiptId}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center text-gray-600 text-sm pb-4">
        <FaHome className="mr-1 text-blue-500" />
        <Link to="/" className="hover:underline">Home</Link>
        <FaChevronRight className="mx-2 text-gray-400" />
        <Link to="/machines" className="hover:underline">Machines</Link>
        <FaChevronRight className="mx-2 text-gray-400" />
        <span className="text-orange-500">TRT Withdrawals</span>
      </div>
      
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
                    <button 
                      onClick={() => handleViewClick(withdrawal.receipt_id)}
                      className="text-xs text-blue-600 hover:text-blue-800 hover:underline"
                    >
                      View Details
                    </button>
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

// Withdrawal Detail Component
const WithdrawalDetail = () => {
  const { receiptId } = useParams();
  const navigate = useNavigate();
  const withdrawal = trtWithdraws.find(w => w.receipt_id === receiptId);

  if (!withdrawal) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Withdrawal Not Found</h2>
          <p className="text-gray-600 mb-6">The withdrawal record you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/machines/withdrawals')}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Back to Withdrawals
          </button>
        </div>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // In a real app, this would download the receipt image
    window.open(withdrawal.uploaded_receipt_image, '_blank');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center text-gray-600 text-sm pb-4">
        <FaHome className="mr-1 text-blue-500" />
        <Link to="/" className="hover:underline">Home</Link>
        <FaChevronRight className="mx-2 text-gray-400" />
        <Link to="/machines" className="hover:underline">Machines</Link>
        <FaChevronRight className="mx-2 text-gray-400" />
        <Link to="/trt-withdrawls" className="hover:underline">TRT Withdrawals</Link>
        <FaChevronRight className="mx-2 text-gray-400" />
        <span className="text-orange-500">Withdrawal #{withdrawal.receipt_id}</span>
      </div>

      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-blue-600 hover:text-blue-800"
        >
          <FaArrowLeft className="mr-2" />
          Back
        </button>
        <div className="flex space-x-3">
          <button
            onClick={handlePrint}
            className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            <FaPrint className="mr-2" />
            Print
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            <FaDownload className="mr-2" />
            Download Receipt
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className={`p-6 ${withdrawal.withdrawal_status === 'Completed' ? 'bg-green-600' : 'bg-yellow-500'} text-white`}>
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold mb-1">Withdrawal Receipt</h1>
              <p className="text-white text-opacity-90">#{withdrawal.receipt_id}</p>
            </div>
            <span className="px-3 py-1 rounded-full text-sm font-medium bg-white bg-opacity-20">
              {withdrawal.withdrawal_status}
            </span>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Machine Details */}
          <div className="lg:col-span-2">
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">Machine Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-500 uppercase tracking-wider mb-1">Machine Name</p>
                  <p className="font-medium">{withdrawal.machine_name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 uppercase tracking-wider mb-1">Model</p>
                  <p className="font-medium">{withdrawal.machine_model}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 uppercase tracking-wider mb-1">Vendor</p>
                  <p className="font-medium">{withdrawal.vendor_name} ({withdrawal.vendor_id})</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 uppercase tracking-wider mb-1">Location</p>
                  <p className="font-medium">{withdrawal.location}, {withdrawal.region}</p>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">Financial Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-500 uppercase tracking-wider mb-1">Carrying Amount</p>
                  <p className="font-medium">${withdrawal.carrying_amount.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 uppercase tracking-wider mb-1">Withdrawal Amount</p>
                  <p className="font-bold text-red-600">${withdrawal.withdrawal_amount.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 uppercase tracking-wider mb-1">Machine Balance</p>
                  <p className="font-medium">${withdrawal.machine_balance.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 uppercase tracking-wider mb-1">Commission Deal</p>
                  <p className="font-medium">Standard</p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">Transaction Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-500 uppercase tracking-wider mb-1">Date</p>
                  <p className="font-medium">{new Date(withdrawal.date).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 uppercase tracking-wider mb-1">Withdrawn By</p>
                  <p className="font-medium">{withdrawal.withdrawn_by.emp_name} ({withdrawal.withdrawn_by.emp_id})</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 uppercase tracking-wider mb-1">Assigned By</p>
                  <p className="font-medium">{withdrawal.task_assigned_by}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 uppercase tracking-wider mb-1">Machine Status</p>
                  <p className={`font-medium ${
                    withdrawal.status === 'Active' ? 'text-green-600' : 'text-gray-600'
                  }`}>
                    {withdrawal.status}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Receipt and Remarks */}
          <div>
            <div className="mb-8 bg-gray-50 p-4 rounded-lg">
              <h2 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">Receipt</h2>
              <div className="flex flex-col items-center">
                <div className="mb-4 w-full h-48 bg-gray-200 rounded-md overflow-hidden flex items-center justify-center">
                  {withdrawal.uploaded_receipt_image ? (
                    <img 
                      src={withdrawal.uploaded_receipt_image} 
                      alt="Withdrawal receipt" 
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <div className="text-gray-500 flex flex-col items-center">
                      <FaFileImage className="text-4xl mb-2" />
                      <p>No receipt image available</p>
                    </div>
                  )}
                </div>
                <button
                  onClick={handleDownload}
                  className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center justify-center"
                >
                  <FaDownload className="mr-2" />
                  Download Receipt
                </button>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h2 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">Remarks</h2>
              <p className="text-gray-700">{withdrawal.remarks}</p>
            </div>

            <div className="mt-6 bg-gray-50 p-4 rounded-lg">
              <h2 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">Actions</h2>
              <div className="flex flex-wrap gap-3">
                {withdrawal.actions.map((action, index) => (
                  <button
                    key={index}
                    className={`px-4 py-2 rounded-md ${
                      action === 'Delete' 
                        ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                        : action === 'Edit'
                        ? 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {action}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { TRTWithdraws, WithdrawalDetail };