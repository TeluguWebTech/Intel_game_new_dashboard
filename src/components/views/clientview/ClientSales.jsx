import { useState } from 'react';
import { clientSalesData } from '../../../masterdata/clientSalesData';
import { FaHome, FaChevronRight, FaPlus } from "react-icons/fa";

import { Link } from 'react-router-dom';

export const ClientSales = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('All Clients');

  const regions = ['All Clients', 'Western', 'Eastern', 'Central'];

  // Filter clients based on search term and region
  const filteredClients = clientSalesData.filter(client => {
    const matchesSearch = client.client_name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRegion = selectedRegion === 'All Clients' || 
                         (selectedRegion === 'Western' && ['Los Angeles', 'San Francisco'].some(city => client.client_name.includes(city))) ||
                         (selectedRegion === 'Eastern' && client.client_name.includes('New York')) ||
                         (selectedRegion === 'Central' && client.client_name.includes('Miami'));
    return matchesSearch && matchesRegion;
  });

  // Function to determine performance color based on revenue
  const getPerformanceColor = (revenue) => {
    if (revenue > 600000) return 'bg-emerald-50 text-emerald-800 border-emerald-200';
    if (revenue > 300000) return 'bg-blue-50 text-blue-800 border-blue-200';
    return 'bg-amber-50 text-amber-800 border-amber-200';
  };

  return (
    <div className="p-6 bg-gray-50 rounded-lg">
       <div className="flex items-center text-gray-600 text-sm ">
        <FaHome className="mr-1 text-blue-500" />
        <Link to="/" className="hover:underline">Home</Link>
        <FaChevronRight className="mx-2 text-gray-400" />
        <Link to="/clients" className="hover:underline">Clients</Link>
        <FaChevronRight className="mx-2 text-gray-400" />
        <span className="text-gray-500">Sales</span>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Sales Dashboard</h1>
          <p className="text-gray-500">Overview of client revenue and transactions</p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Search clients..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <svg
              className="absolute right-3 top-2.5 h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {regions.map(region => (
              <button
                key={region}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedRegion === region
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
                onClick={() => setSelectedRegion(region)}
              >
                {region}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Stats Summary */}
      {filteredClients.length > 0 && (
       <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
       <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
         <p className="text-gray-500 text-sm">Total Clients</p>
         <p className="text-2xl font-bold text-blue-600">{filteredClients.length}</p>
       </div>
       <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
         <p className="text-gray-500 text-sm">Total Revenue</p>
         <p className="text-2xl font-bold text-emerald-600">
           ${filteredClients.reduce((sum, client) => sum + client.total_revenue, 0).toLocaleString()}
         </p>
       </div>
       <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
         <p className="text-gray-500 text-sm">Avg. Commission</p>
         <p className="text-2xl font-bold text-amber-600">
           {filteredClients.length > 0 
             ? Math.round(filteredClients.reduce((sum, client) => sum + client.commission_percentage, 0) / filteredClients.length)
             : 0}%
         </p>
       </div>
       <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
         <p className="text-gray-500 text-sm">Vendor Earnings</p>
         <p className="text-2xl font-bold text-purple-600">
           ${filteredClients.reduce((sum, client) => sum + client.vendor_earnings, 0).toLocaleString()}
         </p>
       </div>
     </div>
      )}
      
      {/* Client Sales Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClients.length > 0 ? (
          filteredClients.map(client => (
            <div 
              key={client.client_id} 
              className={`border rounded-lg p-4 hover:shadow-md transition-all ${getPerformanceColor(client.total_revenue)}`}
            >
              <div className="flex justify-between items-start mb-3">
                <h2 className="text-xl font-semibold text-gray-800">{client.client_name}</h2>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  client.total_revenue > 600000 ? 'bg-emerald-100 text-emerald-800' :
                  client.total_revenue > 300000 ? 'bg-blue-100 text-blue-800' :
                  'bg-amber-100 text-amber-800'
                }`}>
                  {client.total_revenue > 600000 ? 'High' : client.total_revenue > 300000 ? 'Medium' : 'Low'}
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-white p-2 rounded border border-gray-100">
                  <p className="text-gray-500 text-xs">Total Revenue</p>
                  <p className="text-lg font-bold text-emerald-600">${client.total_revenue.toLocaleString()}</p>
                </div>
                <div className="bg-white p-2 rounded border border-gray-100">
                  <p className="text-gray-500 text-xs">Commission</p>
                  <p className="text-lg font-bold text-blue-600">{client.commission_percentage}%</p>
                </div>
                <div className="bg-white p-2 rounded border border-gray-100">
                  <p className="text-gray-500 text-xs">Vendor Cut</p>
                  <p className="text-lg font-bold text-purple-600">${client.vendor_earnings.toLocaleString()}</p>
                </div>
                <div className="bg-white p-2 rounded border border-gray-100">
                  <p className="text-gray-500 text-xs">Client Cut</p>
                  <p className="text-lg font-bold text-cyan-600">${client.client_earnings.toLocaleString()}</p>
                </div>
              </div>
              
              <div className="mt-4">
                <h3 className="font-medium mb-2 text-gray-700">Recent Transactions</h3>
                <div className="space-y-2">
                  {client.transactions.slice(0, 3).map((txn, index) => (
                    <div key={index} className="flex justify-between items-center text-sm bg-white p-2 rounded border border-gray-100">
                      <span className="text-gray-600">{txn.date}</span>
                      <span className="font-medium text-gray-800">${txn.daily_revenue.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              // Update the button in your ClientSales component
<Link 
  to={`/sales/${client.client_id}`}
  className="mt-4 w-full py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg hover:from-blue-700 hover:to-blue-600 transition-all shadow-md text-center block"
>
  View Details →
</Link>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-700">No clients found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientSales;