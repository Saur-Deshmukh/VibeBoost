import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';

function WebcamCapture({ setInputImage }) {
  const webcamRef = useRef(null);
  const [isWebcamActive, setIsWebcamActive] = useState(true);

  const capture = React.useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        setInputImage(imageSrc);
        console.log('Captured Image:', imageSrc);
        setIsWebcamActive(false); 
      } else {
        console.error('Failed to capture image. Screenshot might be null.');
      }
    } else {
      console.error('Webcam reference not initialized.');
    }
  }, [webcamRef, setInputImage]);

  return (
    <div className="flex flex-col items-center mt-6">
      {isWebcamActive && (
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={{
            width: 640, 
            height: 360, 
            facingMode: "user" 
          }}
        />
      )}
      <button onClick={capture} className="mt-4 p-2 bg-gradient-to-r from-purple-400 to-blue-500 text-white font-bold rounded-full">
        Capture photo
      </button>
    </div>
  );
}

export default WebcamCapture;
