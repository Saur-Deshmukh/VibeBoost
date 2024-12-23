import React, { useEffect, useState } from 'react';
import Meme from './Meme';
import Motivation from './Motivation';
import axios from 'axios';
import MovieList from './Movies/MovieList';
import BookList from './Books/BookList';

function Output() {
    const [emotion, setEmotion] = useState("");

    useEffect(() => {
        async function fetchEmotion() {
            // Retrieve the token from localStorage
            const token = localStorage.getItem("authToken");

            // If the token exists, include it in the request headers
            const config = {
                headers: {
                    Authorization: `Token ${token}`,  // Prefix 'Token' followed by the token
                }
            };

            try {
                // Make the request with the token
                const response = await axios.get('http://localhost:8000/text/', config);
                setEmotion(response.data.emotion);
            } catch (error) {
                console.error("Error fetching emotion:", error);
            }
        }

        fetchEmotion();
    }, []);
    const moodToGenreMovie = {
        fear: 12,
        surprise: 14,
        sadness: 18,
        joy: 10402,
        love: 10749,        
        anger: 53
    };
    const moodToGenreBook = {
        fear: "mystery_and_detective_stories",
        surprise: "fantasy",
        sadness: "historical_fiction",
        joy: "children",
        love: "biography",
        anger: "law"
    };
    const genreMovie = moodToGenreMovie[emotion];
    const genreBook = moodToGenreBook[emotion];
    return (
        <>
            <h2 className="text-4xl font-bold text-center text-white">Detected Emotion: {emotion}</h2>
            {genreMovie&&<MovieList genre = {genreMovie}/>}
            {genreBook&&<BookList genre = {genreBook}/>}
            {
                (emotion ==='joy' || emotion ==='love' || emotion ==='surprise') && <Meme />
            }
            {
                (emotion ==='anger' || emotion ==='sadness'||emotion ==='fear') && <Motivation />
                
            }
        </>
    );
}

export default Output;
