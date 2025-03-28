import { useState } from 'react';
import { incomeData } from '../../../masterdata/accounts/incomeData';
import { paymentsData } from '../../../masterdata/accounts/paymentsData';
import { purchaseData } from '../../../masterdata/accounts/purchaseData';
import { salaryAccounts } from '../../../masterdata/accounts/salaryAccountData';



const AccountTransactions = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [selectedDate, setSelectedDate] = useState('');

  // Combine all transaction data
  const allTransactions = [
    ...incomeData.map(item => ({ ...item, type: 'income' })),
    ...paymentsData.map(item => ({ ...item, type: 'payment' })),
    ...purchaseData.map(item => ({ ...item, type: 'purchase' })),
    ...salaryAccounts.map(item => ({ ...item, type: 'salary' }))
  ];

  // Get unique regions for dropdown
  const regions = ['All', ...new Set(allTransactions.map(t => t.region))];

  // Filter transactions based on active tab, search, region, and date
  const filteredTransactions = allTransactions.filter(transaction => {
    const matchesTab = activeTab === 'all' || transaction.type === activeTab;
    const matchesSearch = Object.values(transaction).some(
      value => value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );
    const matchesRegion = selectedRegion === 'All' || transaction.region === selectedRegion;
    const matchesDate = !selectedDate || transaction.date === selectedDate;
    
    return matchesTab && matchesSearch && matchesRegion && matchesDate;
  });

  // Format amount based on transaction type
  const formatAmount = (transaction) => {
    switch(transaction.type) {
      case 'income': 
        return { amount: transaction.received_amount, color: 'text-green-600' };
      case 'payment':
        return { amount: transaction.paid_amount, color: 'text-red-600' };
      case 'purchase':
        return { amount: transaction.purchase_amount, color: 'text-orange-600' };
      case 'salary':
        return { amount: transaction.paid_amount, color: 'text-blue-600' };
      default:
        return { amount: 0, color: 'text-gray-600' };
    }
  };

  // Get transaction type details
  const getTypeDetails = (type) => {
    switch(type) {
      case 'income': 
        return { label: 'Income', bgColor: 'bg-green-100', textColor: 'text-green-800' };
      case 'payment':
        return { label: 'Payment', bgColor: 'bg-red-100', textColor: 'text-red-800' };
      case 'purchase':
        return { label: 'Purchase', bgColor: 'bg-orange-100', textColor: 'text-orange-800' };
      case 'salary':
        return { label: 'Salary', bgColor: 'bg-blue-100', textColor: 'text-blue-800' };
      default:
        return { label: 'Unknown', bgColor: 'bg-gray-100', textColor: 'text-gray-800' };
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Transactions Dashboard</h1>
      
      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          className={`py-2 px-4 font-medium ${activeTab === 'all' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('all')}
        >
          All Transactions
        </button>
        <button
          className={`py-2 px-4 font-medium ${activeTab === 'income' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('income')}
        >
          Income
        </button>
        <button
          className={`py-2 px-4 font-medium ${activeTab === 'payment' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('payment')}
        >
          Payments
        </button>
        <button
          className={`py-2 px-4 font-medium ${activeTab === 'purchase' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('purchase')}
        >
          Purchases
        </button>
        <button
          className={`py-2 px-4 font-medium ${activeTab === 'salary' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('salary')}
        >
          Salaries
        </button>
      </div>
      
      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="md:col-span-2">
          <input
            type="text"
            placeholder="Search transactions..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <select
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          value={selectedRegion}
          onChange={(e) => setSelectedRegion(e.target.value)}
        >
          {regions.map(region => (
            <option key={region} value={region}>{region}</option>
          ))}
        </select>
        
        <input
          type="date"
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </div>
      
      {/* Results count */}
      <div className="mb-4 text-sm text-gray-600">
        Showing {filteredTransactions.length} of {allTransactions.length} transactions
      </div>
      
      {/* Transactions Table */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vendor/Employee</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Branch</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Region</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Purpose</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((transaction) => {
                const amountInfo = formatAmount(transaction);
                const typeInfo = getTypeDetails(transaction.type);
                
                return (
                  <tr key={`${transaction.type}-${transaction.vendor_id || transaction.emp_id}`} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {transaction.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${typeInfo.bgColor} ${typeInfo.textColor}`}>
                        {typeInfo.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {transaction.type === 'salary' ? transaction.emp_name : transaction.vendor_name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {transaction.type === 'salary' ? transaction.designation : transaction.paid_to || transaction.purpose}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {transaction.branch}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {transaction.region}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 max-w-xs">
                      <div className="line-clamp-2">
                        {transaction.type === 'income' && transaction.purpose}
                        {transaction.type === 'payment' && transaction.purpose_description}
                        {transaction.type === 'purchase' && transaction.description}
                        {transaction.type === 'salary' && transaction.remarks}
                      </div>
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm font-bold ${amountInfo.color}`}>
                      ${amountInfo.amount?.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900 mr-3">
                        View
                      </button>
                      <button className="text-gray-600 hover:text-gray-900">
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="8" className="px-6 py-4 text-center">
                  <div className="bg-white rounded-xl shadow p-8 text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <h3 className="mt-2 text-lg font-medium text-gray-900">No transactions found</h3>
                    <p className="mt-1 text-gray-500">
                      Try adjusting your search or filter criteria
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* Summary Cards */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow border-l-4 border-green-500">
          <h3 className="text-sm font-medium text-gray-500">Total Income</h3>
          <p className="mt-1 text-2xl font-bold text-green-600">
            ${incomeData.reduce((sum, item) => sum + item.received_amount, 0).toLocaleString()}
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow border-l-4 border-red-500">
          <h3 className="text-sm font-medium text-gray-500">Total Payments</h3>
          <p className="mt-1 text-2xl font-bold text-red-600">
            ${paymentsData.reduce((sum, item) => sum + item.paid_amount, 0).toLocaleString()}
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow border-l-4 border-orange-500">
          <h3 className="text-sm font-medium text-gray-500">Total Purchases</h3>
          <p className="mt-1 text-2xl font-bold text-orange-600">
            ${purchaseData.reduce((sum, item) => sum + item.purchase_amount, 0).toLocaleString()}
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow border-l-4 border-blue-500">
          <h3 className="text-sm font-medium text-gray-500">Total Salaries</h3>
          <p className="mt-1 text-2xl font-bold text-blue-600">
            ${salaryAccounts.reduce((sum, item) => sum + item.paid_amount, 0).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AccountTransactions;