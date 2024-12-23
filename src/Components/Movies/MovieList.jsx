import React, { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { motion } from "framer-motion";
import { X } from "lucide-react";

function MovieList(props) {
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;
  const accessToken = import.meta.env.VITE_TMDB_ACCESS_TOKEN;
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [selectedMovieData, setSelectedMovieData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const genre = props.genre;
  const idToName = {
    12:"Adventure",
    14:"Fantasy",
    18:"Drama",
    10402:"Music",
    10749:"Romance",        
    53:"Thriller" 
};

  const handleShowDetails = async (movie) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${apiKey}`
      );
      const data = await response.json();
      setSelectedMovieData(data);
      setShowModal(true);
    } catch (error) {
      console.error("Error fetching movie details:", error);
    }
  };

  const handleCloseModal = () => {
    setSelectedMovieData(null);
    setShowModal(false);
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          "https://api.themoviedb.org/3/discover/movie",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              accept: "application/json",
            },
            params: {
              include_adult: false,
              include_video: false,
              language: "en-US",
              page: 1,
              sort_by: "popularity.desc",
              with_genres: genre,
            },
          }
        );
        setMovies(response.data.results);
      } catch (err) {
        setError("Failed to fetch movies.");
        console.error(err);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-3xl font-bold text-center mb-6 capitalize text-white">
        Suggesting Movies of genre {idToName[props.genre]}
      </h1>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
        className="mySwiper"
      >
        {movies.map((movie) => {
          const posterUrl = movie.poster_path
            ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
            : "https://via.placeholder.com/500x750?text=No+Image";
          return (
            <SwiperSlide key={movie.id}>
              <div className="bg-gradient-to-br from-purple-600 to-indigo-700 shadow-lg rounded-lg overflow-hidden flex flex-col items-center p-4">
                <img
                  src={posterUrl}
                  alt={movie.title}
                  className="w-full h-96 object-cover"
                />
                <h3 className="text-lg font-semibold text-center text-white">
                  {movie.title}
                </h3>
                <button
                  onClick={() => handleShowDetails(movie)}
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Show Details
                </button>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
      {showModal && selectedMovieData && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 z-[60] flex items-center justify-center p-4"
          onClick={handleCloseModal}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="relative bg-gradient-to-br from-gray-800 to-blue-900 rounded-3xl p-10 max-w-4xl w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 z-[70] bg-black/60 hover:bg-black/80 p-3 rounded-full text-white hover:text-blue-400 transition-all shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex justify-center items-center">
                <img
                  src={`https://image.tmdb.org/t/p/w500${selectedMovieData.poster_path}`}
                  alt={selectedMovieData.original_title}
                  className="w-full max-w-xs rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div>
                <h2 className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-600">
                  {selectedMovieData.original_title}
                </h2>
                <p className="text-gray-200 mb-6">
                  {selectedMovieData.overview}
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

export default MovieList;



