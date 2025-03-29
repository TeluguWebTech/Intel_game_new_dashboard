import React from 'react';
import { clientSalesData } from '../../../masterdata/clientSalesData';
import { FaHome, FaChevronRight, FaPlus } from "react-icons/fa";
import { Link } from 'react-router-dom';


const TotalRevenue = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center text-gray-600 text-sm pb-4">
                          <FaHome className="mr-1 text-blue-500" />
                          <Link to="/" className="hover:underline">Home</Link>
                          <FaChevronRight className="mx-2 text-gray-400" />
                          <Link to="/revenue" className="hover:underline">Revenue</Link>
                          <FaChevronRight className="mx-2 text-gray-400" />
                          <span className="text-orange-500">Total Revenue</span>
                        </div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Client Sales Overview</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {clientSalesData.map((client, index) => (
          <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            {/* Client Profile Header */}
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 flex items-center">
              <img 
                src={client.profile_img} 
                alt={client.client_name}
                className="w-12 h-12 rounded-full border-2 border-white mr-3"
              />
              <div>
                <h2 className="font-semibold text-white">{client.client_name}</h2>
                <p className="text-xs text-blue-100">ID: {client.client_id}</p>
              </div>
            </div>
            
            {/* Sales Summary */}
            <div className="p-4">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider">Total Revenue</p>
                  <p className="font-bold text-lg text-gray-800">${client.total_revenue.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider">Commission</p>
                  <p className="font-medium text-gray-800">{client.commission_percentage}%</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider">Vendor Earnings</p>
                  <p className="font-medium text-red-600">${client.vendor_earnings.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider">Client Earnings</p>
                  <p className="font-medium text-green-600">${client.client_earnings.toLocaleString()}</p>
                </div>
              </div>
            </div>
            
            {/* Recent Transactions */}
            <div className="px-4 pb-4">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Recent Transactions</h3>
              <div className="space-y-2">
                {client.transactions.slice(0, 2).map((transaction, idx) => (
                  <div key={idx} className="flex justify-between text-xs">
                    <span className="text-gray-600">{new Date(transaction.date).toLocaleDateString()}</span>
                    <span className="font-medium">${transaction.daily_revenue.toLocaleString()}</span>
                  </div>
                ))}
                {client.transactions.length > 2 && (
                  <p className="text-xs text-blue-600 text-right">+{client.transactions.length - 2} more</p>
                )}
              </div>
            </div>
            
            {/* View Details Button */}
            <div className="px-4 pb-4">
              <button className="w-full py-2 bg-blue-50 text-blue-600 rounded-md text-sm font-medium hover:bg-blue-100 transition-colors">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TotalRevenue;