import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { motion } from "framer-motion";
import { X } from 'lucide-react';


function BookList(props) {
  const [books, setBooks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [selectedBookData, setSelectedBookData] = useState(null);
  const [id,setId]=useState(null);
  const genre = props.genre;
 

  useEffect(() => {
    fetch(`https://openlibrary.org/subjects/${genre}.json`)
      .then((response) => response.json())
      .then((data) => setBooks(data.works || []))
      .catch((error) => console.error("Error fetching books:", error));
  }, [genre]);
  useEffect(() => {
      fetch(`https://openlibrary.org/works/${id}.json`)
        .then((response) => response.json())
        .then((data) => setSelectedBookData(data))
        .catch((error) => console.error("Error fetching book details:", error));
    }, [selectedBook]);

  const handleShowDetails = (book) => {
    setSelectedBook(book);
    setId(book.key.split("/")[2]);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedBook(null);
    setId(null);
    setShowModal(false);
  };

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-3xl font-bold text-center mb-6 capitalize text-white">
      Suggesting Books of genre {genre.replace("_", " ")}
      </h1>
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
        {books.map((book) => (
          <SwiperSlide key={book.key}>
            <div className="bg-gradient-to-br from-purple-600 to-indigo-700 shadow-lg rounded-lg overflow-hidden flex flex-col items-center p-4">
              <img
                src={`https://covers.openlibrary.org/b/id/${book.cover_id}-M.jpg`}
                alt={book.title}
                className="w-full h-96 object-cover"
              />
              <h3 className="text-lg font-semibold text-center text-white">{book.title}</h3>
              <button
                onClick={() => handleShowDetails(book)}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Show Details
              </button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      {showModal && selectedBook && (
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
                  src={`https://covers.openlibrary.org/b/id/${selectedBook.cover_id}-L.jpg`}
                  alt={selectedBook.title}
                  className="w-full max-w-xs rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div>
                <h2 className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-600">
                  {selectedBook.title}
                </h2>
                <p className="text-xl text-gray-400 mb-4">Author(s): {selectedBook.authors?.map((author) => author.name).join(", ")}</p>
                <p className="text-gray-200 mb-6">{selectedBookData.description?.value || selectedBookData.description || "Loading....."}</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

export default BookList;
