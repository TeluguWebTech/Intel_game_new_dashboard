import React, { useState } from 'react';
import { empData } from '../../../masterdata/hrdata/employeeData';

const EmployeePerformance = () => {
  const [employees, setEmployees] = useState(empData);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [selectedPerformance, setSelectedPerformance] = useState('All');
  const [expandedEmployee, setExpandedEmployee] = useState(null);

  // Calculate performance rating based on various factors
  const calculatePerformance = (employee) => {
    const baseScore = 3; // Average score
    const attendanceScore = (1 - (employee.leaves_absents.absent_days / 30)) * 2; // Max 2 points
    const complaintScore = employee.reg_complaints.some(c => c.status === 'Pending') ? -1 : 1; // -1 for pending complaints
    const tenureScore = (new Date() - new Date(employee.joining_date)) / (365 * 24 * 60 * 60 * 1000) * 0.5; // 0.5 points per year
    
    const totalScore = baseScore + attendanceScore + complaintScore + tenureScore;
    return Math.min(5, Math.max(1, Math.round(totalScore))); // Clamp between 1-5
  };

  // Add performance rating to each employee
  const employeesWithPerformance = employees.map(emp => ({
    ...emp,
    performanceRating: calculatePerformance(emp),
    performanceStatus: calculatePerformance(emp) >= 4 ? 'Excellent' : 
                      calculatePerformance(emp) >= 3 ? 'Good' : 
                      calculatePerformance(emp) >= 2 ? 'Average' : 'Needs Improvement'
  }));

  // Get unique departments and performance statuses for dropdowns
  const departments = ['All', ...new Set(empData.map(emp => emp.department))];
  const performanceStatuses = ['All', 'Excellent', 'Good', 'Average', 'Needs Improvement'];

  // Filter employees
  const filteredEmployees = employeesWithPerformance.filter(employee => {
    const matchesSearch = 
      employee.employee_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.position.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDepartment = 
      selectedDepartment === 'All' || employee.department === selectedDepartment;
    
    const matchesPerformance = 
      selectedPerformance === 'All' || employee.performanceStatus === selectedPerformance;
    
    return matchesSearch && matchesDepartment && matchesPerformance;
  });

  const toggleExpand = (employeeId) => {
    setExpandedEmployee(expandedEmployee === employeeId ? null : employeeId);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Employee Performance & Reviews</h1>
      
      {/* Filters */}
      <div className="mb-8 bg-white p-4 rounded-lg shadow-md">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">Search Employees</label>
            <input
              type="text"
              id="search"
              placeholder="Search by name or position..."
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex-1">
            <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">Filter by Department</label>
            <select
              id="department"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
            >
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>
          <div className="flex-1">
            <label htmlFor="performance" className="block text-sm font-medium text-gray-700 mb-1">Filter by Performance</label>
            <select
              id="performance"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={selectedPerformance}
              onChange={(e) => setSelectedPerformance(e.target.value)}
            >
              {performanceStatuses.map(status => (
                <option key={status} value={status}>{status}</option>
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
                  <p className="text-gray-500 text-xs">{employee.department}</p>
                </div>
              </div>

              {/* Performance Rating */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-gray-500">Performance:</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    employee.performanceStatus === 'Excellent' ? 'bg-green-100 text-green-800' :
                    employee.performanceStatus === 'Good' ? 'bg-blue-100 text-blue-800' :
                    employee.performanceStatus === 'Average' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {employee.performanceStatus}
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="mr-2 text-sm text-gray-600">{employee.performanceRating}/5</div>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`h-4 w-4 ${i < employee.performanceRating ? 
                          (employee.performanceRating >= 4 ? 'text-green-500' : 
                           employee.performanceRating >= 3 ? 'text-blue-500' : 
                           employee.performanceRating >= 2 ? 'text-yellow-500' : 'text-red-500') : 
                          'text-gray-300'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>

              {/* Key Metrics */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Tenure:</span>
                  <span className="font-medium">
                    {Math.floor((new Date() - new Date(employee.joining_date)) / (365 * 24 * 60 * 60 * 1000))} years
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Absent Days:</span>
                  <span className="font-medium">{employee.leaves_absents.absent_days}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Complaints:</span>
                  <span className="font-medium">
                    {employee.reg_complaints.length} ({employee.reg_complaints.filter(c => c.status === 'Resolved').length} resolved)
                  </span>
                </div>
              </div>

              <button
                onClick={() => toggleExpand(employee.employee_id)}
                className="mt-4 w-full py-2 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors"
              >
                {expandedEmployee === employee.employee_id ? 'Show Less' : 'View Details'}
              </button>
            </div>

            {/* Expanded Details */}
            {expandedEmployee === employee.employee_id && (
              <div className="px-4 pb-4 border-t border-gray-100">
                <div className="mt-4 space-y-4">
                  {/* Detailed Performance Breakdown */}
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">Performance Breakdown</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Attendance Score:</span>
                        <span className="font-medium">
                          {((1 - (employee.leaves_absents.absent_days / 30)) * 2).toFixed(1)}/2
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Complaint Status:</span>
                        <span className="font-medium">
                          {employee.reg_complaints.some(c => c.status === 'Pending') ? 'Pending issues (-1)' : 'No pending issues (+1)'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Tenure Bonus:</span>
                        <span className="font-medium">
                          +{Math.floor((new Date() - new Date(employee.joining_date)) / (365 * 24 * 60 * 60 * 1000) * 0.5)} points
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Complaints */}
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">Recent Complaints</h4>
                    {employee.reg_complaints.length > 0 ? (
                      <div className="space-y-2">
                        {employee.reg_complaints.map((complaint, index) => (
                          <div key={index} className="p-2 bg-gray-50 rounded">
                            <div className="flex justify-between">
                              <p className="text-gray-800">{complaint.complaint}</p>
                              <span className={`text-xs px-2 py-1 rounded-full ${
                                complaint.status === 'Resolved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                              }`}>
                                {complaint.status}
                              </span>
                            </div>
                            {complaint.actions && (
                              <p className="text-xs text-gray-500 mt-1">Action: {complaint.actions}</p>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 text-sm">No complaints recorded</p>
                    )}
                  </div>

                  {/* Manager Actions */}
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">Manager Actions</h4>
                    <div className="flex space-x-2">
                      <button className="px-3 py-1 bg-green-100 text-green-800 text-xs rounded-full hover:bg-green-200">
                        Give Bonus
                      </button>
                      <button className="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full hover:bg-blue-200">
                        Schedule Review
                      </button>
                      {employee.performanceStatus === 'Needs Improvement' && (
                        <button className="px-3 py-1 bg-red-100 text-red-800 text-xs rounded-full hover:bg-red-200">
                          Improvement Plan
                        </button>
                      )}
                    </div>
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

export default EmployeePerformance;