import React, { useState } from 'react';
import { trtDeposits } from '../../../masterdata/trtDepositsData';
import { trtWithdraws } from '../../../masterdata/trtWithdrawData';

const MachineReports = () => {
  const [activeTab, setActiveTab] = useState('deposits');
  const [timeRange, setTimeRange] = useState('all');

  // Calculate summary statistics
  const totalDeposits = trtDeposits.reduce((sum, deposit) => sum + deposit.deposit_amount, 0);
  const totalWithdrawals = trtWithdraws.reduce((sum, withdrawal) => sum + withdrawal.withdrawal_amount, 0);
  const completedDeposits = trtDeposits.filter(d => d.deposit_status === 'Completed').length;
  const pendingDeposits = trtDeposits.filter(d => d.deposit_status === 'Pending').length;
  const completedWithdrawals = trtWithdraws.filter(w => w.withdrawal_status === 'Completed').length;
  const pendingWithdrawals = trtWithdraws.filter(w => w.withdrawal_status === 'Pending').length;

  // Filter transactions by time range (example implementation)
  const filterTransactions = (transactions) => {
    const now = new Date();
    return transactions.filter(transaction => {
      const transactionDate = new Date(transaction.date);
      switch(timeRange) {
        case 'today':
          return transactionDate.toDateString() === now.toDateString();
        case 'week':
          const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          return transactionDate >= oneWeekAgo;
        case 'month':
          const oneMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
          return transactionDate >= oneMonthAgo;
        default:
          return true;
      }
    });
  };

  const filteredDeposits = filterTransactions(trtDeposits);
  const filteredWithdrawals = filterTransactions(trtWithdraws);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Financial Reports</h1>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
          <h3 className="text-gray-500 text-sm font-medium">Total Deposits</h3>
          <p className="text-2xl font-bold text-gray-800">${totalDeposits.toLocaleString()}</p>
          <div className="flex items-center mt-2">
            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
              {completedDeposits} completed
            </span>
            <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full ml-2">
              {pendingDeposits} pending
            </span>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-red-500">
          <h3 className="text-gray-500 text-sm font-medium">Total Withdrawals</h3>
          <p className="text-2xl font-bold text-gray-800">${totalWithdrawals.toLocaleString()}</p>
          <div className="flex items-center mt-2">
            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
              {completedWithdrawals} completed
            </span>
            <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full ml-2">
              {pendingWithdrawals} pending
            </span>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
          <h3 className="text-gray-500 text-sm font-medium">Net Transactions</h3>
          <p className="text-2xl font-bold text-gray-800">${(totalDeposits - totalWithdrawals).toLocaleString()}</p>
          <p className="text-sm text-gray-500 mt-1">Deposits minus Withdrawals</p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-purple-500">
          <h3 className="text-gray-500 text-sm font-medium">Total Transactions</h3>
          <p className="text-2xl font-bold text-gray-800">{trtDeposits.length + trtWithdraws.length}</p>
          <p className="text-sm text-gray-500 mt-1">{trtDeposits.length} deposits, {trtWithdraws.length} withdrawals</p>
        </div>
      </div>
      
      {/* Time Range Filter */}
      <div className="mb-6 flex flex-wrap items-center">
        <label className="mr-3 text-sm font-medium text-gray-700">Time Range:</label>
        <div className="flex space-x-2">
          {['all', 'today', 'week', 'month'].map(range => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1 text-sm rounded-md ${
                timeRange === range
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {range.charAt(0).toUpperCase() + range.slice(1)}
            </button>
          ))}
        </div>
      </div>
      
      {/* Tab Navigation */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('deposits')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'deposits'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Deposits ({filteredDeposits.length})
          </button>
          <button
            onClick={() => setActiveTab('withdrawals')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'withdrawals'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Withdrawals ({filteredWithdrawals.length})
          </button>
        </nav>
      </div>
      
      {/* Transactions Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {activeTab === 'deposits' ? 'Deposit' : 'Withdrawal'} ID
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Machine
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Location
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {(activeTab === 'deposits' ? filteredDeposits : filteredWithdrawals).map((transaction, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {transaction.receipt_id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{transaction.machine_name}</div>
                  <div className="text-sm text-gray-500">{transaction.machine_model}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{transaction.location}</div>
                  <div className="text-sm text-gray-500">{transaction.region}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <span className={activeTab === 'deposits' ? 'text-green-600' : 'text-red-600'}>
                    ${activeTab === 'deposits' 
                      ? transaction.deposit_amount.toLocaleString() 
                      : transaction.withdrawal_amount.toLocaleString()}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                    (activeTab === 'deposits' ? transaction.deposit_status : transaction.withdrawal_status) === 'Completed'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {activeTab === 'deposits' ? transaction.deposit_status : transaction.withdrawal_status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(transaction.date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-900">View</button>
                    <button className="text-gray-600 hover:text-gray-900">Edit</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Export Options */}
      <div className="mt-6 flex justify-end">
        <button className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          Export as CSV
        </button>
        <button className="ml-3 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          Export as PDF
        </button>
      </div>
    </div>
  );
};

export default MachineReports;