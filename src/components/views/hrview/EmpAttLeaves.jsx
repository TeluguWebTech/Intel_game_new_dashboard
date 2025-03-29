import { useState } from 'react';
import { empData } from '../../../masterdata/hrdata/employeeData';
import { FaHome, FaChevronRight, FaPlus } from "react-icons/fa";
import { Link } from 'react-router-dom';


const EmpAttLeaves = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  // Get unique regions and departments for dropdowns
  const regions = ['All', ...new Set(empData.map(emp => emp.region))];
  const departments = ['All', ...new Set(empData.map(emp => emp.department))];

  // Sort data
  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Filter employees based on search, region, and department
  const filteredEmployees = empData.filter(employee => {
    const matchesSearch = Object.values(employee).some(
      value => value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );
    const matchesRegion = selectedRegion === 'All' || employee.region === selectedRegion;
    const matchesDepartment = selectedDepartment === 'All' || employee.department === selectedDepartment;
    
    return matchesSearch && matchesRegion && matchesDepartment;
  });

  // Apply sorting
  const sortedEmployees = [...filteredEmployees].sort((a, b) => {
    if (!sortConfig.key) return 0;
    
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  return (
    <div className="container mx-auto px-4 py-8">
        <div className="flex items-center text-gray-600 text-sm pb-4">
                          <FaHome className="mr-1 text-blue-500" />
                          <Link to="/" className="hover:underline">Home</Link>
                          <FaChevronRight className="mx-2 text-gray-400" />
                          <Link to="/hr" className="hover:underline">HR</Link>
                          <FaChevronRight className="mx-2 text-gray-400" />
                          <span className="text-orange-500">Attandance</span>
                        </div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Attendance & Leaves Management</h1>
      
      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="md:col-span-1">
          <input
            type="text"
            placeholder="Search employees..."
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
        
        <select
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          value={selectedDepartment}
          onChange={(e) => setSelectedDepartment(e.target.value)}
        >
          {departments.map(dept => (
            <option key={dept} value={dept}>{dept}</option>
          ))}
        </select>
        
        <div className="flex items-center justify-end">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            Export Data
          </button>
        </div>
      </div>
      
      {/* Results count */}
      <div className="mb-4 text-sm text-gray-600">
        Showing {filteredEmployees.length} of {empData.length} employees
      </div>
      
      {/* Employees Table */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Employee
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => requestSort('department')}
              >
                Department {sortConfig.key === 'department' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => requestSort('position')}
              >
                Position {sortConfig.key === 'position' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => requestSort('region')}
              >
                Region {sortConfig.key === 'region' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => requestSort('working_days')}
              >
                Work Days {sortConfig.key === 'working_days' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => requestSort('leaves_absents.total_leaves')}
              >
                Leaves Taken {sortConfig.key === 'leaves_absents.total_leaves' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => requestSort('leaves_absents.absent_days')}
              >
                Absent Days {sortConfig.key === 'leaves_absents.absent_days' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => requestSort('overtime')}
              >
                Overtime {sortConfig.key === 'overtime' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedEmployees.length > 0 ? (
              sortedEmployees.map((employee) => (
                <tr key={employee.employee_id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img 
                          src={employee.employee_image} 
                          alt={employee.employee_name} 
                          className="h-10 w-10 rounded-full object-cover"
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{employee.employee_name}</div>
                        <div className="text-sm text-gray-500">{employee.employee_id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{employee.department}</div>
                    <div className="text-sm text-gray-500">HOD: {employee.hod}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {employee.position}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="text-gray-900">{employee.region}</div>
                    <div className="text-gray-500">{employee.branch}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {employee.working_days} days/week
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {employee.leaves_absents.total_leaves} days
                    </div>
                    <div className="text-xs text-gray-500">
                      {employee.reg_complaints.some(c => c.complaint.toLowerCase().includes('leave')) ? 
                        'Leave-related complaint' : 'No leave complaints'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm font-medium ${
                      employee.leaves_absents.absent_days > 3 ? 'text-red-600' : 'text-green-600'
                    }`}>
                      {employee.leaves_absents.absent_days} days
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      employee.overtime === 'Yes' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {employee.overtime}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">
                      Edit
                    </button>
                    <button className="text-gray-600 hover:text-gray-900">
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="px-6 py-4 text-center">
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
                    <h3 className="mt-2 text-lg font-medium text-gray-900">No employees found</h3>
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
        <div className="bg-white p-6 rounded-xl shadow border-l-4 border-blue-500">
          <h3 className="text-sm font-medium text-gray-500">Total Employees</h3>
          <p className="mt-1 text-2xl font-bold text-blue-600">
            {empData.length}
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow border-l-4 border-green-500">
          <h3 className="text-sm font-medium text-gray-500">Avg Leaves Taken</h3>
          <p className="mt-1 text-2xl font-bold text-green-600">
            {Math.round(empData.reduce((sum, emp) => sum + emp.leaves_absents.total_leaves, 0) / empData.length)} days
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow border-l-4 border-red-500">
          <h3 className="text-sm font-medium text-gray-500">Avg Absent Days</h3>
          <p className="mt-1 text-2xl font-bold text-red-600">
            {Math.round(empData.reduce((sum, emp) => sum + emp.leaves_absents.absent_days, 0) / empData.length)} days
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow border-l-4 border-yellow-500">
          <h3 className="text-sm font-medium text-gray-500">Overtime Employees</h3>
          <p className="mt-1 text-2xl font-bold text-yellow-600">
            {empData.filter(emp => emp.overtime === 'Yes').length}
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmpAttLeaves;