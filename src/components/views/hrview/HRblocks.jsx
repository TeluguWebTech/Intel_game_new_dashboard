import { 
    FaUsers, FaUserCheck, FaMoneyCheckAlt, 
    FaChartLine, FaBriefcase, FaChalkboardTeacher 
  } from "react-icons/fa";
import HrEmpDataTable from "./HrEmpDataTable";
import { Link } from "react-router-dom";
  
  const stats = [
    { 
      title: "Total Employees", 
      value: "2,300", 
      change: "+Add New Employee", 
      icon: <FaUsers />, 
      color: "text-blue-500",
      path:"/all-employees"
    }, // Users icon for total employees
    
    { 
      title: "Attendance & Leaves", 
      value: "$53k", 
      change: "+55% than last week", 
      icon: <FaUserCheck />, 
      color: "text-green-500",
      path:"/emp-register" 
    }, // User check icon for attendance
    
    { 
      title: "Payroll Processed", 
      value: "3,462", 
      change: "522 active locations", 
      icon: <FaMoneyCheckAlt />, 
      color: "text-red-500",
      path:"/emp-payroll"
    }, // Money check icon for payroll
    
    { 
      title: "Performance Reviews", 
      value: "8,900", 
      change: "+2% than last month", 
      icon: <FaChartLine />, 
      color: "text-green-500" ,
      path:"/emp-performance"
    }, // Chart line icon for performance
    
    { 
      title: "Open Positions", 
      value: "$103,430", 
      change: "+5% than yesterday", 
      icon: <FaBriefcase />, 
      color: "text-green-500" 
    }, // Briefcase icon for job positions
    
    { 
      title: "Recruitment & Training", 
      value: "325", 
      change: "-1% than last week", 
      icon: <FaChalkboardTeacher />, 
      color: "text-red-500" 
    }, // Chalkboard teacher icon for training
  ];
  

export default function HRblocks() {
  return (
   <div className="">
     <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 p-6">
     {stats.map((stat, index) => (
          stat.path ? (
            <Link to={stat.path} key={index} className="p-4 rounded-lg shadow-md block transition hover:bg-gray-100">
              <div className="flex justify-between items-center">
                <h3 className="text-gray-600 text-sm font-semibold">{stat.title}</h3>
                <span className={`text-xl ${stat.color}`}>{stat.icon}</span>
              </div>
              <h2 className="text-2xl font-bold mt-1">{stat.value}</h2>
              <p className={`text-xs mt-1 ${stat.color}`}>{stat.change}</p>
            </Link>
          ) : (
            <div key={index} className="p-4 rounded-lg shadow-md">
              <div className="flex justify-between items-center">
                <h3 className="text-gray-600 text-sm font-semibold">{stat.title}</h3>
                <span className={`text-xl ${stat.color}`}>{stat.icon}</span>
              </div>
              <h2 className="text-2xl font-bold mt-1">{stat.value}</h2>
              <p className={`text-xs mt-1 ${stat.color}`}>{stat.change}</p>
            </div>
          )
        ))}
    </div>
    <HrEmpDataTable />
   </div>
  );
}
