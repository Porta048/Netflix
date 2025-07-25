import React, { useEffect, useState } from 'react';
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
        <div className="text-center py-4">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Caricamento...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="gallery-section">
        <h3 className="gallery-title">{title}</h3>
        <div className="alert">
          <i className="bi bi-exclamation-triangle me-2"></i>
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="gallery-section">
      <h3 className="gallery-title">{title}</h3>
      <div className="movie-row">
        {movies.map(movie => (
          <div 
            className="movie-card" 
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
          </div>
        ))}
      </div>
    </div>
  );
}

Gallery.propTypes = {
  title: PropTypes.string.isRequired,
  query: PropTypes.string.isRequired,
};