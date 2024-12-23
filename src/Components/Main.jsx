import { useState, useEffect } from "react";
import Button from "./Button";
import DescriptionBox from "./Description";
import TextInput from "./TextInput"; 
import buttonDescriptions from "./Assets/Button-content";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Main() {
    const [showTextBox, setShowTextBox] = useState(false);  
    const [inputValue, setInputValue] = useState('');
    const navigate = useNavigate();

    const handleButtonClick = () => {
        if (showTextBox){
            setShowTextBox(false);
        }
        else{
            setShowTextBox(true);
        }
    };
    
    const detectEmotion = () => {
       
        const textData = { text: inputValue };

        axios.post('http://localhost:8000/text/', textData)
        .then(() => {
            navigate('/output');
        })
        .catch((error) => {
            console.error('Error detecting text emotion:', error);
        });
        
    };

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    

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

                

                {showTextBox && (
                    <TextInput 
                        inputValue={inputValue}  
                        onInputChange={handleInputChange}  
                    />
                )}

                {(showTextBox) &&
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
