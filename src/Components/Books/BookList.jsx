import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// {Genres:
// Fiction: fiction
// Science Fiction: science_fiction
// Fantasy: fantasy
// Mystery and Detective Stories: mystery_and_detective_stories
// Horror: horror
// Romance: romance
// Historical Fiction: historical_fiction
// Young Adult: young_adult
// Children's Literature: children
// Poetry: poetry
// Biography: biography
// Autobiography: autobiography
// History: history
// Philosophy: philosophy
// Science: science
// Psychology: psychology
// Self-help: self_help
// Religion: religion
// Cookbooks: cookbooks
// Art: art
// Music: music
// Sports: sports
// Travel: travel
// Education: education
// Technology: technology
// Politics: politics
// Law: law
// Business: business
// Economics: economics
// Health: health}
function BookList() {
  const [books, setBooks] = useState([]);
  const genre = "fantasy"; //Genre
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://openlibrary.org/subjects/${genre}.json`)
      .then((response) => response.json())
      .then((data) => setBooks(data.works || []))
      .catch((error) => console.error("Error fetching books:", error));
  }, [genre]);

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <h1 className="text-3xl font-bold text-center mb-6 capitalize">
        Books on {genre.replace("_", " ")}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {books.map((book) => (
          <div
            key={book.key}
            className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col items-center p-4"
          >
            <img
              src={`https://covers.openlibrary.org/b/id/${book.cover_id}-M.jpg`}
              alt={book.title}
              className="w-full h-64 object-cover mb-4 rounded"
            />
            <h3 className="text-lg font-semibold text-center">{book.title}</h3>
            <button
              onClick={() => navigate(`/details/${book.key.split("/")[2]}`)}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Show Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BookList;
