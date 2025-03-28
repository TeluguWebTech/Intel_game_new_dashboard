import { useState, useEffect } from 'react';
import { clientData } from '../../../masterdata/clientData';
import { trtMachines } from '../../../masterdata/trtMachine';
import { gameMachines } from '../../../masterdata/gameMachine';

const ClientDataTable = () => {
  const [activeTab, setActiveTab] = useState('game_machines'); // Changed default to game_machines
  const [filteredData, setFilteredData] = useState(clientData);
  const [filteredGameMachines, setFilteredGameMachines] = useState([]);
  const [filteredTrtMachines, setFilteredTrtMachines] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;

  // Get unique regions for dropdown
  const regions = ['all', ...new Set(clientData.map(client => client.region))];

  // Calculate pagination values
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  
  // Paginated data for each table
  const currentClients = filteredData.slice(indexOfFirstRecord, indexOfLastRecord);
  const currentGameMachines = filteredGameMachines.slice(indexOfFirstRecord, indexOfLastRecord);
  const currentTrtMachines = filteredTrtMachines.slice(indexOfFirstRecord, indexOfLastRecord);
  
  // Total pages for each table
  const totalClientPages = Math.ceil(filteredData.length / recordsPerPage);
  const totalGameMachinePages = Math.ceil(filteredGameMachines.length / recordsPerPage);
  const totalTrtMachinePages = Math.ceil(filteredTrtMachines.length / recordsPerPage);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, searchTerm, selectedRegion]);

  // Filter and search logic for clients
  useEffect(() => {
    let result = [...clientData];

    // Apply tab filter
    if (activeTab === 'game_machines') {
      result = result.filter(client => client.no_of_game_machines > 0);
    } else if (activeTab === 'trt_machines') {
      result = result.filter(client => client.no_of_trts > 0);
    }

    // Apply region filter
    if (selectedRegion !== 'all') {
      result = result.filter(client => client.region === selectedRegion);
    }

    // Apply search
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(client => 
        client.client_name.toLowerCase().includes(term) ||
        client.location.toLowerCase().includes(term) ||
        client.incharge.toLowerCase().includes(term) ||
        client.id.toLowerCase().includes(term)
      );
    }

    // Apply sorting
    if (sortConfig.key) {
      result.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    setFilteredData(result);
  }, [activeTab, searchTerm, selectedRegion, sortConfig]);

  // Filter game machines when tab is active
  useEffect(() => {
    if (activeTab === 'game_machines') {
      const filtered = gameMachines.filter(machine => {
        const client = clientData.find(c => c.id === machine.installed_client_id);
        return (
          (selectedRegion === 'all' || client?.region === selectedRegion) &&
          (!searchTerm || 
           machine.machine_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
           machine.machine_model.toLowerCase().includes(searchTerm.toLowerCase()) ||
           machine.installed_location.toLowerCase().includes(searchTerm.toLowerCase()) ||
           machine.installed_client_name.toLowerCase().includes(searchTerm.toLowerCase()))
        );
      });
      setFilteredGameMachines(filtered);
    }
  }, [activeTab, searchTerm, selectedRegion]);

  // Filter TRT machines when tab is active
  useEffect(() => {
    if (activeTab === 'trt_machines') {
      const filtered = trtMachines.filter(machine => {
        const client = clientData.find(c => c.id === machine.installed_client_id);
        return (
          (selectedRegion === 'all' || client?.region === selectedRegion) &&
          (!searchTerm || 
           machine.trtMachine_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
           machine.trtMachine_model.toLowerCase().includes(searchTerm.toLowerCase()) ||
           machine.installed_location.toLowerCase().includes(searchTerm.toLowerCase()) ||
           machine.installed_client_name.toLowerCase().includes(searchTerm.toLowerCase()))
        );
      });
      setFilteredTrtMachines(filtered);
    }
  }, [activeTab, searchTerm, selectedRegion]);

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Pagination functions
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => {
    const totalPages = activeTab === 'game_machines' ? totalGameMachinePages : 
                      activeTab === 'trt_machines' ? totalTrtMachinePages : 
                      totalClientPages;
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const renderPagination = (totalItems, totalPages) => {
    if (totalItems <= recordsPerPage) return null;
    
    return (
      <div className="flex justify-between items-center px-4 py-3 bg-white border-t border-gray-200">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{indexOfFirstRecord + 1}</span> to{' '}
            <span className="font-medium">
              {Math.min(indexOfLastRecord, totalItems)}
            </span>{' '}
            of <span className="font-medium">{totalItems}</span> results
          </p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded-md bg-gray-200 text-gray-700 disabled:opacity-50"
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
            <button
              key={number}
              onClick={() => paginate(number)}
              className={`px-3 py-1 rounded-md ${currentPage === number ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              {number}
            </button>
          ))}
          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded-md bg-gray-200 text-gray-700 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    );
  };

  const renderClientTable = () => (
    <>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th 
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => requestSort('client_name')}
            >
              Client Name {sortConfig.key === 'client_name' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
            <th 
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => requestSort('location')}
            >
              Location {sortConfig.key === 'location' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Incharge</th>
            <th 
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => requestSort('no_of_game_machines')}
            >
              Game Machines {sortConfig.key === 'no_of_game_machines' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
            </th>
            <th 
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => requestSort('no_of_trts')}
            >
              TRTs {sortConfig.key === 'no_of_trts' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Region</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Commission</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {currentClients.length > 0 ? (
            currentClients.map((client) => (
              <tr key={client.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{client.client_name}</div>
                  <div className="text-sm text-gray-500">{client.id}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <img 
                    src={client.image} 
                    alt={client.client_name} 
                    className="h-10 w-10 rounded-full object-cover"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{client.location}</div>
                  <div className="text-sm text-gray-500">{client.state}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {client.incharge}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {client.no_of_game_machines}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {client.no_of_trts}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {client.region}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {client.commission_deal}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="px-6 py-4 text-center text-sm text-gray-500">
                No clients found matching your criteria
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {renderPagination(filteredData.length, totalClientPages)}
    </>
  );

  const renderGameMachinesTable = () => (
    <>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Machine ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Model</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Features</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Games/Hours</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Readings</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {currentGameMachines.length > 0 ? (
            currentGameMachines.map((machine) => (
              <tr key={machine.machine_id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {machine.machine_id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <img 
                    src={machine.machine_image} 
                    alt={machine.machine_model} 
                    className="h-10 w-10 rounded-full object-cover"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {machine.machine_model}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  <div className="flex flex-wrap gap-1">
                    {machine.features.map((feature, index) => (
                      <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                        {feature}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {machine.installed_location}
                  <div className="text-xs text-gray-400">{machine.position}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {machine.installed_client_name}
                  <div className="text-xs text-gray-400">{machine.installed_client_id}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div>{machine.no_of_games} games</div>
                  <div>{machine.no_of_hours} hours</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div>Start: {machine.start_reading}</div>
                  <div>End: {machine.end_reading}</div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="px-6 py-4 text-center text-sm text-gray-500">
                No game machines found matching your criteria
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {renderPagination(filteredGameMachines.length, totalGameMachinePages)}
    </>
  );

  const renderTrtMachinesTable = () => (
    <>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">TRT ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Model</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Features</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transactions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {currentTrtMachines.length > 0 ? (
            currentTrtMachines.map((machine) => (
              <tr key={machine.trtMachine_id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {machine.trtMachine_id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <img 
                    src={machine.trtMachine_image} 
                    alt={machine.trtMachine_model} 
                    className="h-10 w-10 rounded-full object-cover"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {machine.trtMachine_model}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {machine.type}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  <div className="flex flex-wrap gap-1">
                    {machine.trt_features.map((feature, index) => (
                      <span key={index} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                        {feature}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {machine.installed_location}
                  <div className="text-xs text-gray-400">{machine.position}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {machine.installed_client_name}
                  <div className="text-xs text-gray-400">{machine.installed_client_id}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div>Deposits: {machine.deposits.reduce((sum, d) => sum + d.amount, 0)}</div>
                  <div>Withdrawals: {machine.withdrawals.reduce((sum, w) => sum + w.amount, 0)}</div>
                  <div>Carrying: {machine.carrying_amount}</div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="px-6 py-4 text-center text-sm text-gray-500">
                No TRT machines found matching your criteria
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {renderPagination(filteredTrtMachines.length, totalTrtMachinePages)}
    </>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Client Management</h1>
      
      {/* Filter Buttons */}
      <div className="flex flex-col md:flex-row gap-4 mb-6 items-start md:items-center">
        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          <button
            onClick={() => setActiveTab('game_machines')}
            className={`px-4 py-2 rounded-md ${activeTab === 'game_machines' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            Game Machines
          </button>
          <button
            onClick={() => setActiveTab('trt_machines')}
            className={`px-4 py-2 rounded-md ${activeTab === 'trt_machines' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            TRT Machines
          </button>
          
          {/* Region Dropdown */}
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="px-4 py-2 rounded-md bg-gray-200 text-gray-700"
          >
            {regions.map(region => (
              <option key={region} value={region}>
                {region === 'all' ? 'All Regions' : region}
              </option>
            ))}
          </select>
        </div>
        
        {/* Search Bar - will take remaining space */}
        <div className="w-full md:flex-1">
          <input
            type="text"
            placeholder={`Search ${activeTab === 'game_machines' ? 'game machines' : activeTab === 'trt_machines' ? 'TRT machines' : 'clients'}...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      
      {/* Data Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        {activeTab === 'game_machines' ? renderGameMachinesTable() : 
         activeTab === 'trt_machines' ? renderTrtMachinesTable() : 
         renderClientTable()}
      </div>
      
      {/* Summary Stats */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">
            {activeTab === 'game_machines' ? 'Total Game Machines' : 
             activeTab === 'trt_machines' ? 'Total TRT Machines' : 'Total Clients'}
          </h3>
          <p className="text-2xl font-semibold text-gray-900">
            {activeTab === 'game_machines' ? filteredGameMachines.length : 
             activeTab === 'trt_machines' ? filteredTrtMachines.length : 
             filteredData.length}
          </p>
        </div>
        
        {activeTab === 'game_machines' && (
          <>
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-sm font-medium text-gray-500">Total Games</h3>
              <p className="text-2xl font-semibold text-gray-900">
                {filteredGameMachines.reduce((sum, machine) => sum + machine.no_of_games, 0)}
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-sm font-medium text-gray-500">Total Hours</h3>
              <p className="text-2xl font-semibold text-gray-900">
                {filteredGameMachines.reduce((sum, machine) => sum + machine.no_of_hours, 0)}
              </p>
            </div>
          </>
        )}
        
        {activeTab === 'trt_machines' && (
          <>
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-sm font-medium text-gray-500">Total Deposits</h3>
              <p className="text-2xl font-semibold text-gray-900">
                {filteredTrtMachines.reduce((sum, machine) => 
                  sum + machine.deposits.reduce((sum, d) => sum + d.amount, 0), 0)}
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-sm font-medium text-gray-500">Total Withdrawals</h3>
              <p className="text-2xl font-semibold text-gray-900">
                {filteredTrtMachines.reduce((sum, machine) => 
                  sum + machine.withdrawals.reduce((sum, w) => sum + w.amount, 0), 0)}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ClientDataTable;