import { Link } from "react-router-dom";
import { useState } from "react";
import { 
  UserIcon,
  Bars3Icon,
  XMarkIcon
} from "@heroicons/react/24/outline";

const NavbarComp = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Define navigation items
  const navItems = [
    { title: "Clients", path: "/clients" },
    { title: "Revenue", path: "/revenue" },
    { title: "Machines", path: "/machines" },
    { title: "Employees", path: "/employees" },
    { title: "Accounts", path: "/accounts" }
  ];

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-800 px-4 sm:px-6 py-3 shadow-md">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        {/* Logo and Mobile Menu Button */}
        <div className="flex items-center">
          <button
            className="md:hidden text-white mr-4"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>
          <div className="title text-2xl sm:text-3xl text-white">
            <Link to="/">Intelfaze</Link>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="text-white text-sm font-medium hover:text-gray-200"
            >
              {item.title}
            </Link>
          ))}
        </div>

        {/* User Icon - Desktop */}
        <div className="hidden md:block">
          <Link to="/profile" className="text-gray-200 hover:text-white">
            <UserIcon className="h-6 w-6" />
          </Link>
        </div>

        {/* Mobile User Icon */}
        <div className="md:hidden">
          <Link to="/profile" className="text-white">
            <UserIcon className="h-6 w-6" />
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg rounded-lg mt-3 py-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="block px-4 py-2 text-gray-800 hover:bg-blue-50"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.title}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default NavbarComp;