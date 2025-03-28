import { useState } from "react";
import { FaSearch, FaCalendarAlt, FaDollarSign, FaTrophy, FaEye } from "react-icons/fa";
import { DateRange } from "react-date-range";
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { Link } from "react-router-dom";
import { matchRecord } from "../../../masterdata/matchRecord";


export default function MatchDashboard() {
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("All");
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [dateRange, setDateRange] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    ]);

    const filteredMatches = matchRecord.filter(match => {
        const matchesFilter = filter === "All" || match.region === filter;
        const matchesSearch = match.client_name.toLowerCase().includes(search.toLowerCase()) ||
                            match.customer_name.toLowerCase().includes(search.toLowerCase());
        const matchesDate = !showDatePicker || (
            new Date(match.date) >= dateRange[0].startDate &&
            new Date(match.date) <= dateRange[0].endDate
        );
        
        return matchesFilter && matchesSearch && matchesDate;
    });

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Match Dashboard</h2>
                <p className="text-gray-600 mb-6">Overview of gaming matches and results</p>
                
                {/* Search and Filter */}
                <div className="flex flex-col md:flex-row gap-4 mb-8">
                    <div className="relative flex-1">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaSearch className="text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search clients or customers..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div className="flex gap-2 flex-wrap">
                        <select
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                        >
                            <option value="All">All Regions</option>
                            <option value="East Coast">East Coast</option>
                            <option value="West Coast">West Coast</option>
                            <option value="Central">Central</option>
                        </select>
                        
                        <button 
                            onClick={() => setShowDatePicker(!showDatePicker)}
                            className={`px-4 py-2 border rounded-lg flex items-center gap-2 ${
                                showDatePicker 
                                    ? 'bg-blue-600 text-white' 
                                    : 'bg-white text-gray-700 border-gray-300'
                            }`}
                        >
                            <FaCalendarAlt />
                            <span>Date Range</span>
                        </button>
                    </div>
                </div>

                {/* Date Range Picker */}
                {showDatePicker && (
                    <div className="mb-8 bg-white p-4 rounded-lg shadow-md border border-gray-200">
                        <DateRange
                            editableDateInputs={true}
                            onChange={item => setDateRange([item.selection])}
                            moveRangeOnFirstSelection={false}
                            ranges={dateRange}
                            className="w-full"
                        />
                        <div className="flex justify-end mt-2">
                            <button 
                                onClick={() => {
                                    setDateRange([{
                                        startDate: new Date(),
                                        endDate: new Date(),
                                        key: 'selection'
                                    }]);
                                    setShowDatePicker(false);
                                }}
                                className="text-sm text-gray-600 hover:text-gray-800 mr-4"
                            >
                                Clear Dates
                            </button>
                        </div>
                    </div>
                )}

                {/* Stats Summary */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                    {/* ... (keep your existing stats summary) */}
                </div>

                {/* Match Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {filteredMatches.length > 0 ? (
                        filteredMatches.map((match) => (
                            <div key={match.match_id} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow flex flex-col">
                                {/* Client Header */}
                                <div className="p-4 border-b border-gray-100">
                                    <div className="flex items-center gap-3">
                                        <img 
                                            src={match.client_image} 
                                            alt={match.client_name}
                                            className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                                        />
                                        <div>
                                            <h3 className="font-semibold text-gray-800">{match.client_name}</h3>
                                            <p className="text-xs text-gray-500">{match.game_station}</p>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Match Details */}
                                <div className="p-4 flex-grow">
                                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                                        <FaCalendarAlt className="text-gray-400" />
                                        <span>
                                            {new Date(match.date).toLocaleDateString('en-US', {
                                                weekday: 'short',
                                                month: 'short',
                                                day: 'numeric'
                                            })}
                                        </span>
                                    </div>
                                    
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-gray-500">Match Amount</span>
                                            <span className="font-medium text-emerald-600 flex items-center gap-1">
                                                <FaDollarSign className="text-xs" />
                                                {match.match_amount.toLocaleString()}
                                            </span>
                                        </div>
                                        
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-gray-500">Profit to Client</span>
                                            <span className="font-medium text-blue-600 flex items-center gap-1">
                                                <FaDollarSign className="text-xs" />
                                                {match.profit_to_client.toLocaleString()}
                                            </span>
                                        </div>
                                        
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-gray-500">Result</span>
                                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                                match.won_by === 'Customer' ? 'bg-purple-100 text-purple-800' : 'bg-amber-100 text-amber-800'
                                            }`}>
                                                <FaTrophy className="mr-1" />
                                                {match.won_by} Win
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Footer */}
                                <div className="px-4 py-3 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
                                    <p className="text-xs text-gray-500">Customer: {match.customer_name}</p>
                                    <Link 
                                        to={`/matches/${match.match_id}`}
                                        className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1"
                                    >
                                        <FaEye className="text-xs" />
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full text-center py-12 bg-white rounded-xl shadow-sm border border-gray-200">
                            {/* ... (keep your existing empty state) */}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}