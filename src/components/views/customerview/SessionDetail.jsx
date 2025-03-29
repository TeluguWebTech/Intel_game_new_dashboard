import React from 'react';
import { FaHome, FaChevronRight, FaClock, FaGamepad, FaTrophy, FaStar, FaArrowLeft, FaUser } from 'react-icons/fa';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { customerSessionsData } from '../../../masterdata/customers/sessionData';

const SessionDetail = () => {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  
  const session = customerSessionsData.find(s => s.session_id === sessionId);
  
  if (!session) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error! </strong>
          <span className="block sm:inline">Session not found.</span>
        </div>
      </div>
    );
  }

  // Calculate win percentage
  const wins = session.games_played.filter(g => g.win_status === "Won").length;
  const winPercentage = Math.round((wins / session.total_games_played) * 100);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center text-gray-600 text-sm pb-2">
        <FaHome className="mr-1 text-blue-500" />
        <Link to="/" className="hover:underline">Home</Link>
        <FaChevronRight className="mx-2 text-gray-400" />
        <Link to="/customers" className="hover:underline">Customers</Link>
        <FaChevronRight className="mx-2 text-gray-400" />
        <Link to="/customers/engagement" className="hover:underline">Engagement</Link>
        <FaChevronRight className="mx-2 text-gray-400" />
        <span className="text-orange-500">Session Detail</span>
      </div>
      
      {/* Header with Back Button */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-blue-600 hover:text-blue-800"
        >
          <FaArrowLeft className="mr-2" /> Back to Sessions
        </button>
      </div>
      
      {/* Main Session Card */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
        {/* Session Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-2xl font-bold text-white">{session.customer_name}'s Session</h1>
              <p className="text-indigo-100">
                {session.vendor_name} • {session.branch} • {session.region}
              </p>
            </div>
            <div className="mt-4 md:mt-0 bg-white/10 px-4 py-2 rounded-lg">
              <p className="text-white font-medium">Session ID: {session.session_id}</p>
              <p className="text-indigo-100 text-sm">Date: {session.date}</p>
            </div>
          </div>
        </div>
        
        {/* Session Details */}
        <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Session Info */}
          <div>
            <div className="bg-indigo-50 p-4 rounded-lg mb-6">
              <h2 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4 flex items-center">
                <FaClock className="mr-2 text-indigo-600" />
                Session Information
              </h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Date</p>
                  <p className="font-medium">{session.date}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Time</p>
                  <p className="font-medium">{session.start_time} - {session.end_time}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Duration</p>
                  <p className="font-medium">{session.session_duration} minutes</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Games</p>
                  <p className="font-medium">{session.total_games_played}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-indigo-50 p-4 rounded-lg">
              <h2 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4 flex items-center">
                <FaStar className="mr-2 text-yellow-500" />
                Rewards Earned
              </h2>
              <div className="text-center py-4">
                <div className="inline-flex items-center justify-center bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full h-20 w-20 shadow-lg mx-auto">
                  <span className="text-xl font-bold text-white">+{session.reward_points_earned}</span>
                </div>
                <p className="mt-3 text-sm text-gray-600">Points earned this session</p>
              </div>
            </div>
          </div>
          
          {/* Middle Column - Customer Info */}
          <div>
            <div className="bg-indigo-50 p-4 rounded-lg mb-6">
              <h2 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4 flex items-center">
                <FaUser className="mr-2 text-blue-600" />
                Customer Information
              </h2>
              <div className="flex items-center mb-4">
                <img
                  src={session.customer_image}
                  alt={session.customer_name}
                  className="h-16 w-16 rounded-full object-cover border-2 border-white shadow-md"
                />
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">{session.customer_name}</h3>
                  <p className="text-sm text-gray-500">Customer ID: {session.customer_id}</p>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500">Vendor</p>
                  <p className="font-medium">{session.vendor_name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Branch</p>
                  <p className="font-medium">{session.branch}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Region</p>
                  <p className="font-medium">{session.region}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Column - Performance */}
          <div>
            <div className="bg-indigo-50 p-4 rounded-lg mb-6">
              <h2 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4 flex items-center">
                <FaTrophy className="mr-2 text-yellow-500" />
                Session Performance
              </h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Total Score</p>
                  <p className="text-2xl font-bold text-indigo-600">{session.total_score}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Win Rate</p>
                  <div className="flex items-center">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-green-600 h-2.5 rounded-full" 
                        style={{ width: `${winPercentage}%` }}
                      ></div>
                    </div>
                    <span className="ml-2 text-sm font-medium text-gray-700">{winPercentage}%</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Games Won</p>
                  <p className="font-medium text-green-600">{wins} of {session.total_games_played}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Games Played Section */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center">
            <FaGamepad className="mr-2 text-purple-600" />
            Games Played
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          {session.games_played.map((game) => (
            <div key={game.game_id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-medium text-gray-900">{game.game_name}</h3>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  game.win_status === "Won" 
                    ? "bg-green-100 text-green-800" 
                    : "bg-red-100 text-red-800"
                }`}>
                  {game.win_status}
                </span>
              </div>
              <div className="space-y-2">
                <div>
                  <p className="text-sm text-gray-500">Score</p>
                  <p className="font-medium">{game.score}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Game ID</p>
                  <p className="font-medium">{game.game_id}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SessionDetail;