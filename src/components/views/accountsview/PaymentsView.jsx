import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { paymentsData } from '../../../masterdata/accounts/paymentsData';

const PaymentsView = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [selectedDate, setSelectedDate] = useState(null);
  
  // Get unique regions for dropdown
  const regions = ['All', ...new Set(paymentsData.map(payment => payment.region))];
  
  // Filter payments based on search, region, and date
  const filteredPayments = paymentsData.filter(payment => {
    const matchesSearch = Object.values(payment).some(
      value => value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );
    const matchesRegion = selectedRegion === 'All' || payment.region === selectedRegion;
    const paymentDate = new Date(payment.date);
    const matchesDate = !selectedDate || 
      (paymentDate.getDate() === selectedDate.getDate() &&
       paymentDate.getMonth() === selectedDate.getMonth() &&
       paymentDate.getFullYear() === selectedDate.getFullYear());
    
    return matchesSearch && matchesRegion && matchesDate;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Payments Dashboard</h1>
        <div className="text-sm text-gray-600 mt-2 md:mt-0">
          Showing {filteredPayments.length} of {paymentsData.length} payments
        </div>
      </div>
      
      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search Input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search payments..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          {/* Region Filter */}
          <div>
            <select
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
            >
              {regions.map(region => (
                <option key={region} value={region}>{region}</option>
              ))}
            </select>
          </div>
          
          {/* Date Filter */}
          <div>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              placeholderText="Filter by date"
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              isClearable
            />
          </div>
        </div>
        
        {/* Clear Filters */}
        {(searchTerm || selectedRegion !== 'All' || selectedDate) && (
          <div className="mt-3 text-right">
            <button 
              onClick={() => {
                setSearchTerm('');
                setSelectedRegion('All');
                setSelectedDate(null);
              }}
              className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
      
      {/* Payments Grid */}
      {filteredPayments.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredPayments.map((payment) => (
            <div key={payment.vendor_id} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-200">
              {/* Card Header */}
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-semibold text-white truncate">{payment.vendor_name}</h3>
                  <span className="px-2 py-1 text-xs font-medium bg-white/20 text-white rounded-full">
                    {payment.region}
                  </span>
                </div>
                <p className="text-sm text-blue-100 mt-1">{payment.branch}</p>
              </div>
              
              {/* Card Body */}
              <div className="p-5 space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">Amount Paid</p>
                    <p className="text-xl font-bold text-green-600">
                      ${payment.paid_amount.toLocaleString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">Date</p>
                    <p className="text-sm font-medium">{payment.date}</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">Purpose</p>
                    <p className="font-medium text-gray-800">{payment.purpose_of_payment}</p>
                    {payment.purpose_description && (
                      <p className="text-sm text-gray-600 mt-1 line-clamp-2">{payment.purpose_description}</p>
                    )}
                  </div>
                  
                  <div className="pt-3 border-t border-gray-100">
                    <p className="text-xs text-gray-500 uppercase tracking-wider">Payment Details</p>
                    <div className="mt-2 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Paid to:</span>
                        <span className="text-sm font-medium">{payment.paid_to}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Receiver:</span>
                        <span className="text-sm font-medium">{payment.receiver_name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Approved by:</span>
                        <span className="text-sm font-medium">{payment.approved_by}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-md p-8 text-center">
          <div className="mx-auto h-20 w-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <svg className="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900">No payments found</h3>
          <p className="mt-2 text-gray-500 max-w-md mx-auto">
            Try adjusting your search, region filter, or date selection
          </p>
          <button 
            onClick={() => {
              setSearchTerm('');
              setSelectedRegion('All');
              setSelectedDate(null);
            }}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Reset all filters
          </button>
        </div>
      )}
    </div>
  );
};

export default PaymentsView;