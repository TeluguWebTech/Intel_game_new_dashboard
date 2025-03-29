import { useState } from "react";
import { Link } from "react-router-dom";
import { FaUserFriends, FaDatabase, FaCalendarAlt, FaTasks, FaLocationArrow, FaDollarSign, FaSalesforce, FaArrowAltCircleUp, FaUserTie, FaUsers, FaBuilding } from "react-icons/fa";
import { MdOutlineCollections, MdInventory, MdEvent, MdRealEstateAgent } from "react-icons/md";
import { BsBox, BsClipboardCheck } from "react-icons/bs";
import { AiOutlineProject } from "react-icons/ai";

const categories = [
    { name: "Dashboard", icon: <BsBox />, color: "bg-green-200 text-green-700", path:"" },
    { name: "Clients", icon: <FaUserFriends />, color: "bg-red-200 text-red-700", path:"/clients" },
    { name: "Contacts", icon: <FaUserFriends />, color: "bg-blue-200 text-blue-700", path:"/client-contacts" },
    { name: "Machines", icon: <FaDatabase />, color: "bg-yellow-200 text-yellow-700", path:"/machines" },
    { name: "Revenue", icon: <FaDollarSign />, color: "bg-purple-200 text-purple-700", path:"/revenue" },
    { name: "Accounts", icon: <FaArrowAltCircleUp />, color: "bg-purple-200 text-purple-700", path:"/accounts" },
    { name: "Locations", icon: <FaLocationArrow />, color: "bg-orange-200 text-orange-700", path:"location-detail" },
    { name: "Customers", icon: <FaUsers />, color: "bg-green-200 text-green-700", path:"/customers" },
    { name: "HR", icon: <FaUserTie />, color: "bg-orange-200 text-gray-700", path:"/hr" },
    { name: "Employees", icon: <FaUserFriends />, color: "bg-gray-200 text-gray-700", path:"/employees" },
    { name: "Tasks", icon: <MdEvent />, color: "bg-green-200 text-green-700", path:"/tasks" },
    { name: "Marketing", icon: <FaSalesforce />, color: "bg-pink-200 text-pink-700", path:"/marketing" },
    // { name: "Analytics", icon: <AiOutlineProject />, color: "bg-indigo-200 text-indigo-700" },
    // { name: "Inventory", icon: <MdInventory />, color: "bg-yellow-200 text-yellow-700" },
    // { name: "Meetings", icon: <FaCalendarAlt />, color: "bg-purple-200 text-purple-700" },
    // { name: "Support", icon: <MdRealEstateAgent />, color: "bg-orange-200 text-orange-700" },
    // { name: "Reports", icon: <BsClipboardCheck />, color: "bg-blue-200 text-blue-700" },
    // { name: "Branches", icon: <FaBuilding />, color: "bg-purple-200 text-purple-700" }
  ];
  
export default function LandingPage() {
  return (
    <>
      {/* <NavbarComp /> */}
      <div className="px-6 sm:px-12 md:px-20 lg:px-28 xl:px-36 bg-gray-50">
        {/* Grid Layout for Items */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-4 gap-6 mt-8">
          {categories.map((item) => (
            <div key={item.name} className="flex flex-col items-center space-y-2">
              {/* Use Link if a path exists */}
              {item.path ? (
                // <Link to={item.path} className="flex flex-col items-center space-y-2">
                //   <div className="bg-white shadow-lg rounded-2xl p-5 flex items-center justify-center">
                //     <div className={`${item.color} p-3 rounded-xl text-4xl`}>{item.icon}</div>
                //   </div>
                //   <span className="text-base font-semibold">{item.name}</span>
                // </Link>
                <Link to={item.path} className="group flex flex-col items-center space-y-2">
  <div className="bg-white shadow-lg rounded-2xl p-5 flex items-center justify-center transition-all duration-300 transform group-hover:scale-105 group-hover:shadow-xl">
    <div className={`${item.color} p-3 rounded-xl text-4xl transition-all duration-300 transform group-hover:scale-130`}>
      {item.icon}
    </div>
  </div>
  <span className="text-base font-semibold transition-all duration-300 transform group-hover:scale-105">
    {item.name}
  </span>
</Link>

              ) : (
                // Render without Link if no path
                <div className="flex flex-col items-center space-y-2">
                  <div className="bg-white shadow-lg rounded-2xl p-5 flex items-center justify-center">
                    <div className={`${item.color} p-3 rounded-xl text-4xl`}>{item.icon}</div>
                  </div>
                  <span className="text-base font-semibold">{item.name}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
