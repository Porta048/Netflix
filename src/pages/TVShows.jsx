import React, { useState, useEffect } from 'react';
import Gallery from '../components/Gallery.jsx';

export default function TVShows() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-light" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <div className="d-flex flex-column align-items-start w-100">
          <h2 className="mb-2">TV Shows</h2>
          <div className="genres-btn-wrapper mt-2 mb-3">
            <button type="button" className="btn btn-netflix-genres" data-bs-toggle="dropdown" aria-expanded="false">
              Genres
            </button>
            <ul className="dropdown-menu">
              <li><a className="dropdown-item" href="#">Comedy</a></li>
              <li><a className="dropdown-item" href="#">Drama</a></li>
              <li><a className="dropdown-item" href="#">Thriller</a></li>
              <li><a className="dropdown-item" href="#">Sci-Fi</a></li>
              <li><a className="dropdown-item" href="#">Crime</a></li>
            </ul>
          </div>
        </div>
        <div>
          <i className="bi bi-grid icons"></i>
          <i className="bi bi-grid-3x3 icons"></i>
        </div>
      </div>
      <Gallery title="Breaking Bad" query="Breaking Bad" />
      <Gallery title="Game of Thrones" query="Game of Thrones" />
      <Gallery title="Stranger Things" query="Stranger Things" />
      <Gallery title="The Walking Dead" query="The Walking Dead" />
      <Gallery title="Friends" query="Friends" />
      <Gallery title="The Office" query="The Office" />
    </>
  );
} 