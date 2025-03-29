import EmployeeDataTable from "./EmployeeDataTable";
import { FaHome, FaChevronRight, FaPlus } from "react-icons/fa";
import { Link } from 'react-router-dom';

import { 
  FaUsers, 
  FaDollarSign, 
  FaTasks, 
  FaChartLine, 
  FaChartBar, 
  FaFileAlt 
} from "react-icons/fa"; // Importing suitable icons from react-icons

const stats = [
  { title: "Total Employees", value: "2,300", change: "+3% than last month", icon: <FaUsers className="text-blue-500" />, changeType: "up" },
  { title: "Payroll", value: "$53k", change: "+55% than last week", icon: <FaDollarSign className="text-green-500" />, changeType: "up" },
  { title: "Tasks", value: "3,462", change: "-2% than yesterday", icon: <FaTasks className="text-orange-500" />, changeType: "down" },
  { title: "Performance", value: "$103,430", change: "+5% than yesterday", icon: <FaChartLine className="text-purple-500" />, changeType: "up" },
  { title: "Analytics", value: "8,900", change: "+2% than last month", icon: <FaChartBar className="text-teal-500" />, changeType: "up" },
  { title: "Reports", value: "325", change: "-1% than last week", icon: <FaFileAlt className="text-red-500" />, changeType: "down" },
];





export default function EmployeesBlock() {
  return (
   <div className="px-4 py-8">
        <div className="flex items-center text-gray-600 text-sm ">
                                  <FaHome className="mr-1 text-blue-500" />
                                  <Link to="/" className="hover:underline">Home</Link>
                                  <FaChevronRight className="mx-2 text-gray-400" />
                                
                                  <span className="text-orange-500">Employee Dashboard</span>
                                </div>
     {/* <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 p-6">
      {stats.map((stat, index) => (
        <div key={index} className="p-4 rounded-lg shadow-md">
          <div className="flex justify-between items-center">
            <h3 className="text-gray-600 text-sm font-semibold">{stat.title}</h3>
            <span className={`text-xl ${stat.color}`}>{stat.icon}</span>
          </div>
          <h2 className="text-1xl font-bold mt-1">{stat.value}</h2>
          <p className={`text-xs mt-1 ${stat.color}`}>{stat.change}</p>
        </div>
      ))}
    </div> */}
    <EmployeeDataTable />
   </div>
  );
}
