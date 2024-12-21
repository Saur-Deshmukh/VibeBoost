import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function BookDetails() {
  const { id } = useParams(); // Book ID from the route params
  const [book, setBook] = useState(null);

  useEffect(() => {
    fetch(`https://openlibrary.org/works/${id}.json`)
      .then((response) => response.json())
      .then((data) => setBook(data))
      .catch((error) => console.error("Error fetching book details:", error));
  }, [id]);

  if (!book) return <p className="text-center mt-10 text-gray-600">Loading...</p>;

  // Helper function to render data if it exists
  const renderIfExists = (label, value) => {
    if (!value || (Array.isArray(value) && value.length === 0)) return null;
    return (
      <p className="text-lg text-gray-700 mb-4">
        <strong>{label}:</strong>{" "}
        {Array.isArray(value) ? value.join(", ") : value}
      </p>
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col items-center p-6">
      <h1 className="text-4xl font-bold mb-4">{book.title}</h1>
      {book.covers && (
        <img
          src={`https://covers.openlibrary.org/b/id/${book.covers[0]}-L.jpg`}
          alt={book.title}
          className="w-96 h-auto rounded shadow-lg mb-6"
        />
      )}

      {renderIfExists("Description", book.description?.value || book.description)}
      {renderIfExists("Subjects", book.subjects)}
      {renderIfExists("Author(s)", book.authors?.map((author) => author.name))}
      {renderIfExists("First Published", book.first_publish_date)}
      {renderIfExists("Publishers", book.publishers)}
      {renderIfExists("Publish Places", book.publish_places)}
      {renderIfExists("Number of Pages", book.number_of_pages)}
      {renderIfExists("Languages", book.languages?.map((lang) => lang.key.split("/")[2]))}
      {renderIfExists("ISBN-10", book.isbn_10)}
      {renderIfExists("ISBN-13", book.isbn_13)}

      
    </div>
  );
}

export default BookDetails;
