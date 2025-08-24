import React, { useEffect, useState } from 'react';
import { QrCode, Download } from 'lucide-react';

interface QRCodeDisplayProps {
  profileId: string;
  profileName: string;
}

export const QRCodeDisplay: React.FC<QRCodeDisplayProps> = ({ profileId, profileName }) => {
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const reviewUrl = `${window.location.origin}/review/${profileId}`;

  useEffect(() => {
    const generateQRCode = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/qrcode/${profileId}`);
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setQrCodeUrl(url);
      } catch (error) {
        console.error('Error generating QR code:', error);
      }
    };

    generateQRCode();

    return () => {
      if (qrCodeUrl) {
        URL.revokeObjectURL(qrCodeUrl);
      }
    };
  }, [profileId]);

  const downloadQRCode = () => {
    if (qrCodeUrl) {
      const link = document.createElement('a');
      link.href = qrCodeUrl;
      link.download = `${profileName}-review-qr.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-md border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <QrCode className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-800">Review QR Code</h3>
        </div>
        {qrCodeUrl && (
          <button
            onClick={downloadQRCode}
            className="flex items-center gap-2 px-3 py-1.5 text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-md transition-colors"
          >
            <Download className="w-4 h-4" />
            Download
          </button>
        )}
      </div>
      
      <div className="text-center">
        {qrCodeUrl ? (
          <div className="inline-block p-4 bg-white border border-gray-200 rounded-lg">
            <img 
              src={qrCodeUrl} 
              alt={`QR Code for ${profileName}'s reviews`}
              className="w-48 h-48 mx-auto"
            />
          </div>
        ) : (
          <div className="w-48 h-48 mx-auto bg-gray-100 rounded-lg flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        )}
        
        <p className="text-sm text-gray-600 mt-4">
          Scan this QR code to leave a review for {profileName}
        </p>
        <p className="text-xs text-gray-500 mt-2 break-all">
          {reviewUrl}
        </p>
      </div>
    </div>
  );
};