import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { commissionData } from '../../../masterdata/commissions/commissionData';

const CommissionDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const commission = state?.commissionData || 
        commissionData.find(item => item.commission_calculation.client_id === clientId);

  if (!commission) {
    return (
      <div className="p-6 text-center">
        <p>No commission data found</p>
        <button 
          onClick={() => navigate('/commissions')}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md"
        >
          Back to Commissions
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold">{commission.commission_calculation.client_name}</h1>
              <p className="text-blue-100">{commission.commission_calculation.game_station}</p>
            </div>
        
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Client Info */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">Client Information</h2>
            <div className="flex items-center space-x-4">
              <img 
                src={commission.commission_calculation.client_image} 
                alt={commission.commission_calculation.client_name}
                className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-sm"
              />
              <div>
                <p className="font-medium">{commission.commission_calculation.client_name}</p>
                <p className="text-sm text-gray-600">{commission.commission_calculation.vendor_name}</p>
                <span className="inline-block mt-1 px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                  {commission.commission_calculation.region}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Game Station:</span>
                <span className="font-medium">{commission.commission_calculation.game_station}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Date:</span>
                <span className="font-medium">
                  {new Date(commission.commission_calculation.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Receipt No:</span>
                <span className="font-medium">{commission.commission_calculation.receipt_no}</span>
              </div>
            </div>
          </div>

          {/* Game Details */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">Game Details</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Customer:</span>
                <span className="font-medium">{commission.commission_calculation.game_details.customer_name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Machine:</span>
                <span className="font-medium">{commission.commission_calculation.game_details.machine_no_name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Deposit:</span>
                <span className="font-medium text-green-600">
                  ${commission.commission_calculation.game_details.customer_deposit.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Paid to Customer:</span>
                <span className="font-medium text-green-600">
                  ${commission.commission_calculation.game_details.paid_to_customer.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Game Profit:</span>
                <span className="font-medium text-green-600">
                  ${commission.commission_calculation.game_details.game_profit.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Commission Structure */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">Commission Structure</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Type:</span>
                <span className="font-medium capitalize">
                  {commission.commission_calculation.commission_structure.commission_type.replace('_', ' ')}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Vendor Share:</span>
                <span className="font-medium">
                  {(commission.commission_calculation.commission_structure.vendor_share * 100)}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Client Share:</span>
                <span className="font-medium">
                  {(commission.commission_calculation.commission_structure.client_share * 100)}%
                </span>
              </div>
            </div>
          </div>

          {/* Commission Calculation */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">Commission Calculation</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Vendor Commission:</span>
                <span className="font-medium text-blue-600">
                  ${commission.commission_calculation.commission_calculation.vendor_commission.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Client Earnings:</span>
                <span className="font-medium text-blue-600">
                  ${commission.commission_calculation.commission_calculation.client_earnings.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">New Balance:</span>
                <span className="font-medium">
                  ${commission.commission_calculation.commission_calculation.new_balance.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Payout Information */}
          <div className="md:col-span-2 space-y-4">
            <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">Payout Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-gray-600">Payout Date</p>
                <p className="font-medium">
                  {new Date(commission.commission_calculation.payout_information.payout_date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
              <div>
                <p className="text-gray-600">Method</p>
                <p className="font-medium capitalize">
                  {commission.commission_calculation.payout_information.payout_method.replace('_', ' ')}
                </p>
              </div>
              <div>
                <p className="text-gray-600">Status</p>
                <p className={`font-medium capitalize ${
                  commission.commission_calculation.payout_information.payout_status === 'paid' 
                    ? 'text-green-600' 
                    : 'text-amber-600'
                }`}>
                  {commission.commission_calculation.payout_information.payout_status}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommissionDetails;