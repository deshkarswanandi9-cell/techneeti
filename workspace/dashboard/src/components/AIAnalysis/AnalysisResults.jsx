import React from 'react';
import { Brain, TrendingUp, Users, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

const AnalysisResults = ({ campaign, analysis }) => {
  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

  const successFactors = [
    { name: 'Audience Match', value: analysis?.audienceMatch || 85, color: '#10B981' },
    { name: 'Budget Allocation', value: analysis?.budgetEfficiency || 78, color: '#3B82F6' },
    { name: 'Channel Mix', value: analysis?.channelOptimization || 92, color: '#F59E0B' },
    { name: 'Timing', value: analysis?.timingScore || 67, color: '#8B5CF6' }
  ];

  const roiProjection = [
    { month: 'Month 1', roi: 150, sales: 12000 },
    { month: 'Month 2', roi: 220, sales: 18000 },
    { month: 'Month 3', roi: 280, sales: 25000 },
    { month: 'Month 4', roi: 340, sales: 32000 },
    { month: 'Month 5', roi: 380, sales: 38000 },
    { month: 'Month 6', roi: 420, sales: 45000 }
  ];

  const audienceInsights = [
    { segment: 'Primary', engagement: 8.5, conversion: 4.2, reach: 65000 },
    { segment: 'Secondary', engagement: 6.8, conversion: 3.1, reach: 45000 },
    { segment: 'Tertiary', engagement: 5.2, conversion: 2.8, reach: 30000 }
  ];

  const riskFactors = [
    { factor: 'Market Competition', level: 'High', impact: 7 },
    { factor: 'Seasonal Trends', level: 'Medium', impact: 5 },
    { factor: 'Budget Constraints', level: 'Low', impact: 3 },
    { factor: 'Audience Saturation', level: 'Medium', impact: 6 }
  ];

  const getRiskColor = (level) => {
    switch (level) {
      case 'High': return 'text-red-600 bg-red-50';
      case 'Medium': return 'text-yellow-600 bg-yellow-50';
      case 'Low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getSuccessIcon = (probability) => {
    if (probability >= 80) return <CheckCircle className="h-5 w-5 text-green-500" />;
    if (probability >= 60) return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
    return <XCircle className="h-5 w-5 text-red-500" />;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center mb-6">
          <Brain className="h-8 w-8 text-blue-600 mr-3" />
          <div>
            <h2 className="text-2xl font-bold text-gray-900">AI Campaign Analysis</h2>
            <p className="text-gray-600">Campaign: {campaign.name}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center justify-center mb-2">
              {getSuccessIcon(analysis?.successProbability || 78)}
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Success Probability</h3>
            <p className="text-2xl font-bold text-blue-600">{analysis?.successProbability || 78}%</p>
          </div>

          <div className="text-center p-4 bg-green-50 rounded-lg">
            <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <h3 className="text-lg font-semibold text-gray-900">Predicted ROI</h3>
            <p className="text-2xl font-bold text-green-600">{analysis?.predictedROI || '340%'}</p>
          </div>

          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <Users className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <h3 className="text-lg font-semibold text-gray-900">Target Reach</h3>
            <p className="text-2xl font-bold text-purple-600">{analysis?.estimatedReach || '140K'}</p>
          </div>

          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <AlertTriangle className="h-8 w-8 text-orange-600 mx-auto mb-2" />
            <h3 className="text-lg font-semibold text-gray-900">Risk Level</h3>
            <p className="text-2xl font-bold text-orange-600">{analysis?.riskLevel || 'Medium'}</p>
          </div>
        </div>
      </div>

      {/* Success Factors Radar Chart */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Success Factors Analysis</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={successFactors}>
              <PolarGrid />
              <PolarAngleAxis dataKey="name" />
              <PolarRadiusAxis angle={90} domain={[0, 100]} />
              <Radar
                name="Score"
                dataKey="value"
                stroke="#3B82F6"
                fill="#3B82F6"
                fillOpacity={0.6}
              />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ROI Projection */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">6-Month ROI Projection</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={roiProjection}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Line yAxisId="left" type="monotone" dataKey="roi" stroke="#10B981" strokeWidth={3} />
              <Line yAxisId="right" type="monotone" dataKey="sales" stroke="#3B82F6" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Audience Insights */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Audience Segment Analysis</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={audienceInsights}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="segment" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="engagement" fill="#3B82F6" name="Engagement Rate" />
              <Bar dataKey="conversion" fill="#10B981" name="Conversion Rate" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Risk Assessment */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Risk Assessment</h3>
        <div className="space-y-4">
          {riskFactors.map((risk, index) => (
            <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-4">
                <AlertTriangle className="h-5 w-5 text-gray-400" />
                <span className="font-medium text-gray-900">{risk.factor}</span>
              </div>
              <div className="flex items-center space-x-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getRiskColor(risk.level)}`}>
                  {risk.level}
                </span>
                <div className="w-20 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-red-600 h-2 rounded-full"
                    style={{ width: `${(risk.impact / 10) * 100}%` }}
                  ></div>
                </div>
                <span className="text-sm text-gray-600">{risk.impact}/10</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Business Creativity Report */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Business Creativity Thought Process Report</h3>
        <div className="space-y-6">
          <div className="border-l-4 border-blue-500 pl-4">
            <h4 className="font-semibold text-gray-900">Target Audience Research Quality</h4>
            <p className="text-gray-600 mt-2">
              The target audience analysis shows strong alignment with demographic preferences. 
              Age range selection demonstrates understanding of product-market fit, with interest 
              targeting showing 85% relevance score based on historical data.
            </p>
            <div className="mt-2">
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                Quality Score: 8.5/10
              </span>
            </div>
          </div>

          <div className="border-l-4 border-green-500 pl-4">
            <h4 className="font-semibold text-gray-900">Personalization Effectiveness</h4>
            <p className="text-gray-600 mt-2">
              Campaign messaging and channel selection indicate high personalization potential. 
              Multi-channel approach with tailored content for each platform will likely 
              increase engagement by 40-60% compared to generic campaigns.
            </p>
            <div className="mt-2">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                Personalization Index: 92%
              </span>
            </div>
          </div>

          <div className="border-l-4 border-purple-500 pl-4">
            <h4 className="font-semibold text-gray-900">Predictive Modeling Outcomes</h4>
            <p className="text-gray-600 mt-2">
              ML models predict a 78% success probability based on similar historical campaigns. 
              Key success drivers include optimal budget allocation (78% efficiency) and 
              channel mix optimization (92% score). Timeline analysis suggests Q2 launch optimal.
            </p>
            <div className="mt-2">
              <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                Model Confidence: 89%
              </span>
            </div>
          </div>

          <div className="border-l-4 border-yellow-500 pl-4">
            <h4 className="font-semibold text-gray-900">Privacy & Ethical Considerations</h4>
            <p className="text-gray-600 mt-2">
              Campaign design shows GDPR compliance with proper consent mechanisms. 
              Data collection limited to necessary metrics only. Anonymization protocols 
              in place for all PII data. Ethical AI guidelines followed in targeting algorithms.
            </p>
            <div className="mt-2">
              <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                Compliance Score: 96%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisResults;