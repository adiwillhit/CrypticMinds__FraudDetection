import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText, AlertCircle, CheckCircle, Loader } from 'lucide-react';
import { useFraudDetection } from '../context/FraudDetectionContext';

const BatchAnalysis = () => {
  const { runBatchAnalysis, loading, error, batchResults } = useFraudDetection();
  const [sampleSize, setSampleSize] = useState('');
  const [uploadedFile, setUploadedFile] = useState(null);

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file && file.type === 'text/csv') {
      setUploadedFile(file);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv']
    },
    multiple: false
  });

  const handleAnalysis = async () => {
    if (!uploadedFile) return;
    
    try {
      const size = sampleSize ? parseInt(sampleSize) : null;
      await runBatchAnalysis(uploadedFile, size);
    } catch (error) {
      console.error('Analysis failed:', error);
    }
  };

  const getFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
          Batch Analysis
        </h1>
        <p className="text-base sm:text-lg text-gray-600 px-4">
          Upload a CSV file to perform bulk fraud detection analysis
        </p>
      </div>

      {/* File Upload */}
      <div className="card">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">Upload Dataset</h2>
        
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-6 sm:p-8 text-center cursor-pointer transition-colors duration-200 ${
            isDragActive
              ? 'border-primary-400 bg-primary-50'
              : 'border-gray-300 hover:border-primary-400 hover:bg-gray-50'
          }`}
        >
          <input {...getInputProps()} />
          <Upload className="h-8 w-8 sm:h-12 sm:w-12 text-gray-400 mx-auto mb-3 sm:mb-4" />
          {isDragActive ? (
            <p className="text-primary-600 font-medium text-sm sm:text-base">Drop the CSV file here...</p>
          ) : (
            <div>
              <p className="text-gray-600 mb-2 text-sm sm:text-base">
                Drag and drop a CSV file here, or click to select
              </p>
              <p className="text-xs sm:text-sm text-gray-500">
                Supports CSV files with transaction data (e.g., credit card transactions)
              </p>
            </div>
          )}
        </div>

        {/* File Info */}
        {uploadedFile && (
          <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center space-x-3">
              <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-green-900 text-sm sm:text-base truncate">{uploadedFile.name}</p>
                <p className="text-xs sm:text-sm text-green-700">
                  Size: {getFileSize(uploadedFile.size)}
                </p>
              </div>
              <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 flex-shrink-0" />
            </div>
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-danger-50 border border-danger-200 rounded-lg">
            <div className="flex items-center space-x-3">
              <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 text-danger-600 flex-shrink-0" />
              <p className="text-danger-800 text-sm sm:text-base">{error}</p>
            </div>
          </div>
        )}

        {/* Analysis Button */}
        <div className="mt-4 sm:mt-6">
          <button
            onClick={handleAnalysis}
            disabled={!uploadedFile || loading}
            className={`w-full py-3 px-4 rounded-lg font-medium transition-colors duration-200 ${
              !uploadedFile || loading
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'btn-primary'
            }`}
          >
            {loading ? (
              <div className="flex items-center justify-center space-x-2">
                <Loader className="h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
                <span className="text-sm sm:text-base">Analyzing...</span>
              </div>
            ) : (
              <span className="text-sm sm:text-base">Start Analysis</span>
            )}
          </button>
        </div>
      </div>

      {/* Results Preview */}
      {batchResults && (
        <div className="card">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">Analysis Results</h2>
          
          {/* Analysis Info */}
          <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-blue-900 text-sm sm:text-base">Analysis Completed</h3>
                <p className="text-blue-800 text-xs sm:text-sm">
                  File: {batchResults.fileName || 'Unknown'} | 
                  Timestamp: {new Date(batchResults.analysisTimestamp).toLocaleString()}
                </p>
              </div>
              <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0" />
            </div>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 mb-4 sm:mb-6">
            <div className="text-center p-3 sm:p-4 bg-blue-50 rounded-lg">
              <p className="text-lg sm:text-2xl font-bold text-blue-600">
                {batchResults.statistics?.totalTransactions || 0}
              </p>
              <p className="text-xs sm:text-sm text-gray-600">Total Transactions</p>
            </div>
            <div className="text-center p-3 sm:p-4 bg-danger-50 rounded-lg">
              <p className="text-lg sm:text-2xl font-bold text-danger-600">
                {batchResults.statistics?.fraudulentTransactions || 0}
              </p>
              <p className="text-xs sm:text-sm text-gray-600">Fraudulent</p>
            </div>
            <div className="text-center p-3 sm:p-4 bg-success-50 rounded-lg">
              <p className="text-lg sm:text-2xl font-bold text-success-600">
                {batchResults.statistics?.legitimateTransactions || 0}
              </p>
              <p className="text-xs sm:text-sm text-gray-600">Legitimate</p>
            </div>
            <div className="text-center p-3 sm:p-4 bg-warning-50 rounded-lg">
              <p className="text-lg sm:text-2xl font-bold text-warning-600">
                {((batchResults.statistics?.accuracy || 0) * 100).toFixed(2)}%
              </p>
              <p className="text-xs sm:text-sm text-gray-600">Accuracy</p>
            </div>
          </div>

          {/* Confusion Matrix Summary */}
          <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-3 text-sm sm:text-base">Confusion Matrix Summary</h3>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-lg font-bold text-success-600">{batchResults.statistics?.trueNegatives || 0}</p>
                <p className="text-xs text-gray-600">True Negatives</p>
              </div>
              <div>
                <p className="text-lg font-bold text-danger-600">{batchResults.statistics?.falsePositives || 0}</p>
                <p className="text-xs text-gray-600">False Positives</p>
              </div>
              <div>
                <p className="text-lg font-bold text-warning-600">{batchResults.statistics?.falseNegatives || 0}</p>
                <p className="text-xs text-gray-600">False Negatives</p>
              </div>
              <div>
                <p className="text-lg font-bold text-primary-600">{batchResults.statistics?.truePositives || 0}</p>
                <p className="text-xs text-gray-600">True Positives</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BatchAnalysis; 