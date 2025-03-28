import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { UserIcon, BellIcon, Cog6ToothIcon } from "@heroicons/react/24/outline";

const NavbarComp = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);
  const [activeMegaMenu, setActiveMegaMenu] = useState(null);

  // Define navigation structure
  const navItems = [
    {
      title: "Clients",
      links: {
        Services: [
          { name: "Online Stores", path: "" },
          { name: "Segmentation", path: "" },
          { name: "Marketing CRM", path: "" },
        ],
        Resources: [
          { name: "Our Blog", path: "" },
          { name: "Terms & Conditions", path: "" },
          { name: "License", path: "" },
        ],
      },
    },
    {
      title: "Revenue",
      links: {
        Services: [
          { name: "Sales Reports", path: "" },
          { name: "Revenue Tracking", path: "" },
        ],
        Resources: [
          { name: "Billing Info", path: "" },
          { name: "Refund Policy", path: "" },
        ],
      },
    },
    {
      title: "Machines",
      links: {
        Services: [
          { name: "TRT Machines", path: "" },
          { name: "Machine Management", path: "" },
        ],
        Resources: [
          { name: "Setup Guide", path: "" },
          { name: "Maintenance", path: "" },
        ],
      },
    },
    {
      title: "Employees",
      links: {
        Services: [
          { name: "TRT Machines", path: "" },
          { name: "Machine Management", path: "" },
        ],
        Resources: [
          { name: "Setup Guide", path: "" },
          { name: "Maintenance", path: "" },
        ],
      },
    },
    {
      title: "Accounts",
      links: {
        Services: [
          { name: "TRT Machines", path: "" },
          { name: "Machine Management", path: "" },
        ],
        Resources: [
          { name: "Setup Guide", path: "" },
          { name: "Maintenance", path: "" },
        ],
      },
    },
  ];
  

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-800 px-6 py-3 flex justify-between items-center shadow-md relative">
      <div className="title text-3xl text-white">
        <Link to="/">
        Intelfaze
        </Link>
      </div>


      {/* Mega Menu */}
      <div className="flex space-x-6">
        {navItems.map((nav) => (
          <div key={nav.title} className="relative">
            <button
              className="text-white text-sm font-medium hover:text-gray-200"
              onMouseEnter={() => setActiveMegaMenu(nav.title)}
              onMouseLeave={() => setActiveMegaMenu(null)}
            >
              {nav.title} ▾
            </button>
            {activeMegaMenu === nav.title && (
              <div
                className="absolute top-8 left-0 bg-white shadow-lg border rounded-lg p-5 w-80 flex"
                onMouseEnter={() => setActiveMegaMenu(nav.title)}
                onMouseLeave={() => setActiveMegaMenu(null)}
              >
                {Object.entries(nav.links).map(([category, links]) => (
                  <div key={category} className="w-1/2">
                    <h3 className="text-gray-700 font-semibold">{category}</h3>
                    <ul className="mt-2 text-gray-600 text-sm space-y-1">
                      {links.map((link) => (
                        <li key={link.path}>
                          <Link to={link.path} className="hover:text-blue-600">
                            {link.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-4">
        <input
          type="text"
          placeholder="Search"
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300 bg-white/90 backdrop-blur-sm"
        />
        <div className="flex items-center space-x-3 text-gray-200">
          <button className="flex items-center space-x-1 hover:text-white transition-colors duration-200">
            <UserIcon className="h-5 w-5" />
            <span className="text-sm">Sign In</span>
          </button>
          <BellIcon className="h-5 w-5 hover:text-white cursor-pointer transition-colors duration-200" />
          <Cog6ToothIcon className="h-5 w-5 hover:text-white cursor-pointer transition-colors duration-200" />
        </div>
      </div>
    </nav>
  );
};

export default NavbarComp;
