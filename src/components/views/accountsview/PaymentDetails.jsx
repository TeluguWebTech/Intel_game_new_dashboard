import React from 'react';
import { paymentsData } from '../../../masterdata/accounts/paymentsData';
import { FaHome, FaChevronRight, FaPrint, FaArrowLeft, FaPhone, FaFileAlt } from "react-icons/fa";
import { Link, useParams, useNavigate } from 'react-router-dom';

const PaymentDetails = () => {
  const { vendorId } = useParams();
  const navigate = useNavigate();
  
  // Find the payment record with matching vendor_id
  const paymentRecord = paymentsData.find(item => item.vendor_id === vendorId);
  
  if (!paymentRecord) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error! </strong>
          <span className="block sm:inline">Payment record not found.</span>
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
        <Link to="/accounts/payments" className="hover:underline">Payments</Link>
        <FaChevronRight className="mx-2 text-gray-400" />
        <span className="text-orange-500">{paymentRecord.vendor_id}</span>
      </div>
      
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-blue-600 hover:text-blue-800"
        >
          <FaArrowLeft className="mr-2" /> Back to Payments
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
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-2xl font-bold text-white">{paymentRecord.vendor_name}</h1>
              <p className="text-blue-100">{paymentRecord.branch} • {paymentRecord.region}</p>
            </div>
            <div className="mt-4 md:mt-0 bg-white/10 px-4 py-2 rounded-lg">
              <p className="text-white font-medium">Payment ID: {paymentRecord.vendor_id}</p>
              <p className="text-blue-100 text-sm">Auth: {paymentRecord.authorization_id}</p>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Payment Summary */}
          <div className="lg:col-span-2">
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h2 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4 flex items-center">
                <FaFileAlt className="mr-2 text-blue-600" />
                Payment Summary
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Payment Date</p>
                  <p className="font-medium">{paymentRecord.date}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Purpose</p>
                  <p className="font-medium">{paymentRecord.purpose_of_payment}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Amount Paid</p>
                  <p className="text-xl font-bold text-green-600">${paymentRecord.paid_amount.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Payment Status</p>
                  <p className="font-medium text-green-600">Completed</p>
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">Purpose Description</h2>
              <p className="text-gray-700">{paymentRecord.purpose_description}</p>
            </div>
          </div>
          
          {/* Right Column - Transaction Details */}
          <div>
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h2 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">Transaction Details</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Paid To</p>
                  <p className="font-medium">{paymentRecord.paid_to}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Receiver</p>
                  <p className="font-medium">{paymentRecord.receiver_name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Receiver Contact</p>
                  <div className="flex items-center">
                    <FaPhone className="mr-2 text-gray-400 text-sm" />
                    <a href={`tel:${paymentRecord.receiver_contact}`} className="font-medium hover:text-blue-600">
                      {paymentRecord.receiver_contact}
                    </a>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Receiver ID</p>
                  <p className="font-medium">{paymentRecord.receiver_id}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h2 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">Authorization</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Authorized By</p>
                  <p className="font-medium">{paymentRecord.authorization_name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Approved By</p>
                  <p className="font-medium">{paymentRecord.approved_by}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Authorization ID</p>
                  <p className="font-medium">{paymentRecord.authorization_id}</p>
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

export default PaymentDetails;