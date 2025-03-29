import { useParams } from 'react-router-dom';
import { clientData } from '../../../masterdata/clientData';

const SingleClient = () => {
  const { clientId } = useParams();
  const client = clientData.find(client => client.id === clientId);

  if (!client) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center p-6 max-w-md bg-white rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Client Not Found</h2>
          <p className="text-gray-600">No client exists with ID: {clientId}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6">
        <div className="mt-6">
        <button 
          onClick={() => window.history.back()}
          className="px-4 py-2 text-gray-600 hover:text-gray-800 flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Clients
        </button>
      </div>
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 p-6 bg-white rounded-xl shadow-sm border border-gray-100">
        <img 
          src={client.image} 
          alt={client.client_name} 
          className="h-28 w-28 rounded-lg object-cover border-2 border-gray-200"
        />
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{client.client_name}</h1>
              <p className="text-gray-500 font-mono">{client.id}</p>
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                Edit Profile
              </button>
              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition">
                Message
              </button>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
              {client.game_station}
            </span>
            <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
              {client.region} Region
            </span>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Basic Information Card */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
            Basic Information
          </h2>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Incharge</p>
              <p className="font-medium">{client.incharge}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Contact</p>
              <p className="font-medium">{client.contact}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium">{client.email}</p>
            </div>
          </div>
        </div>

        {/* Location Details Card */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
            Location Details
          </h2>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Address</p>
              <p className="font-medium">{client.address}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Location</p>
              <p className="font-medium">{client.location}, {client.state}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Region:</span>
              <span className="font-medium">{client.region}</span>
            </div>
          </div>
        </div>

        {/* Business Details Card */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
            Business Details
          </h2>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Commission Deal</p>
              <p className="font-medium">{client.commission_deal}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Next Commission Date</p>
              <p className="font-medium">{client.commission_date}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Deposit Amount</p>
              <p className="font-medium">${client.deposit_amount.toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* Operations Card */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
            Operations
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Game Machines</p>
              <p className="text-2xl font-bold text-blue-600">{client.no_of_game_machines}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">TRTs</p>
              <p className="text-2xl font-bold text-green-600">{client.no_of_trts}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Branches</p>
              <p className="text-2xl font-bold text-purple-600">{client.no_of_branches}</p>
            </div>
            <div className="col-span-2">
              <p className="text-sm text-gray-500">Business Timings</p>
              <div className="mt-1 space-y-1">
                <p className="font-medium flex items-center gap-2">
                  <span className="inline-block h-2 w-2 rounded-full bg-blue-500"></span>
                  Weekdays: {client.business_timings.weekdays}
                </p>
                <p className="font-medium flex items-center gap-2">
                  <span className="inline-block h-2 w-2 rounded-full bg-green-500"></span>
                  Weekends: {client.business_timings.weekends}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Documents Section */}
      <div className="mt-6 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
          Documents
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {client.documents_submitted.map((doc, index) => (
            <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="p-2 bg-blue-100 rounded-lg">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <p className="font-medium">{doc}</p>
                <p className="text-sm text-gray-500">PDF • 2.4MB</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Back Button */}
    
    </div>
  );
};

export default SingleClient;