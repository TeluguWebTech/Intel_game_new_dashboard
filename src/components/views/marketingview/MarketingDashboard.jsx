import React, { useState } from 'react';
import { FaSearch, FaFilter, FaCalendarAlt, FaUserTie, FaChartLine, FaChevronDown } from 'react-icons/fa';
import { marketingData } from '../../../masterdata/marketing/marketingData';
import { FaHome, FaChevronRight, FaPlus } from "react-icons/fa";
import { Link } from 'react-router-dom';


const MarketingDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [clientTypeFilter, setClientTypeFilter] = useState('All');

  // Extract all tasks and group by employee
  const allTasks = marketingData[0].marketingTasks;
  
  // Get unique employees
  const employees = [...new Set(allTasks.map(task => task.employee_name))];
  
  // Get unique values for filters
  const statuses = ['All', ...new Set(allTasks.map(task => task.status))];
  const priorities = ['All', ...new Set(allTasks.map(task => task.priority))];
  const clientTypes = ['All', ...new Set(allTasks.map(task => task.client_type))];

  // Filter tasks based on search and filters
  const filteredTasks = allTasks.filter(task => {
    const matchesSearch = 
      task.employee_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.task_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.client_name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'All' || task.status === statusFilter;
    const matchesPriority = priorityFilter === 'All' || task.priority === priorityFilter;
    const matchesClientType = clientTypeFilter === 'All' || task.client_type === clientTypeFilter;
    
    return matchesSearch && matchesStatus && matchesPriority && matchesClientType;
  });

  // Group filtered tasks by employee
  const employeesWithTasks = employees.map(employee => {
    const employeeTasks = filteredTasks.filter(task => task.employee_name === employee);
    return {
      name: employee,
      tasks: employeeTasks,
      stats: {
        totalTasks: employeeTasks.length,
        completed: employeeTasks.filter(t => t.status === 'Completed').length,
        highPriority: employeeTasks.filter(t => t.priority === 'High').length,
        appointments: employeeTasks.reduce((sum, t) => sum + (t.appointments_scheduled || 0), 0),
        avgProgress: employeeTasks.reduce((sum, t) => sum + (t.progress || 0), 0) / employeeTasks.length || 0
      }
    };
  }).filter(employee => employee.tasks.length > 0);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
                  <div className="flex items-center text-gray-600 text-sm pb-4">
        <FaHome className="mr-1 text-blue-500" />
        <Link to="/" className="hover:underline">Home</Link>
       
        <FaChevronRight className="mx-2 text-gray-400" />
        <span className="text-orange-500">Marketing</span>
      </div>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Marketing Team Dashboard</h1>
          <p className="text-gray-600 mt-2">Employee performance metrics and task overview</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-100">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Filter Employees</h2>
            <div className="relative flex-grow md:max-w-xs">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search employees or tasks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2.5 w-full border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Status</label>
              <div className="relative">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="appearance-none pl-3 pr-8 py-2.5 w-full border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  {statuses.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <FaChevronDown className="text-gray-400 text-sm" />
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Priority</label>
              <div className="relative">
                <select
                  value={priorityFilter}
                  onChange={(e) => setPriorityFilter(e.target.value)}
                  className="appearance-none pl-3 pr-8 py-2.5 w-full border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  {priorities.map(priority => (
                    <option key={priority} value={priority}>{priority}</option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <FaChevronDown className="text-gray-400 text-sm" />
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Client Type</label>
              <div className="relative">
                <select
                  value={clientTypeFilter}
                  onChange={(e) => setClientTypeFilter(e.target.value)}
                  className="appearance-none pl-3 pr-8 py-2.5 w-full border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  {clientTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <FaChevronDown className="text-gray-400 text-sm" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Employee Cards */}
        {employeesWithTasks.length > 0 ? (
          <div className="space-y-8">
            {employeesWithTasks.map((employee) => (
              <div key={employee.name} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xl mr-4">
                      {employee.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800">{employee.name}</h3>
                  </div>
                  <span className="px-3 py-1 text-sm font-medium rounded-full bg-gray-100 text-gray-800">
                    {employee.tasks.length} tasks
                  </span>
                </div>
                
                {/* Employee Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  {/* Tasks Completed */}
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-blue-600">Tasks Completed</p>
                        <p className="text-2xl font-bold text-gray-800">{employee.stats.completed}</p>
                      </div>
                      <div className="p-2 rounded-lg bg-blue-100 text-blue-600">
                        <FaChartLine className="text-xl" />
                      </div>
                    </div>
                    <div className="mt-2">
                      <div className="w-full bg-blue-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${(employee.stats.completed / employee.stats.totalTasks) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  
                  {/* High Priority */}
                  <div className="bg-red-50 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-red-600">High Priority</p>
                        <p className="text-2xl font-bold text-gray-800">{employee.stats.highPriority}</p>
                      </div>
                      <div className="p-2 rounded-lg bg-red-100 text-red-600">
                        <FaChartLine className="text-xl" />
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Urgent tasks requiring attention</p>
                  </div>
                  
                  {/* Appointments */}
                  <div className="bg-purple-50 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-purple-600">Appointments</p>
                        <p className="text-2xl font-bold text-gray-800">{employee.stats.appointments}</p>
                      </div>
                      <div className="p-2 rounded-lg bg-purple-100 text-purple-600">
                        <FaCalendarAlt className="text-xl" />
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Client meetings scheduled</p>
                  </div>
                  
                  {/* Avg Progress */}
                  <div className="bg-green-50 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-green-600">Avg Progress</p>
                        <p className="text-2xl font-bold text-gray-800">{Math.round(employee.stats.avgProgress)}%</p>
                      </div>
                      <div className="p-2 rounded-lg bg-green-100 text-green-600">
                        <FaUserTie className="text-xl" />
                      </div>
                    </div>
                    <div className="mt-2">
                      <div className="w-full bg-green-200 rounded-full h-2">
                        <div 
                          className="bg-green-600 h-2 rounded-full" 
                          style={{ width: `${employee.stats.avgProgress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Recent Tasks */}
                <div>
                  <h4 className="text-md font-medium text-gray-700 mb-3">Recent Tasks</h4>
                  <div className="space-y-3">
                    {employee.tasks.slice(0, 3).map(task => (
                      <div key={task.task_id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-800">{task.task_title}</p>
                          <p className="text-sm text-gray-500">{task.client_name}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            task.priority === 'High' ? 'bg-red-100 text-red-800' :
                            task.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {task.priority}
                          </span>
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            task.status === 'Completed' ? 'bg-green-100 text-green-800' :
                            task.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {task.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-gray-900">No employees match your filters</h3>
            <p className="mt-1 text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MarketingDashboard;