import React, { useEffect, useState } from 'react';

function Motivation() {
    const [memes, setMemes] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchQuotes = () => {
        setLoading(true);
        fetch('https://meme-api.com/gimme/motivation/3')
            .then((response) => response.json())
            .then((data) => {
                setMemes(data.memes); // Store the array of memes
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching the memes:', error);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchQuotes();
    }, []);

    if (loading) {
        return <div className="text-center mt-4 text-lg font-semibold">Loading...</div>;
    }

    return (
        <div className="flex flex-col items-center mt-10">
            <h1 className="text-2xl font-bold mb-4 text-white">Motivate yourself!!!</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {memes.map((meme, index) => (
                    <div key={index} className="p-4 rounded-lg shadow-lg">
                        <img
                            src={meme.url}
                            alt={meme.title}
                            className="w-full h-auto rounded-md mb-2"
                        />
                        
                    </div>
                ))}
            </div>
            <button
                onClick={fetchQuotes}
                className="bg-gradient-to-r from-teal-400 to-cyan-500 text-white font-bold flex items-center justify-center rounded-full p-3 mt-6"
            >
                Fetch New Quotes
            </button>
        </div>
    );
}

export default Motivation;
