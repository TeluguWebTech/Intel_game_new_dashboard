import React from 'react';
import { FaHome, FaChevronRight, FaPhone, FaStar, FaUser, FaGamepad, FaTrophy, FaTimesCircle, FaCheckCircle, FaClock, FaMoneyBillWave, FaChartLine } from 'react-icons/fa';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { customerData } from '../../../masterdata/customers/customerListData';
import { blockedCustomers } from '../../../masterdata/customers/blockedCustomers';
import { customerSessionsData } from '../../../masterdata/customers/sessionData';


const CustomerDetail = () => {
  const { customerId } = useParams();
  const navigate = useNavigate();
  
  // Find customer in both active and blocked lists
  const customer = [...customerData, ...blockedCustomers].find(c => c.customer_id === customerId);
  const customerSessions = customerSessionsData.filter(s => s.customer_id === customerId);
  
  if (!customer) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error! </strong>
          <span className="block sm:inline">Customer not found.</span>
        </div>
      </div>
    );
  }

  const isBlocked = customer.subscription_status === "Blocked";

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center text-gray-600 text-sm pb-2">
        <FaHome className="mr-1 text-blue-500" />
        <Link to="/" className="hover:underline">Home</Link>
        <FaChevronRight className="mx-2 text-gray-400" />
        <Link to="/customers" className="hover:underline">Customers</Link>
        <FaChevronRight className="mx-2 text-gray-400" />
        <span className="text-orange-500">{customer.customer_name}</span>
      </div>
      
      {/* Header with Back Button */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-blue-600 hover:text-blue-800"
        >
          <FaChevronRight className="mr-2 transform rotate-180" /> Back to Customers
        </button>
      </div>
      
      {/* Main Customer Card */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
        {/* Customer Header */}
        <div className={`p-6 ${isBlocked ? 'bg-gradient-to-r from-red-600 to-red-700' : 'bg-gradient-to-r from-blue-600 to-blue-700'}`}>
          <div className="flex flex-col md:flex-row items-start md:items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <img
                src={customer.customer_image}
                alt={customer.customer_name}
                className="h-20 w-20 rounded-full object-cover border-4 border-white shadow-md"
              />
              <div className="ml-4">
                <h1 className="text-2xl font-bold text-white">{customer.customer_name}</h1>
                <div className="flex items-center mt-1">
                  <FaStar className="text-yellow-300 mr-1" />
                  <span className="text-white">{customer.customer_rating} Rating</span>
                </div>
              </div>
            </div>
            <div className="md:ml-auto bg-white/10 px-4 py-2 rounded-lg">
              <p className="text-white font-medium">Customer ID: {customer.customer_id}</p>
              <p className="text-white text-sm">
                {customer.vendor_name} • {customer.branch}
              </p>
            </div>
          </div>
        </div>
        
        {/* Customer Details */}
        <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Personal Info */}
          <div>
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h2 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4 flex items-center">
                <FaUser className="mr-2 text-blue-600" />
                Personal Information
              </h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Contact</p>
                  <div className="flex items-center">
                    <FaPhone className="mr-2 text-gray-400 text-sm" />
                    <a href={`tel:${customer.customer_contact}`} className="font-medium hover:text-blue-600">
                      {customer.customer_contact}
                    </a>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Address</p>
                  <p className="font-medium">{customer.customer_address}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Subscription</p>
                  <p className="font-medium">{customer.customer_subscription}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <span
                    className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      customer.subscription_status === "Active"
                        ? "bg-green-100 text-green-800"
                        : customer.subscription_status === "Blocked"
                        ? "bg-red-100 text-red-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {customer.subscription_status}
                  </span>
                  {isBlocked && (
                    <p className="text-sm text-gray-500 mt-1">
                      Reason: <span className="font-medium">{customer.block_reason}</span>
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {/* Middle Column - Gaming Stats */}
          <div>
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h2 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4 flex items-center">
                <FaGamepad className="mr-2 text-purple-600" />
                Gaming Statistics
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Total Visits</p>
                  <p className="text-xl font-bold text-gray-900">{customer.no_of_visits}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Hours</p>
                  <p className="text-xl font-bold text-gray-900">{customer.total_hours}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Games Played</p>
                  <p className="text-xl font-bold text-gray-900">{customer.total_games_played}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Spend</p>
                  <p className="text-xl font-bold text-green-600">${customer.total_games_amount.toLocaleString()}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h2 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4 flex items-center">
                <FaTrophy className="mr-2 text-yellow-500" />
                Win/Loss Ratio
              </h2>
              <div className="flex items-center justify-between">
                <div className="text-center">
                  <p className="text-sm text-gray-500">Win %</p>
                  <p className="text-2xl font-bold text-green-600">{customer.won_avg}%</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-500">Loss %</p>
                  <p className="text-2xl font-bold text-red-600">{customer.loss_avg}%</p>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4">
                <div 
                  className="bg-green-600 h-2.5 rounded-full" 
                  style={{ width: `${customer.won_avg}%` }}
                ></div>
              </div>
            </div>
          </div>
          
          {/* Right Column - Reward Points */}
          <div>
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h2 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4 flex items-center">
                <FaStar className="mr-2 text-yellow-500" />
                Reward Points
              </h2>
              <div className="text-center py-4">
                <div className="inline-flex items-center justify-center bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full h-24 w-24 shadow-lg">
                  <span className="text-2xl font-bold text-white">{customer.reward_points}</span>
                </div>
                <p className="mt-3 text-sm text-gray-600">Available points</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Customer Sessions */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center">
            <FaClock className="mr-2 text-blue-600" />
            Recent Gaming Sessions
          </h2>
        </div>
        
        {customerSessions.length > 0 ? (
          <div className="divide-y divide-gray-200">
            {customerSessions.map((session) => (
              <div key={session.session_id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="mb-4 md:mb-0">
                    <h3 className="text-lg font-medium text-gray-900">{session.date}</h3>
                    <p className="text-sm text-gray-500">
                      {session.start_time} - {session.end_time} ({session.session_duration} mins)
                    </p>
                  </div>
                  <div className="flex items-center">
                    <div className="mr-6 text-center">
                      <p className="text-sm text-gray-500">Games Played</p>
                      <p className="font-medium">{session.total_games_played}</p>
                    </div>
                    <div className="mr-6 text-center">
                      <p className="text-sm text-gray-500">Total Score</p>
                      <p className="font-medium text-green-600">{session.total_score}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-500">Points Earned</p>
                      <p className="font-medium text-yellow-600">{session.reward_points_earned}</p>
                    </div>
                  </div>
                </div>
                
                {/* Games Played in this Session */}
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Games Played:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {session.games_played.map((game) => (
                      <div key={game.game_id} className="border rounded-lg p-3">
                        <div className="flex justify-between items-start">
                          <h5 className="font-medium">{game.game_name}</h5>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            game.win_status === "Won" 
                              ? "bg-green-100 text-green-800" 
                              : "bg-red-100 text-red-800"
                          }`}>
                            {game.win_status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">Score: {game.score}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-6 text-center text-gray-500">
            No gaming sessions found for this customer.
          </div>
        )}
      </div>
      
      {/* Customer Reviews and Support Tickets */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Reviews */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center">
              <FaStar className="mr-2 text-yellow-500" />
              Customer Reviews
            </h2>
          </div>
          
          {customer.reviews && customer.reviews.length > 0 ? (
            <div className="divide-y divide-gray-200">
              {customer.reviews.map((review) => (
                <div key={review.review_id} className="p-6">
                  <div className="flex items-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <FaStar 
                        key={i} 
                        className={`h-4 w-4 ${i < Math.floor(review.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                      />
                    ))}
                    <span className="ml-2 text-sm text-gray-500">{review.date}</span>
                  </div>
                  <p className="text-gray-700">{review.comment}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-6 text-center text-gray-500">
              No reviews found for this customer.
            </div>
          )}
        </div>
        
        {/* Support Tickets */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center">
              <FaChartLine className="mr-2 text-blue-500" />
              Support Tickets
            </h2>
          </div>
          
          {customer.support && customer.support.length > 0 ? (
            <div className="divide-y divide-gray-200">
              {customer.support.map((ticket) => (
                <div key={ticket.ticket_id} className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-900">{ticket.issue}</h3>
                      <p className="text-sm text-gray-500">{ticket.raised_on}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      ticket.status === "Resolved" 
                        ? "bg-green-100 text-green-800" 
                        : ticket.status === "Pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-blue-100 text-blue-800"
                    }`}>
                      {ticket.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-6 text-center text-gray-500">
              No support tickets found for this customer.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerDetail;