import React, { useState } from 'react';
import { empData } from '../../../masterdata/hrdata/employeeData';

const AllEmployees = () => {
  const [employees, setEmployees] = useState(empData);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPosition, setSelectedPosition] = useState('All');
  const [expandedEmployee, setExpandedEmployee] = useState(null);

  // Get unique positions for dropdown
  const positions = ['All', ...new Set(empData.map(emp => emp.position))];

  // Filter employees based on search term and selected position
  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = 
      employee.employee_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.department.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesPosition = 
      selectedPosition === 'All' || employee.position === selectedPosition;
    
    return matchesSearch && matchesPosition;
  });

  const toggleExpand = (employeeId) => {
    setExpandedEmployee(expandedEmployee === employeeId ? null : employeeId);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Employees List</h1>
      
      {/* Filters */}
      <div className="mb-8 bg-white p-4 rounded-lg shadow-md">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">Search</label>
            <input
              type="text"
              id="search"
              placeholder="Search by name, position or department..."
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
        </div>
      </div>

      {/* Results count */}
      <div className="mb-4">
        <p className="text-gray-600">
          Showing {filteredEmployees.length} of {employees.length} employees
        </p>
      </div>

      {/* Employee Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredEmployees.map(employee => (
          <div 
            key={employee.employee_id} 
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <div className="p-4">
              <div className="flex items-center mb-4">
                <img 
                  src={employee.employee_image} 
                  alt={employee.employee_name}
                  className="h-16 w-16 rounded-full object-cover mr-4"
                />
                <div>
                  <h3 className="font-bold text-lg text-gray-800">{employee.employee_name}</h3>
                  <p className="text-gray-600 text-sm">{employee.position}</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-500">Department:</span>
                  <span className="font-medium">{employee.department}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Branch:</span>
                  <span className="font-medium">{employee.branch}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Region:</span>
                  <span className="font-medium">{employee.region}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Salary:</span>
                  <span className="font-medium">${employee.salary_offered.toLocaleString()}</span>
                </div>
              </div>

              <button
                onClick={() => toggleExpand(employee.employee_id)}
                className="mt-4 w-full py-2 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors"
              >
                {expandedEmployee === employee.employee_id ? 'Show Less' : 'Show More'}
              </button>
            </div>

            {/* Expanded Details */}
            {expandedEmployee === employee.employee_id && (
              <div className="px-4 pb-4 border-t border-gray-100">
                <div className="mt-4 space-y-3">
                  <div>
                    <h4 className="font-medium text-gray-700">Contact</h4>
                    <p className="text-gray-600">{employee.contact}</p>
                    <p className="text-gray-600">{employee.email}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-700">HOD</h4>
                    <p className="text-gray-600">{employee.hod}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-700">Joining Date</h4>
                    <p className="text-gray-600">{employee.joining_date}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-700">Leaves/Absents</h4>
                    <p className="text-gray-600">
                      {employee.leaves_absents.total_leaves} leaves, {employee.leaves_absents.absent_days} absents
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-700">Complaints</h4>
                    {employee.reg_complaints.map((complaint, index) => (
                      <div key={index} className="mb-2">
                        <p className="text-gray-600">{complaint.complaint}</p>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          complaint.status === 'Resolved' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {complaint.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Empty state */}
      {filteredEmployees.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No employees found matching your criteria</p>
        </div>
      )}
    </div>
  );
};

export default AllEmployees;