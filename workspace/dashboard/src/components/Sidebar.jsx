import React from 'react';
import { BarChart3, Target, Brain, TestTube, FileText, Home } from 'lucide-react';

const Sidebar = ({ currentView, onViewChange, campaignCount }) => {
  const menuItems = [
    { id: 'dashboard', name: 'Dashboard', icon: Home },
    { id: 'campaigns', name: 'Campaigns', icon: Target, badge: campaignCount },
    { id: 'analysis', name: 'AI Analysis', icon: Brain },
    { id: 'ab-testing', name: 'A/B Testing', icon: TestTube },
    { id: 'reports', name: 'Reports', icon: FileText },
  ];

  return (
    <aside className="w-64 bg-white shadow-sm border-r border-gray-200">
      <nav className="mt-5 px-2">
        <div className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id)}
                className={`w-full group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${
                  isActive
                    ? 'bg-blue-100 text-blue-900 border-r-2 border-blue-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon className={`mr-3 h-5 w-5 ${isActive ? 'text-blue-600' : 'text-gray-400'}`} />
                {item.name}
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="ml-auto inline-block py-1 px-2 text-xs font-medium bg-blue-100 text-blue-600 rounded-full">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
        
        <div className="mt-8 px-2">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-900 mb-2">Need Help?</h3>
            <p className="text-xs text-gray-600 mb-3">
              Explore our AI-powered campaign optimization features
            </p>
            <button className="w-full px-3 py-2 bg-blue-600 text-white text-xs font-medium rounded-md hover:bg-blue-700">
              View Tutorial
            </button>
          </div>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;