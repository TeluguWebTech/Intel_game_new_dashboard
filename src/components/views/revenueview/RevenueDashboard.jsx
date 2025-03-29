import { useState } from 'react';
import { clientSalesData } from '../../../masterdata/clientSalesData';
import { FaHome, FaChevronRight, FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
  


const RevenueDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'total_revenue', direction: 'desc' });
  const [expandedClient, setExpandedClient] = useState(null);
  const [dateRange, setDateRange] = useState('all');
  const [showCharts, setShowCharts] = useState(true);

  // Sort clients
  const sortedClients = [...clientSalesData].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  // Filter clients
  const filteredClients = sortedClients.filter(client => {
    // Search filter
    const matchesSearch = 
      client.client_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.client_id.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Date range filter (example implementation)
    let matchesDateRange = true;
    if (dateRange === 'last-week') {
      // Filter logic for last week would go here
    } else if (dateRange === 'last-month') {
      // Filter logic for last month would go here
    }
    
    return matchesSearch && matchesDateRange;
  });

  // Handle sort request
  const requestSort = (key) => {
    let direction = 'desc';
    if (sortConfig.key === key && sortConfig.direction === 'desc') {
      direction = 'asc';
    }
    setSortConfig({ key, direction });
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Calculate statistics
  const totalRevenue = filteredClients.reduce((sum, client) => sum + client.total_revenue, 0);
  const totalVendorEarnings = filteredClients.reduce((sum, client) => sum + client.vendor_earnings, 0);
  const avgCommission = filteredClients.length > 0 
    ? filteredClients.reduce((sum, client) => sum + client.commission_percentage, 0) / filteredClients.length
    : 0;

  // Toggle client expansion
  const toggleClientExpansion = (clientId) => {
    setExpandedClient(expandedClient === clientId ? null : clientId);
  };

  // Mock chart data - in a real app you would generate this from your data
  const generateRevenueChartData = (client) => {
    return client.transactions.map(t => ({
      date: t.date,
      revenue: t.daily_revenue,
      vendor: t.vendor_cut,
      client: t.client_cut
    }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
          <div className="flex items-center text-gray-600 text-sm pb-4">
                        <FaHome className="mr-1 text-blue-500" />
                        <Link to="/" className="hover:underline">Home</Link>
                       
                        <FaChevronRight className="mx-2 text-gray-400" />
                        <span className="text-orange-500">Revenue</span>
                      </div>
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Revenue Dashboard</h1>
          <p className="text-gray-500 mt-1">Track and analyze client revenue performance</p>
        </div>
        <div className="mt-4 md:mt-0">
          <button 
            onClick={() => setShowCharts(!showCharts)}
            className="flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-800"
          >
            {showCharts ? 'Hide Charts' : 'Show Charts'}
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d={showCharts ? "M19 14l-7 7m0 0l-7-7m7 7V3" : "M5 10l7-7m0 0l7 7m-7-7v18"} />
            </svg>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      {showCharts && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-xl shadow-lg p-6 text-white">
            <h3 className="text-sm font-medium mb-1 opacity-90">Total Revenue</h3>
            <p className="text-2xl font-bold">{formatCurrency(totalRevenue)}</p>
            <div className="mt-4 h-2 bg-indigo-400 rounded-full">
              <div className="h-2 bg-white rounded-full" style={{ width: '75%' }}></div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
            <h3 className="text-sm font-medium mb-1 opacity-90">Vendor Earnings</h3>
            <p className="text-2xl font-bold">{formatCurrency(totalVendorEarnings)}</p>
            <div className="mt-4 h-2 bg-purple-400 rounded-full">
              <div className="h-2 bg-white rounded-full" style={{ width: '45%' }}></div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-teal-500 to-teal-600 rounded-xl shadow-lg p-6 text-white">
            <h3 className="text-sm font-medium mb-1 opacity-90">Avg. Commission</h3>
            <p className="text-2xl font-bold">{avgCommission.toFixed(1)}%</p>
            <div className="mt-4 h-2 bg-teal-400 rounded-full">
              <div className="h-2 bg-white rounded-full" style={{ width: `${avgCommission}%` }}></div>
            </div>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Search */}
          <div className="md:col-span-2">
            <label htmlFor="search" className="block text-sm font-medium text-gray-600 mb-2">
              Search Clients
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                id="search"
                placeholder="Search by client name or ID..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          {/* Date Range */}
          <div>
            <label htmlFor="dateRange" className="block text-sm font-medium text-gray-600 mb-2">
              Date Range
            </label>
            <select
              id="dateRange"
              className="block w-full px-3 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
            >
              <option value="all">All Time</option>
              <option value="last-week">Last 7 Days</option>
              <option value="last-month">Last 30 Days</option>
              <option value="last-quarter">Last Quarter</option>
            </select>
          </div>
          
          {/* Sort */}
          <div>
            <label htmlFor="sort" className="block text-sm font-medium text-gray-600 mb-2">
              Sort By
            </label>
            <div className="flex rounded-md shadow-sm">
              <button
                onClick={() => requestSort('total_revenue')}
                className={`flex-1 px-3 py-2 rounded-l-lg text-sm font-medium ${
                  sortConfig.key === 'total_revenue'
                    ? 'bg-indigo-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Revenue {sortConfig.key === 'total_revenue' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </button>
              <button
                onClick={() => requestSort('client_name')}
                className={`flex-1 px-3 py-2 rounded-r-lg text-sm font-medium ${
                  sortConfig.key === 'client_name'
                    ? 'bg-indigo-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Name {sortConfig.key === 'client_name' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Results Header */}
      <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center space-y-2 md:space-y-0">
        <h2 className="text-lg font-semibold text-gray-800">
          {filteredClients.length} {filteredClients.length === 1 ? 'Client' : 'Clients'}
          <span className="text-gray-500 font-normal ml-2">sorted by {sortConfig.key.replace('_', ' ')} ({sortConfig.direction})</span>
        </h2>
        <div className="flex items-center space-x-4">
          <div className="text-sm bg-blue-50 text-blue-800 px-3 py-1 rounded-full">
            Total Revenue: <span className="font-bold">{formatCurrency(totalRevenue)}</span>
          </div>
          <button className="text-sm flex items-center text-indigo-600 hover:text-indigo-800">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Export
          </button>
        </div>
      </div>
      
      {/* Clients List */}
      <div className="space-y-4">
        {filteredClients.length > 0 ? (
          filteredClients.map(client => (
            <div key={client.client_id} className="bg-white rounded-xl shadow-md overflow-hidden transition-all hover:shadow-lg">
              {/* Client Summary */}
              <div 
                className="p-6 cursor-pointer"
                onClick={() => toggleClientExpansion(client.client_id)}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <img 
                        src={client.profile_img} 
                        alt={client.client_name} 
                        className="w-12 h-12 rounded-full object-cover border-2 border-white shadow"
                      />
                      <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                        client.total_revenue > 600000 ? 'bg-green-500' : 
                        client.total_revenue > 400000 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}></span>
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-gray-800">{client.client_name}</h2>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                          ID: {client.client_id}
                        </span>
                        <span className="text-xs bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded">
                          {client.transactions.length} days
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center md:text-right">
                      <p className="text-sm text-gray-500">Revenue</p>
                      <p className="text-lg font-bold text-indigo-600">
                        {formatCurrency(client.total_revenue)}
                      </p>
                    </div>
                    <div className="text-center md:text-right">
                      <p className="text-sm text-gray-500">Commission</p>
                      <p className="text-lg font-bold text-purple-600">
                        {client.commission_percentage}%
                      </p>
                    </div>
                    <div className="text-center md:text-right">
                      <p className="text-sm text-gray-500">Vendor</p>
                      <p className="text-lg font-bold text-teal-600">
                        {formatCurrency(client.vendor_earnings)}
                      </p>
                    </div>
                    <div className="flex items-center justify-center md:justify-end">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleClientExpansion(client.client_id);
                        }}
                        className="flex items-center text-sm text-gray-500 hover:text-indigo-600"
                      >
                        {expandedClient === client.client_id ? 'Less' : 'More'}
                        <svg 
                          className={`w-4 h-4 ml-1 transition-transform ${
                            expandedClient === client.client_id ? 'transform rotate-180' : ''
                          }`}
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Expanded Details */}
              {expandedClient === client.client_id && (
                <div className="border-t border-gray-200 p-6 bg-gray-50">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div className="bg-white p-5 rounded-lg shadow-sm border-l-4 border-indigo-500">
                      <h3 className="text-sm font-medium text-gray-500 mb-2">Revenue Performance</h3>
                      <div className="h-40 flex items-center justify-center bg-gray-50 rounded mt-2">
                        {/* In a real app, you would render an actual chart here */}
                        <div className="text-center text-gray-400">
                          <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                          </svg>
                          Revenue chart would display here
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white p-5 rounded-lg shadow-sm border-l-4 border-purple-500">
                      <h3 className="text-sm font-medium text-gray-500 mb-2">Earnings Breakdown</h3>
                      <div className="space-y-3 mt-4">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-600">Vendor Cut</span>
                            <span className="font-medium text-purple-600">
                              {formatCurrency(client.vendor_earnings)}
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-purple-500 h-2 rounded-full" 
                              style={{ width: `${(client.vendor_earnings / client.total_revenue) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-600">Client Cut</span>
                            <span className="font-medium text-green-600">
                              {formatCurrency(client.client_earnings)}
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-green-500 h-2 rounded-full" 
                              style={{ width: `${(client.client_earnings / client.total_revenue) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white p-5 rounded-lg shadow-sm border-l-4 border-teal-500">
                      <h3 className="text-sm font-medium text-gray-500 mb-2">Key Metrics</h3>
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <div className="text-center">
                          <p className="text-2xl font-bold text-blue-600">
                            {formatCurrency(client.total_revenue / client.transactions.length)}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">Daily Avg.</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-orange-500">
                            {Math.max(...client.transactions.map(t => t.daily_revenue)) === 
                             Math.min(...client.transactions.map(t => t.daily_revenue)) 
                              ? '—' 
                              : `${(
                                (Math.max(...client.transactions.map(t => t.daily_revenue)) - 
                                 Math.min(...client.transactions.map(t => t.daily_revenue))) / 
                                 Math.min(...client.transactions.map(t => t.daily_revenue)) * 100
                              ).toFixed(0)}%`}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">Revenue Variance</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-indigo-600">
                            {client.transactions.length}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">Days Tracked</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-green-600">
                            {client.commission_percentage}%
                          </p>
                          <p className="text-xs text-gray-500 mt-1">Commission</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Transactions Table */}
                  <div className="mb-4 flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-gray-800">Daily Transactions</h3>
                    <button className="text-sm flex items-center text-indigo-600 hover:text-indigo-800">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      Export
                    </button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date
                          </th>
                          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Daily Revenue
                          </th>
                          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Vendor Cut
                          </th>
                          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Client Cut
                          </th>
                          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Split
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {client.transactions.map((transaction, index) => (
                          <tr key={index} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {transaction.date}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900">
                              {formatCurrency(transaction.daily_revenue)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-purple-600">
                              {formatCurrency(transaction.vendor_cut)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-green-600">
                              {formatCurrency(transaction.client_cut)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                              <div className="flex items-center justify-end">
                                <span className="text-purple-600 text-xs font-medium mr-1">
                                  {client.commission_percentage}%
                                </span>
                                <div className="w-16 bg-gray-200 rounded-full h-1.5">
                                  <div 
                                    className="bg-gradient-to-r from-purple-500 to-green-500 h-1.5 rounded-full" 
                                    style={{ 
                                      width: '100%',
                                      background: `linear-gradient(90deg, #8b5cf6 ${client.commission_percentage}%, #10b981 ${client.commission_percentage}%)`
                                    }}
                                  ></div>
                                </div>
                                <span className="text-green-600 text-xs font-medium ml-1">
                                  {100 - client.commission_percentage}%
                                </span>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">No matching clients found</h3>
            <p className="mt-1 text-gray-500">
              Try adjusting your search or filters to find what you're looking for.
            </p>
            <button 
              onClick={() => {
                setSearchTerm('');
                setDateRange('all');
              }}
              className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RevenueDashboard;