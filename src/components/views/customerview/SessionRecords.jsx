import { useState } from 'react';
import { customerSessionsData } from '../../../masterdata/customers/sessionData';

const SessionRecords = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [selectedDate, setSelectedDate] = useState('');
  const [expandedSession, setExpandedSession] = useState(null);

  // Get unique regions for dropdown
  const regions = ['All', ...new Set(customerSessionsData.map(session => session.region))];

  // Filter sessions based on search, region, and date
  const filteredSessions = customerSessionsData.filter(session => {
    const matchesSearch = Object.values(session).some(
      value => value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );
    const matchesRegion = selectedRegion === 'All' || session.region === selectedRegion;
    const matchesDate = !selectedDate || session.date === selectedDate;
    
    return matchesSearch && matchesRegion && matchesDate;
  });

  // Toggle session details expansion
  const toggleSessionDetails = (sessionId) => {
    setExpandedSession(expandedSession === sessionId ? null : sessionId);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Customer Session Records</h1>
      
      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="md:col-span-1">
          <input
            type="text"
            placeholder="Search sessions..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <select
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          value={selectedRegion}
          onChange={(e) => setSelectedRegion(e.target.value)}
        >
          {regions.map(region => (
            <option key={region} value={region}>{region}</option>
          ))}
        </select>
        
        <input
          type="date"
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </div>
      
      {/* Results count */}
      <div className="mb-4 text-sm text-gray-600">
        Showing {filteredSessions.length} of {customerSessionsData.length} sessions
      </div>
      
      {/* Sessions List */}
      <div className="space-y-4">
        {filteredSessions.length > 0 ? (
          filteredSessions.map((session) => (
            <div key={session.session_id} className="bg-white rounded-xl shadow overflow-hidden border border-gray-200">
              {/* Session Summary */}
              <div 
                className="p-5 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => toggleSessionDetails(session.session_id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <img 
                      src={session.customer_image} 
                      alt={session.customer_name} 
                      className="h-12 w-12 rounded-full object-cover border-2 border-gray-200"
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">{session.customer_name}</h3>
                      <p className="text-sm text-gray-500">Session ID: {session.session_id}</p>
                      <div className="flex flex-wrap gap-2 mt-1">
                        <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                          {session.region}
                        </span>
                        <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                          {session.branch}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-sm text-gray-500">{session.date}</p>
                    <p className="font-medium">
                      {session.start_time} - {session.end_time} ({session.session_duration} mins)
                    </p>
                  </div>
                </div>
                
                <div className="mt-4 flex flex-wrap justify-between items-center">
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Vendor</p>
                    <p className="font-medium">{session.vendor_name}</p>
                  </div>
                  
                  <div className="text-center">
                    <p className="text-sm text-gray-500">Games Played</p>
                    <p className="font-bold text-lg">{session.total_games_played}</p>
                  </div>
                  
                  <div className="text-center">
                    <p className="text-sm text-gray-500">Total Score</p>
                    <p className="font-bold text-lg text-purple-600">{session.total_score.toLocaleString()}</p>
                  </div>
                  
                  <div className="text-center">
                    <p className="text-sm text-gray-500">Reward Points</p>
                    <p className="font-bold text-lg text-yellow-600">{session.reward_points_earned}</p>
                  </div>
                  
                  <div className="flex items-center">
                    <span className="mr-2 text-sm text-gray-500">Details</span>
                    <svg
                      className={`h-5 w-5 text-gray-400 transform transition-transform ${expandedSession === session.session_id ? 'rotate-180' : ''}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
              
              {/* Expanded Session Details */}
              {expandedSession === session.session_id && (
                <div className="border-t border-gray-200 p-5 bg-gray-50">
                  <h4 className="text-md font-semibold text-gray-800 mb-3">Games Played</h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {session.games_played.map((game, index) => (
                      <div key={index} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                        <div className="flex justify-between items-start">
                          <div>
                            <h5 className="font-medium text-gray-800">{game.game_name}</h5>
                            <p className="text-sm text-gray-500">Game ID: {game.game_id}</p>
                          </div>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            game.win_status === 'Won' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {game.win_status}
                          </span>
                        </div>
                        
                        <div className="mt-3 flex justify-between items-center">
                          <div>
                            <p className="text-sm text-gray-500">Score</p>
                            <p className="font-bold">{game.score.toLocaleString()}</p>
                          </div>
                          
                          <button className="px-3 py-1 bg-blue-50 text-blue-600 text-sm rounded-lg hover:bg-blue-100">
                            View Game Stats
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-4 flex justify-end space-x-3">
                    <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition">
                      Print Receipt
                    </button>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                      Contact Customer
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="bg-white rounded-xl shadow p-8 text-center">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">No sessions found</h3>
            <p className="mt-1 text-gray-500">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
      
      {/* Summary Cards */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow border-l-4 border-blue-500">
          <h3 className="text-sm font-medium text-gray-500">Total Sessions</h3>
          <p className="mt-1 text-2xl font-bold text-blue-600">
            {customerSessionsData.length}
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow border-l-4 border-purple-500">
          <h3 className="text-sm font-medium text-gray-500">Total Games Played</h3>
          <p className="mt-1 text-2xl font-bold text-purple-600">
            {customerSessionsData.reduce((sum, session) => sum + session.total_games_played, 0)}
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow border-l-4 border-green-500">
          <h3 className="text-sm font-medium text-gray-500">Average Duration</h3>
          <p className="mt-1 text-2xl font-bold text-green-600">
            {Math.round(customerSessionsData.reduce((sum, session) => sum + session.session_duration, 0) / customerSessionsData.length)} mins
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow border-l-4 border-yellow-500">
          <h3 className="text-sm font-medium text-gray-500">Total Reward Points</h3>
          <p className="mt-1 text-2xl font-bold text-yellow-600">
            {customerSessionsData.reduce((sum, session) => sum + session.reward_points_earned, 0)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SessionRecords;