import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { trtDeposits } from '../../../masterdata/trtDepositsData';
import { FaHome, FaChevronRight, FaArrowLeft, FaPrint, FaDownload, FaReceipt } from "react-icons/fa";
import { Link } from 'react-router-dom';

const TRTDepositDetails = () => {
  const { receiptId } = useParams();
  const navigate = useNavigate();
  
  // Find the deposit with matching receipt_id
  const deposit = trtDeposits.find(deposit => deposit.receipt_id === receiptId);
  
  if (!deposit) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Deposit Not Found</h1>
        <p className="text-gray-600 mb-4">The deposit record you're looking for doesn't exist.</p>
        <button 
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center text-gray-600 text-sm pb-4">
        <FaHome className="mr-1 text-blue-500" />
        <Link to="/" className="hover:underline">Home</Link>
        <FaChevronRight className="mx-2 text-gray-400" />
        <Link to="/machines" className="hover:underline">Machines</Link>
        <FaChevronRight className="mx-2 text-gray-400" />
        <Link to="/trt-deposits" className="hover:underline">TRT Deposits</Link>
        <FaChevronRight className="mx-2 text-gray-400" />
        <span className="text-orange-500">Deposit Details</span>
      </div>

      {/* Header with Back Button */}
      <div className="flex justify-between items-center mb-6">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-blue-600 hover:text-blue-800"
        >
          <FaArrowLeft className="mr-2" /> Back to Deposits
        </button>
        <div className="flex space-x-3">
          <button className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
            <FaPrint className="mr-2" /> Print
          </button>
          <button className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
            <FaDownload className="mr-2" /> Export
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Status Header */}
        <div className={`p-4 ${deposit.deposit_status === 'Completed' ? 'bg-green-600' : 'bg-yellow-500'} text-white`}>
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold">Deposit Receipt: {deposit.receipt_id}</h1>
            <span className="px-3 py-1 bg-white rounded-full text-sm font-medium 
              ${deposit.deposit_status === 'Completed' ? 'text-green-600' : 'text-yellow-600'}">
              {deposit.deposit_status}
            </span>
          </div>
          <p className="text-sm opacity-90 mt-1">Deposited on {deposit.date}</p>
        </div>

        {/* Deposit Details */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Machine Information */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">Machine Information</h2>
            <div>
              <p className="text-sm text-gray-500">Machine Name</p>
              <p className="font-medium">{deposit.machine_name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Machine Model</p>
              <p className="font-medium">{deposit.machine_model}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Vendor</p>
              <p className="font-medium">{deposit.vendor_name} ({deposit.vendor_id})</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Location</p>
              <p className="font-medium">{deposit.location}, {deposit.region}</p>
            </div>
          </div>

          {/* Financial Information */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">Financial Details</h2>
            <div>
              <p className="text-sm text-gray-500">Carrying Amount</p>
              <p className="font-medium">${deposit.carrying_amount.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Deposit Amount</p>
              <p className="font-bold text-blue-600 text-xl">${deposit.deposit_amount.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Machine Balance</p>
              <p className="font-medium">${deposit.machine_balance.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Status</p>
              <p className="font-medium">{deposit.status}</p>
            </div>
          </div>

          {/* Transaction Details */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">Transaction Details</h2>
            <div>
              <p className="text-sm text-gray-500">Deposited By</p>
              <p className="font-medium">{deposit.deposited_by.emp_name} ({deposit.deposited_by.emp_id})</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Task Assigned By</p>
              <p className="font-medium">{deposit.task_assigned_by}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Date</p>
              <p className="font-medium">{deposit.date}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Receipt Image</p>
              <div className="mt-2">
                <a 
                  href={deposit.uploaded_receipt_image} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center text-blue-600 hover:underline"
                >
                  <FaReceipt className="mr-2" /> View Receipt Image
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Remarks and Actions */}
        <div className="p-6 border-t border-gray-200">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Remarks</h2>
            <p className="text-gray-700 bg-gray-50 p-3 rounded-md">{deposit.remarks}</p>
          </div>

          <div className="flex justify-end space-x-3">
            <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300">
              Edit Deposit
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Verify Deposit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TRTDepositDetails;