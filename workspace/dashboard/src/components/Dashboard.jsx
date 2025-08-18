import React from 'react';
import { TrendingUp, Users, Target, DollarSign, Brain, Plus } from 'lucide-react';
import AreaChartComponent from './charts/AreaChart';
import BarChartComponent from './charts/BarChart';
import PieChartComponent from './charts/PieChart';
import LineChartComponent from './charts/LineChart';

const Dashboard = ({ campaigns }) => {
  const totalCampaigns = campaigns.length;
  const activeCampaigns = campaigns.filter(c => c.status === 'active').length;
  const totalBudget = campaigns.reduce((sum, c) => sum + parseFloat(c.budget || 0), 0);
  const avgSuccessRate = campaigns.length > 0 
    ? Math.round(campaigns.reduce((sum, c) => sum + (c.aiAnalysis?.successProbability || 0), 0) / campaigns.length)
    : 0;

  const stats = [
    {
      title: 'Total Campaigns',
      value: totalCampaigns.toString(),
      change: campaigns.length > 0 ? '+' + Math.floor(campaigns.length / 2) : '0',
      trend: 'up',
      icon: Target,
      bgColor: 'bg-blue-500'
    },
    {
      title: 'Active Campaigns',
      value: activeCampaigns.toString(),
      change: activeCampaigns > totalCampaigns / 2 ? '+15%' : '0%',
      trend: activeCampaigns > totalCampaigns / 2 ? 'up' : 'neutral',
      icon: TrendingUp,
      bgColor: 'bg-green-500'
    },
    {
      title: 'Total Budget',
      value: '$' + totalBudget.toLocaleString(),
      change: totalBudget > 0 ? '+12%' : '0%',
      trend: totalBudget > 0 ? 'up' : 'neutral',
      icon: DollarSign,
      bgColor: 'bg-purple-500'
    },
    {
      title: 'Avg Success Rate',
      value: avgSuccessRate + '%',
      change: avgSuccessRate > 70 ? '+5%' : avgSuccessRate > 50 ? '0%' : '-2%',
      trend: avgSuccessRate > 70 ? 'up' : avgSuccessRate > 50 ? 'neutral' : 'down',
      icon: Brain,
      bgColor: 'bg-orange-500'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Marketing Campaign Dashboard</h1>
          <p className="text-gray-600">AI-powered campaign intelligence and analytics</p>
        </div>
        <div className="flex items-center space-x-2">
          <Brain className="h-6 w-6 text-blue-600" />
          <span className="text-sm font-medium text-blue-600">AI Insights Active</span>
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center">
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                  <div className="flex items-center">
                    <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                    <span className={`ml-2 text-sm font-medium ${
                      stat.trend === 'up' ? 'text-green-600' : 
                      stat.trend === 'down' ? 'text-red-600' : 'text-gray-500'
                    }`}>
                      {stat.change}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {campaigns.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
          <Target className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Welcome to AI Marketing Platform</h3>
          <p className="text-gray-500 mb-6">
            Get started by creating your first marketing campaign. Our AI will analyze and optimize it for maximum ROI.
          </p>
          <div className="flex justify-center space-x-4">
            <button className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
              <Plus className="h-5 w-5 mr-2" />
              Create First Campaign
            </button>
            <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium">
              View Demo
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* Recent Campaign Performance */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-lg font-medium text-gray-800 mb-4">Campaign Performance Trends</h2>
              <AreaChartComponent />
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-lg font-medium text-gray-800 mb-4">ROI Comparison</h2>
              <BarChartComponent />
            </div>
          </div>
          
          {/* Additional Analytics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-lg font-medium text-gray-800 mb-4">Channel Distribution</h2>
              <PieChartComponent />
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-lg font-medium text-gray-800 mb-4">Success Rate Trends</h2>
              <LineChartComponent />
            </div>
          </div>

          {/* Recent Campaigns */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Recent Campaigns</h2>
            </div>
            <div className="divide-y divide-gray-200">
              {campaigns.slice(0, 5).map((campaign) => (
                <div key={campaign.id} className="p-6 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`w-3 h-3 rounded-full ${
                        campaign.status === 'active' ? 'bg-green-500' :
                        campaign.status === 'paused' ? 'bg-yellow-500' :
                        campaign.status === 'completed' ? 'bg-blue-500' : 'bg-gray-500'
                      }`}></div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">{campaign.name}</h3>
                        <p className="text-sm text-gray-500">
                          Budget: ${parseFloat(campaign.budget || 0).toLocaleString()} • 
                          Success Rate: {campaign.aiAnalysis?.successProbability || 'Analyzing'}%
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">
                        {campaign.aiAnalysis?.predictedROI || 'Calculating...'}
                      </p>
                      <p className="text-sm text-gray-500">Predicted ROI</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;