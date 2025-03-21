import React, { useState } from 'react';
import { downloadEmployeeDataAsPDF } from '../../utils/pdfUtils';

const DownloadPDFButton = ({ epfNumber }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const handleDownload = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      await downloadEmployeeDataAsPDF(epfNumber);
      // Success notification could be added here
    } catch (error) {
      setError(error.message || "Failed to download PDF");
      console.error("Download error:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div>
      <button 
        onClick={handleDownload}
        disabled={isLoading}
        className="pdf-download-btn"
        style={{
          padding: '10px 15px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: isLoading ? 'not-allowed' : 'pointer',
          opacity: isLoading ? 0.7 : 1
        }}
      >
        {isLoading ? 'Generating PDF...' : 'Download as PDF'}
      </button>
      
      {error && (
        <div style={{ color: 'red', marginTop: '10px' }}>
          {error}
        </div>
      )}
    </div>
  );
};

export default DownloadPDFButton;