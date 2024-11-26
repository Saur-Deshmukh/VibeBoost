import React, { useEffect, useState } from 'react';
import Meme from './Meme';
import Motivation from './Motivation';
import GenreTracks from './music';
import { setClientToken } from '../spotify';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

function Output() {
    const { state } = useLocation();
    const { showTextBox, showWebCam } = state || {};
    const [emotion, setEmotion] = useState("");

    useEffect(() => {
        async function fetchEmotion() {
            if(showTextBox){
                try {
                    const response = await axios.get('http://localhost:8000/text/');
                    setEmotion(response.data.emotion);
                } catch (error) {
                    console.error("Error fetching emotion:", error);
                }
            }
            else if (showWebCam){
                try {
                    const response = await axios.get('http://localhost:8000/image/');
                    setEmotion(response.data.emotion);
                } catch (error) {
                    console.error("Error fetching emotion:", error);
                }
            }
            
        }
        fetchEmotion();
    }, []);
    const moodToGenre = {

        angry: "hard-rock",
        disgust: "punk",
        fear: "ambient",
        happy: "pop",
        neutral: "acoustic",
        sad: "blues",
        surprise: "indie-pop",

        // Text Model Emotions
        sadness: "sad",
        joy: "dance",
        love: "r-n-b",
        anger: "metal",
      
      
    };
    const genre = moodToGenre[emotion];
    return (
        <>
            <h2 className="text-4xl font-bold text-center text-white">Detected Emotion: {emotion}</h2>
            <GenreTracks genre = {genre} />
            {
                (emotion ==='happy' || emotion ==='joy' || emotion ==='love' ||emotion ==='neutral' || emotion ==='surprise' || emotion === 'disgust' ) && <Meme />
            }
            {
                (emotion ==='anger' || emotion ==='sadness' || emotion ==='sad' ||emotion ==='fear' || emotion === 'angry') && <Motivation />
                
            }
        </>
    );
}

export default Output;
