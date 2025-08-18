import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import LoginForm from './components/Auth/LoginForm';
import CampaignForm from './components/Campaign/CampaignForm';
import CampaignList from './components/Campaign/CampaignList';
import AnalysisResults from './components/AIAnalysis/AnalysisResults';
import ABTestModule from './components/ABTesting/ABTestModule';
import PerformanceReport from './components/Reports/PerformanceReport';
import Dashboard from './components/Dashboard';

function App() {
  const [user, setUser] = useState(null);
  const [currentView, setCurrentView] = useState('dashboard');
  const [campaigns, setCampaigns] = useState([]);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [showCampaignForm, setShowCampaignForm] = useState(false);

  // Load user from localStorage on app start
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // Load campaigns from localStorage
  useEffect(() => {
    const savedCampaigns = localStorage.getItem('campaigns');
    if (savedCampaigns) {
      setCampaigns(JSON.parse(savedCampaigns));
    }
  }, []);

  // Save campaigns to localStorage whenever campaigns change
  useEffect(() => {
    if (campaigns.length > 0) {
      localStorage.setItem('campaigns', JSON.stringify(campaigns));
    }
  }, [campaigns]);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    setCurrentView('dashboard');
  };

  const handleCreateCampaign = (campaignData) => {
    const newCampaign = {
      id: Date.now().toString(),
      ...campaignData,
      status: 'draft',
      createdAt: new Date(),
      aiAnalysis: {
        successProbability: Math.floor(Math.random() * 40) + 60, // 60-100%
        predictedROI: Math.floor(Math.random() * 200) + 200 + '%', // 200-400%
        audienceQuality: ['Excellent', 'Good', 'Fair'][Math.floor(Math.random() * 3)],
        riskLevel: ['Low', 'Medium', 'High'][Math.floor(Math.random() * 3)],
        audienceMatch: Math.floor(Math.random() * 30) + 70,
        budgetEfficiency: Math.floor(Math.random() * 30) + 70,
        channelOptimization: Math.floor(Math.random() * 30) + 70,
        timingScore: Math.floor(Math.random() * 30) + 60,
        estimatedReach: Math.floor(Math.random() * 100) + 50 + 'K'
      }
    };

    setCampaigns(prev => [newCampaign, ...prev]);
    setSelectedCampaign(newCampaign);
    setShowCampaignForm(false);
    setCurrentView('analysis');
  };

  const handleViewCampaign = (campaignId) => {
    const campaign = campaigns.find(c => c.id === campaignId);
    setSelectedCampaign(campaign);
    setCurrentView('analysis');
  };

  const handleEditCampaign = (campaignId) => {
    const campaign = campaigns.find(c => c.id === campaignId);
    setSelectedCampaign(campaign);
    setShowCampaignForm(true);
  };

  const handleDeleteCampaign = (campaignId) => {
    if (window.confirm('Are you sure you want to delete this campaign?')) {
      setCampaigns(prev => prev.filter(c => c.id !== campaignId));
      if (selectedCampaign?.id === campaignId) {
        setSelectedCampaign(null);
        setCurrentView('campaigns');
      }
    }
  };

  const handleViewReport = (campaignId) => {
    const campaign = campaigns.find(c => c.id === campaignId);
    setSelectedCampaign(campaign);
    setCurrentView('reports');
  };

  // If user is not logged in, show login form
  if (!user) {
    return <LoginForm onLogin={handleLogin} />;
  }

  const renderMainContent = () => {
    if (showCampaignForm) {
      return (
        <CampaignForm
          onSubmit={handleCreateCampaign}
          onCancel={() => setShowCampaignForm(false)}
        />
      );
    }

    switch (currentView) {
      case 'dashboard':
        return <Dashboard campaigns={campaigns} />;
      
      case 'campaigns':
        return (
          <CampaignList
            campaigns={campaigns}
            onView={handleViewCampaign}
            onEdit={handleEditCampaign}
            onDelete={handleDeleteCampaign}
          />
        );
      
      case 'analysis':
        return selectedCampaign ? (
          <AnalysisResults
            campaign={selectedCampaign}
            analysis={selectedCampaign.aiAnalysis}
          />
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">Select a campaign to view analysis</p>
          </div>
        );
      
      case 'ab-testing':
        return <ABTestModule />;
      
      case 'reports':
        return selectedCampaign ? (
          <PerformanceReport campaign={selectedCampaign} />
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">Select a campaign to view report</p>
          </div>
        );
      
      default:
        return <Dashboard campaigns={campaigns} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header 
        user={user}
        onLogout={handleLogout}
        onCreateCampaign={() => setShowCampaignForm(true)}
      />
      <div className="flex flex-1">
        <Sidebar 
          currentView={currentView}
          onViewChange={setCurrentView}
          campaignCount={campaigns.length}
        />
        <main className="flex-1 p-6 overflow-auto">
          {renderMainContent()}
        </main>
      </div>
    </div>
  );
}

export default App;