import React, { useState } from 'react';
import { customerSessionsData } from '../../../masterdata/customers/sessionData';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaHome, FaChevronRight, FaPlus } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const CustomerEngagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  const navigate = useNavigate();

  const handleViewDetails = (sessionId) => {
    navigate(`/customers/sessions/${sessionId}`);
  };
  

  // Get unique regions
  const regions = ['All', ...new Set(customerSessionsData.map(session => session.region))];

  // Filter sessions
  const filteredSessions = customerSessionsData.filter(session => {
    const matchesSearch = 
      session.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      session.customer_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      session.vendor_name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRegion = selectedRegion === 'All' || session.region === selectedRegion;
    
    const sessionDate = new Date(session.date);
    const matchesDate = 
      (!startDate || sessionDate >= startDate) && 
      (!endDate || sessionDate <= endDate);
    
    return matchesSearch && matchesRegion && matchesDate;
  });

  // Calculate engagement metrics
  const totalSessions = filteredSessions.length;
  const totalDuration = filteredSessions.reduce((sum, session) => sum + session.session_duration, 0);
  const avgDuration = totalSessions > 0 ? Math.round(totalDuration / totalSessions) : 0;
  const totalGames = filteredSessions.reduce((sum, session) => sum + session.total_games_played, 0);
  const totalRewards = filteredSessions.reduce((sum, session) => sum + session.reward_points_earned, 0);

  return (
    <div className="container mx-auto px-4 py-8">
             <div className="flex items-center text-gray-600 text-sm pb-4">
              <FaHome className="mr-1 text-blue-500" />
              <Link to="/" className="hover:underline">Home</Link>
              <FaChevronRight className="mx-2 text-gray-400" />
              <Link to="/customers" className="hover:underline">Customers</Link>
              <FaChevronRight className="mx-2 text-gray-400" />
              <span className="text-orange-500">Customers Engagement</span>
            </div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Customer Engagement</h1>
      
      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search Input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search customers..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          {/* Region Filter */}
          <div>
            <select
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
            >
              {regions.map(region => (
                <option key={region} value={region}>{region}</option>
              ))}
            </select>
          </div>
          
          {/* Date Range Filter */}
          <div>
            <DatePicker
              selectsRange
              startDate={startDate}
              endDate={endDate}
              onChange={update => setDateRange(update)}
              placeholderText="Date range"
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              isClearable
            />
          </div>
          
          {/* Clear Filters */}
          <div className="flex items-end">
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedRegion('All');
                setDateRange([null, null]);
              }}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow p-6 border-l-4 border-indigo-500">
          <h3 className="text-gray-500 text-sm font-medium">Total Sessions</h3>
          <p className="text-2xl font-bold text-gray-800">{totalSessions}</p>
          <p className="text-sm text-gray-500 mt-1">Customer interactions</p>
        </div>
        
        <div className="bg-white rounded-xl shadow p-6 border-l-4 border-green-500">
          <h3 className="text-gray-500 text-sm font-medium">Avg. Duration</h3>
          <p className="text-2xl font-bold text-gray-800">{avgDuration} mins</p>
          <p className="text-sm text-gray-500 mt-1">Per session</p>
        </div>
        
        <div className="bg-white rounded-xl shadow p-6 border-l-4 border-yellow-500">
          <h3 className="text-gray-500 text-sm font-medium">Total Games</h3>
          <p className="text-2xl font-bold text-gray-800">{totalGames}</p>
          <p className="text-sm text-gray-500 mt-1">Played</p>
        </div>
        
        <div className="bg-white rounded-xl shadow p-6 border-l-4 border-purple-500">
          <h3 className="text-gray-500 text-sm font-medium">Reward Points</h3>
          <p className="text-2xl font-bold text-gray-800">{totalRewards}</p>
          <p className="text-sm text-gray-500 mt-1">Earned</p>
        </div>
      </div>

      {/* Sessions List */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Recent Sessions</h2>
        </div>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Session</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Games</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rewards</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredSessions.length > 0 ? (
              filteredSessions.map(session => (
                <tr key={session.session_id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img className="h-10 w-10 rounded-full" src={session.customer_image} alt={session.customer_name} />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{session.customer_name}</div>
                        <div className="text-sm text-gray-500">{session.vendor_name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{session.date}</div>
                    <div className="text-sm text-gray-500">{session.start_time} - {session.end_time}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{session.total_games_played}</div>
                    <div className="text-xs text-gray-500">
                      {session.games_played.map(g => g.game_name).join(', ')}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {session.session_duration} mins
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                      +{session.reward_points_earned} pts
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
  <button
    onClick={() => handleViewDetails(session.session_id)}
    className="text-indigo-600 hover:text-indigo-900"
  >
    View
  </button>
  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center">
                  <div className="bg-gray-50 p-8 rounded-lg text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <h3 className="mt-2 text-lg font-medium text-gray-900">No sessions found</h3>
                    <p className="mt-1 text-gray-500">
                      Try adjusting your search or filter criteria
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomerEngagement;