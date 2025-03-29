import React from 'react';
import { purchaseData } from '../../../masterdata/accounts/purchaseData';
import { FaHome, FaChevronRight, FaPrint, FaArrowLeft, FaBox } from "react-icons/fa";
import { Link, useParams, useNavigate } from 'react-router-dom';

const PurchaseDetailRecord = () => {
  const { vendorId } = useParams();
  const navigate = useNavigate();
  
  const purchaseRecord = purchaseData.find(item => item.vendor_id === vendorId);
  
  if (!purchaseRecord) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error! </strong>
          <span className="block sm:inline">Purchase record not found.</span>
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
        <Link to="/accounts/transactions" className="hover:underline">Transactions</Link>
        <FaChevronRight className="mx-2 text-gray-400" />
        <span className="text-orange-500">Purchase Detail</span>
      </div>
      
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-blue-600 hover:text-blue-800"
        >
          <FaArrowLeft className="mr-2" /> Back to Transactions
        </button>
        <button
          onClick={handlePrint}
          className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
        >
          <FaPrint className="mr-2" /> Print Receipt
        </button>
      </div>
      
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-600 to-orange-700 p-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-white">{purchaseRecord.vendor_name}</h1>
              <p className="text-orange-100">{purchaseRecord.branch} • {purchaseRecord.region}</p>
            </div>
            <div className="bg-white/10 px-4 py-2 rounded-lg">
              <p className="text-white font-medium">Purchase ID: {purchaseRecord.vendor_id}</p>
              <p className="text-orange-100 text-sm">Date: {purchaseRecord.date}</p>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div>
            <div className="bg-orange-50 p-4 rounded-lg mb-6">
              <h2 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">Purchase Summary</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Total Amount</p>
                  <p className="text-2xl font-bold text-orange-600">${purchaseRecord.purchase_amount.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Payment Mode</p>
                  <p className="font-medium">{purchaseRecord.mode_of_payment}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Purpose</p>
                  <p className="font-medium">{purchaseRecord.purpose}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <p className="font-medium">{purchaseRecord.product_status}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Column */}
          <div>
            <div className="bg-orange-50 p-4 rounded-lg mb-6">
              <h2 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4 flex items-center">
                <FaBox className="mr-2 text-orange-600" />
                Product Details
              </h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Product Name</p>
                  <p className="font-medium">{purchaseRecord.product_details.product_name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Product ID</p>
                  <p className="font-medium">{purchaseRecord.product_details.product_id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Quantity</p>
                  <p className="font-medium">{purchaseRecord.product_details.quantity}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Unit Price</p>
                  <p className="font-medium">${purchaseRecord.product_details.unit_price.toLocaleString()}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-orange-50 p-4 rounded-lg">
              <h2 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">Transaction Details</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Raised By</p>
                  <p className="font-medium">{purchaseRecord.raised_by}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Department</p>
                  <p className="font-medium">{purchaseRecord.department}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Approved By</p>
                  <p className="font-medium">{purchaseRecord.approved_by}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Description</p>
                  <p className="text-gray-700">{purchaseRecord.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
            <span>Last updated: {new Date().toLocaleDateString()}</span>
            <span>System ID: {Math.random().toString(36).substring(2, 10).toUpperCase()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseDetailRecord;