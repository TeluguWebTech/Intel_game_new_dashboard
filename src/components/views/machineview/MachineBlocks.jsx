import { FaGamepad, FaServer, FaMapMarkedAlt, FaPiggyBank, FaMoneyBillWave, FaFileInvoice } from "react-icons/fa";
import MachineDataTable from "./MachineDataTable";

import { Link } from 'react-router-dom';
import { FaHome, FaChevronRight, FaPlus } from "react-icons/fa";


const stats = [
  { title: "Game Machines", value: "2,300", change: "+Add New Machine", icon: <FaGamepad />, color: "text-orange-500", path:"/game-machines" }, 
  { title: "TRT Machines", value: "$53k", change: "+55% than last week", icon: <FaServer />, color: "text-green-500", path:"/trt-machines" }, // Server icon for TRT machines
  { title: "Locations", value: "3,462", change: "522 active locations", icon: <FaMapMarkedAlt />, color: "text-red-500", path:"/machine-locations" }, // Map marker icon for locations
  { title: "TRT Deposits", value: "8,900", change: "+2% than last month", icon: <FaPiggyBank />, color: "text-green-500", path:"/trt-deposits" }, // Piggy bank icon for deposits
  { title: "TRT Withdrawals", value: "$103,430", change: "+5% than yesterday", icon: <FaMoneyBillWave />, color: "text-green-500",path:"/trt-withdrawls" }, // Money bill icon for withdrawals
  { title: "Reports", value: "325", change: "-1% than last week", icon: <FaFileInvoice />, color: "text-red-500", path:"/machine-reports" }, // Invoice file icon for reports
];
export default function ClientBlocks() {
  return (
    <div className="p-4 bg-gray-50 rounded-lg">
           <div className="flex items-center text-gray-600 text-sm pb-4">
              <FaHome className="mr-1 text-blue-500" />
              <Link to="/" className="hover:underline">Home</Link>
              <FaChevronRight className="mx-2 text-gray-400" />
              
              <span className="text-orange-500">Machines</span>
            </div>
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
     <MachineDataTable />
    </div>
  );
}

