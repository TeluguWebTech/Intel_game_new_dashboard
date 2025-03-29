import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { incomeData } from '../../../masterdata/accounts/incomeData';
import { paymentsData } from '../../../masterdata/accounts/paymentsData';
import { purchaseData } from '../../../masterdata/accounts/purchaseData';
import { salaryAccounts } from '../../../masterdata/accounts/salaryAccountData';
import { FaHome, FaChevronRight, FaPlus } from "react-icons/fa";
import { Link } from 'react-router-dom';


const AccountExpenses = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  // Combine all expense data
  const allExpenses = [
    ...incomeData.map(item => ({ ...item, type: 'Income' })),
    ...paymentsData.map(item => ({ ...item, type: 'Payment' })),
    ...purchaseData.map(item => ({ ...item, type: 'Purchase' })),
    ...salaryAccounts.map(item => ({ ...item, type: 'Salary' }))
  ];

  // Get unique categories and regions
  const categories = ['All', 'Income', 'Payment', 'Purchase', 'Salary'];
  const regions = ['All', ...new Set(allExpenses.map(item => item.region))];

  // Filter expenses
  const filteredExpenses = allExpenses.filter(expense => {
    const matchesSearch = Object.values(expense).some(
      value => value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );
    const matchesCategory = selectedCategory === 'All' || expense.type === selectedCategory;
    const matchesRegion = selectedRegion === 'All' || expense.region === selectedRegion;
    const expenseDate = new Date(expense.date);
    const matchesDate = 
      (!startDate || expenseDate >= startDate) && 
      (!endDate || expenseDate <= endDate);

    return matchesSearch && matchesCategory && matchesRegion && matchesDate;
  });

  // Calculate totals
  const totalIncome = incomeData.reduce((sum, item) => sum + item.received_amount, 0);
  const totalPayments = paymentsData.reduce((sum, item) => sum + item.paid_amount, 0);
  const totalPurchases = purchaseData.reduce((sum, item) => sum + item.purchase_amount, 0);
  const totalSalaries = salaryAccounts.reduce((sum, item) => sum + item.paid_amount, 0);
  const netBalance = totalIncome - (totalPayments + totalPurchases + totalSalaries);

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
        <div className="container mx-auto px-4 py-8">
                              <div className="flex items-center text-gray-600 text-sm pb-2">
                                     <FaHome className="mr-1 text-blue-500" />
                                    <Link to="/" className="hover:underline">Home</Link>
                                     <FaChevronRight className="mx-2 text-gray-400" />
                                    <Link to="/accounts" className="hover:underline">Accounts</Link>
                                    <FaChevronRight className="mx-2 text-gray-400" />
                                    <span className="text-orange-500">Expenses</span>
                                 </div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Expenses Dashboard</h1>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow p-6 border-l-4 border-green-500">
          <h3 className="text-gray-500 text-sm font-medium">Total Income</h3>
          <p className="text-2xl font-bold text-gray-800">{formatCurrency(totalIncome)}</p>
        </div>
        
        <div className="bg-white rounded-xl shadow p-6 border-l-4 border-red-500">
          <h3 className="text-gray-500 text-sm font-medium">Total Payments</h3>
          <p className="text-2xl font-bold text-gray-800">{formatCurrency(totalPayments)}</p>
        </div>
        
        <div className="bg-white rounded-xl shadow p-6 border-l-4 border-yellow-500">
          <h3 className="text-gray-500 text-sm font-medium">Total Purchases</h3>
          <p className="text-2xl font-bold text-gray-800">{formatCurrency(totalPurchases)}</p>
        </div>
        
        <div className="bg-white rounded-xl shadow p-6 border-l-4 border-blue-500">
          <h3 className="text-gray-500 text-sm font-medium">Net Balance</h3>
          <p className={`text-2xl font-bold ${netBalance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {formatCurrency(netBalance)}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search Input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search expenses..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          {/* Category Filter */}
          <div>
            <select
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
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
          
          {/* Date Range Filter */}
          <div>
            <DatePicker
              selectsRange
              startDate={startDate}
              endDate={endDate}
              onChange={(update) => {
                setDateRange(update);
              }}
              placeholderText="Date range"
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              isClearable
            />
          </div>
        </div>
        
        {/* Clear Filters */}
        {(searchTerm || selectedCategory !== 'All' || selectedRegion !== 'All' || startDate || endDate) && (
          <div className="mt-3 text-right">
            <button 
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
                setSelectedRegion('All');
                setDateRange([null, null]);
              }}
              className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
      
      {/* Results Count */}
      <div className="mb-4 text-sm text-gray-600">
        Showing {filteredExpenses.length} of {allExpenses.length} records
      </div>
      
      {/* Expenses Table */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Vendor/Employee
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Details
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Region
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredExpenses.length > 0 ? (
              filteredExpenses.map((expense, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                      expense.type === 'Income' ? 'bg-green-100 text-green-800' :
                      expense.type === 'Payment' ? 'bg-red-100 text-red-800' :
                      expense.type === 'Purchase' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {expense.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {expense.vendor_name || expense.emp_name || 'N/A'}
                    </div>
                    <div className="text-sm text-gray-500">
                      {expense.branch}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {expense.purpose || expense.purpose_of_payment || expense.product_details?.product_name || expense.designation}
                    </div>
                    <div className="text-sm text-gray-500 line-clamp-1">
                      {expense.description || expense.purpose_description || expense.remarks || 'N/A'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium ${
                    expense.type === 'Income' ? 'text-green-600' : 'text-red-600'
                  }">
                    {formatCurrency(
                      expense.received_amount || 
                      expense.paid_amount || 
                      expense.purchase_amount || 
                      expense.amount_payable || 0
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {expense.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {expense.region}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-6 py-4 text-center">
                  <div className="bg-gray-50 p-8 rounded-lg text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <h3 className="mt-2 text-lg font-medium text-gray-900">No expenses found</h3>
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
    </div>
  );
};

export default AccountExpenses;