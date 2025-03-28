import React, { useState } from 'react';
import { clientSalesData } from '../../../masterdata/clientSalesData';

const RevenueTransactions = () => {
  const [selectedClient, setSelectedClient] = useState('all');
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  // Flatten all transactions from all clients
  const allTransactions = clientSalesData.flatMap(client => 
    client.transactions.map(transaction => ({
      ...transaction,
      client_name: client.client_name,
      client_id: client.client_id,
      profile_img: client.profile_img
    }))
  );

  // Filter transactions
  const filteredTransactions = allTransactions.filter(transaction => {
    const matchesClient = selectedClient === 'all' || transaction.client_id === selectedClient;
    const transactionDate = new Date(transaction.date);
    const matchesDate = 
      (!startDate || transactionDate >= startDate) && 
      (!endDate || transactionDate <= endDate);
    return matchesClient && matchesDate;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Client Transactions</h1>
      
      {/* Compact Filter Row */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <div className="flex-1 min-w-[200px]">
          <label htmlFor="client-filter" className="sr-only">Filter by Client</label>
          <select
            id="client-filter"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm focus:ring-blue-500 focus:border-blue-500"
            value={selectedClient}
            onChange={(e) => setSelectedClient(e.target.value)}
          >
            <option value="all">All Clients</option>
            {clientSalesData.map(client => (
              <option key={client.client_id} value={client.client_id}>
                {client.client_name}
              </option>
            ))}
          </select>
        </div>
        
        <div className="flex items-center gap-2 flex-1 min-w-[200px]">
          <div className="flex-1">
            <label htmlFor="start-date" className="sr-only">Start Date</label>
            <input
              type="date"
              id="start-date"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm focus:ring-blue-500 focus:border-blue-500"
              onChange={(e) => setDateRange([e.target.value ? new Date(e.target.value) : null, endDate])}
            />
          </div>
          <span className="text-gray-500 text-sm">to</span>
          <div className="flex-1">
            <label htmlFor="end-date" className="sr-only">End Date</label>
            <input
              type="date"
              id="end-date"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm focus:ring-blue-500 focus:border-blue-500"
              onChange={(e) => setDateRange([startDate, e.target.value ? new Date(e.target.value) : null])}
            />
          </div>
        </div>
        
        <div className="text-sm text-gray-600 whitespace-nowrap">
          {filteredTransactions.length} transactions
        </div>
      </div>
      
      {/* Transactions Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Client
              </th>
              <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Revenue
              </th>
              <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Vendor Cut
              </th>
              <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Client Cut
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredTransactions.map((transaction, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-8 w-8">
                      <img className="h-8 w-8 rounded-full" src={transaction.profile_img} alt={transaction.client_name} />
                    </div>
                    <div className="ml-3">
                      <div className="text-sm font-medium text-gray-900">{transaction.client_name}</div>
                      <div className="text-xs text-gray-500">{transaction.client_id}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                  {new Date(transaction.date).toLocaleDateString()}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                  ${transaction.daily_revenue.toLocaleString()}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-red-600">
                  ${transaction.vendor_cut.toLocaleString()}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-green-600">
                  ${transaction.client_cut.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty State */}
      {filteredTransactions.length === 0 && (
        <div className="bg-gray-50 p-8 rounded-lg text-center mt-4">
          <p className="text-gray-500">No transactions found</p>
          <button 
            onClick={() => {
              setSelectedClient('all');
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

export default RevenueTransactions;