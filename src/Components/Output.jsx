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
            
            try {
                const response = await axios.get('http://localhost:8000/text/');
                setEmotion(response.data.emotion);
            } catch (error) {
                console.error("Error fetching emotion:", error);
            }
        }
        fetchEmotion();
    }, []);
    const moodToGenreMovie = {

        angry: 28,
        disgust: 35,
        fear: 12,
        happy: 878,
        neutral: 99,
        sad: 10751,
        surprise: 14,
        sadness: 18,
        joy: 10402,
        love: 10749,        
        anger: 53
    };
    const moodToGenreBook = {

        
        angry: "politics",
        disgust: "horror",
        fear: "mystery_and_detective_stories",
        happy: "romance",
        neutral: "philosophy",
        sad: "poetry",
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
                (emotion ==='happy' || emotion ==='joy' || emotion ==='love' ||emotion ==='neutral' || emotion ==='surprise' || emotion === 'disgust' ) && <Meme />
            }
            {
                (emotion ==='anger' || emotion ==='sadness' || emotion ==='sad' ||emotion ==='fear' || emotion === 'angry') && <Motivation />
                
            }
        </>
    );
}

export default Output;
