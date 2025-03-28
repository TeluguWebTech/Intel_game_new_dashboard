import React, { useState } from 'react';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { format } from 'date-fns';
import { clientReportData } from '../../../masterdata/reports/clientReportsData';

const ClientReports = () => {
  const { analyticsReports } = clientReportData;
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ]);

  // Filter data based on selected date range
  const filterDataByDateRange = (data, dateField) => {
    return data.filter(item => {
      const itemDate = new Date(item[dateField]);
      return itemDate >= dateRange[0].startDate && itemDate <= dateRange[0].endDate;
    });
  };

  // Apply filtering to relevant data sections
  const filteredDepositActivity = filterDataByDateRange(
    analyticsReports.financialReports.depositActivity,
    'date'
  );
  const filteredWithdrawalActivity = filterDataByDateRange(
    analyticsReports.financialReports.withdrawalActivity,
    'date'
  );
  const filteredMonthlyRevenue = filterDataByDateRange(
    analyticsReports.financialReports.monthlyRevenue,
    'month'
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Client Analytics Dashboard</h1>
        <div className="relative">
          <button 
            onClick={() => setShowDatePicker(!showDatePicker)}
            className="bg-white px-4 py-2 rounded-lg shadow-md flex items-center space-x-2 hover:bg-gray-50"
          >
            <span>{format(dateRange[0].startDate, 'MMM dd, yyyy')} - {format(dateRange[0].endDate, 'MMM dd, yyyy')}</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
            </svg>
          </button>
          
          {showDatePicker && (
            <div className="absolute right-0 mt-2 z-10">
              <DateRangePicker
                onChange={item => {
                  setDateRange([item.selection]);
                  setShowDatePicker(false);
                }}
                showSelectionPreview={true}
                moveRangeOnFirstSelection={false}
                months={2}
                ranges={dateRange}
                direction="horizontal"
              />
            </div>
          )}
        </div>
      </div>
      
      {/* Overview Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Business Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-gray-600">Total Clients</p>
            <p className="text-2xl font-bold text-blue-600">{analyticsReports.overview.totalClients}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-gray-600">Total Revenue</p>
            <p className="text-2xl font-bold text-green-600">${(analyticsReports.overview.totalRevenue / 1000).toFixed(1)}K</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <p className="text-gray-600">Total Commission</p>
            <p className="text-2xl font-bold text-purple-600">${(analyticsReports.overview.totalCommission / 1000).toFixed(1)}K</p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <p className="text-gray-600">Active Machines</p>
            <p className="text-2xl font-bold text-yellow-600">{analyticsReports.overview.activeMachines}</p>
          </div>
          <div className="bg-red-50 p-4 rounded-lg">
            <p className="text-gray-600">Total TRTs</p>
            <p className="text-2xl font-bold text-red-600">{analyticsReports.overview.totalTRTs}</p>
          </div>
        </div>

        <h3 className="text-lg font-medium text-gray-700 mt-6 mb-3">Revenue by Region</h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {analyticsReports.overview.regions.map((region) => (
            <div key={region.name} className="bg-gray-50 p-3 rounded-lg">
              <p className="font-medium text-gray-700">{region.name}</p>
              <p className="text-gray-600">${(region.revenue / 1000).toFixed(1)}K</p>
              <p className="text-sm text-gray-500">{region.clients} clients</p>
            </div>
          ))}
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Top Performing Clients */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Top Performing Clients</h2>
          <div className="space-y-4">
            {analyticsReports.performanceMetrics.topPerformingClients.map((client) => (
              <div key={client.id} className="border-b pb-3 last:border-b-0">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{client.name}</p>
                    <p className="text-sm text-gray-500">ID: {client.id}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">${(client.revenue / 1000).toFixed(1)}K</p>
                    <p className="text-sm text-green-600">Profit: {client.profitMargin}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Machine Utilization */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Machine Utilization</h2>
          <div className="space-y-4">
            {analyticsReports.performanceMetrics.machineUtilization.map((machine) => (
              <div key={machine.clientId} className="border-b pb-3 last:border-b-0">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{machine.clientName}</p>
                    <p className="text-sm text-gray-500">{machine.machines} machines</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">{machine.utilizationRate}</p>
                    <p className="text-sm text-blue-600">${machine.avgRevenuePerMachine.toLocaleString()}/machine</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Financial Reports */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Financial Reports</h2>
        
        <h3 className="text-lg font-medium text-gray-700 mb-3">Monthly Revenue</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {filteredMonthlyRevenue.length > 0 ? (
            filteredMonthlyRevenue.map((month) => (
              <div key={month.month} className="bg-gray-50 p-4 rounded-lg">
                <p className="font-medium">{month.month}</p>
                <p className="text-xl font-bold text-green-600">${(month.revenue / 1000).toFixed(1)}K</p>
                <p className="text-sm text-gray-600">Commission: ${(month.commission / 1000).toFixed(1)}K</p>
              </div>
            ))
          ) : (
            <div className="col-span-3 text-center py-4 text-gray-500">
              No data available for selected date range
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-3">Deposit Activity</h3>
            {filteredDepositActivity.length > 0 ? (
              <div className="space-y-3">
                {filteredDepositActivity.map((deposit) => (
                  <div key={deposit.date} className="flex justify-between items-center bg-blue-50 p-3 rounded">
                    <p className="font-medium">{deposit.date}</p>
                    <div className="text-right">
                      <p className="font-bold">${deposit.totalAmount.toLocaleString()}</p>
                      <p className="text-sm text-gray-600">{deposit.deposits} deposits</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4 text-gray-500">
                No deposit data for selected period
              </div>
            )}
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-3">Withdrawal Activity</h3>
            {filteredWithdrawalActivity.length > 0 ? (
              <div className="space-y-3">
                {filteredWithdrawalActivity.map((withdrawal) => (
                  <div key={withdrawal.date} className="flex justify-between items-center bg-red-50 p-3 rounded">
                    <p className="font-medium">{withdrawal.date}</p>
                    <div className="text-right">
                      <p className="font-bold">${withdrawal.totalAmount.toLocaleString()}</p>
                      <p className="text-sm text-gray-600">{withdrawal.withdrawals} withdrawals</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4 text-gray-500">
                No withdrawal data for selected period
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Game Performance */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Game Performance</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-3">Top Games</h3>
            <div className="space-y-3">
              {analyticsReports.gamePerformance.topGames.map((game) => (
                <div key={game.gameId} className="flex justify-between items-center border-b pb-3 last:border-b-0">
                  <div>
                    <p className="font-medium">{game.name}</p>
                    <p className="text-sm text-gray-500">ID: {game.gameId}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">{game.plays} plays</p>
                    <p className="text-sm text-green-600">${game.revenue.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-3">Win/Loss Ratios</h3>
            <div className="space-y-3">
              {analyticsReports.gamePerformance.winLossRatios.map((game) => (
                <div key={game.gameId} className="border-b pb-3 last:border-b-0">
                  <p className="font-medium">{game.name}</p>
                  <div className="flex justify-between mt-2">
                    <div className="text-center">
                      <p className="text-sm text-gray-500">Customer Wins</p>
                      <p className="font-bold text-green-600">{game.customerWins}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-500">House Wins</p>
                      <p className="font-bold text-red-600">{game.houseWins}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-500">Ratio</p>
                      <p className="font-bold">{game.ratio}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Regional Analysis */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Regional Analysis</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-3">Revenue by Region</h3>
            <div className="space-y-3">
              {analyticsReports.regionalAnalysis.revenueByRegion.map((region) => (
                <div key={region.region} className="mb-3">
                  <div className="flex justify-between mb-1">
                    <span className="font-medium">{region.region}</span>
                    <span className="text-gray-600">{region.percentage}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-blue-600 h-2.5 rounded-full" 
                      style={{ width: region.percentage }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-3">Client Distribution</h3>
            <div className="space-y-3">
              {analyticsReports.regionalAnalysis.clientDistribution.map((region) => (
                <div key={region.region} className="mb-3">
                  <div className="flex justify-between mb-1">
                    <span className="font-medium">{region.region}</span>
                    <span className="text-gray-600">{region.percentage}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-green-600 h-2.5 rounded-full" 
                      style={{ width: region.percentage }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Trends */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Business Trends</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-3">Weekly Performance</h3>
            <div className="space-y-3">
              {analyticsReports.trends.weeklyPerformance.map((week) => (
                <div key={week.week} className="flex justify-between items-center border-b pb-3 last:border-b-0">
                  <p className="font-medium">{week.week}</p>
                  <div className="text-right">
                    <p className="font-bold">${(week.revenue / 1000).toFixed(1)}K</p>
                    <p className={`text-sm ${week.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                      {week.change}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-3">Peak Hours</h3>
            <div className="space-y-3">
              {analyticsReports.trends.peakHours.map((hour) => (
                <div key={hour.hour} className="mb-3">
                  <div className="flex justify-between mb-1">
                    <span className="font-medium">{hour.hour}</span>
                    <span className="text-gray-600">{hour.activity} activities</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-purple-600 h-2.5 rounded-full" 
                      style={{ width: `${(hour.activity / 100) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientReports;