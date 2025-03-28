import React, { useState } from "react";
import { FaSearch, FaFilter, FaEye, FaEdit, FaTrash, FaChevronDown } from "react-icons/fa";

// Sample data (you can replace with your actual imports)
const accountsData = {
  salaryAccounts: [
    {
      "vendor_id": "VND12345",
      "vendor_name": "Tech Solutions Inc.",
      "branch": "New York",
      "region": "East Coast",
      "emp_id": "EMP001",
      "emp_name": "John Doe",
      "designation": "Software Engineer",
      "department": "IT",
      "HOD": "Jane Smith",
      "working_days": 22,
      "amount_payable": 8000,
      "salary_advance": 500,
      "other_deductions": 200,
      "paid_amount": 7300,
      "payment_method": "Bank Transfer",
      "remarks": "Bonus Included",
      "pending_payment": 0,
      "date": "2025-03-27"
    },
    // Add more salary accounts as needed
  ],
  purchaseData: [
    {
      "vendor_id": "VND001",
      "vendor_name": "Gaming Zone Inc.",
      "branch": "Las Vegas",
      "region": "West Coast",
      "date": "2025-03-27",
      "product_details": {
        "product_name": "Arcade Machine",
        "product_id": "PRD1001",
        "quantity": 5,
        "unit_price": 2500
      },
      "purpose": "New machine installation for a client",
      "raised_by": "Michael Smith",
      "department": "Procurement",
      "purchase_amount": 12500,
      "approved_by": "James Brown",
      "mode_of_payment": "Bank Transfer",
      "product_status": "Delivered",
      "description": "5 new arcade machines installed at Client A's location"
    },
    // Add more purchase data as needed
  ],
  paymentsData: [
    {
      "vendor_id": "VND001",
      "vendor_name": "Gaming Zone Inc.",
      "branch": "Las Vegas",
      "region": "West Coast",
      "date": "2025-03-27",
      "purpose_of_payment": "Purchases",
      "authorization_id": "AUTH1001",
      "authorization_name": "Michael Smith",
      "approved_by": "James Brown",
      "paid_amount": 15000,
      "paid_to": "Tech Supplies Ltd.",
      "receiver_id": "RCV5001",
      "receiver_name": "John Doe",
      "receiver_contact": "+1-702-555-1234",
      "purpose_description": "Payment for new arcade machine installations"
    },
    // Add more payments data as needed
  ],
  incomeData: [
    {
      "vendor_id": "VND001",
      "vendor_name": "Gaming Zone Inc.",
      "branch": "Las Vegas",
      "region": "West Coast",
      "date": "2025-03-27",
      "received_amount": 20000,
      "received_by": "Michael Smith",
      "purpose": "Daily Income",
      "authorized_by": "James Brown",
      "mode_of_payment": "Cash"
    },
    // Add more income data as needed
  ]
};

// Extract unique regions from all data
const allRegions = Array.from(new Set(
  Object.values(accountsData).flatMap(data => 
    data.map(item => item.region)
  )
)).sort();
allRegions.unshift("All Regions");

const AccountsDashboard = () => {
  const [activeTab, setActiveTab] = useState("salaryAccounts");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("All Regions");
  const [isRegionDropdownOpen, setIsRegionDropdownOpen] = useState(false);

  const filterData = (data) => {
    return data.filter(item => {
      const matchesSearch = searchTerm 
        ? JSON.stringify(item).toLowerCase().includes(searchTerm.toLowerCase())
        : true;
      const matchesRegion = selectedRegion !== "All Regions"
        ? item.region === selectedRegion
        : true;
      return matchesSearch && matchesRegion;
    });
  };

  const renderTable = () => {
    const data = accountsData[activeTab];
    const filteredData = filterData(data);

    switch (activeTab) {
      case "salaryAccounts":
        return (
          <SalaryAccountsTable data={filteredData} />
        );
      case "purchaseData":
        return (
          <PurchaseDataTable data={filteredData} />
        );
      case "paymentsData":
        return (
          <PaymentsDataTable data={filteredData} />
        );
      case "incomeData":
        return (
          <IncomeDataTable data={filteredData} />
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto bg-white rounded-xl shadow-md">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Accounts Dashboard</h1>
        <p className="text-gray-600 mt-1">Manage financial records and transactions</p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-1 md:gap-2 border-b border-gray-200 pb-1">
        {Object.keys(accountsData).map((tab) => (
          <button
            key={tab}
            className={`px-3 py-2 text-sm font-medium rounded-t-lg transition-all duration-200 ${
              activeTab === tab 
                ? "bg-blue-50 text-blue-600 border-b-2 border-blue-500 font-semibold" 
                : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row items-center justify-between mt-4 gap-4">
        {/* Search Input */}
        <div className="relative w-full md:w-1/2">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search records..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-200 focus:border-blue-500 focus:outline-none transition"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Region Dropdown */}
        <div className="relative w-full md:w-1/2">
          <button
            onClick={() => setIsRegionDropdownOpen(!isRegionDropdownOpen)}
            className="flex items-center justify-between w-full pl-3 pr-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-200 focus:border-blue-500 focus:outline-none transition"
          >
            <span className="flex items-center">
              <FaFilter className="text-gray-400 mr-2" />
              {selectedRegion}
            </span>
            <FaChevronDown className={`text-gray-400 transition-transform ${isRegionDropdownOpen ? 'transform rotate-180' : ''}`} />
          </button>
          
          {isRegionDropdownOpen && (
            <div className="absolute z-10 mt-1 w-full bg-white rounded-md shadow-lg border border-gray-200 max-h-60 overflow-auto">
              {allRegions.map((region) => (
                <button
                  key={region}
                  className={`block w-full text-left px-4 py-2 text-sm hover:bg-blue-50 ${
                    selectedRegion === region ? 'bg-blue-100 text-blue-800' : 'text-gray-700'
                  }`}
                  onClick={() => {
                    setSelectedRegion(region);
                    setIsRegionDropdownOpen(false);
                  }}
                >
                  {region}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Table Section */}
      <div className="mt-6">
        {renderTable()}
      </div>
    </div>
  );
};

// Table Components
const SalaryAccountsTable = ({ data }) => (
  <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gradient-to-r from-blue-600 to-blue-500">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Employee</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Designation</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Region</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Payable</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Paid</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Method</th>
          <th className="px-6 py-3 text-right text-xs font-medium text-white uppercase tracking-wider">Actions</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {data.length > 0 ? (
          data.map((item, index) => (
            <tr key={index} className="hover:bg-blue-50 transition-colors duration-150">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">{item.emp_name}</div>
                <div className="text-sm text-gray-500">{item.emp_id}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {item.designation}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {item.region}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                ${item.amount_payable.toLocaleString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-600">
                ${item.paid_amount.toLocaleString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {item.payment_method}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex justify-end space-x-3">
                  <button className="text-blue-500 hover:text-blue-700 transition" title="View">
                    <FaEye className="w-4 h-4" />
                  </button>
                  <button className="text-green-500 hover:text-green-700 transition" title="Edit">
                    <FaEdit className="w-4 h-4" />
                  </button>
                  <button className="text-red-500 hover:text-red-700 transition" title="Delete">
                    <FaTrash className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))
        ) : (
          <EmptyTableState colSpan={7} />
        )}
      </tbody>
    </table>
  </div>
);

const PurchaseDataTable = ({ data }) => (
  <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gradient-to-r from-blue-600 to-blue-500">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Vendor</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Product</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Region</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Quantity</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Amount</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Status</th>
          <th className="px-6 py-3 text-right text-xs font-medium text-white uppercase tracking-wider">Actions</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {data.length > 0 ? (
          data.map((item, index) => (
            <tr key={index} className="hover:bg-blue-50 transition-colors duration-150">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">{item.vendor_name}</div>
                <div className="text-sm text-gray-500">{item.vendor_id}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">{item.product_details.product_name}</div>
                <div className="text-sm text-gray-500">{item.product_details.product_id}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {item.region}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {item.product_details.quantity}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-blue-600">
                ${item.purchase_amount.toLocaleString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  item.product_status === 'Delivered' ? 'bg-green-100 text-green-800' :
                  item.product_status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {item.product_status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex justify-end space-x-3">
                  <button className="text-blue-500 hover:text-blue-700 transition" title="View">
                    <FaEye className="w-4 h-4" />
                  </button>
                  <button className="text-green-500 hover:text-green-700 transition" title="Edit">
                    <FaEdit className="w-4 h-4" />
                  </button>
                  <button className="text-red-500 hover:text-red-700 transition" title="Delete">
                    <FaTrash className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))
        ) : (
          <EmptyTableState colSpan={7} />
        )}
      </tbody>
    </table>
  </div>
);

const PaymentsDataTable = ({ data }) => (
  <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gradient-to-r from-blue-600 to-blue-500">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Vendor</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Purpose</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Region</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Amount</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Paid To</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Approved By</th>
          <th className="px-6 py-3 text-right text-xs font-medium text-white uppercase tracking-wider">Actions</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {data.length > 0 ? (
          data.map((item, index) => (
            <tr key={index} className="hover:bg-blue-50 transition-colors duration-150">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">{item.vendor_name}</div>
                <div className="text-sm text-gray-500">{item.vendor_id}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {item.purpose_of_payment}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {item.region}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-red-600">
                ${item.paid_amount.toLocaleString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {item.paid_to}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {item.approved_by}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex justify-end space-x-3">
                  <button className="text-blue-500 hover:text-blue-700 transition" title="View">
                    <FaEye className="w-4 h-4" />
                  </button>
                  <button className="text-green-500 hover:text-green-700 transition" title="Edit">
                    <FaEdit className="w-4 h-4" />
                  </button>
                  <button className="text-red-500 hover:text-red-700 transition" title="Delete">
                    <FaTrash className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))
        ) : (
          <EmptyTableState colSpan={7} />
        )}
      </tbody>
    </table>
  </div>
);

const IncomeDataTable = ({ data }) => (
  <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gradient-to-r from-blue-600 to-blue-500">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Vendor</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Purpose</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Region</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Amount</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Received By</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Payment Mode</th>
          <th className="px-6 py-3 text-right text-xs font-medium text-white uppercase tracking-wider">Actions</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {data.length > 0 ? (
          data.map((item, index) => (
            <tr key={index} className="hover:bg-blue-50 transition-colors duration-150">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">{item.vendor_name}</div>
                <div className="text-sm text-gray-500">{item.vendor_id}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {item.purpose}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {item.region}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-600">
                ${item.received_amount.toLocaleString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {item.received_by}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {item.mode_of_payment}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex justify-end space-x-3">
                  <button className="text-blue-500 hover:text-blue-700 transition" title="View">
                    <FaEye className="w-4 h-4" />
                  </button>
                  <button className="text-green-500 hover:text-green-700 transition" title="Edit">
                    <FaEdit className="w-4 h-4" />
                  </button>
                  <button className="text-red-500 hover:text-red-700 transition" title="Delete">
                    <FaTrash className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))
        ) : (
          <EmptyTableState colSpan={7} />
        )}
      </tbody>
    </table>
  </div>
);

const EmptyTableState = ({ colSpan }) => (
  <tr>
    <td colSpan={colSpan} className="px-6 py-4 text-center text-sm text-gray-500">
      <div className="flex flex-col items-center justify-center py-8">
        <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p className="mt-2 text-gray-600">No records found</p>
        <p className="text-xs text-gray-400">Try adjusting your search or filters</p>
      </div>
    </td>
  </tr>
);

export default AccountsDashboard;