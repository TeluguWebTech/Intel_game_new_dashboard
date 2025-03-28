import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { incomeData } from '../../../masterdata/accounts/incomeData';
import { paymentsData } from '../../../masterdata/accounts/paymentsData';
import { purchaseData } from '../../../masterdata/accounts/purchaseData';
import { salaryAccounts } from '../../../masterdata/accounts/salaryAccountData';



const AccountReport = () => {
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [activeTab, setActiveTab] = useState('summary');

  // Get unique regions
  const regions = ['All', ...new Set([
    ...incomeData.map(item => item.region),
    ...paymentsData.map(item => item.region),
    ...purchaseData.map(item => item.region),
    ...salaryAccounts.map(item => item.region)
  ])];

  // Filter data by date range and region
  const filterData = (data) => {
    return data.filter(item => {
      const itemDate = new Date(item.date);
      const matchesDate = (!startDate || itemDate >= startDate) && (!endDate || itemDate <= endDate);
      const matchesRegion = selectedRegion === 'All' || item.region === selectedRegion;
      return matchesDate && matchesRegion;
    });
  };

  // Apply filters
  const filteredIncome = filterData(incomeData);
  const filteredPayments = filterData(paymentsData);
  const filteredPurchases = filterData(purchaseData);
  const filteredSalaries = filterData(salaryAccounts);

  // Calculate totals
  const totalIncome = filteredIncome.reduce((sum, item) => sum + item.received_amount, 0);
  const totalPayments = filteredPayments.reduce((sum, item) => sum + item.paid_amount, 0);
  const totalPurchases = filteredPurchases.reduce((sum, item) => sum + item.purchase_amount, 0);
  const totalSalaries = filteredSalaries.reduce((sum, item) => sum + item.paid_amount, 0);
  const netProfit = totalIncome - (totalPayments + totalPurchases + totalSalaries);



  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Financial Reports</h1>
      
      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Date Range Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
            <DatePicker
              selectsRange
              startDate={startDate}
              endDate={endDate}
              onChange={update => setDateRange(update)}
              placeholderText="Select date range"
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              isClearable
            />
          </div>
          
          {/* Region Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Region</label>
            <select
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={selectedRegion}
              onChange={e => setSelectedRegion(e.target.value)}
            >
              {regions.map(region => (
                <option key={region} value={region}>{region}</option>
              ))}
            </select>
          </div>
          
          {/* Clear Filters */}
          <div className="flex items-end">
            <button
              onClick={() => {
                setDateRange([null, null]);
                setSelectedRegion('All');
              }}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('summary')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'summary'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Summary
          </button>
          <button
            onClick={() => setActiveTab('income')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'income'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Income
          </button>
          <button
            onClick={() => setActiveTab('expenses')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'expenses'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Expenses
          </button>
        
        </nav>
      </div>

      {/* Summary Tab */}
      {activeTab === 'summary' && (
        <div>
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow p-6 border-l-4 border-green-500">
              <h3 className="text-gray-500 text-sm font-medium">Total Income</h3>
              <p className="text-2xl font-bold text-gray-800">${totalIncome.toLocaleString()}</p>
              <p className="text-sm text-gray-500 mt-1">{filteredIncome.length} transactions</p>
            </div>
            
            <div className="bg-white rounded-xl shadow p-6 border-l-4 border-red-500">
              <h3 className="text-gray-500 text-sm font-medium">Total Payments</h3>
              <p className="text-2xl font-bold text-gray-800">${totalPayments.toLocaleString()}</p>
              <p className="text-sm text-gray-500 mt-1">{filteredPayments.length} transactions</p>
            </div>
            
            <div className="bg-white rounded-xl shadow p-6 border-l-4 border-yellow-500">
              <h3 className="text-gray-500 text-sm font-medium">Total Purchases</h3>
              <p className="text-2xl font-bold text-gray-800">${totalPurchases.toLocaleString()}</p>
              <p className="text-sm text-gray-500 mt-1">{filteredPurchases.length} transactions</p>
            </div>
            
            <div className="bg-white rounded-xl shadow p-6 border-l-4 border-blue-500">
              <h3 className="text-gray-500 text-sm font-medium">Net Profit</h3>
              <p className={`text-2xl font-bold ${
                netProfit >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                ${netProfit.toLocaleString()}
              </p>
              <p className="text-sm text-gray-500 mt-1">After all expenses</p>
            </div>
          </div>


        </div>
      )}

      {/* Income Tab */}
      {activeTab === 'income' && (
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">Income Details</h2>
          </div>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vendor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Branch</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Purpose</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredIncome.map((income, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{income.vendor_name}</div>
                    <div className="text-sm text-gray-500">{income.region}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{income.branch}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                    ${income.received_amount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{income.purpose}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{income.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Expenses Tab */}
      {activeTab === 'expenses' && (
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">Expense Details</h2>
          </div>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Region</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPayments.map((payment, index) => (
                <tr key={`payment-${index}`} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800">Payment</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{payment.purpose_of_payment}</div>
                    <div className="text-sm text-gray-500">{payment.paid_to}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-red-600">
                    ${payment.paid_amount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payment.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payment.region}</td>
                </tr>
              ))}
              
              {filteredPurchases.map((purchase, index) => (
                <tr key={`purchase-${index}`} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">Purchase</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{purchase.product_details.product_name}</div>
                    <div className="text-sm text-gray-500">{purchase.purpose}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-yellow-600">
                    ${purchase.purchase_amount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{purchase.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{purchase.region}</td>
                </tr>
              ))}
              
              {filteredSalaries.map((salary, index) => (
                <tr key={`salary-${index}`} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">Salary</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{salary.emp_name}</div>
                    <div className="text-sm text-gray-500">{salary.designation}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                    ${salary.paid_amount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{salary.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{salary.region}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Analysis Tab */}
      {activeTab === 'analysis' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Income vs Expenses</h3>
            <div className="h-64">
              <Bar 
                data={{
                  labels: ['Income', 'Payments', 'Purchases', 'Salaries'],
                  datasets: [{
                    label: 'Amount ($)',
                    data: [totalIncome, totalPayments, totalPurchases, totalSalaries],
                    backgroundColor: [
                      'rgba(75, 192, 192, 0.6)',
                      'rgba(255, 99, 132, 0.6)',
                      'rgba(255, 206, 86, 0.6)',
                      'rgba(54, 162, 235, 0.6)'
                    ],
                    borderColor: [
                      'rgba(75, 192, 192, 1)',
                      'rgba(255, 99, 132, 1)',
                      'rgba(255, 206, 86, 1)',
                      'rgba(54, 162, 235, 1)'
                    ],
                    borderWidth: 1
                  }]
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    y: {
                      beginAtZero: true
                    }
                  }
                }}
              />
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Profit Analysis</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">Gross Income</span>
                  <span className="text-sm font-medium text-green-600">${totalIncome.toLocaleString()}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-green-600 h-2.5 rounded-full" 
                    style={{ width: '100%' }}
                  ></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">Total Expenses</span>
                  <span className="text-sm font-medium text-red-600">${(totalPayments + totalPurchases + totalSalaries).toLocaleString()}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
  <div 
    className="bg-red-600 h-2.5 rounded-full" 
    style={{ 
      width: `${totalIncome > 0 
        ? Math.min(100, ((totalPayments + totalPurchases + totalSalaries) / totalIncome * 100)) 
        : 0}%` 
    }}
  ></div>
</div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">Net Profit</span>
                  <span className={`text-sm font-medium ${
                    netProfit >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    ${netProfit.toLocaleString()}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className={`h-2.5 rounded-full ${
                      netProfit >= 0 ? 'bg-green-600' : 'bg-red-600'
                    }`} 
                    style={{ width: `${Math.min(100, Math.abs(netProfit) / totalIncome * 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountReport;