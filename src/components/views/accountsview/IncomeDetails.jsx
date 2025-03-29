import React from 'react';
import { incomeData } from '../../../masterdata/accounts/incomeData';
import { FaHome, FaChevronRight, FaPrint, FaArrowLeft } from "react-icons/fa";
import { Link, useParams, useNavigate } from 'react-router-dom';

const IncomeDetails = () => {
  const { vendorId } = useParams();
  const navigate = useNavigate();
  
  // Find the income record with matching vendor_id
  const incomeRecord = incomeData.find(item => item.vendor_id === vendorId);
  
  if (!incomeRecord) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error! </strong>
          <span className="block sm:inline">Income record not found.</span>
        </div>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center text-gray-600 text-sm pb-2">
        <FaHome className="mr-1 text-blue-500" />
        <Link to="/" className="hover:underline">Home</Link>
        <FaChevronRight className="mx-2 text-gray-400" />
        <Link to="/accounts" className="hover:underline">Accounts</Link>
        <FaChevronRight className="mx-2 text-gray-400" />
        <Link to="/accounts/income" className="hover:underline">Income</Link>
        <FaChevronRight className="mx-2 text-gray-400" />
        <span className="text-orange-500">{incomeRecord.vendor_id}</span>
      </div>
      
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-blue-600 hover:text-blue-800"
        >
          <FaArrowLeft className="mr-2" /> Back to Income Records
        </button>
        <button
          onClick={handlePrint}
          className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
        >
          <FaPrint className="mr-2" /> Print
        </button>
      </div>
      
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-blue-600 p-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-white">{incomeRecord.vendor_name}</h1>
              <p className="text-blue-100">{incomeRecord.branch} • {incomeRecord.region}</p>
            </div>
            <div className="bg-white text-blue-600 px-3 py-1 rounded-md font-bold">
              {incomeRecord.vendor_id}
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column */}
          <div>
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">Transaction Details</h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Date:</span>
                  <span className="font-medium">{incomeRecord.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Amount Received:</span>
                  <span className="font-bold text-green-600">${incomeRecord.received_amount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Purpose:</span>
                  <span className="font-medium">{incomeRecord.purpose}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Payment Mode:</span>
                  <span className="font-medium">{incomeRecord.mode_of_payment}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Column */}
          <div>
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">Personnel</h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Received By:</span>
                  <span className="font-medium">{incomeRecord.received_by}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Authorized By:</span>
                  <span className="font-medium">{incomeRecord.authorized_by}</span>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-md">
              <h3 className="font-semibold text-blue-800 mb-2">Notes</h3>
              <p className="text-gray-700">This transaction was processed on {incomeRecord.date} via {incomeRecord.mode_of_payment}. Please contact accounts department for any queries.</p>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
          <div className="flex justify-between items-center text-sm text-gray-500">
            <span>Last updated: {new Date().toLocaleDateString()}</span>
            <span>System ID: {Math.random().toString(36).substring(2, 10).toUpperCase()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncomeDetails;