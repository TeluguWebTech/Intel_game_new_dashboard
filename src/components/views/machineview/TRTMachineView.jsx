import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { trtMachines } from '../../../masterdata/trtMachine';
import { FaHome, FaChevronRight, FaPlus } from "react-icons/fa";
import { Link } from 'react-router-dom';

const TRTMachineView = () => {
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);


  const navigate = useNavigate();
  // Get all unique regions for the filter
  const allRegions = ['All', ...new Set(trtMachines.map(machine => machine.region))];

  // Filter machines based on selected region
  const filteredMachines = selectedRegion === 'All' 
    ? trtMachines 
    : trtMachines.filter(machine => machine.region === selectedRegion);

    const handleViewDetails = (machineId) => {
        navigate(`/game-machines/${machineId}`);
      };
    

  return (
    <div className="p-6 bg-gray-50">
             <div className="flex items-center text-gray-600 text-sm pb-4">
                    <FaHome className="mr-1 text-blue-500" />
                    <Link to="/" className="hover:underline">Home</Link>
                    <FaChevronRight className="mx-2 text-gray-400" />
                    <Link to="/machines" className="hover:underline">Machines</Link>
                    <FaChevronRight className="mx-2 text-gray-400" />
                    <span className="text-orange-500">TRT Machines</span>
                  </div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold text-gray-800">Game Machines</h2>
        
        {/* Region Filter Dropdown */}
        <div className="relative w-full sm:w-64">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full flex justify-between items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {selectedRegion}
            <svg
              className={`w-5 h-5 ml-2 transition-transform duration-200 ${isDropdownOpen ? 'transform rotate-180' : ''}`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>

          {isDropdownOpen && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
              <ul className="py-1 overflow-auto text-base max-h-60">
                {allRegions.map((region) => (
                  <li
                    key={region}
                    className={`px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-blue-50 hover:text-blue-700 ${selectedRegion === region ? 'bg-blue-100 text-blue-800' : ''}`}
                    onClick={() => {
                      setSelectedRegion(region);
                      setIsDropdownOpen(false);
                    }}
                  >
                    {region}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredMachines.slice(0, 4).map((machine) => (
          <div key={machine.machine_id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="h-48 bg-gray-200 overflow-hidden">
              <img 
                src={machine.machine_image} 
                alt={machine.machine_model}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = '';
                }}
              />
            </div>
            
            <div className="p-5">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-bold text-gray-800">{machine.machine_model}</h3>
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                  {machine.region}
                </span>
              </div>
              
              <div className="mb-3">
                <p className="text-sm text-gray-600 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {machine.installed_location}
                </p>
              </div>
              
              <div className="flex justify-between items-center mb-3">
                <div>
                  <p className="text-xs text-gray-500">Installed</p>
                  <p className="text-sm font-medium">{machine.installed_date}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Games</p>
                  <p className="text-sm font-medium">{machine.no_of_games}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Hours</p>
                  <p className="text-sm font-medium">{machine.no_of_hours}</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">
                  {machine.installed_client_name}
                </span>
                <button 
                onClick={() => handleViewDetails(machine.machine_id)}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                View Details
              </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Show message when no machines match the filter */}
      {filteredMachines.length === 0 && (
        <div className="text-center py-8 bg-white rounded-lg shadow-sm">
          <p className="text-gray-500">No machines found in the selected region.</p>
        </div>
      )}
    </div>
  );
};

export default TRTMachineView;