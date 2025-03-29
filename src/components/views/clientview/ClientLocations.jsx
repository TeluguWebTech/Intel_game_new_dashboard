import { useState } from "react";
import { clientData } from "../../../masterdata/clientData";
import { FaHome, FaChevronRight, FaPlus } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";


export default function ClientLocations() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const navigate = useNavigate();

  const filteredClients = clientData.filter((client) => {
    const matchesSearch =
      client.client_name.toLowerCase().includes(search.toLowerCase()) ||
      client.location.toLowerCase().includes(search.toLowerCase());

    const matchesFilter = filter === "All" || client.region === filter;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-6 max-w-7xl mx-auto">
         <div className="flex items-center text-gray-600 text-sm mb-4">
        <FaHome className="mr-1 text-blue-500" />
        <Link to="/" className="hover:underline">Home</Link>
        <FaChevronRight className="mx-2 text-gray-400" />
        <Link to="/clients" className="hover:underline">Clients</Link>
        <FaChevronRight className="mx-2 text-gray-400" />
        <span className="text-orange-500"> Locations</span>
      </div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Client Locations</h2>
        <p className="text-gray-600">Overview of all client locations and their Machines.</p>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row justify-between mb-8 gap-4">
        <div className="flex flex-wrap gap-2">
          <button
            className={`px-4 py-2 rounded-lg transition-all ${
              filter === "All" 
                ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-md" 
                : "bg-gray-100 hover:bg-gray-200 text-gray-700"
            }`}
            onClick={() => setFilter("All")}
          >
            All Clients
          </button>
          <button
            className={`px-4 py-2 rounded-lg transition-all ${
              filter === "Western" 
                ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-md" 
                : "bg-gray-100 hover:bg-gray-200 text-gray-700"
            }`}
            onClick={() => setFilter("Western")}
          >
            Western
          </button>
          <button
            className={`px-4 py-2 rounded-lg transition-all ${
              filter === "Eastern" 
                ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-md" 
                : "bg-gray-100 hover:bg-gray-200 text-gray-700"
            }`}
            onClick={() => setFilter("Eastern")}
          >
            Eastern
          </button>
          <button
            className={`px-4 py-2 rounded-lg transition-all ${
              filter === "Central" 
                ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-md" 
                : "bg-gray-100 hover:bg-gray-200 text-gray-700"
            }`}
            onClick={() => setFilter("Central")}
          >
            Central
          </button>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-64">
          <input
            type="text"
            placeholder="Search clients..."
            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <svg
            className="absolute right-3 top-2.5 h-5 w-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {/* Clients Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredClients.map((client) => (
          <div 
            key={client.id} 
            className="bg-gradient-to-br from-white to-gray-50 p-5 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200 hover:border-blue-200 flex flex-col h-full"
          >
            <div className="flex items-center space-x-4 mb-4">
              <div className="relative">
                <img 
                  src={client.image} 
                  alt={client.client_name} 
                  className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-sm"
                />
                <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-1 border-2 border-white">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <div className="min-w-0">
                <h3 className="font-semibold text-lg text-gray-800 truncate">{client.client_name}</h3>
                <p className="text-sm text-gray-500 flex items-center truncate">
                  <svg className="w-4 h-4 mr-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <span className="truncate">{client.location}</span>
                </p>
              </div>
            </div>
            
            <div className="space-y-3 mb-4 flex-grow">
              <div className="bg-blue-50 rounded-lg p-3">
                <p className="text-gray-700 text-sm">
                  <span className="font-medium">Game Station:</span> {client.game_station}
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-gray-700 text-sm">
                  <span className="font-medium">Address:</span> {client.address}
                </p>
              </div>
              
              <div className="flex justify-between">
                <div className="bg-white rounded-lg p-2 shadow-xs border border-gray-100 text-center flex-1 mr-2">
                  <p className="text-xs text-gray-500 font-medium">TRT Machines</p>
                  <p className="text-blue-600 font-bold">{client.no_of_trts}</p>
                </div>
                <div className="bg-white rounded-lg p-2 shadow-xs border border-gray-100 text-center flex-1">
                  <p className="text-xs text-gray-500 font-medium">Game Machines</p>
                  <p className="text-blue-600 font-bold">{client.no_of_game_machines}</p>
                </div>
              </div>
            </div>
            
            <button
            onClick={() => navigate(`/client/${client.id}`)}
            className="w-full mt-auto bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white py-2 px-4 rounded-lg transition-all duration-300 flex items-center justify-center group">
              View Details
              <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
        ))}
      </div>
      
      {/* Empty state */}
      {filteredClients.length === 0 && (
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="mt-2 text-lg font-medium text-gray-900">No clients found</h3>
          <p className="mt-1 text-gray-500">Try adjusting your search or filter to find what you're looking for.</p>
        </div>
      )}
    </div>
  );
}