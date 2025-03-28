import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const AddClient = () => {
  const [formData, setFormData] = useState({
    client_name: '',
    image: null,
    game_station: '',
    incharge: '',
    contact: '',
    email: '',
    address: '',
    location: 'Los Angeles',
    state: '',
    region: '',
    commission_deal: '% of total revenue',
    commission_date: '',
    documents: [],
    deposit_amount: '',
    reporting_to: '',
    appointed_by: 'Vendor Corp Ltd.',
    no_of_game_machines: '',
    no_of_trts: '',
    sub_branches: '',
    business_timings: {
      weekdays: '10:00 AM - 11:00 PM',
      weekends: '09:00 AM - 12:00 AM'
    }
  });

  const [documentInputs, setDocumentInputs] = useState([{ id: 1 }]);
  const [nextDocId, setNextDocId] = useState(2);


  const regions = ['Northern', 'Eastern', 'Western', 'Southern'];
  const vendors = ['Vendor A', 'Vendor B', 'Vendor Corp Ltd.'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({
      ...prev,
      image: e.target.files[0]
    }));
  };

  const handleDocumentsChange = (e, id) => {
    const files = Array.from(e.target.files);
    const updatedDocuments = [...formData.documents];
    const existingIndex = updatedDocuments.findIndex(doc => doc.id === id);
    
    if (existingIndex >= 0) {
      updatedDocuments[existingIndex] = { id, files };
    } else {
      updatedDocuments.push({ id, files });
    }
    
    setFormData(prev => ({
      ...prev,
      documents: updatedDocuments
    }));
  };

  const handleBusinessTimingsChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      business_timings: {
        ...prev.business_timings,
        [name]: value
      }
    }));
  };

  const addDocumentInput = () => {
    setDocumentInputs(prev => [...prev, { id: nextDocId }]);
    setNextDocId(prev => prev + 1);
  };

  const removeDocumentInput = (id) => {
    setDocumentInputs(prev => prev.filter(input => input.id !== id));
    setFormData(prev => ({
      ...prev,
      documents: prev.documents.filter(doc => doc.id !== id)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Here you would typically send the data to your backend
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">

      <div className="max-w-5xl mx-auto">
        <div className="bg-white shadow rounded-lg overflow-hidden">
        <Link 
  to="/clients" 
  className="inline-flex justify-center py-2 px-6 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
>
  Go back
</Link>
          <div className="px-6 py-5 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-blue-800">
            <h1 className="text-2xl font-bold text-white">Add New Client</h1>
            <p className="mt-1 text-blue-100">Fill in the details below to register a new client</p>
          </div>
          
          <form onSubmit={handleSubmit} className="divide-y divide-gray-200">
            {/* Section 1: Basic Information */}
            <div className="px-6 py-5">
              <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-800 mr-3">
                  1
                </span>
                Basic Information
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Client Name*</label>
                  <input
                    type="text"
                    name="client_name"
                    value={formData.client_name}
                    onChange={handleChange}
                    required
                    className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
                  <div className="flex items-center">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Game Station*</label>
                  <input
                    type="text"
                    name="game_station"
                    value={formData.game_station}
                    onChange={handleChange}
                    required
                    className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Incharge*</label>
                  <input
                    type="text"
                    name="incharge"
                    value={formData.incharge}
                    onChange={handleChange}
                    required
                    className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Contact Information */}
            <div className="px-6 py-5">
              <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-800 mr-3">
                  2
                </span>
                Contact Information
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number*</label>
                  <input
                    type="tel"
                    name="contact"
                    value={formData.contact}
                    onChange={handleChange}
                    required
                    className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email*</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Address*</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  rows={3}
                  className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">State*</label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                    className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Section 3: Business Details */}
            <div className="px-6 py-5">
              <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-800 mr-3">
                  3
                </span>
                Business Details
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Region*</label>
                  <select
                    name="region"
                    value={formData.region}
                    onChange={handleChange}
                    required
                    className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select Region</option>
                    {regions.map(region => (
                      <option key={region} value={region}>{region}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Commission Deal</label>
                  <input
                    type="text"
                    name="commission_deal"
                    value={formData.commission_deal}
                    onChange={handleChange}
                    className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Commission Date</label>
                  <input
                    type="date"
                    name="commission_date"
                    value={formData.commission_date}
                    onChange={handleChange}
                    className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Documents</label>
                  <div className="space-y-4">
                    {documentInputs.map((input) => (
                      <div key={input.id} className="flex items-center gap-2">
                        <input
                          type="file"
                          multiple
                          onChange={(e) => handleDocumentsChange(e, input.id)}
                          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        />
                        <button
                          type="button"
                          onClick={() => removeDocumentInput(input.id)}
                          className="p-2 text-red-500 hover:text-red-700"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={addDocumentInput}
                      className="mt-2 inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                      </svg>
                      Add Document
                    </button>
                  </div>
                  <p className="mt-2 text-xs text-gray-500">Supported formats: PDF, JPG, PNG</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Deposit Amount</label>
                  <div className="relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">$</span>
                    </div>
                    <input
                      type="number"
                      name="deposit_amount"
                      value={formData.deposit_amount}
                      onChange={handleChange}
                      className="block w-full pl-7 pr-12 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      placeholder="0.00"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Reporting To*</label>
                  <select
                    name="reporting_to"
                    value={formData.reporting_to}
                    onChange={handleChange}
                    required
                    className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select Vendor</option>
                    {vendors.map(vendor => (
                      <option key={vendor} value={vendor}>{vendor}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Appointed By</label>
                  <input
                    type="text"
                    name="appointed_by"
                    value={formData.appointed_by}
                    onChange={handleChange}
                    className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Number of Game Machines</label>
                  <input
                    type="number"
                    name="no_of_game_machines"
                    value={formData.no_of_game_machines}
                    onChange={handleChange}
                    className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Number of TRTs</label>
                  <input
                    type="number"
                    name="no_of_trts"
                    value={formData.no_of_trts}
                    onChange={handleChange}
                    className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sub Branches</label>
                  <input
                    type="number"
                    name="sub_branches"
                    value={formData.sub_branches}
                    onChange={handleChange}
                    className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Section 4: Business Timings */}
            <div className="px-6 py-5">
              <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-800 mr-3">
                  4
                </span>
                Business Timings
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Weekdays</label>
                  <input
                    type="text"
                    name="weekdays"
                    value={formData.business_timings.weekdays}
                    onChange={handleBusinessTimingsChange}
                    className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Weekends</label>
                  <input
                    type="text"
                    name="weekends"
                    value={formData.business_timings.weekends}
                    onChange={handleBusinessTimingsChange}
                    className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Form Footer */}
            <div className="px-6 py-4 bg-gray-50 text-right">
              <button
                type="submit"
                className="inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Submit Client
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddClient;