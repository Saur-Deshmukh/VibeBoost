import React, { useEffect, useRef, useState } from "react";
import { getTracksByGenre } from "../spotify"; // Assuming this function is available
import './music.css';

function GenreTracks(props) {
  const [tracks, setTracks] = useState([]);
  const genre = props.genre; // Replace with desired genre or make it dynamic
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState(null); // Track errors if any
  const audioRef = useRef(new Audio());

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const response = await getTracksByGenre(genre);
        console.log("Tracks:", response);
        if (response && response.length > 0) {
          setTracks(response); // Ensure response is valid and contains tracks
        } else {
          setTracks([]); // If no tracks found, set empty array
        }
      } catch (error) {
        console.error("Error fetching tracks:", error);
        setError('Failed to fetch tracks'); // Set error state on failure
      }
    };

    fetchTracks();
  }, [genre]);

  // Update audio source whenever the current track changes
  useEffect(() => {
    const audioSrc = tracks[currentIndex]?.preview_url;
    if (audioSrc) {
      audioRef.current.src = audioSrc;
      if (isPlaying) {
        audioRef.current.play().catch((error) => {
          console.error('Error playing track:', error);
        });
      }
    }
  }, [currentIndex, tracks, isPlaying]);

  // Function to play the current track
  const playTrack = () => {
    if (!isPlaying) {
      audioRef.current.volume = 0.5;
      audioRef.current.play().catch(error => {
        console.error('Error playing track:', error);
      });
      setIsPlaying(true);
    }
  };

  // Function to stop the current track
  const stopTrack = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };

  // Function to go to the next track
  const nextTrack = () => {
    const nextIndex = (currentIndex + 1) % tracks.length; // Loop back to the start
    setCurrentIndex(nextIndex);
  };

  // Handle click on a track
  const handleTrackClick = (index) => {
    setCurrentIndex(index);
    playTrack(); // Play track on click
  };

  if (error) {
    return <div>Error: {error}</div>; // Display error if any occurs
  }

  return (
    <div className="genre-tracks-container">
      <h2 className="genre-tracks-title">Tracks for Genre: {genre}</h2>
      {tracks.length === 0 ? ( // Handle loading state
        <p>Loading tracks...</p>
      ) : (
        <ul>
          {tracks.map((track, index) => (
            <li key={index} className="track-card">
              <div 
                onClick={() => handleTrackClick(index)} 
                className="track-link" 
                style={{ cursor: 'pointer' }} 
              >
                <img 
                  src={track.album?.images[0]?.url}
                  alt={track.name} 
                  className="track-image" 
                />
                <div>
                  <p className="track-name"><strong>{track.name}</strong></p>
                  <p className="track-artist">by {track.artists[0]?.name}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
      
      {/* Small Hovering Player UI */}
      <div className="audio-player">
        <div className="track-info">
          <p>Now Playing: {tracks[currentIndex]?.name} (feat. {tracks[currentIndex]?.artists[0]?.name})</p>
          <img 
            src={tracks[currentIndex]?.album?.images[0]?.url} 
            alt={tracks[currentIndex]?.name} 
            className="current-track-image" 
          />
        </div>
        <div className="controls horizontal">
          <button onClick={playTrack}>Play</button>
          <button onClick={stopTrack}>Stop</button>
          <button onClick={nextTrack}>Next</button>
        </div>
        <div>
          <a href={tracks[currentIndex]?.external_urls.spotify} target="_blank" rel="noopener noreferrer">
            Listen on Spotify
          </a>
        </div>
      </div>
    </div>
  );
}

export default GenreTracks;
