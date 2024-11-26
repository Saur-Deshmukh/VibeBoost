import React, { useEffect, useState } from 'react';

function Meme() {
    const [memes, setMemes] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchMemes = () => {
        setLoading(true);
        fetch('https://meme-api.com/gimme/memes/9')
            .then((response) => response.json())
            .then((data) => {
                setMemes(data.memes);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching the memes:', error);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchMemes();
    }, []);

    if (loading) {
        return <div className="text-center mt-4 text-lg font-semibold">Loading...</div>;
    }

    return (
        <div className="flex flex-col items-center mt-10">
            <h1 className="text-2xl font-bold mb-4 text-white">Memes!!!</h1>
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-4 mx-5 p-2">
                {memes.map((meme, index) => (
                    <div key={index} className="break-inside-avoid">
                        <img
                            src={meme.url}
                            alt={meme.title}
                            className="w-full rounded-lg shadow-lg mb-2"
                        />
                        
                    </div>
                ))}
            </div>
            <button
                onClick={fetchMemes}
                className="bg-gradient-to-r from-teal-400 to-cyan-500 text-white font-bold flex items-center justify-center rounded-full p-3 mt-6"
            >
                Fetch New Memes
            </button>
        </div>
    );
}

export default Meme;
