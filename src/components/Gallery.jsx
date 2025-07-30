import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const API_KEY = '55d58666';

export default function Gallery({ title, query }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    
    const fetchMovies = async () => {
      try {
        const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(query)}&type=movie`);
        const data = await response.json();
        
        if (data.Response === 'True') {
          setMovies(data.Search.slice(0, 12)); // Mostra più film
        } else {
          setError(data.Error || 'Nessun risultato trovato');
        }
      } catch (err) {
        setError('Errore di connessione. Riprova più tardi.');
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [query]);

  if (loading) {
    return (
      <div className="gallery-section">
        <h3 className="gallery-title">{title}</h3>
        <div className="text-center py-5">
          <div className="spinner-border text-light mb-3" role="status" style={{ width: '3rem', height: '3rem' }}>
            <span className="visually-hidden">Caricamento...</span>
          </div>
          <div className="text-light">Caricamento {title}...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="gallery-section">
        <h3 className="gallery-title">{title}</h3>
        <div className="alert alert-danger d-flex align-items-center justify-content-center py-4">
          <i className="bi bi-exclamation-triangle me-3 fs-4"></i>
          <div>
            <strong>Errore nel caricamento:</strong>
            <div className="mt-1">{error}</div>
            <button 
              className="btn btn-outline-light btn-sm mt-2"
              onClick={() => window.location.reload()}
            >
              <i className="bi bi-arrow-clockwise me-1"></i>
              Riprova
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="gallery-section">
      <h3 className="gallery-title">{title}</h3>
      <div className="movie-row">
        {movies.map(movie => (
          <Link 
            to={`/movie-details/${movie.imdbID}`}
            className="movie-card text-decoration-none" 
            key={movie.imdbID}
            tabIndex="0"
            role="button"
            aria-label={`Visualizza ${movie.Title}`}
          >
            <img 
              className="movie-poster" 
              src={movie.Poster !== 'N/A' ? movie.Poster : '/assets/logo.png'} 
              alt={movie.Title}
              loading="lazy"
              onError={(e) => {
                e.target.src = '/assets/logo.png';
              }}
            />
            <div className="movie-title">{movie.Title}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}

Gallery.propTypes = {
  title: PropTypes.string.isRequired,
  query: PropTypes.string.isRequired,
};