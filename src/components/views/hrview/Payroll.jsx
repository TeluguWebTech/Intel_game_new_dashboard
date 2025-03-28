import React, { useState } from 'react';
import { empPayrol } from '../../../masterdata/hrdata/empPayrol';

const Payroll = () => {
  const [payrolls, setPayrolls] = useState(empPayrol);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPosition, setSelectedPosition] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');

  // Get unique positions and statuses for dropdowns
  const positions = ['All', ...new Set(empPayrol.map(emp => emp.position))];
  const statuses = ['All', ...new Set(empPayrol.map(emp => emp.payment_status))];

  // Filter payrolls based on search term, position, and status
  const filteredPayrolls = payrolls.filter(payroll => {
    const matchesSearch = 
      payroll.employee_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payroll.department.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesPosition = 
      selectedPosition === 'All' || payroll.position === selectedPosition;
    
    const matchesStatus = 
      selectedStatus === 'All' || payroll.payment_status === selectedStatus;
    
    return matchesSearch && matchesPosition && matchesStatus;
  });

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Payroll Processed</h1>
      
      {/* Filters */}
      <div className="mb-8 bg-white p-4 rounded-lg shadow-md">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">Search</label>
            <input
              type="text"
              id="search"
              placeholder="Search by name or department..."
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex-1">
            <label htmlFor="position" className="block text-sm font-medium text-gray-700 mb-1">Filter by Position</label>
            <select
              id="position"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={selectedPosition}
              onChange={(e) => setSelectedPosition(e.target.value)}
            >
              {positions.map(position => (
                <option key={position} value={position}>{position}</option>
              ))}
            </select>
          </div>
          <div className="flex-1">
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">Filter by Status</label>
            <select
              id="status"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              {statuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Results count */}
      <div className="mb-4">
        <p className="text-gray-600">
          Showing {filteredPayrolls.length} of {payrolls.length} payroll records
        </p>
      </div>

      {/* Payroll Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredPayrolls.map(payroll => (
          <div 
            key={payroll.employee_id} 
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <div className="p-4">
              <div className="flex items-center mb-4">
                <img 
                  src={payroll.employee_image} 
                  alt={payroll.employee_name}
                  className="h-16 w-16 rounded-full object-cover mr-4"
                />
                <div>
                  <h3 className="font-bold text-lg text-gray-800">{payroll.employee_name}</h3>
                  <p className="text-gray-600 text-sm">{payroll.position}</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-500">Department:</span>
                  <span className="font-medium">{payroll.department}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Base Salary:</span>
                  <span className="font-medium">${payroll.salary_offered.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Bonus:</span>
                  <span className="font-medium">${payroll.bonus.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Overtime:</span>
                  <span className="font-medium">${payroll.overtime_pay.toLocaleString()} ({payroll.overtime_hours} hrs)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Deductions:</span>
                  <span className="font-medium">
                    ${(payroll.deductions.tax + payroll.deductions.insurance + payroll.deductions.leaves_deduction).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Net Salary:</span>
                  <span className="font-bold text-blue-600">${payroll.net_salary.toLocaleString()}</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Status:</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    payroll.payment_status === 'Paid' 
                      ? 'bg-green-100 text-green-800' 
                      : payroll.payment_status === 'Processing'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {payroll.payment_status}
                  </span>
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-gray-500">Last Paid:</span>
                  <span className="text-gray-600">{payroll.last_payment_date}</span>
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-gray-500">Next Payment:</span>
                  <span className="text-gray-600">{payroll.next_payment_date}</span>
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-gray-500">Method:</span>
                  <span className="text-gray-600">{payroll.payment_method}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty state */}
      {filteredPayrolls.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No payroll records found matching your criteria</p>
        </div>
      )}
    </div>
  );
};

export default Payroll;