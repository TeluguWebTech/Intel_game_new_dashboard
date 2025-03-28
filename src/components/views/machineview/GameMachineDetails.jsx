import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { gameMachines } from '../../../masterdata/gameMachine';

const GameMachineDetails = () => {
  const { machineId } = useParams();
  const navigate = useNavigate();
  
  // Find the machine with matching ID
  const machine = gameMachines.find(m => m.machine_id === machineId);

  if (!machine) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center p-8 bg-white rounded-xl shadow-lg max-w-md w-full">
          <div className="mb-6">
            <svg className="w-16 h-16 mx-auto text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Machine Not Found</h2>
          <p className="text-gray-600 mb-6">The requested game machine does not exist or may have been removed.</p>
          <button
            onClick={() => navigate('/game-machines')}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Back to Machines List
          </button>
        </div>
      </div>
    );
  }

  // Calculate days until next maintenance (example calculation)
  const daysUntilMaintenance = Math.floor(Math.random() * 30) + 1;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate('/game-machines')}
          className="flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors group"
        >
          <svg 
            className="w-5 h-5 mr-2 transition-transform group-hover:-translate-x-1" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to All Machines
        </button>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="md:flex">
            {/* Machine Image Section */}
            <div className="md:w-1/2 relative">
              <div className="h-96 md:h-full bg-gradient-to-br from-gray-200 to-gray-300 overflow-hidden relative">
                <img
                  src={machine.machine_image || '/assets/g-001.jpg'}
                  alt={machine.machine_model}
                  className="w-full h-full object-cover transition-opacity duration-300 hover:opacity-90"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/assets/g-001.jpg';
                  }}
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                  <div className="flex justify-between items-end">
                    <div>
                      <h2 className="text-white text-xl font-bold">{machine.machine_model}</h2>
                      <p className="text-gray-200 text-sm">{machine.position}</p>
                    </div>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-600 text-white">
                      {machine.region}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Machine Details Section */}
            <div className="p-6 md:p-8 md:w-1/2">
              {/* Status Badge */}
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full mr-2 ${daysUntilMaintenance < 7 ? 'bg-red-500' : 'bg-green-500'}`}></div>
                  <span className="text-sm font-medium text-gray-600">
                    {daysUntilMaintenance < 7 
                      ? 'Maintenance due soon' 
                      : 'Operational'}
                  </span>
                </div>
                <span className="text-xs font-medium bg-gray-100 text-gray-800 px-2 py-1 rounded">
                  ID: {machine.machine_id}
                </span>
              </div>

              {/* Overview Section */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">Machine Overview</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-500 uppercase tracking-wider">Installed Date</p>
                    <p className="font-medium text-gray-800">{machine.installed_date}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-500 uppercase tracking-wider">Last Serviced</p>
                    <p className="font-medium text-gray-800">{machine.serviced_on}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-500 uppercase tracking-wider">Next Maintenance</p>
                    <p className="font-medium text-gray-800">
                      {machine.maintenance_date} 
                      <span className="text-xs ml-1 text-gray-500">({daysUntilMaintenance} days)</span>
                    </p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-500 uppercase tracking-wider">Hours Operated</p>
                    <p className="font-medium text-gray-800">{machine.no_of_hours}</p>
                  </div>
                </div>
              </div>

              {/* Location Section */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">Location Details</h2>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-gray-500">Location</p>
                      <p className="font-medium text-gray-800">{machine.installed_location}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-gray-500">Manager</p>
                      <p className="font-medium text-gray-800">{machine.location_incharge}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-gray-500">Client</p>
                      <p className="font-medium text-gray-800">{machine.installed_client_name}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Technical Specs Section */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">Technical Specifications</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-500 uppercase tracking-wider">Games Available</p>
                    <p className="font-medium text-gray-800">{machine.no_of_games}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-500 uppercase tracking-wider">Start Reading</p>
                    <p className="font-medium text-gray-800">{machine.start_reading}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-500 uppercase tracking-wider">End Reading</p>
                    <p className="font-medium text-gray-800">{machine.end_reading}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-500 uppercase tracking-wider">Usage Rate</p>
                    <p className="font-medium text-gray-800">
                      {Math.round((machine.end_reading - machine.start_reading) / machine.no_of_hours * 100) / 100} per hour
                    </p>
                  </div>
                </div>
              </div>

              {/* Features Section */}
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">Features & Capabilities</h2>
                <div className="flex flex-wrap gap-2">
                  {machine.features.map((feature, index) => (
                    <span 
                      key={index} 
                      className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex justify-end space-x-3">
          <button className="px-5 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
            Service History
          </button>
          <button className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md">
            Schedule Maintenance
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameMachineDetails;