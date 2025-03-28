import { useState } from "react";
import { empData } from "../../../masterdata/hrdata/employeeData";
import { empTaskDetails } from "../../../masterdata/tasks/empTaskDetails";
import { empPayrol } from "../../../masterdata/hrdata/empPayrol";
import { empTimesheets } from "../../../masterdata/hrdata/empTimeSheet";

export default function EmployeeManagementTable() {
  const [activeTab, setActiveTab] = useState("details");
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [expandedRows, setExpandedRows] = useState([]);
  const [dataView, setDataView] = useState("employees"); // 'employees', 'tasks', 'payrolls', 'timesheets'
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const toggleRowExpand = (employeeId) => {
    setExpandedRows(prev =>
      prev.includes(employeeId)
        ? prev.filter(id => id !== employeeId)
        : [...prev, employeeId]
    );
  };

  const viewEmployeeDetails = (employee) => {
    setSelectedEmployee(employee);
    setActiveTab("details");
  };

  const getEmployeeTasks = (employeeId) => {
    return empTaskDetails.filter(task => task.employee_id === employeeId);
  };

  const getEmployeePayroll = (employeeId) => {
    return empPayrol.find(payroll => payroll.employee_id === employeeId);
  };

  const getEmployeeTimesheets = (employeeId) => {
    return empTimesheets.find(timesheet => timesheet.employee_id === employeeId);
  };

  // Get unique regions from employee data
  const regions = [...new Set(empData.map(emp => emp.region))];

  // Filter employees based on search term and region
  const filteredEmployees = empData.filter(emp => {
    const matchesSearch = emp.employee_name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         emp.position.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRegion = selectedRegion === "all" || emp.region === selectedRegion;
    const matchesStatus = statusFilter === "all" || 
                         (statusFilter === "active" && emp.leaves_absents.absent_days <= 3) ||
                         (statusFilter === "inactive" && emp.leaves_absents.absent_days > 3);
    
    return matchesSearch && matchesRegion && matchesStatus;
  });

  // Filter tasks based on search term
  const filteredTasks = empTaskDetails.filter(task => {
    return task.task_title.toLowerCase().includes(searchTerm.toLowerCase()) || 
           task.client_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
           task.status.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // Filter payrolls based on search term
  const filteredPayrolls = empPayrol.filter(payroll => {
    const employee = empData.find(emp => emp.employee_id === payroll.employee_id);
    return employee && (
      employee.employee_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payroll.payment_status.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // Filter timesheets based on search term
  const filteredTimesheets = empTimesheets.filter(timesheet => {
    const employee = empData.find(emp => emp.employee_id === timesheet.employee_id);
    return employee && employee.employee_name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="p-4 md:p-6 lg:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Employee Management</h1>
        
        {/* Filter Controls */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setDataView("employees")}
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  dataView === "employees" 
                    ? "bg-blue-600 text-white" 
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                All Employees
              </button>
              <button
                onClick={() => setDataView("tasks")}
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  dataView === "tasks" 
                    ? "bg-blue-600 text-white" 
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                Tasks
              </button>
              <button
                onClick={() => setDataView("payrolls")}
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  dataView === "payrolls" 
                    ? "bg-blue-600 text-white" 
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                Payrolls
              </button>
              <button
                onClick={() => setDataView("timesheets")}
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  dataView === "timesheets" 
                    ? "bg-blue-600 text-white" 
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                Time Sheets
              </button>
            </div>
            
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative">
                <select
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  disabled={dataView !== "employees"}
                >
                  <option value="all">All Regions</option>
                  {regions.map(region => (
                    <option key={region} value={region}>{region}</option>
                  ))}
                </select>
              </div>
              
              {dataView === "employees" && (
                <div className="relative">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  >
                    <option value="all">All Statuses</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              )}
              
              <div className="relative">
                <input
                  type="text"
                  placeholder={`Search ${dataView}...`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-4 pr-10 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Table */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
          <div className="overflow-x-auto">
            {dataView === "employees" ? (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Employee
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Position
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Department/Region
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredEmployees.map((emp) => (
                    <>
                      <tr key={emp.employee_id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <img
                                className="h-10 w-10 rounded-full object-cover"
                                src={emp.employee_image}
                                alt={emp.employee_name}
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{emp.employee_name}</div>
                              <div className="text-sm text-gray-500">{emp.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{emp.position}</div>
                          <div className="text-xs text-gray-500">${emp.salary_offered.toLocaleString()}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{emp.department}</div>
                          <div className="text-xs text-gray-500">{emp.region}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            emp.leaves_absents.absent_days > 3 ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"
                          }`}>
                            {emp.leaves_absents.absent_days > 3 ? "Exceeded Absences" : "Active"}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => viewEmployeeDetails(emp)}
                              className="text-blue-600 hover:text-blue-900 transition-colors"
                              title="View Details"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                              </svg>
                            </button>
                            <button
                              onClick={() => toggleRowExpand(emp.employee_id)}
                              className="text-purple-600 hover:text-purple-900 transition-colors"
                              title={expandedRows.includes(emp.employee_id) ? "Collapse" : "Expand"}
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                {expandedRows.includes(emp.employee_id) ? (
                                  <path fillRule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" />
                                ) : (
                                  <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                                )}
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                      {expandedRows.includes(emp.employee_id) && (
                        <tr>
                          <td colSpan="5" className="px-6 py-4 bg-gray-50">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div className="bg-white p-4 rounded-lg shadow">
                                <h3 className="font-medium text-gray-900 mb-2">Tasks</h3>
                                {getEmployeeTasks(emp.employee_id).length > 0 ? (
                                  <ul className="space-y-2">
                                    {getEmployeeTasks(emp.employee_id).map(task => (
                                      <li key={task.task_id} className="text-sm">
                                        <span className="font-medium">{task.task_title}</span> - {task.status}
                                      </li>
                                    ))}
                                  </ul>
                                ) : (
                                  <p className="text-sm text-gray-500">No tasks assigned</p>
                                )}
                              </div>
                              <div className="bg-white p-4 rounded-lg shadow">
                                <h3 className="font-medium text-gray-900 mb-2">Payroll</h3>
                                {getEmployeePayroll(emp.employee_id) ? (
                                  <div className="text-sm">
                                    <p>Net Salary: ${getEmployeePayroll(emp.employee_id).net_salary.toLocaleString()}</p>
                                    <p>Status: {getEmployeePayroll(emp.employee_id).payment_status}</p>
                                  </div>
                                ) : (
                                  <p className="text-sm text-gray-500">No payroll data</p>
                                )}
                              </div>
                              <div className="bg-white p-4 rounded-lg shadow">
                                <h3 className="font-medium text-gray-900 mb-2">Recent Activity</h3>
                                {getEmployeeTimesheets(emp.employee_id) ? (
                                  <ul className="space-y-2">
                                    {getEmployeeTimesheets(emp.employee_id).timesheets.slice(0, 2).map(timesheet => (
                                      <li key={timesheet.date} className="text-sm">
                                        {timesheet.date}: {timesheet.tasks.length} tasks
                                      </li>
                                    ))}
                                  </ul>
                                ) : (
                                  <p className="text-sm text-gray-500">No recent activity</p>
                                )}
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </>
                  ))}
                </tbody>
              </table>
            ) : dataView === "tasks" ? (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Task
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Employee
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Client
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Progress
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredTasks.map(task => {
                    const employee = empData.find(emp => emp.employee_id === task.employee_id);
                    return (
                      <tr key={task.task_id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{task.task_title}</div>
                          <div className="text-sm text-gray-500">{task.task_description}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {employee ? (
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-8 w-8">
                                <img
                                  className="h-8 w-8 rounded-full object-cover"
                                  src={employee.employee_image}
                                  alt={employee.employee_name}
                                />
                              </div>
                              <div className="ml-3">
                                <div className="text-sm font-medium text-gray-900">{employee.employee_name}</div>
                                <div className="text-xs text-gray-500">{employee.position}</div>
                              </div>
                            </div>
                          ) : (
                            <div className="text-sm text-gray-500">Employee not found</div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{task.client_name}</div>
                          <div className="text-sm text-gray-500">{task.client_location}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            task.status === "Completed" ? "bg-green-100 text-green-800" :
                            task.status === "In Progress" ? "bg-blue-100 text-blue-800" :
                            "bg-yellow-100 text-yellow-800"
                          }`}>
                            {task.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div 
                              className="bg-blue-600 h-2.5 rounded-full" 
                              style={{ width: `${task.progress}%` }}
                            ></div>
                          </div>
                          <span className="text-xs text-gray-500 mt-1">{task.progress}%</span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : dataView === "payrolls" ? (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Employee
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Base Salary
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Deductions
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Net Salary
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredPayrolls.map(payroll => {
                    const employee = empData.find(emp => emp.employee_id === payroll.employee_id);
                    return (
                      <tr key={payroll.employee_id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          {employee ? (
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-8 w-8">
                                <img
                                  className="h-8 w-8 rounded-full object-cover"
                                  src={employee.employee_image}
                                  alt={employee.employee_name}
                                />
                              </div>
                              <div className="ml-3">
                                <div className="text-sm font-medium text-gray-900">{employee.employee_name}</div>
                                <div className="text-xs text-gray-500">{employee.position}</div>
                              </div>
                            </div>
                          ) : (
                            <div className="text-sm text-gray-500">Employee not found</div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">${payroll.salary_offered.toLocaleString()}</div>
                          <div className="text-xs text-gray-500">+ ${payroll.bonus.toLocaleString()} bonus</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">- ${payroll.deductions.tax.toLocaleString()} tax</div>
                          <div className="text-xs text-gray-500">- ${payroll.deductions.insurance.toLocaleString()} insurance</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-lg font-medium text-blue-600">${payroll.net_salary.toLocaleString()}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            payroll.payment_status === "Paid" ? "bg-green-100 text-green-800" :
                            payroll.payment_status === "Pending" ? "bg-yellow-100 text-yellow-800" :
                            "bg-red-100 text-red-800"
                          }`}>
                            {payroll.payment_status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Employee
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tasks Completed
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Hours Worked
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredTimesheets.map(timesheet => {
                    const employee = empData.find(emp => emp.employee_id === timesheet.employee_id);
                    return timesheet.timesheets.map((day, index) => (
                      <tr key={`${timesheet.employee_id}-${index}`} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          {employee ? (
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-8 w-8">
                                <img
                                  className="h-8 w-8 rounded-full object-cover"
                                  src={employee.employee_image}
                                  alt={employee.employee_name}
                                />
                              </div>
                              <div className="ml-3">
                                <div className="text-sm font-medium text-gray-900">{employee.employee_name}</div>
                                <div className="text-xs text-gray-500">{employee.department}</div>
                              </div>
                            </div>
                          ) : (
                            <div className="text-sm text-gray-500">Employee not found</div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{day.date}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{day.tasks.length} tasks</div>
                          <div className="text-xs text-gray-500">
                            {day.tasks.filter(t => t.status === "Completed").length} completed
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{day.hours_worked} hours</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            day.status === "Approved" ? "bg-green-100 text-green-800" :
                            day.status === "Pending" ? "bg-yellow-100 text-yellow-800" :
                            "bg-red-100 text-red-800"
                          }`}>
                            {day.status}
                          </span>
                        </td>
                      </tr>
                    ));
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Employee Detail Modal */}
        {selectedEmployee && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-2xl font-bold text-gray-800">
                    {selectedEmployee.employee_name}'s Details
                  </h2>
                  <button
                    onClick={() => setSelectedEmployee(null)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Tabs */}
                <div className="border-b border-gray-200 mb-6">
                  <nav className="-mb-px flex space-x-8">
                    {["details", "tasks", "payroll", "timesheets"].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                          activeTab === tab
                            ? "border-blue-500 text-blue-600"
                            : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                        }`}
                      >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                      </button>
                    ))}
                  </nav>
                </div>

                {/* Tab Content */}
                <div className="space-y-6">
                  {activeTab === "details" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex items-center space-x-4">
                        <img
                          src={selectedEmployee.employee_image}
                          alt={selectedEmployee.employee_name}
                          className="h-20 w-20 rounded-full object-cover"
                        />
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">{selectedEmployee.employee_name}</h3>
                          <p className="text-gray-500">{selectedEmployee.position}</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Employee ID:</span>
                          <span className="text-gray-900">{selectedEmployee.employee_id}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Department:</span>
                          <span className="text-gray-900">{selectedEmployee.department}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Joining Date:</span>
                          <span className="text-gray-900">{selectedEmployee.joining_date}</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-medium text-gray-900">Contact Information</h4>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Phone:</span>
                          <span className="text-gray-900">{selectedEmployee.contact}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Email:</span>
                          <span className="text-gray-900">{selectedEmployee.email}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Address:</span>
                          <span className="text-gray-900">{selectedEmployee.address}</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-medium text-gray-900">Employment Details</h4>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Salary:</span>
                          <span className="text-gray-900">${selectedEmployee.salary_offered.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Bonus:</span>
                          <span className="text-gray-900">${selectedEmployee.bonus.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Absent Days:</span>
                          <span className="text-gray-900">{selectedEmployee.leaves_absents.absent_days}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === "tasks" && (
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Task</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Progress</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {getEmployeeTasks(selectedEmployee.employee_id).length > 0 ? (
                            getEmployeeTasks(selectedEmployee.employee_id).map(task => (
                              <tr key={task.task_id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm font-medium text-gray-900">{task.task_title}</div>
                                  <div className="text-sm text-gray-500">{task.task_description}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm text-gray-900">{task.client_name}</div>
                                  <div className="text-sm text-gray-500">{task.client_location}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                    task.status === "Completed" ? "bg-green-100 text-green-800" :
                                    task.status === "In Progress" ? "bg-blue-100 text-blue-800" :
                                    "bg-yellow-100 text-yellow-800"
                                  }`}>
                                    {task.status}
                                  </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                                    <div 
                                      className="bg-blue-600 h-2.5 rounded-full" 
                                      style={{ width: `${task.progress}%` }}
                                    ></div>
                                  </div>
                                  <span className="text-xs text-gray-500 mt-1">{task.progress}%</span>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan="4" className="px-6 py-4 text-center text-sm text-gray-500">
                                No tasks assigned to this employee
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {activeTab === "payroll" && (
                    <div>
                      {getEmployeePayroll(selectedEmployee.employee_id) ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-4">
                            <h4 className="font-medium text-gray-900">Salary Details</h4>
                            <div className="space-y-2">
                              <div className="flex justify-between">
                                <span className="text-gray-500">Base Salary:</span>
                                <span className="text-gray-900">${getEmployeePayroll(selectedEmployee.employee_id).salary_offered.toLocaleString()}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-500">Bonus:</span>
                                <span className="text-gray-900">${getEmployeePayroll(selectedEmployee.employee_id).bonus.toLocaleString()}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-500">Overtime Pay:</span>
                                <span className="text-gray-900">${getEmployeePayroll(selectedEmployee.employee_id).overtime_pay.toLocaleString()}</span>
                              </div>
                            </div>
                          </div>
                          <div className="space-y-4">
                            <h4 className="font-medium text-gray-900">Deductions</h4>
                            <div className="space-y-2">
                              <div className="flex justify-between">
                                <span className="text-gray-500">Tax:</span>
                                <span className="text-gray-900">${getEmployeePayroll(selectedEmployee.employee_id).deductions.tax.toLocaleString()}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-500">Insurance:</span>
                                <span className="text-gray-900">${getEmployeePayroll(selectedEmployee.employee_id).deductions.insurance.toLocaleString()}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-500">Leaves Deduction:</span>
                                <span className="text-gray-900">${getEmployeePayroll(selectedEmployee.employee_id).deductions.leaves_deduction.toLocaleString()}</span>
                              </div>
                            </div>
                          </div>
                          <div className="col-span-1 md:col-span-2 bg-blue-50 p-4 rounded-lg">
                            <div className="flex justify-between items-center">
                              <h4 className="font-medium text-gray-900">Net Salary</h4>
                              <span className="text-xl font-bold text-blue-600">
                                ${getEmployeePayroll(selectedEmployee.employee_id).net_salary.toLocaleString()}
                              </span>
                            </div>
                            <div className="mt-2 text-sm text-gray-500">
                              Last payment: {getEmployeePayroll(selectedEmployee.employee_id).last_payment_date} • Next payment: {getEmployeePayroll(selectedEmployee.employee_id).next_payment_date}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-8 text-gray-500">
                          No payroll data available for this employee
                        </div>
                      )}
                    </div>
                  )}

                  {activeTab === "timesheets" && (
                    <div>
                      {getEmployeeTimesheets(selectedEmployee.employee_id) ? (
                        <div className="space-y-6">
                          {getEmployeeTimesheets(selectedEmployee.employee_id).timesheets.map(timesheet => (
                            <div key={timesheet.date} className="border border-gray-200 rounded-lg overflow-hidden">
                              <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
                                <h4 className="font-medium text-gray-900">{timesheet.date}</h4>
                              </div>
                              <div className="divide-y divide-gray-200">
                                {timesheet.tasks.map(task => (
                                  <div key={task.task_id} className="p-4">
                                    <div className="flex justify-between items-start">
                                      <div>
                                        <h5 className="font-medium text-gray-900">{task.task_title}</h5>
                                        <p className="text-sm text-gray-500">{task.client_name} • {task.machine_id}</p>
                                      </div>
                                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                        task.status === "Completed" ? "bg-green-100 text-green-800" :
                                        "bg-blue-100 text-blue-800"
                                      }`}>
                                        {task.status}
                                      </span>
                                    </div>
                                    <div className="mt-2 flex justify-between items-center">
                                      <span className="text-sm text-gray-500">{task.hours_spent} hours</span>
                                      <div className="w-32 bg-gray-200 rounded-full h-2">
                                        <div 
                                          className="bg-blue-600 h-2 rounded-full" 
                                          style={{ width: `${task.progress}%` }}
                                        ></div>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8 text-gray-500">
                          No timesheet data available for this employee
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
              <div className="bg-gray-50 px-6 py-3 flex justify-end border-t border-gray-200">
                <button
                  onClick={() => setSelectedEmployee(null)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}