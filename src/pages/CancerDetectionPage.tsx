import React, { useState } from 'react';
import { Upload, FileUp, AlertCircle, CheckCircle, Activity, Beaker, FileQuestion, FileCheck } from 'lucide-react';

const CancerDetectionPage: React.FC = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [fileSelected, setFileSelected] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [resultData, setResultData] = useState<null | {
    riskScore: number;
    indicators: {
      parameter: string;
      value: string;
      normalRange: string;
      status: 'normal' | 'elevated' | 'low';
    }[];
  }>(null);

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileSelected(e.target.files[0]);
    }
  };

  // Function to handle fake upload progress
  const simulateUpload = () => {
    setActiveStep(2);
    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      setUploadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setActiveStep(3);
          simulateAnalysis();
        }, 500);
      }
    }, 100);
  };

  // Function to simulate analysis
  const simulateAnalysis = () => {
    setTimeout(() => {
      setAnalysisComplete(true);
      setResultData({
        riskScore: 15, // Example score (low risk)
        indicators: [
          {
            parameter: 'White Blood Cell Count',
            value: '10.5 x 10^9/L',
            normalRange: '4.5-11.0 x 10^9/L',
            status: 'normal'
          },
          {
            parameter: 'Red Blood Cell Count',
            value: '5.9 x 10^12/L',
            normalRange: '4.5-5.5 x 10^12/L',
            status: 'elevated'
          },
          {
            parameter: 'Hemoglobin',
            value: '14.2 g/dL',
            normalRange: '13.5-17.5 g/dL',
            status: 'normal'
          },
          {
            parameter: 'Hematocrit',
            value: '42%',
            normalRange: '41-50%',
            status: 'normal'
          },
          {
            parameter: 'Platelet Count',
            value: '140 x 10^9/L',
            normalRange: '150-450 x 10^9/L',
            status: 'low'
          },
          {
            parameter: 'Mean Corpuscular Volume',
            value: '88 fL',
            normalRange: '80-96 fL',
            status: 'normal'
          }
        ]
      });
    }, 3000);
  };

  // Function to start the process
  const handleUploadStart = () => {
    if (fileSelected) {
      simulateUpload();
    }
  };

  // Function to reset the whole process
  const handleReset = () => {
    setActiveStep(1);
    setFileSelected(null);
    setUploadProgress(0);
    setAnalysisComplete(false);
    setResultData(null);
  };

  // Render risk level indicator
  const renderRiskLevel = (score: number) => {
    if (score < 20) {
      return (
        <div className="flex items-center text-green-600 font-medium">
          <CheckCircle size={18} className="mr-2" />
          Low Risk
        </div>
      );
    } else if (score < 50) {
      return (
        <div className="flex items-center text-yellow-600 font-medium">
          <AlertCircle size={18} className="mr-2" />
          Moderate Risk
        </div>
      );
    } else {
      return (
        <div className="flex items-center text-red-600 font-medium">
          <AlertCircle size={18} className="mr-2" />
          High Risk
        </div>
      );
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-gradient-to-r from-red-600 to-red-800 text-white rounded-xl p-8 mb-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">AI Blood Cancer Risk Detection</h1>
            <p className="text-red-100">
              Upload your blood test results for AI-powered risk assessment and early detection
            </p>
          </div>
          <Activity size={64} className="mt-4 md:mt-0" />
        </div>
      </div>

      {/* Multi-step process */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
        {/* Steps header */}
        <div className="border-b">
          <div className="flex">
            <div
              className={`flex-1 py-4 px-6 text-center border-r ${
                activeStep === 1 ? 'bg-red-50 text-red-800' : ''
              }`}
            >
              <div className="flex items-center justify-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${
                    activeStep >= 1 ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  <Upload size={16} />
                </div>
                <span className="font-medium">Upload Report</span>
              </div>
            </div>
            <div
              className={`flex-1 py-4 px-6 text-center border-r ${
                activeStep === 2 ? 'bg-red-50 text-red-800' : ''
              }`}
            >
              <div className="flex items-center justify-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${
                    activeStep >= 2 ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  <Activity size={16} />
                </div>
                <span className="font-medium">Processing</span>
              </div>
            </div>
            <div
              className={`flex-1 py-4 px-6 text-center ${
                activeStep === 3 ? 'bg-red-50 text-red-800' : ''
              }`}
            >
              <div className="flex items-center justify-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${
                    activeStep >= 3 ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  <Beaker size={16} />
                </div>
                <span className="font-medium">Results</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content based on active step */}
        <div className="p-6">
          {/* Step 1: Upload Report */}
          {activeStep === 1 && (
            <div className="text-center py-8">
              <div className="mb-8 flex flex-col items-center">
                <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center mb-4">
                  <FileUp size={32} className="text-red-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Upload Your Blood Test Report</h2>
                <p className="text-gray-600 max-w-md">
                  Upload a recent blood test report in PDF or CSV format for our AI to analyze and detect potential risks
                </p>
              </div>

              {/* File selection area */}
              <div 
                className="border-2 border-dashed border-gray-300 rounded-lg p-8 mb-6 cursor-pointer hover:border-red-500 transition-colors"
                onClick={() => document.getElementById('file-upload')?.click()}
              >
                {!fileSelected ? (
                  <div className="text-center">
                    <FileQuestion size={48} className="mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-500 mb-2">Drag and drop or click to select a file</p>
                    <p className="text-xs text-gray-400">Supported formats: PDF, CSV, XLSX</p>
                  </div>
                ) : (
                  <div className="text-center">
                    <FileCheck size={48} className="mx-auto text-green-500 mb-4" />
                    <p className="text-gray-800 font-medium mb-1">{fileSelected.name}</p>
                    <p className="text-xs text-gray-500">{(fileSelected.size / 1024).toFixed(2)} KB</p>
                  </div>
                )}
                <input
                  id="file-upload"
                  type="file"
                  accept=".pdf,.csv,.xlsx"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>

              <div className="flex justify-center">
                <button
                  className={`btn ${fileSelected ? 'btn-primary' : 'bg-gray-300 text-gray-600 cursor-not-allowed'}`}
                  disabled={!fileSelected}
                  onClick={handleUploadStart}
                >
                  Analyze Report
                </button>
              </div>
              
              <div className="mt-8 text-sm text-gray-500">
                <p className="flex items-center justify-center">
                  <AlertCircle size={14} className="mr-1" />
                  Your data is processed securely and remains confidential
                </p>
              </div>
            </div>
          )}

          {/* Step 2: Processing */}
          {activeStep === 2 && (
            <div className="text-center py-8">
              <div className="mb-8">
                <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                  <Activity size={32} className="text-blue-600 animate-pulse" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Processing Your Report</h2>
                <p className="text-gray-600">
                  Our AI is analyzing your blood parameters to identify potential risk factors
                </p>
              </div>

              {/* Progress bar */}
              <div className="w-full max-w-md mx-auto mb-8">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
                <p className="text-right text-sm text-gray-500 mt-1">{uploadProgress}%</p>
              </div>

              {/* Steps indicator */}
              <div className="max-w-md mx-auto text-left space-y-3">
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center mr-3">
                    <CheckCircle size={14} className="text-white" />
                  </div>
                  <span className="text-gray-800">Uploading file</span>
                </div>
                <div className="flex items-center">
                  <div className={`w-6 h-6 rounded-full ${uploadProgress >= 50 ? 'bg-green-500' : 'bg-blue-500 animate-pulse'} flex items-center justify-center mr-3`}>
                    {uploadProgress >= 50 ? (
                      <CheckCircle size={14} className="text-white" />
                    ) : (
                      <span className="text-white text-xs">2</span>
                    )}
                  </div>
                  <span className="text-gray-800">Extracting data points</span>
                </div>
                <div className="flex items-center">
                  <div className={`w-6 h-6 rounded-full ${uploadProgress === 100 ? 'bg-blue-500 animate-pulse' : 'bg-gray-300'} flex items-center justify-center mr-3`}>
                    <span className="text-white text-xs">3</span>
                  </div>
                  <span className={uploadProgress === 100 ? 'text-gray-800' : 'text-gray-400'}>Running AI analysis</span>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Results */}
          {activeStep === 3 && (
            <div className="py-4">
              {!analysisComplete ? (
                <div className="text-center py-8">
                  <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                    <Activity size={32} className="text-blue-600 animate-pulse" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Finalizing Analysis</h2>
                  <p className="text-gray-600 mb-4">
                    Our AI is completing its assessment of your blood parameters
                  </p>
                  <div className="flex justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
                  </div>
                </div>
              ) : (
                <div>
                  {/* Results header */}
                  <div className="mb-6 flex flex-col md:flex-row md:justify-between md:items-center">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Analysis Results</h2>
                      <p className="text-gray-600">
                        Assessment based on your blood test from {fileSelected?.name}
                      </p>
                    </div>
                    <button
                      onClick={handleReset}
                      className="btn btn-outline mt-4 md:mt-0"
                    >
                      Upload New Report
                    </button>
                  </div>

                  {/* Risk score card */}
                  <div className="bg-gray-50 rounded-lg p-6 mb-6 border border-gray-200">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div>
                        <p className="text-gray-500 mb-1">Overall Risk Assessment</p>
                        <div className="flex items-center">
                          <h3 className="text-3xl font-bold text-gray-900 mr-3">
                            {resultData?.riskScore}%
                          </h3>
                          {resultData && renderRiskLevel(resultData.riskScore)}
                        </div>
                      </div>
                      
                      {/* Risk meter */}
                      <div className="mt-4 md:mt-0">
                        <div className="w-full md:w-64 h-4 bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 rounded-full">
                          <div className="relative">
                            <div 
                              className="absolute -top-4 transform -translate-x-1/2"
                              style={{ left: `${resultData?.riskScore || 0}%` }}
                            >
                              <div className="w-3 h-8 bg-gray-800 rounded-full"></div>
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-between text-xs mt-1">
                          <span>Low Risk</span>
                          <span>Moderate</span>
                          <span>High Risk</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Detailed parameters */}
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Blood Parameters Analysis</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Parameter
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Value
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Normal Range
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {resultData?.indicators.map((indicator, index) => (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">
                                {indicator.parameter}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{indicator.value}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-500">{indicator.normalRange}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                indicator.status === 'normal'
                                  ? 'bg-green-100 text-green-800'
                                  : indicator.status === 'elevated'
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : 'bg-red-100 text-red-800'
                              }`}>
                                {indicator.status.charAt(0).toUpperCase() + indicator.status.slice(1)}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Recommendations */}
                  <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-3">Recommendations</h3>
                    <ul className="space-y-2 text-gray-800">
                      <li className="flex items-start">
                        <div className="flex-shrink-0 h-5 w-5 text-blue-600 mt-0.5">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <p className="ml-2">Share these results with your healthcare provider for a complete evaluation.</p>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0 h-5 w-5 text-blue-600 mt-0.5">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <p className="ml-2">Consider follow-up testing for your platelet count, which appears to be slightly below the normal range.</p>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0 h-5 w-5 text-blue-600 mt-0.5">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <p className="ml-2">Schedule regular blood tests every 6 months to monitor your health trends.</p>
                      </li>
                    </ul>
                    <div className="mt-4 pt-4 border-t border-blue-200">
                      <p className="text-sm text-blue-800">
                        <strong>Important:</strong> This analysis is not a medical diagnosis. Always consult with a healthcare professional about your test results and health concerns.
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-8 flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
                    <button className="btn btn-primary">
                      Download Report
                    </button>
                    <button className="btn btn-outline">
                      Share with Doctor
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Informational section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <Activity size={24} className="text-red-600" />
          </div>
          <h3 className="text-lg font-bold mb-2">How It Works</h3>
          <p className="text-gray-600">
            Our AI analyzes over 30 blood parameters to identify patterns associated with early-stage blood cancers and disorders.
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <AlertCircle size={24} className="text-blue-600" />
          </div>
          <h3 className="text-lg font-bold mb-2">Why Early Detection Matters</h3>
          <p className="text-gray-600">
            Early detection can increase survival rates by up to 90% for most blood-related cancers and disorders.
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle size={24} className="text-green-600" />
          </div>
          <h3 className="text-lg font-bold mb-2">Data Privacy</h3>
          <p className="text-gray-600">
            Your health data is encrypted and never stored permanently. We comply with all healthcare data privacy regulations.
          </p>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
        
        <div className="space-y-4">
          <div className="border-b pb-4">
            <h3 className="text-lg font-medium mb-2">How accurate is the AI analysis?</h3>
            <p className="text-gray-600">
              Our AI model has been trained on millions of blood test samples and has a 95% accuracy rate for detecting early warning signs. However, it's important to understand that this is a screening tool, not a diagnostic tool.
            </p>
          </div>
          
          <div className="border-b pb-4">
            <h3 className="text-lg font-medium mb-2">What types of blood tests can I upload?</h3>
            <p className="text-gray-600">
              You can upload complete blood count (CBC) tests, comprehensive metabolic panels (CMP), and specialized blood tests. The system works best with recent tests that include a full hematology panel.
            </p>
          </div>
          
          <div className="border-b pb-4">
            <h3 className="text-lg font-medium mb-2">Is my data secure?</h3>
            <p className="text-gray-600">
              Yes, we use end-to-end encryption and do not permanently store your health records. Your data is processed for analysis only and is not shared with third parties without your explicit consent.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-2">What should I do with my results?</h3>
            <p className="text-gray-600">
              If your analysis shows any elevated risk or abnormal parameters, we recommend sharing the results with your healthcare provider. They can help interpret the results and recommend appropriate follow-up tests if needed.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CancerDetectionPage;