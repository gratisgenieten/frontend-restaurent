
'use client';

import React, { useRef, useState, useEffect } from 'react';
import { FaQrcode } from 'react-icons/fa';
import jsQR from 'jsqr';

export default function QrScanner() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [scannedUrl, setScannedUrl] = useState<string | null>(null);
  const [showScanner, setShowScanner] = useState(false);

  useEffect(() => {
    let animationFrameId: number;
    const scan = () => {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      if (canvas && video) {
        const ctx = canvas.getContext('2d');
        if (ctx && video.readyState === video.HAVE_ENOUGH_DATA) {
          canvas.height = video.videoHeight;
          canvas.width = video.videoWidth;
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const code = jsQR(imageData.data, imageData.width, imageData.height);
          if (code?.data) {
            setScannedUrl(code.data);
            setShowScanner(false);
            const stream = video.srcObject as MediaStream;
            stream.getTracks().forEach((track) => track.stop());
          }
        }
      }
      animationFrameId = requestAnimationFrame(scan);
    };
    if (showScanner) {
      scan();
    }
    return () => cancelAnimationFrame(animationFrameId);
  }, [showScanner]);

  const handleOpenCamera = async () => {
    setShowScanner(true);
    const stream = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: { exact: 'environment' },
      },
    });
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
      videoRef.current.setAttribute('playsinline', 'true');
      videoRef.current.play();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <button
        onClick={handleOpenCamera}
        className="flex items-center gap-2 px-4 py-2 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
      >
        <FaQrcode /> Scan QR Code
      </button>

      {scannedUrl && (
        <a
          href={scannedUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline text-sm"
        >
          Open Scanned Link
        </a>
      )}

      {showScanner && (
        <div className="w-full max-w-md rounded-xl overflow-hidden border border-gray-300 dark:border-gray-600">
          <video ref={videoRef} className="w-full h-64 object-cover" />
          <canvas ref={canvasRef} className="hidden" />
        </div>
      )}
    </div>
  );
}
