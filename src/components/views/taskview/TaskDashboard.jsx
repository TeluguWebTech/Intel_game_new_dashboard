import React, { useState } from 'react';
import { FaHome, FaChevronRight, FaPlus } from "react-icons/fa";
import { Link } from 'react-router-dom';

// Sample data (you can import your actual data)
const empTaskDetails = [
  {
    "task_id": "TASK1001",
    "employee_id": "EMP2001",
    "employee_name": "David Carter",
    "task_title": "Deposit Cash in TRT Machine",
    "task_description": "Collect cash from the vendor and deposit it into the TRT machine at Client Location A.",
    "client_name": "ABC Gaming Zone",
    "client_location": "Los Angeles, CA",
    "machine_id": "TRT-001",
    "amount": 5000,
    "assigned_by": "Vendor Manager",
    "assigned_date": "2024-03-25",
    "deadline": "2024-03-25",
    "priority": "High",
    "status": "In Progress",
    "progress": 50,
    "confirmation_receipt": null,
    "comments": [
      {
        "comment_by": "Vendor Manager",
        "comment": "Ensure proper receipt verification after deposit.",
        "date": "2024-03-25"
      }
    ]
  }
];

const salesTaskDetails = [
  {
    "task_id": "TASK2001",
    "employee_id": "EMP3001",
    "employee_name": "Alice Brown",
    "task_title": "Client Meeting for New Product Pitch",
    "task_description": "Meet with potential clients to discuss the latest product line and secure sales deals.",
    "client_name": "XYZ Corporation",
    "client_location": "San Francisco, CA",
    "sales_target": 10000,
    "assigned_by": "Sales Manager",
    "assigned_date": "2024-03-26",
    "deadline": "2024-03-30",
    "priority": "High",
    "status": "Pending",
    "progress": 0,
    "comments": [
      {
        "comment_by": "Sales Manager",
        "comment": "Focus on highlighting the cost benefits of our product.",
        "date": "2024-03-26"
      }
    ]
  }
];

const serviceTaskDetails = [
  {
    "task_id": "TASK3001",
    "employee_id": "EMP4001",
    "employee_name": "James Anderson",
    "task_title": "Routine Maintenance of TRT Machine",
    "task_description": "Perform scheduled maintenance and software updates on the TRT machine at Client Location A.",
    "client_name": "Gaming Hub LLC",
    "client_location": "Dallas, TX",
    "machine_id": "TRT-101",
    "service_type": "Maintenance",
    "assigned_by": "Service Manager",
    "assigned_date": "2024-03-26",
    "deadline": "2024-03-28",
    "priority": "High",
    "status": "Pending",
    "progress": 0,
    "comments": [
      {
        "comment_by": "Service Manager",
        "comment": "Ensure all system logs are backed up before updates.",
        "date": "2024-03-26"
      }
    ]
  }
];

// Combine all task types into one array
const allTasks = [...empTaskDetails, ...salesTaskDetails, ...serviceTaskDetails];

const TaskDashboard = () => {
  const [tasks, setTasks] = useState(allTasks);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [regionFilter, setRegionFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState('');

  // Extract unique regions from tasks
  const regions = ['All', ...new Set(allTasks.map(task => {
    const locationParts = task.client_location.split(', ');
    return locationParts.length > 1 ? locationParts[1] : 'Unknown';
  }))];

  const handleSearch = () => {
    const filtered = allTasks.filter(task => {
      const matchesSearch = 
        task.task_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.employee_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.task_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.client_name.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'All' || task.status === statusFilter;
      const matchesPriority = priorityFilter === 'All' || task.priority === priorityFilter;
      
      // Extract state from client_location (assuming format "City, State")
      const locationParts = task.client_location.split(', ');
      const state = locationParts.length > 1 ? locationParts[1] : '';
      const matchesRegion = regionFilter === 'All' || state === regionFilter;
      
      const matchesDate = !dateFilter || 
        task.assigned_date === dateFilter || 
        task.deadline === dateFilter;
      
      return matchesSearch && matchesStatus && matchesPriority && matchesRegion && matchesDate;
    });
    
    setTasks(filtered);
  };

  const resetFilters = () => {
    setSearchTerm('');
    setStatusFilter('All');
    setPriorityFilter('All');
    setRegionFilter('All');
    setDateFilter('');
    setTasks(allTasks);
  };

  // Function to handle adding new tasks (to be implemented)
  const handleAddTask = (taskType) => {
    // Here you would typically open a modal or navigate to a form
    console.log(`Adding new ${taskType} task`);
    // For now, we'll just show an alert
    alert(`Add new ${taskType} task form would open here`);
  };

  return (
    <div className="px-4 py-8">
    <div className="flex items-center text-gray-600 text-sm pb-8">
      <FaHome className="mr-1 text-blue-500" />
      <Link to="/" className="hover:underline">Home</Link>
      <FaChevronRight className="mx-2 text-gray-400" />
      <span className="text-orange-500">Employee Dashboard</span>
    </div>
    
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
      <h1 className="text-2xl font-bold">Task Management</h1>
      <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
        <button 
          onClick={() => handleAddTask('Employee')}
          className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition text-sm sm:text-base"
        >
          <FaPlus className="mr-2" /> <span>Employee Task</span>
        </button>
        <button 
          onClick={() => handleAddTask('Sales')}
          className="flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition text-sm sm:text-base"
        >
          <FaPlus className="mr-2" /> <span>Sales Task</span>
        </button>
        <button 
          onClick={() => handleAddTask('Service')}
          className="flex items-center justify-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition text-sm sm:text-base"
        >
          <FaPlus className="mr-2" /> <span>Service Task</span>
        </button>
      </div>
    </div>
    
         {/* Filters Section */}
         <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="All">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="All">All Priorities</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Region</label>
            <select
              value={regionFilter}
              onChange={(e) => setRegionFilter(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              {regions.map(region => (
                <option key={region} value={region}>{region}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>
        
        <div className="flex space-x-4">
          <button
            onClick={handleSearch}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Apply Filters
          </button>
          <button
            onClick={resetFilters}
            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition"
          >
            Reset Filters
          </button>
        </div>
      </div>
      
      {/* Tasks Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Task ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Task Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {tasks.length > 0 ? (
                tasks.map((task) => (
                  <tr key={task.task_id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{task.task_id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{task.employee_name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{task.task_title}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{task.client_name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{task.client_location}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${task.priority === 'High' ? 'bg-red-100 text-red-800' : 
                          task.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-green-100 text-green-800'}`}>
                        {task.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${task.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                          task.status === 'In Progress' ? 'bg-blue-100 text-blue-800' : 
                          'bg-green-100 text-green-800'}`}>
                        {task.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-900">View</button>
                        <button className="text-green-600 hover:text-green-900">Edit</button>
                        <button className="text-red-600 hover:text-red-900">Delete</button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="px-6 py-4 text-center text-sm text-gray-500">
                    No tasks found matching your criteria
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
  </div>
  );
};

export default TaskDashboard;