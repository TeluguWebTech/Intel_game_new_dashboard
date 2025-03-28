// src/components/views/machview/MatchDetails.jsx
import { useParams } from "react-router-dom";
import { matchRecord } from "../../../masterdata/matchRecord";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaCalendarAlt, FaDollarSign, FaTrophy, FaUser, FaGamepad, FaReceipt } from "react-icons/fa";

export default function MatchDetails() {
  const { matchId } = useParams();
  const match = matchRecord.find(m => m.match_id === matchId);

  if (!match) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Match not found</h2>
          <Link 
            to="/matches" 
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <FaArrowLeft className="mr-2" />
            Back to Matches
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <div className="mb-6">
          <Link 
            to="/matches" 
            className="inline-flex items-center text-blue-600 hover:text-blue-800"
          >
            <FaArrowLeft className="mr-2" />
            Back to Matches
          </Link>
        </div>

        {/* Match Card */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Client Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-4">
              <img 
                src={match.client_image} 
                alt={match.client_name}
                className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-md"
              />
              <div>
                <h1 className="text-2xl font-bold text-gray-800">{match.client_name}</h1>
                <p className="text-gray-600">{match.game_station} • {match.region}</p>
              </div>
            </div>
          </div>

          {/* Match Details */}
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                  <FaCalendarAlt />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Match Date</h3>
                  <p className="font-medium">
                    {new Date(match.date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-green-100 rounded-lg text-green-600">
                  <FaDollarSign />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Match Amount</h3>
                  <p className="font-medium text-green-600">${match.match_amount.toLocaleString()}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-purple-100 rounded-lg text-purple-600">
                  <FaTrophy />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Result</h3>
                  <p className={`font-medium ${
                    match.won_by === 'Customer' ? 'text-purple-600' : 'text-amber-600'
                  }`}>
                    {match.won_by} Win
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                  <FaUser />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Customer</h3>
                  <p className="font-medium">{match.customer_name}</p>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-amber-100 rounded-lg text-amber-600">
                  <FaGamepad />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Machine</h3>
                  <p className="font-medium">{match.machine_name}</p>
                  <p className="text-sm text-gray-500">ID: {match.machine_id}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-green-100 rounded-lg text-green-600">
                  <FaDollarSign />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Customer Deposit</h3>
                  <p className="font-medium">${match.customer_deposit.toLocaleString()}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-green-100 rounded-lg text-green-600">
                  <FaDollarSign />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Client Deposit</h3>
                  <p className="font-medium">${match.client_deposit.toLocaleString()}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-gray-100 rounded-lg text-gray-600">
                  <FaReceipt />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Receipt Number</h3>
                  <p className="font-medium">{match.receipt_no}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Transaction Summary */}
          <div className="p-6 bg-gray-50 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Transaction Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <p className="text-sm text-gray-500">Profit to Client</p>
                <p className="text-xl font-bold text-blue-600">${match.profit_to_client.toLocaleString()}</p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <p className="text-sm text-gray-500">Paid to Customer</p>
                <p className="text-xl font-bold text-emerald-600">${match.paid_to_customer.toLocaleString()}</p>
              </div>
            </div>
          </div>

          {/* Processed By */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
            <p className="text-sm text-gray-500">Processed by: <span className="font-medium">{match.paid_by}</span></p>
          </div>
        </div>
      </div>
    </div>
  );
}