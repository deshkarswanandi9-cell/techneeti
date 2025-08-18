import React, { useState } from 'react';
import { Upload, Play, BarChart3, TrendingUp, Users, Eye } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const ABTestModule = () => {
  const [testData, setTestData] = useState({
    variantA: null,
    variantB: null,
    isRunning: false,
    results: null
  });

  const [simulationResults] = useState({
    summary: {
      winner: 'Variant B',
      confidenceLevel: 95,
      improvement: 23.5,
      sampleSize: 10000
    },
    metrics: [
      { name: 'Click Rate', variantA: 3.2, variantB: 4.1 },
      { name: 'Conversion', variantA: 2.1, variantB: 2.6 },
      { name: 'Engagement', variantA: 5.8, variantB: 7.2 },
      { name: 'Bounce Rate', variantA: 45.2, variantB: 38.7 }
    ],
    trafficSplit: [
      { name: 'Variant A', value: 5000, fill: '#3B82F6' },
      { name: 'Variant B', value: 5000, fill: '#10B981' }
    ]
  });

  const handleFileUpload = (variant, files) => {
    setTestData(prev => ({
      ...prev,
      [variant]: {
        name: files[0].name,
        size: files[0].size,
        type: files[0].type,
        uploadedAt: new Date()
      }
    }));
  };

  const runSimulation = () => {
    setTestData(prev => ({ ...prev, isRunning: true }));
    
    // Simulate API call
    setTimeout(() => {
      setTestData(prev => ({
        ...prev,
        isRunning: false,
        results: simulationResults
      }));
    }, 3000);
  };

  const UploadZone = ({ variant, data }) => (
    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
      <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
      <h3 className="text-lg font-medium text-gray-900 mb-2">Upload {variant}</h3>
      
      {data ? (
        <div className="bg-green-50 p-4 rounded-lg">
          <p className="text-green-800 font-medium">{data.name}</p>
          <p className="text-green-600 text-sm">{(data.size / 1024).toFixed(1)} KB</p>
          <p className="text-green-600 text-sm">Uploaded: {data.uploadedAt.toLocaleString()}</p>
        </div>
      ) : (
        <>
          <p className="text-gray-600 mb-4">Drop your campaign files here or click to browse</p>
          <input
            type="file"
            multiple
            accept=".jpg,.jpeg,.png,.gif,.mp4,.mov,.pdf,.html"
            onChange={(e) => handleFileUpload(variant, e.target.files)}
            className="hidden"
            id={`upload-${variant}`}
          />
          <label
            htmlFor={`upload-${variant}`}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 cursor-pointer"
          >
            Choose Files
          </label>
          <p className="text-xs text-gray-500 mt-2">
            Supports: Images, Videos, PDFs, HTML files
          </p>
        </>
      )}
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">A/B Testing Module</h2>
            <p className="text-gray-600">Upload two campaign variations and run AI-driven simulations</p>
          </div>
          <BarChart3 className="h-8 w-8 text-blue-600" />
        </div>

        {/* Upload Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <UploadZone variant="Variant A" data={testData.variantA} />
          <UploadZone variant="Variant B" data={testData.variantB} />
        </div>

        {/* Control Panel */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Test Configuration</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Traffic Split
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
                <option>50/50 Split</option>
                <option>60/40 Split</option>
                <option>70/30 Split</option>
                <option>80/20 Split</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Test Duration
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
                <option>1 Week</option>
                <option>2 Weeks</option>
                <option>1 Month</option>
                <option>Custom</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sample Size
              </label>
              <input
                type="number"
                placeholder="10000"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <button
            onClick={runSimulation}
            disabled={!testData.variantA || !testData.variantB || testData.isRunning}
            className="w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {testData.isRunning ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Running AI Simulation...
              </>
            ) : (
              <>
                <Play className="h-5 w-5 mr-2" />
                Run A/B Test Simulation
              </>
            )}
          </button>
        </div>
      </div>

      {/* Results Section */}
      {testData.results && (
        <div className="space-y-6">
          {/* Summary */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Test Results Summary</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <h4 className="font-semibold text-gray-900">Winner</h4>
                <p className="text-2xl font-bold text-green-600">{testData.results.summary.winner}</p>
              </div>

              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <BarChart3 className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <h4 className="font-semibold text-gray-900">Confidence</h4>
                <p className="text-2xl font-bold text-blue-600">{testData.results.summary.confidenceLevel}%</p>
              </div>

              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <TrendingUp className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <h4 className="font-semibold text-gray-900">Improvement</h4>
                <p className="text-2xl font-bold text-purple-600">+{testData.results.summary.improvement}%</p>
              </div>

              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <Users className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                <h4 className="font-semibold text-gray-900">Sample Size</h4>
                <p className="text-2xl font-bold text-orange-600">{testData.results.summary.sampleSize.toLocaleString()}</p>
              </div>
            </div>
          </div>

          {/* Metrics Comparison */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Metrics Comparison</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={testData.results.metrics}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="variantA" fill="#3B82F6" name="Variant A" />
                  <Bar dataKey="variantB" fill="#10B981" name="Variant B" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Traffic Distribution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Traffic Distribution</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={testData.results.trafficSplit}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}`}
                    >
                      {testData.results.trafficSplit.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Insights</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <p className="text-gray-700">
                    <strong>Variant B</strong> shows significantly higher engagement rates, 
                    particularly in the 25-35 age demographic.
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <p className="text-gray-700">
                    Conversion rates improved by <strong>23.5%</strong> with the updated 
                    call-to-action design in Variant B.
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                  <p className="text-gray-700">
                    Statistical significance achieved with <strong>95% confidence</strong>. 
                    Recommend full rollout of Variant B.
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                  <p className="text-gray-700">
                    Mobile performance notably better in Variant B, with 
                    <strong>18% lower bounce rate</strong>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ABTestModule;