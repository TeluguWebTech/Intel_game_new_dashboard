import { 
    FaGamepad, FaExchangeAlt, FaMapMarkerAlt, 
    FaPiggyBank, FaMoneyBillWave, FaFileAlt 
  } from "react-icons/fa";
import RevenueDataTable from "./RevenueDataTable";
import { Link } from "react-router-dom";
  
  const stats = [
    { title: "Total Revenue", value: "$2,300", change: "+Report", icon: <FaMoneyBillWave />, color: "text-orange-500",path:"/total-revenue" }, // Money bill icon for revenue
    { title: "Transactions", value: "$53k", change: "+55% than last week", icon: <FaExchangeAlt />, color: "text-green-500", path:"/revenue-transactions" }, // Exchange icon for transactions
    { title: "Locations", value: "3,462", change: "522 active locations", icon: <FaMapMarkerAlt />, color: "text-red-500" }, // Map marker icon for locations
    { title: "TRT Deposits", value: "8,900", change: "+2% than last month", icon: <FaPiggyBank />, color: "text-green-500" }, // Piggy bank icon for deposits
    { title: "TRT Withdrawals", value: "$103,430", change: "+5% than yesterday", icon: <FaMoneyBillWave />, color: "text-green-500" }, // Money bill icon for withdrawals
    { title: "Reports", value: "325", change: "-1% than last week", icon: <FaFileAlt />, color: "text-red-500" }, // File icon for reports
  ];
  


export default function RevenueBlocks() {
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
    <RevenueDataTable />
   </div>
  );
}
