import { FaGamepad, FaDollarSign, FaMapMarkerAlt, FaExchangeAlt, FaChartPie, FaFileAlt } from "react-icons/fa";
import AccountDataTable from "./AccountDataTable";
import { Link } from "react-router-dom";

const stats = [
  { 
    title: "Overview", 
    value: "$2,300", 
    change: "Cash in Hand", 
    icon: <FaGamepad />, // Gaming machines  
    color: "text-orange-500",
    path:"/accounts-overview"
  },
  { 
    title: "Income", 
    value: "$53k", 
    change: "+55% than last week", 
    icon: <FaDollarSign />, // Dollar sign for revenue  
    color: "text-green-500" ,
    path:"/income-view"
  },
  { 
    title: "Payments", 
    value: "3,462", 
    change: "522 active locations", 
    icon: <FaMapMarkerAlt />, // Location marker for payments  
    color: "text-red-500" ,
    path:"/payments-view"
  },
  { 
    title: "Transactions", 
    value: "8,900", 
    change: "+2% than last month", 
    icon: <FaExchangeAlt />, // Exchange arrows for transactions  
    color: "text-green-500" ,
    path:"/account-transactions"
  },
  { 
    title: "Expenses", 
    value: "$103,430", 
    change: "+5% than yesterday", 
    icon: <FaChartPie />, // Pie chart for financial summary  
    color: "text-green-500",
    path:"/account-expenses"
  },
  { 
    title: "Reports", 
    value: "325", 
    change: "-1% than last week", 
    icon: <FaFileAlt />, // Document file for reports  
    color: "text-red-500" ,
    path:"/account-report"
  }
];


export default function AccountsBlock() {
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
    <AccountDataTable />
   </div>
  );
}
