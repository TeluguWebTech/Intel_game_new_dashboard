import React from 'react';
import { salaryAccounts } from '../../../masterdata/accounts/salaryAccountData';
import { FaHome, FaChevronRight, FaPrint, FaArrowLeft, FaUserTie } from "react-icons/fa";
import { Link, useParams, useNavigate } from 'react-router-dom';

const SalaryDetailRecord = () => {
  const { empId } = useParams();
  const navigate = useNavigate();
  
  const salaryRecord = salaryAccounts.find(item => item.emp_id === empId);
  
  if (!salaryRecord) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error! </strong>
          <span className="block sm:inline">Salary record not found.</span>
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
        <span className="text-orange-500">Salary Detail</span>
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
          <FaPrint className="mr-2" /> Print Payslip
        </button>
      </div>
      
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-white">{salaryRecord.emp_name}</h1>
              <p className="text-blue-100">{salaryRecord.designation} • {salaryRecord.department}</p>
            </div>
            <div className="bg-white/10 px-4 py-2 rounded-lg">
              <p className="text-white font-medium">Employee ID: {salaryRecord.emp_id}</p>
              <p className="text-blue-100 text-sm">Payment Date: {salaryRecord.date}</p>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div>
            <div className="bg-blue-50 p-4 rounded-lg mb-6">
              <h2 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4 flex items-center">
                <FaUserTie className="mr-2 text-blue-600" />
                Employee Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Designation</p>
                  <p className="font-medium">{salaryRecord.designation}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Department</p>
                  <p className="font-medium">{salaryRecord.department}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">HOD</p>
                  <p className="font-medium">{salaryRecord.HOD}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Working Days</p>
                  <p className="font-medium">{salaryRecord.working_days}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Column */}
          <div>
            <div className="bg-blue-50 p-4 rounded-lg mb-6">
              <h2 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">Salary Breakdown</h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Amount Payable</span>
                  <span className="font-medium">${salaryRecord.amount_payable.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Salary Advance</span>
                  <span className="font-medium text-red-600">-${salaryRecord.salary_advance.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Other Deductions</span>
                  <span className="font-medium text-red-600">-${salaryRecord.other_deductions.toLocaleString()}</span>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span className="text-sm font-medium text-gray-700">Net Salary</span>
                  <span className="text-lg font-bold text-blue-600">${salaryRecord.paid_amount.toLocaleString()}</span>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg">
              <h2 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">Payment Details</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Payment Method</p>
                  <p className="font-medium">{salaryRecord.payment_method}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Remarks</p>
                  <p className="text-gray-700">{salaryRecord.remarks}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Pending Payment</p>
                  <p className="font-medium">${salaryRecord.pending_payment.toLocaleString()}</p>
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

export default SalaryDetailRecord;