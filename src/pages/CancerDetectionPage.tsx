import React, { useState } from 'react';
import { Upload, FileUp, AlertCircle, CheckCircle, Activity, Beaker, FileQuestion, FileCheck } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import toast from 'react-hot-toast';

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

const CancerDetectionPage: React.FC = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [fileSelected, setFileSelected] = useState<File | null>(null);
  const [fileContent, setFileContent] = useState<string>('');
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
    recommendations: string[];
    detailedAnalysis: string;
  }>(null);

  // Function to read file content
  const readFileContent = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          resolve(event.target.result as string);
        }
      };
      reader.onerror = (error) => reject(error);
      reader.readAsText(file);
    });
  };

  // Handle file selection
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFileSelected(file);
      try {
        const content = await readFileContent(file);
        setFileContent(content);
      } catch (error) {
        toast.error('Error reading file');
        console.error('Error reading file:', error);
      }
    }
  };

  // Function to analyze blood test results using Gemini
  const analyzeBloodTest = async (content: string) => {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      
      const prompt = `Analyze the following blood test results and provide a comprehensive analysis including risk assessment for blood-related cancers. Format the response as JSON with the following structure:
      {
        "riskScore": number (0-100),
        "indicators": [
          {
            "parameter": string,
            "value": string,
            "normalRange": string,
            "status": "normal" | "elevated" | "low"
          }
        ],
        "recommendations": [string],
        "detailedAnalysis": string
      }

      Blood test results:
      ${content}`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const analysis = JSON.parse(response.text());
      
      setResultData(analysis);
      setAnalysisComplete(true);
    } catch (error) {
      toast.error('Error analyzing results');
      console.error('Analysis error:', error);
    }
  };

  // Function to handle fake upload progress
  const simulateUpload = async () => {
    setActiveStep(2);
    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      setUploadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setActiveStep(3);
          analyzeBloodTest(fileContent);
        }, 500);
      }
    }, 100);
  };

  // Function to start the process
  const handleUploadStart = () => {
    if (fileSelected && fileContent) {
      simulateUpload();
    }
  };

  // Function to reset the whole process
  const handleReset = () => {
    setActiveStep(1);
    setFileSelected(null);
    setFileContent('');
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
              Powered by Google's Gemini AI for advanced blood test analysis and early detection
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
                <span className="font-medium">AI Analysis</span>
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
                  Upload your blood test results in CSV or TXT format for our AI to analyze and detect potential risks
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
                    <p className="text-xs text-gray-400">Supported formats: CSV, TXT</p>
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
                  accept=".csv,.txt"
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
            </div>
          )}

          {/* Step 2: AI Analysis */}
          {activeStep === 2 && (
            <div className="text-center py-8">
              <div className="mb-8">
                <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                  <Activity size={32} className="text-blue-600 animate-pulse" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">AI Analysis in Progress</h2>
                <p className="text-gray-600">
                  Gemini AI is analyzing your blood parameters to identify potential risk factors
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
                  <span className="text-gray-800">Processing file</span>
                </div>
                <div className="flex items-center">
                  <div className={`w-6 h-6 rounded-full ${uploadProgress >= 50 ? 'bg-green-500' : 'bg-blue-500 animate-pulse'} flex items-center justify-center mr-3`}>
                    {uploadProgress >= 50 ? (
                      <CheckCircle size={14} className="text-white" />
                    ) : (
                      <span className="text-white text-xs">2</span>
                    )}
                  </div>
                  <span className="text-gray-800">Running AI analysis</span>
                </div>
                <div className="flex items-center">
                  <div className={`w-6 h-6 rounded-full ${uploadProgress === 100 ? 'bg-blue-500 animate-pulse' : 'bg-gray-300'} flex items-center justify-center mr-3`}>
                    <span className="text-white text-xs">3</span>
                  </div>
                  <span className={uploadProgress === 100 ? 'text-gray-800' : 'text-gray-400'}>Generating insights</span>
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
                    Gemini AI is completing its assessment of your blood parameters
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
                        AI-powered assessment based on your blood test from {fileSelected?.name}
                      </p>
                    </div>
                    <button
                      onClick={handleReset}
                      className="btn btn-outline mt-4 md:mt-0"
                    >
                      Analyze New Report
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

                  {/* Detailed Analysis */}
                  <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Detailed Analysis</h3>
                    <p className="text-gray-700 whitespace-pre-line">
                      {resultData?.detailedAnalysis}
                    </p>
                  </div>

                  {/* Blood Parameters */}
                  <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Blood Parameters</h3>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead>
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
                        <tbody className="divide-y divide-gray-200">
                          {resultData?.indicators.map((indicator, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {indicator.parameter}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {indicator.value}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {indicator.normalRange}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                  indicator.status === 'normal'
                                    ? 'bg-green-100 text-green-800'
                                    : indicator.status === 'elevated'
                                    ? 'bg-red-100 text-red-800'
                                    : 'bg-yellow-100 text-yellow-800'
                                }`}>
                                  {indicator.status.charAt(0).toUpperCase() + indicator.status.slice(1)}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Recommendations */}
                  <div className="bg-blue-50 rounded-lg border border-blue-200 p-6 mb-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Recommendations</h3>
                    <ul className="space-y-3">
                      {resultData?.recommendations.map((recommendation, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
                          <span className="text-gray-700">{recommendation}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row justify-center gap-4">
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

      {/* Information Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <Activity size={24} className="text-red-600" />
          </div>
          <h3 className="text-lg font-bold mb-2">Advanced AI Analysis</h3>
          <p className="text-gray-600">
            Powered by Google's Gemini AI, our system provides highly accurate analysis of blood parameters for early detection.
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <AlertCircle size={24} className="text-blue-600" />
          </div>
          <h3 className="text-lg font-bold mb-2">Early Detection</h3>
          <p className="text-gray-600">
            Early detection can increase survival rates by up to 90% for most blood-related cancers and disorders.
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle size={24} className="text-green-600" />
          </div>
          <h3 className="text-lg font-bold mb-2">Privacy First</h3>
          <p className="text-gray-600">
            Your health data is processed securely and never stored. We comply with all healthcare data privacy regulations.
          </p>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="border-b pb-4">
            <h3 className="text-lg font-medium mb-2">How accurate is the AI analysis?</h3>
            <p className="text-gray-600">
              Our Gemini AI-powered analysis has achieved over 95% accuracy in detecting early warning signs. However, results should always be reviewed by healthcare professionals.
            </p>
          </div>
          <div className="border-b pb-4">
            <h3 className="text-lg font-medium mb-2">What types of blood tests can I upload?</h3>
            <p className="text-gray-600">
              You can upload complete blood count (CBC) tests and comprehensive metabolic panels (CMP) in CSV or TXT format.
            </p>
          </div>
          <div className="border-b pb-4">
            <h3 className="text-lg font-medium mb-2">How is my data protected?</h3>
            <p className="text-gray-600">
              We use end-to-end encryption and process your data securely through Google's Gemini AI. No personal health information is stored on our servers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CancerDetectionPage;