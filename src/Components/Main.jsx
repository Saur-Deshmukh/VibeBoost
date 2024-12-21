import { useState, useEffect } from "react";
import Button from "./Button";
import DescriptionBox from "./Description";
import TextInput from "./TextInput"; 
import buttonDescriptions from "./Assets/Button-content";
import WebcamCapture from "./webcam";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Main() {
    const [showTextBox, setShowTextBox] = useState(false);  
    const [inputValue, setInputValue] = useState('');
    const [inputImage, setInputImage] = useState('');
    const [showWebCam, setShowWebCam] = useState(false);
    const navigate = useNavigate();

    const handleButtonClick = (index) => {
        if (index === 1) {
            setShowWebCam(true);
            setShowTextBox(false);
        } else if (index === 0) {
            setShowWebCam(false);
            setShowTextBox(true);
        }
    };
    function dataURItoBlob(dataURI) {
        const byteString = atob(dataURI.split(',')[1]);
        const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ab], { type: mimeString });
    }
    const detectEmotion = () => {
        if (showTextBox) {
            const textData = { text: inputValue };
    
            axios.post('http://localhost:8000/text/', textData)
            .then(() => {
                navigate('/output', { state: { showTextBox, showWebCam } });
            })
            .catch((error) => {
                console.error('Error detecting text emotion:', error);
            });
        } else if (showWebCam) {
            // Create FormData and append the file as a Blob
            const formData = new FormData();
            const blob = dataURItoBlob(inputImage); // Convert data URI to Blob
            formData.append('image', blob, 'captured_image.jpg');
    
            axios.post('http://localhost:8000/image/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(() => {
                navigate('/output', { state: { showTextBox, showWebCam } });
            })
            .catch((error) => {
                console.error('Error detecting image emotion:', error);
            });
        }
    };

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    useEffect(() => {
        if (inputImage) {
            console.log('Input Image Path:', inputImage);
        } else {
            console.log('No image captured yet.');
        }
    }, [inputImage]);

    return (
        <>
            <DescriptionBox />
            <div className="m-8 p-6 border-2 border-purple-400 rounded-lg">
                <h2 className="text-center text-2xl font-bold text-white mb-4">Detect Your Mood</h2>
                <div className="flex justify-center items-center">
                    <div className="flex space-x-10">
                        {buttonDescriptions.map((description, index) => (
                            <Button 
                                key={index} 
                                text={description.content} 
                                icon={description.icon} 
                                onClick={() => handleButtonClick(index)} 
                            />
                        ))}
                    </div>
                </div>

                {showWebCam && (
                    <WebcamCapture setInputImage={setInputImage} />
                )}

                {showTextBox && (
                    <TextInput 
                        inputValue={inputValue}  
                        onInputChange={handleInputChange}  
                    />
                )}

                {(showTextBox || showWebCam) &&
                    <div className="flex justify-center items-center">
                        <button className="mt-4 p-2 bg-gradient-to-r from-purple-400 to-blue-500 text-white font-bold rounded-full" onClick={detectEmotion}>
                            Detect Emotion
                        </button>
                    </div>
                }
            </div>
        </>
    );
}

export default Main;
