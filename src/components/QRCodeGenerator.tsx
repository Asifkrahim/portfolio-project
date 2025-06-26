import React, { useState, useRef } from 'react';
import QRCode from 'qrcode';
import { Download, Copy, RefreshCw } from 'lucide-react';

const QRCodeGenerator: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [errorCorrectionLevel, setErrorCorrectionLevel] = useState<'L' | 'M' | 'Q' | 'H'>('M');
  const [size, setSize] = useState(300);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const generateQRCode = async () => {
    if (!inputText.trim()) return;
    
    setIsGenerating(true);
    try {
      const canvas = canvasRef.current;
      if (canvas) {
        await QRCode.toCanvas(canvas, inputText, {
          errorCorrectionLevel,
          width: size,
          margin: 2,
          color: {
            dark: '#10B981',
            light: '#1F2937'
          }
        });
        
        const dataUrl = canvas.toDataURL();
        setQrCodeUrl(dataUrl);
      }
    } catch (error) {
      console.error('Error generating QR code:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadQRCode = () => {
    if (qrCodeUrl) {
      const link = document.createElement('a');
      link.download = 'qrcode.png';
      link.href = qrCodeUrl;
      link.click();
    }
  };

  const copyToClipboard = async () => {
    if (qrCodeUrl) {
      try {
        const canvas = canvasRef.current;
        if (canvas) {
          canvas.toBlob(async (blob) => {
            if (blob) {
              await navigator.clipboard.write([
                new ClipboardItem({ 'image/png': blob })
              ]);
              alert('QR code copied to clipboard!');
            }
          });
        }
      } catch (error) {
        console.error('Error copying to clipboard:', error);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-emerald-400 mb-2">
              Enter Text or URL
            </label>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Enter text, URL, or any data to generate QR code..."
              className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/20 resize-none"
              rows={4}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-emerald-400 mb-2">
                Error Correction
              </label>
              <select
                value={errorCorrectionLevel}
                onChange={(e) => setErrorCorrectionLevel(e.target.value as 'L' | 'M' | 'Q' | 'H')}
                className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-emerald-400 focus:outline-none"
              >
                <option value="L">Low (7%)</option>
                <option value="M">Medium (15%)</option>
                <option value="Q">Quartile (25%)</option>
                <option value="H">High (30%)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-emerald-400 mb-2">
                Size (px)
              </label>
              <input
                type="range"
                min="150"
                max="500"
                step="50"
                value={size}
                onChange={(e) => setSize(Number(e.target.value))}
                className="w-full"
              />
              <div className="text-center text-gray-400 text-sm mt-1">{size}px</div>
            </div>
          </div>

          <button
            onClick={generateQRCode}
            disabled={!inputText.trim() || isGenerating}
            className="w-full px-6 py-3 bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="animate-spin" size={20} />
                Generating...
              </>
            ) : (
              'Generate QR Code'
            )}
          </button>
        </div>

        {/* QR Code Display */}
        <div className="flex flex-col items-center space-y-4">
          <div className="bg-gray-700 rounded-lg p-6 w-full flex justify-center">
            {qrCodeUrl ? (
              <canvas
                ref={canvasRef}
                className="max-w-full h-auto rounded-lg"
                style={{ imageRendering: 'pixelated' }}
              />
            ) : (
              <div className="w-64 h-64 bg-gray-600 rounded-lg flex items-center justify-center">
                <div className="text-gray-400 text-center">
                  <QRCode size={48} className="mx-auto mb-2" />
                  <p>QR Code will appear here</p>
                </div>
              </div>
            )}
          </div>

          {qrCodeUrl && (
            <div className="flex gap-3 w-full">
              <button
                onClick={downloadQRCode}
                className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors duration-300 flex items-center justify-center gap-2"
              >
                <Download size={16} />
                Download
              </button>
              <button
                onClick={copyToClipboard}
                className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors duration-300 flex items-center justify-center gap-2"
              >
                <Copy size={16} />
                Copy
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QRCodeGenerator;