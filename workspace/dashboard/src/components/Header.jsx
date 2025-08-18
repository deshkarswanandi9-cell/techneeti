import React from 'react';
import { Plus, User, LogOut, Brain } from 'lucide-react';

const Header = ({ user, onLogout, onCreateCampaign }) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <Brain className="h-8 w-8 text-blue-600" />
            <div>
              <h1 className="text-xl font-semibold text-gray-900">AI Marketing Platform</h1>
              <p className="text-sm text-gray-500">Campaign Intelligence & Analytics</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={onCreateCampaign}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
            >
              <Plus className="h-4 w-4 mr-2" />
              New Campaign
            </button>
            
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <User className="h-5 w-5 text-gray-400" />
                <span className="text-sm font-medium text-gray-700">{user.name}</span>
              </div>
              
              <button
                onClick={onLogout}
                className="flex items-center px-3 py-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100"
                title="Logout"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;