import React from 'react';
import { incomeData } from '../../../masterdata/accounts/incomeData';
import { paymentsData } from '../../../masterdata/accounts/paymentsData';
import { purchaseData } from '../../../masterdata/accounts/purchaseData';
import { salaryAccounts } from '../../../masterdata/accounts/salaryAccountData';

const AccountsOverview = () => {
  // Calculate totals
  const totalIncome = incomeData.reduce((sum, item) => sum + item.received_amount, 0);
  const totalPayments = paymentsData.reduce((sum, item) => sum + item.paid_amount, 0);
  const totalPurchases = purchaseData.reduce((sum, item) => sum + item.purchase_amount, 0);
  const totalSalaries = salaryAccounts.reduce((sum, item) => sum + item.paid_amount, 0);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-blue-700">Financial Data Overview</h1>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
          <h3 className="text-gray-500 font-medium">Total Income</h3>
          <p className="text-2xl font-bold">${totalIncome.toLocaleString()}</p>
          <p className="text-green-500 text-sm">{incomeData.length} transactions</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-red-500">
          <h3 className="text-gray-500 font-medium">Total Payments</h3>
          <p className="text-2xl font-bold">${totalPayments.toLocaleString()}</p>
          <p className="text-red-500 text-sm">{paymentsData.length} payments</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500">
          <h3 className="text-gray-500 font-medium">Total Purchases</h3>
          <p className="text-2xl font-bold">${totalPurchases.toLocaleString()}</p>
          <p className="text-purple-500 text-sm">{purchaseData.length} purchases</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-yellow-500">
          <h3 className="text-gray-500 font-medium">Total Salaries</h3>
          <p className="text-2xl font-bold">${totalSalaries.toLocaleString()}</p>
          <p className="text-yellow-500 text-sm">{salaryAccounts.length} employees</p>
        </div>
      </div>
      
      {/* Income Data */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4 text-blue-600">Income Summary</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vendor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Branch</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Purpose</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Mode</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {incomeData.map((item, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium">{item.vendor_name}</div>
                    <div className="text-sm text-gray-500">{item.vendor_id}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>{item.branch}</div>
                    <div className="text-sm text-gray-500">{item.region}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-bold">${item.received_amount.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">{item.purpose}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.mode_of_payment}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Payments Data */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4 text-red-600">Payments Summary</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vendor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Paid To</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Purpose</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Approved By</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paymentsData.map((item, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium">{item.vendor_name}</div>
                    <div className="text-sm text-gray-500">{item.branch}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>{item.paid_to}</div>
                    <div className="text-sm text-gray-500">{item.receiver_name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-bold text-red-600">${item.paid_amount.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800">{item.purpose_of_payment}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.approved_by}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Combined Financial Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Purchases */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 text-purple-600">Purchases Summary</h2>
          <div className="space-y-4">
            {purchaseData.map((item, index) => (
              <div key={index} className="border-b pb-4 last:border-b-0">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{item.product_details.product_name}</h3>
                    <p className="text-sm text-gray-500">Quantity: {item.product_details.quantity}</p>
                  </div>
                  <span className="font-bold text-purple-600">${item.purchase_amount.toLocaleString()}</span>
                </div>
                <p className="text-sm mt-2 text-gray-600">{item.purpose}</p>
                <div className="flex justify-between mt-2 text-xs">
                  <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded">{item.product_status}</span>
                  <span className="text-gray-500">Approved by: {item.approved_by}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Salaries */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 text-yellow-600">Salary Payments</h2>
          <div className="space-y-4">
            {salaryAccounts.map((item, index) => (
              <div key={index} className="border-b pb-4 last:border-b-0">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{item.emp_name}</h3>
                    <p className="text-sm text-gray-500">{item.designation} - {item.department}</p>
                  </div>
                  <span className="font-bold text-yellow-600">${item.paid_amount.toLocaleString()}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
                  <div>
                    <span className="text-gray-500">Working Days:</span> {item.working_days}
                  </div>
                  <div>
                    <span className="text-gray-500">Deductions:</span> ${(item.salary_advance + item.other_deductions).toLocaleString()}
                  </div>
                </div>
                <p className="text-xs mt-2 text-gray-500">{item.remarks}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Regional Breakdown */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4 text-green-600">Regional Financial Overview</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Region</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Income</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payments</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Purchases</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Net</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {Array.from(new Set([
                ...incomeData.map(item => item.region),
                ...paymentsData.map(item => item.region),
                ...purchaseData.map(item => item.region)
              ])).map(region => {
                const regionIncome = incomeData
                  .filter(item => item.region === region)
                  .reduce((sum, item) => sum + item.received_amount, 0);
                
                const regionPayments = paymentsData
                  .filter(item => item.region === region)
                  .reduce((sum, item) => sum + item.paid_amount, 0);
                
                const regionPurchases = purchaseData
                  .filter(item => item.region === region)
                  .reduce((sum, item) => sum + item.purchase_amount, 0);
                
                const net = regionIncome - regionPayments - regionPurchases;
                
                return (
                  <tr key={region}>
                    <td className="px-6 py-4 whitespace-nowrap font-medium">{region}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-green-600">${regionIncome.toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-red-600">${regionPayments.toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-purple-600">${regionPurchases.toLocaleString()}</td>
                    <td className={`px-6 py-4 whitespace-nowrap font-bold ${net >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      ${net.toLocaleString()}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AccountsOverview;