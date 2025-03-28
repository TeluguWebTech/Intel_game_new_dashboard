import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { clientSalesData } from '../../../masterdata/clientSalesData';
import { Calendar } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

export const ClientSalesDetail = () => {
  const { clientId } = useParams();
  const client = clientSalesData.find(c => c.client_id === clientId);
  const [dateFilter, setDateFilter] = useState('all');
  const [showStartCalendar, setShowStartCalendar] = useState(false);
  const [showEndCalendar, setShowEndCalendar] = useState(false);
  const [customStartDate, setCustomStartDate] = useState('');
  const [customEndDate, setCustomEndDate] = useState('');

  if (!client) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
        <div className="text-center max-w-md bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Client not found</h2>
          <p className="text-gray-600 mb-5">The client you're looking for doesn't exist or may have been removed.</p>
          <Link 
            to="/client-sales" 
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  // Filter transactions based on date selection
  const filterTransactions = () => {
    let filtered = [...client.transactions];
    
    if (dateFilter === 'custom' && customStartDate && customEndDate) {
      filtered = filtered.filter(txn => 
        txn.date >= customStartDate && txn.date <= customEndDate
      );
    } else if (dateFilter === 'last7') {
      const date = new Date();
      date.setDate(date.getDate() - 7);
      const lastWeek = date.toISOString().split('T')[0];
      filtered = filtered.filter(txn => txn.date >= lastWeek);
    } else if (dateFilter === 'last30') {
      const date = new Date();
      date.setDate(date.getDate() - 30);
      const lastMonth = date.toISOString().split('T')[0];
      filtered = filtered.filter(txn => txn.date >= lastMonth);
    } else if (dateFilter === 'thisMonth') {
      const date = new Date();
      const firstDay = new Date(date.getFullYear(), date.getMonth(), 1)
        .toISOString().split('T')[0];
      filtered = filtered.filter(txn => txn.date >= firstDay);
    }
    
    return filtered;
  };

  const filteredTransactions = filterTransactions();
  
  // Calculate totals from filtered transactions
  const totalTransactions = filteredTransactions.length;
  const totalRevenue = filteredTransactions.reduce((sum, txn) => sum + txn.daily_revenue, 0);
  const totalVendorCut = filteredTransactions.reduce((sum, txn) => sum + txn.vendor_cut, 0);
  const totalClientCut = filteredTransactions.reduce((sum, txn) => sum + txn.client_cut, 0);

  const handleStartDateSelect = (date) => {
    setCustomStartDate(date.toISOString().split('T')[0]);
    setShowStartCalendar(false);
  };

  const handleEndDateSelect = (date) => {
    setCustomEndDate(date.toISOString().split('T')[0]);
    setShowEndCalendar(false);
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Back button */}
        <div className="mb-6">
          <Link 
            to="/client-sales" 
            className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors font-medium"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Sales Dashboard
          </Link>
        </div>

        {/* Client Header */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8 border border-gray-100">
          <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div className="flex-shrink-0">
                <img 
                  src={client.profile_img} 
                  alt={client.client_name}
                  className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                />
              </div>
              <div className="flex-grow">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800">{client.client_name}</h1>
                    <p className="text-gray-500">ID: {client.client_id}</p>
                  </div>
                  <span className={`mt-2 md:mt-0 inline-block px-3 py-1 rounded-full text-sm font-medium ${
                    client.total_revenue > 600000 ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' :
                    client.total_revenue > 300000 ? 'bg-blue-100 text-blue-800 border border-blue-200' :
                    'bg-amber-100 text-amber-800 border border-amber-200'
                  }`}>
                    {client.total_revenue > 600000 ? 'High Performance' : 
                     client.total_revenue > 300000 ? 'Medium Performance' : 'Low Performance'}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-lg border border-gray-200 shadow-sm">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Total Revenue</p>
                    <p className="text-lg md:text-xl font-bold text-emerald-600">${client.total_revenue.toLocaleString()}</p>
                  </div>
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-lg border border-gray-200 shadow-sm">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Commission</p>
                    <p className="text-lg md:text-xl font-bold text-blue-600">{client.commission_percentage}%</p>
                  </div>
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-lg border border-gray-200 shadow-sm">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Vendor Cut</p>
                    <p className="text-lg md:text-xl font-bold text-purple-600">${client.vendor_earnings.toLocaleString()}</p>
                  </div>
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-lg border border-gray-200 shadow-sm">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Client Cut</p>
                    <p className="text-lg md:text-xl font-bold text-cyan-600">${client.client_earnings.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Date Filter Controls */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8 p-6 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Filter Transactions</h2>
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Time Period</label>
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Time</option>
                <option value="last7">Last 7 Days</option>
                <option value="last30">Last 30 Days</option>
                <option value="thisMonth">This Month</option>
                <option value="custom">Custom Range</option>
              </select>
            </div>
            
            {dateFilter === 'custom' && (
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                  <input
                    type="text"
                    value={customStartDate}
                    readOnly
                    onClick={() => setShowStartCalendar(!showStartCalendar)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer"
                    placeholder="Select start date"
                  />
                  {showStartCalendar && (
                    <div className="absolute z-10 mt-1 shadow-2xl rounded-lg overflow-hidden">
                      <Calendar
                        date={customStartDate ? new Date(customStartDate) : new Date()}
                        onChange={handleStartDateSelect}
                      />
                    </div>
                  )}
                </div>
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                  <input
                    type="text"
                    value={customEndDate}
                    readOnly
                    onClick={() => setShowEndCalendar(!showEndCalendar)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer"
                    placeholder="Select end date"
                  />
                  {showEndCalendar && (
                    <div className="absolute z-10 mt-1 shadow-2xl rounded-lg overflow-hidden">
                      <Calendar
                        date={customEndDate ? new Date(customEndDate) : new Date()}
                        onChange={handleEndDateSelect}
                      />
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Transaction Summary */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8 border border-gray-100">
          <div className="p-6 md:p-8">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Transaction Summary</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200 shadow-sm">
                <p className="text-sm font-medium text-gray-600">Total Transactions</p>
                <p className="text-2xl font-bold text-blue-800">{totalTransactions}</p>
                <p className="text-xs text-gray-500 mt-1">Filtered results</p>
              </div>
              <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-4 rounded-lg border border-emerald-200 shadow-sm">
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-emerald-800">${totalRevenue.toLocaleString()}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {client.transactions.length > 0 ? 
                    `${Math.round((totalRevenue / client.total_revenue) * 100)}% of total` : '0% of total'
                  }
                </p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg border border-purple-200 shadow-sm">
                <p className="text-sm font-medium text-gray-600">Total Vendor Cut</p>
                <p className="text-2xl font-bold text-purple-800">${totalVendorCut.toLocaleString()}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {totalRevenue > 0 ? 
                    `${Math.round((totalVendorCut / totalRevenue) * 100)}% of revenue` : '0% of revenue'
                  }
                </p>
              </div>
              <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 p-4 rounded-lg border border-cyan-200 shadow-sm">
                <p className="text-sm font-medium text-gray-600">Total Client Cut</p>
                <p className="text-2xl font-bold text-cyan-800">${totalClientCut.toLocaleString()}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {totalRevenue > 0 ? 
                    `${Math.round((totalClientCut / totalRevenue) * 100)}% of revenue` : '0% of revenue'
                  }
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
          <div className="px-6 py-4 border-b border-gray-200 flex flex-col md:flex-row md:items-center md:justify-between bg-gray-50">
            <h2 className="text-xl font-bold text-gray-800">Transaction History</h2>
            <div className="mt-2 md:mt-0 flex items-center">
              <span className="text-sm text-gray-500 mr-3">
                Showing {totalTransactions} of {client.transactions.length} records
              </span>
              {dateFilter !== 'all' && (
                <button 
                  onClick={() => {
                    setDateFilter('all');
                    setCustomStartDate('');
                    setCustomEndDate('');
                  }}
                  className="text-sm text-blue-600 hover:text-blue-800 hover:underline font-medium"
                >
                  Clear filters
                </button>
              )}
            </div>
          </div>
          
          {filteredTransactions.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Revenue
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Vendor Cut
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Client Cut
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Commission
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredTransactions.map((txn, index) => (
                    <tr key={index} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {new Date(txn.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                            weekday: 'short'
                          })}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-semibold text-emerald-600">${txn.daily_revenue.toLocaleString()}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-semibold text-purple-600">${txn.vendor_cut.toLocaleString()}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-semibold text-cyan-600">${txn.client_cut.toLocaleString()}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {((txn.vendor_cut / txn.daily_revenue) * 100).toFixed(1)}%
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-8 text-center bg-gray-50">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="mt-2 text-lg font-medium text-gray-900">No transactions found</h3>
              <p className="mt-1 text-gray-500">
                {dateFilter === 'all' 
                  ? "This client doesn't have any transactions yet."
                  : "No transactions match your selected filters."}
              </p>
              {dateFilter !== 'all' && (
                <button
                  onClick={() => {
                    setDateFilter('all');
                    setCustomStartDate('');
                    setCustomEndDate('');
                  }}
                  className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Clear filters
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};