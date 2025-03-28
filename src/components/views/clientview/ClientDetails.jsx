// ClientDetails.js
import { useParams, useNavigate } from 'react-router-dom';
import { clientData } from '../../../masterdata/clientData';

export default function ClientDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const client = clientData.find(c => c.id === id);

  if (!client) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Client not found</h1>
          <button 
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Clients
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors"
        >
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Clients
        </button>

        <div className="bg-white shadow-xl rounded-xl overflow-hidden">
          {/* Client Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-6 text-white">
            <div className="flex items-center">
              <img 
                src={client.image} 
                alt={client.client_name} 
                className="w-20 h-20 rounded-full border-4 border-white shadow-md"
              />
              <div className="ml-6">
                <h1 className="text-2xl font-bold">{client.client_name}</h1>
                <div className="flex items-center mt-2">
                  <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <span>{client.location}, {client.state}</span>
                </div>
                <span className="inline-block mt-2 px-3 py-1 bg-blue-700 bg-opacity-50 rounded-full text-sm">
                  {client.region} Region
                </span>
              </div>
            </div>
          </div>

          {/* Client Details */}
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Column 1 */}
            <div className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h2 className="text-lg font-semibold text-gray-800 mb-3 border-b pb-2">Business Information</h2>
                <div className="space-y-3">
                  <DetailItem label="Game Station" value={client.game_station} />
                  <DetailItem label="In Charge" value={client.incharge} />
                  <DetailItem label="Contact" value={client.contact} />
                  <DetailItem label="Email" value={client.email} />
                  <DetailItem label="Address" value={client.address} />
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h2 className="text-lg font-semibold text-gray-800 mb-3 border-b pb-2">Commission Details</h2>
                <div className="space-y-3">
                  <DetailItem label="Deal" value={client.commission_deal} />
                  <DetailItem label="Next Payment Date" value={client.commission_date} />
                  <DetailItem label="Deposit Amount" value={`$${client.deposit_amount.toLocaleString()}`} />
                </div>
              </div>
            </div>

            {/* Column 2 */}
            <div className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h2 className="text-lg font-semibold text-gray-800 mb-3 border-b pb-2">Operational Details</h2>
                <div className="space-y-3">
                  <DetailItem label="Business Timings (Weekdays)" value={client.business_timings.weekdays} />
                  <DetailItem label="Business Timings (Weekends)" value={client.business_timings.weekends} />
                  <DetailItem label="Reporting To" value={client.reporting_to} />
                  <DetailItem label="Appointed By" value={client.appointed_by} />
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h2 className="text-lg font-semibold text-gray-800 mb-3 border-b pb-2">Machines & Branches</h2>
                <div className="grid grid-cols-3 gap-4">
                  <StatCard label="TRT Machines" value={client.no_of_trts} color="blue" />
                  <StatCard label="Game Machines" value={client.no_of_game_machines} color="green" />
                  <StatCard label="Branches" value={client.no_of_branches} color="purple" />
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h2 className="text-lg font-semibold text-gray-800 mb-3 border-b pb-2">Documents Submitted</h2>
                <div className="flex flex-wrap gap-2">
                  {client.documents_submitted.map((doc, index) => (
                    <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                      {doc}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Reusable component for detail items
function DetailItem({ label, value }) {
  return (
    <div>
      <p className="text-sm font-medium text-gray-500">{label}</p>
      <p className="text-gray-800">{value}</p>
    </div>
  );
}

// Reusable component for stat cards
function StatCard({ label, value, color }) {
  const colorClasses = {
    blue: 'bg-blue-100 text-blue-800',
    green: 'bg-green-100 text-green-800',
    purple: 'bg-purple-100 text-purple-800',
  };

  return (
    <div className={`p-3 rounded-lg text-center ${colorClasses[color]}`}>
      <p className="text-2xl font-bold">{value}</p>
      <p className="text-xs font-medium">{label}</p>
    </div>
  );
}