import { FaUsers, FaDollarSign, FaMapMarkerAlt, FaChartBar, FaPercentage, FaFileAlt } from "react-icons/fa";
import ClientDataTable from "./ClientTable";
import { FaHome, FaChevronRight, FaPlus } from "react-icons/fa";
import { Link } from 'react-router-dom';

const stats = [
  { title: "Total Clients", value: "2,300", change: "+Add New Client", icon: <FaUsers />, color: "text-orange-500",path:"/add-client" },
  { title: "Total Sales", value: "$53k", change: "+55% than last week", icon: <FaDollarSign />, color: "text-green-500", path: "/client-sales" },
  { title: "Locations", value: "3,462", change: "-2% than yesterday", icon: <FaMapMarkerAlt />, color: "text-red-500", path:"/client-locations" },
  { title: "Matches", value: "8,900", change: "+2% than last month", icon: <FaChartBar />, color: "text-green-500", path:"/matches"},
  { title: "Commissions", value: "$103,430", change: "+5% than yesterday", icon: <FaPercentage />, color: "text-green-500", path:"/client-commissions" },
  { title: "Analytics", value: "325", change: "-1% than last week", icon: <FaFileAlt />, color: "text-red-500",path:"/client-reports"},
];

export default function ClientBlocks() {
  return (
    <div  className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center text-gray-600 text-sm pb-4">
        <FaHome className="mr-1 text-blue-500" />
        <Link to="/" className="hover:underline">Home</Link>
       
        <FaChevronRight className="mx-2 text-gray-400" />
        <span className="text-orange-500">Clients</span>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 p-6 pt-2">
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
      <ClientDataTable />
    </div>
  );
}
